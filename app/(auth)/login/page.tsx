"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }
      router.push("/admin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#1a56db] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#1a56db] font-black text-2xl mx-auto mb-4 shadow-xl">
            J
          </div>
          <h1 className="text-2xl font-black text-white">Jandify Global</h1>
          <p className="text-blue-200 text-sm mt-1">Admin Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sign in to Admin</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[#1a56db] transition-colors">
                <Mail size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jandifyglobal.com"
                  className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[#1a56db] transition-colors">
                <Lock size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  required
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a56db] hover:bg-[#1e429f] text-white py-3.5 rounded-xl font-bold transition-colors disabled:opacity-70 mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-xs text-blue-700">
            <strong>Default credentials:</strong><br />
            Email: admin@jandifyglobal.com<br />
            Password: Admin@123456<br />
            <span className="text-blue-500">(Change after first login)</span>
          </div>
        </div>

        <p className="text-center text-blue-200 text-xs mt-6">
          Jandify Global Admin Portal · Authorized access only
        </p>
      </div>
    </div>
  );
}
