"use client"
import React, { useState } from "react";


export default function SignupPage() {
     const[formData , setFormData] = useState({
        username: "",
        email: "",
        password: ""
     });
	 const[loading , setLoading] = useState(false);
	 const [error , setError] = useState<string | null>(null);
	 const [success, setSuccess] = useState<string | null>(null);

	 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	 };
	 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser form submission
    setLoading(true);
    setError('');
    setSuccess('');
	 if (!formData.username || !formData.email || !formData.password) {
	setError('All fields are required.');
      setLoading(false);
      return;
	 }
	  try {
      const res = await fetch("/api/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || data.message || "Signup failed");
      } else {
        setSuccess(data.msg || "User created successfully");
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (err) {
      setError("Network or server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


	 

	return (
		<main className="font-montserrat min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
			<div className="w-full max-w-3xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 flex flex-col items-center transform hover:scale-[1.01] transition-all duration-300">
				<div className="mb-6 flex flex-col items-center">
					<span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg mb-3 transform hover:scale-110 transition-transform duration-300 hover:rotate-3">
						<svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm6 2a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
					</span>
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Create your ByteRipple account</h1>
				</div>
				{success && (
					<div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
						{success}
					</div>
				)}
				{error && (
					<div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300">
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-xl mx-auto">
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
						<input 
							onChange={handleChange}
							type="text" 
							id="username"
							name="username" 
							className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-600 transition-all duration-300 hover:border-blue-400 dark:hover:border-purple-400" 
							placeholder="Enter your name" 
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
						<input 
							onChange={handleChange}
							type="email" 
							id="email" 
							name="email"
							className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
							placeholder="Enter your email" 
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
						<input onChange={(e)=> setFormData({...formData, password: e.target.value})}
                         type="password" id="password" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Create a password" />
					</div>
					<button 
					    disabled={loading}
						type="submit" 
						className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 hover:shadow-xl focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
					>
						{loading ? 'Signing Up...' : 'Sign Up'}
					</button>
				</form>
				<div className="flex items-center w-full my-6">
					<div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
					<span className="mx-4 text-xs text-gray-400 dark:text-gray-500">or</span>
					<div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
				</div>
				<div className="flex flex-col gap-3 w-full max-w-xl mx-auto">
					<button className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
						<svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.22l6.9-6.9C36.44 2.36 30.55 0 24 0 14.61 0 6.27 5.48 1.82 13.44l8.06 6.27C12.36 13.13 17.73 9.5 24 9.5z"/><path fill="#34A853" d="M46.18 24.56c0-1.64-.15-3.22-.44-4.76H24v9.04h12.44c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.59C43.73 37.36 46.18 31.44 46.18 24.56z"/><path fill="#FBBC05" d="M9.88 28.09c-1.13-3.36-1.13-6.97 0-10.33l-8.06-6.27C.64 15.36 0 19.55 0 24c0 4.45.64 8.64 1.82 12.51l8.06-6.27z"/><path fill="#EA4335" d="M24 48c6.55 0 12.44-2.16 16.9-5.89l-7.18-5.59c-2.01 1.35-4.59 2.15-7.72 2.15-6.27 0-11.64-3.63-14.12-8.94l-8.06 6.27C6.27 42.52 14.61 48 24 48z"/></g></svg>
						Sign up with Google
					</button>
					<button className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.86 8.16 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
						Sign up with Github
								</button>
							</div>
							<div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
								Already have an account? <a href="/auth/Login" className="text-blue-400 dark:text-purple-400 font-semibold hover:underline">Login</a>
							</div>
						</div>
					</main>
			
	)
}

