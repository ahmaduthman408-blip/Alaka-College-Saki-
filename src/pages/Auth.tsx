import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, X, CheckCircle } from "lucide-react";
import { SCHOOL_NAME } from "../constants";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleSignUpContent = (e: React.FormEvent) => {
    e.preventDefault();
    setShowVerification(true);
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === "101202") {
      setSuccess(true);
      setError("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setError("Invalid verification code. Hint: 101202");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 opacity-80"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-blue-900 text-3xl font-extrabold text-white shadow-sm mb-4">
            A
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-2">
            {isLogin ? "Sign in to access student portal" : `Join ${SCHOOL_NAME} online portal`}
          </p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleSignUpContent} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition-all text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-10 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-extrabold uppercase tracking-wide text-white bg-blue-900 hover:bg-blue-800 transition-all"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-900 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>

      {/* Verification Modal */}
      <AnimatePresence>
        {showVerification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full relative"
            >
              {!success ? (
                <>
                  <button 
                    onClick={() => setShowVerification(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-extrabold text-center text-slate-900 mb-2">Verify your email</h3>
                  <p className="text-center text-xs text-slate-500 font-medium mb-8">
                    We've sent a code to your email. Enter it below to activate your account.
                  </p>
                  
                  <form onSubmit={handleVerification}>
                    <input
                      type="text"
                      className="w-full text-center tracking-[0.5em] font-bold text-2xl px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none mb-4 shadow-sm"
                      placeholder="------"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-xs font-bold mb-4 text-center">{error}</p>}
                    <button
                      type="submit"
                      className="w-full bg-blue-900 text-white font-extrabold text-sm uppercase tracking-wide py-4 rounded-lg shadow-sm hover:bg-blue-800 transition-colors"
                    >
                      Verify Account
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200"
                  >
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Account Activated!</h3>
                  <p className="text-xs font-medium text-slate-500">Taking you to the dashboard...</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
