"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    setLoading(false);

    if (res && !res.error) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-4 rounded-2xl transition"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-4 rounded-2xl transition"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl font-semibold transition duration-300 shadow-lg"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don&apos;t have an account?
          <Link href="/register" className="text-black font-semibold ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}