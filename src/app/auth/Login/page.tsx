"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON server response:", text);
        setError("Server error. See console.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || data.message || "Login failed");
        setLoading(false);
        return;
      }

      // optional: backend may return a token or user
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setSuccess(data.msg || "Logged in");
      if(res.ok){
        router.push("/ChatDashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-montserrat min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-8 md:p-14 backdrop-blur-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Login to ByteRipple</h1>
        </div>

        {error && <div className="w-full text-sm text-red-500 mb-3">{error}</div>}
        {success && <div className="w-full text-sm text-green-500 mb-3">{success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold shadow hover:from-purple-400 hover:to-blue-400 transition-all disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center w-full my-6">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
          <span className="mx-4 text-xs text-gray-400 dark:text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
            Continue with Google
          </button>
          <button className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
            Continue with Github
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account? <a href="/auth/Signup" className="text-blue-400 dark:text-purple-400 font-semibold hover:underline">Sign up</a>
        </div>
      </div>
    </main>
  );
}
