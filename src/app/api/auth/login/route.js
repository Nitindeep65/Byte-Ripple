import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/model/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { msg: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }

    let passwordMatch = false;
    if (typeof user.password === 'string' && user.password.startsWith('$2')) {
      // bcrypt hash (prefix $2a/$2b/$2y)
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      // plain-text fallback (not recommended)
      passwordMatch = password === user.password;
    }

    if (!passwordMatch) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }

    // ✅ Mark user online
    user.isOnline = true;
    user.lastSeen = new Date();
    await user.save();

    // remove sensitive fields
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, __v: __, ...userSafe } = user.toObject();

    return NextResponse.json(
      { msg: 'Login successful', user: userSafe },
      { status: 200 }
    );
  } catch (error) {
    console.error('API /api/auth/login error:', error);
    return NextResponse.json({ msg: 'Server Error' }, { status: 500 });
  }
}
