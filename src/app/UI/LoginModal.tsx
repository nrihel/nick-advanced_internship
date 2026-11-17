"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"
import { FiX } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = "login" | "signup" | "forgot";

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [view, setView] = useState<ModalView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    loginWithEmail,
    signUpWithEmail,
    loginWithGoogle,
    loginAsGuest,
    resetPassword,
  } = useAuth();
  const router = useRouter();
  
  if (!isOpen) return null;

  const handleSuccess = () => {
    setError("");
    setMessage("");
    onClose();
    router.push("/for-you");
  }

  const handleGuestLogin = async () => {
    setError("");
    setSubmitting(true);
    try {
      await loginAsGuest();
      handleSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to log in as guest.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSubmitting(true);
    try {
      await loginWithGoogle();
      handleSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to log in with Google.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      if (view === "login") {
        await loginWithEmail(email, password);
        handleSuccess();
      } else if (view === "signup") {
        await signUpWithEmail(email, password);
        handleSuccess();
      } else if (view === "forgot") {
        await resetPassword(email);
        setMessage("Password reset email sent! Check your inbox.");
      }
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setSubmitting(false);
    }
  };

  const switchView = (nextView: ModalView) => {
    setView(nextView);
    setError("");
    setMessage("");
  };

   return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-100 bg-white rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 pb-6">
          <div className="text-center text-xl font-bold text-[#032b41] mb-6">
            {view === "login" && "Log in to Summarist"}
            {view === "signup" && "Sign up to Summarist"}
            {view === "forgot" && "Reset your password"}
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 text-sm text-green-700 bg-green-50 p-2 rounded">
              {message}
            </div>
          )}

          {view === "login" && (
            <>
              <button
                type="button"
                disabled={submitting}
                onClick={handleGuestLogin}
                className="w-full h-10 bg-[#3a579d] hover:bg-[#25396b] text-white rounded flex items-center justify-center relative cursor-pointer transition-colors"
              >
                <figure className="w-9 h-9 bg-white rounded flex items-center justify-center absolute left-1 text-[#3a579d]">
                  <FaUser />
                </figure>
                <div>Login as a Guest</div>
              </button>

              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-[#bac8ce]" />
                <span className="mx-4 text-sm text-[#394547] font-medium">
                  or
                </span>
                <div className="flex-1 h-px bg-[#bac8ce]" />
              </div>
            </>
          )}

          {view !== "forgot" && (
            <>
              <button
                type="button"
                disabled={submitting}
                onClick={handleGoogleLogin}
                className="w-full h-10 bg-[#4285f4] hover:bg-[#3367d6] text-white rounded flex items-center justify-center relative cursor-pointer transition-colors"
              >
                <figure className="w-9 h-9 bg-white rounded flex items-center justify-center absolute left-1">
                  <FcGoogle className="w-5 h-5" />
                </figure>
                <div>
                  {view === "login"
                    ? "Login with Google"
                    : "Sign up with Google"}
                </div>
              </button>

              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-[#bac8ce]" />
                <span className="mx-4 text-sm text-[#394547] font-medium">
                  or
                </span>
                <div className="flex-1 h-px bg-[#bac8ce]" />
              </div>
            </>
          )}

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <input
              className="h-10 px-3 border-2 border-[#bac8ce] rounded text-sm text-[#394547] focus:outline-none focus:border-[#2bd97c]"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            {view !== "forgot" && (
              <input
                className="h-10 px-3 border-2 border-[#bac8ce] rounded text-sm text-[#394547] focus:outline-none focus:border-[#2bd97c]"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-10 bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-medium rounded cursor-pointer transition-colors disabled:opacity-50"
            >
              {view === "login" && "Login"}
              {view === "signup" && "Sign up"}
              {view === "forgot" && "Send reset password link"}
            </button>
          </form>
        </div>

        {view === "login" && (
          <div
            onClick={() => switchView("forgot")}
            className="text-center text-sm text-[#116be9] hover:underline cursor-pointer mb-4"
          >
            Forgot your password?
          </div>
        )}

        <button
          type="button"
          onClick={() => switchView(view === "login" ? "signup" : "login")}
          className="w-full h-10 bg-[#f1f6f4] hover:bg-[#e1e9e8] text-[#116be9] text-sm font-medium cursor-pointer transition-colors"
        >
          {view === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 text-2xl text-[#032b41] hover:opacity-70 cursor-pointer"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}