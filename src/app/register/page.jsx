"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STAFF",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("User registered successfully");
        router.push("/login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-4 rounded-2xl transition"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

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
                  placeholder="Create a password"
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

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Assign Role
                </label>
                <select
                  className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none p-4 rounded-2xl transition"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="STAFF">STAFF</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl font-semibold transition duration-300 shadow-lg"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
              Already have an account?
              <Link href="/login" className="text-black font-semibold ml-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}