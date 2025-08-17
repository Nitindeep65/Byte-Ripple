import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

// Use globalThis to persist the cached connection across module reloads in dev
let cached = globalThis._mongo;

if (!cached) {
  cached = globalThis._mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log("🚀 Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // Recommended mongoose options
      bufferCommands: false,
      // add other options if needed
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ DB connected" , mongoose.connection.name);
    return cached.conn;
  } catch (err) {
    // Clear the promise so next call can retry
    cached.promise = null;
    console.error("DB connect error:", err);
    throw err;
  }
}