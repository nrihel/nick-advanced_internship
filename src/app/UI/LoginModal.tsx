"use client";

import { FiX } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[400px] bg-white rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 pb-6">
          <div className="text-center text-xl font-bold text-[#032b41] mb-6">
            Log in to Summarist
          </div>

          <button className="w-full h-10 bg-[#3a579d] hover:bg-[#25396b] text-white rounded flex items-center justify-center relative cursor-pointer transition-colors">
            <figure className="w-9 h-9 bg-white rounded flex items-center justify-center absolute left-1 text-[#3a579d]">
              <FaUser />
            </figure>
            <div>Login as a Guest</div>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 h-[1px] bg-[#bac8ce]" />
            <span className="mx-4 text-sm text-[#394547] font-medium">or</span>
            <div className="flex-1 h-[1px] bg-[#bac8ce]" />
          </div>

          <button className="w-full h-10 bg-[#4285f4] hover:bg-[#3367d6] text-white rounded flex items-center justify-center relative cursor-pointer transition-colors">
            <figure className="w-9 h-9 bg-white rounded flex items-center justify-center absolute left-1">
              <FcGoogle className="w-5 h-5" />
            </figure>
            <div>Login with Google</div>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 h-[1px] bg-[#bac8ce]" />
            <span className="mx-4 text-sm text-[#394547] font-medium">or</span>
            <div className="flex-1 h-[1px] bg-[#bac8ce]" />
          </div>

          <form className="flex flex-col gap-4">
            <input
              className="h-10 px-3 border-2 border-[#bac8ce] rounded text-sm text-[#394547] focus:outline-none focus:border-[#2bd97c]"
              type="email"
              placeholder="Email Address"
            />
            <input
              className="h-10 px-3 border-2 border-[#bac8ce] rounded text-sm text-[#394547] focus:outline-none focus:border-[#2bd97c]"
              type="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-full h-10 bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-medium rounded cursor-pointer transition-colors"
            >
              Login
            </button>
          </form>
        </div>

        <div className="text-center text-sm text-[#116be9] hover:underline cursor-pointer mb-4">
          Forgot your password?
        </div>

        <button
          onClick={onClose}
          className="w-full h-10 bg-[#f1f6f4] hover:bg-[#e1e9e8] text-[#116be9] text-sm font-medium cursor-pointer transition-colors"
        >
          Don&apos;t have an account?
        </button>

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 text-2xl text-[#032b41] hover:opacity-70 cursor-pointer"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
