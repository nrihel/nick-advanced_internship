"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
import { RiBallPenLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { VscGearCompact } from "react-icons/vsc";
import { MdHelpOutline, MdLogout, MdLogin } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Suspense, useRef } from "react";

const fontSizes = [
  {label: "Aa", value: "text-base", sizeClass: "text-base" },
  {label: "Aa", value: "text-lg", sizeClass: "text-lg"},
  {label: "Aa", value: "text-[22px]", sizeClass: "text-[22px]"},
  {label: "Aa", value: "text-[26px]", sizeClass: "text-[26px]"},
];

function SidebarContent() {
  const { user, logout, openModal, isSidebarOpen, closeSidebar, fontSize, setFontSize } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const logoutRef = useRef<HTMLButtonElement | null>(null);

  const isPlayerPage = pathname?.startsWith("/player");

  const handleLogout = async () => {
    try {
      await logout();
      closeSidebar();
      router.push("/");
    } catch (error) {
      console.error("failed to log out:", error);
    }
  };

  const scrollToLogout = () => {
  logoutRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-[#3a4649]/75 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`bg-[#f7faf9] w-50 min-w-50 fixed top-0 left-0 h-screen overflow-y-auto flex flex-col justify-between z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${isPlayerPage ? "pb-36 md:pb-24" : "pb-5"}`}
      >
        <div className="flex items-center justify-center h-15 pt-4 max-w-40 mx-auto">
          <Image
            src="/logo.png"
            alt="Summarist logo"
            width={160}
            height={40}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className={`flex flex-col justify-between pb-2 overflow-y-auto
          isPlayerPage 
            ? "h-[calc(100vh-140px)]"
            : "h-[calc(100vh-60px)]"}`}>
          <div className="flex-1 mt-10">
            <Link
              href="/for-you"
              onClick={closeSidebar}
              className="flex items-center h-14 text-[#032b41] hover:bg-[#f0efef] mb-2 cursor-pointer"
            >
              <div
                className={`w-1.25 h-full mr-4 ${
                  pathname === "/for-you" ? "bg-[#2bd97c]" : "bg-transparent"
                }`}
              ></div>
              <div className="flex items-center justify-center mr-2">
                <AiOutlineHome className="w-6 h-6 text-[#032b41]" />
              </div>
              <div className="text-[#032b41] text-base">For you</div>
            </Link>

            <Link
              href="/library"
              onClick={closeSidebar}
              className="flex items-center h-14 text-[#032b41] hover:bg-[#f0efef] mb-2 cursor-pointer"
            >
              <div
                className={`w-1.25 h-full mr-4 ${
                  pathname === "/library" ? "bg-[#2bd97c]" : "bg-transparent"
                }`}
              ></div>
              <div className="flex items-center justify-center mr-2">
                <FaRegBookmark className="w-6 h-6 text-[#032b41]" />
              </div>
              <div className="text-[#032b41] text-base">Library</div>
            </Link>

            <div className="flex items-center h-14 text-[#032b41] mb-2 cursor-not-allowed">
              <div className="w-1.25 h-full bg-transparent mr-4"></div>
              <div className="flex items-center justify-center mr-2">
                <RiBallPenLine className="w-6 h-6 text-[#032b41]" />
              </div>
              <div className="text-[#032b41] text-base">Highlights</div>
            </div>

            <div className="flex items-center h-14 text-[#032b41] mb-2 cursor-not-allowed">
              <div className="w-1.25 h-full bg-transparent mr-4"></div>
              <div className="flex items-center justify-center mr-2">
                <IoMdSearch className="w-6 h-6 text-[#032b41]" />
              </div>
              <div className="text-[#032b41] text-base">Search</div>
            </div>
          </div>

            <div className={`flex items-center gap-3 pl-4 mb-5
              ${isPlayerPage ? "visible" : "invisible pointer-events-none"}`}>
              {fontSizes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFontSize(item.value)}
                  className={`flex items-center justify-center w-8 h-8 cursor-pointer font-semibold text-[#032b41] border-b-[3px] transition-colors 
                  ${item.sizeClass} ${fontSize === item.value ? "border-[#2bd97c]" : "border-transparent"}`}>
                  {item.label}
                </button>
              ))}
            </div>

          <div className="box-border m-0 p-0 overflow-y-auto shrink-0">
            <Link
              href="/settings"
              onClick={closeSidebar}
              className="flex items-center h-14 text-[#032b41] hover:bg-[#f0efef] mb-2 cursor-pointer"
            >
              <div
                className={`w-1.25 h-full mr-4 ${
                  pathname === "/settings" ? "bg-[#2bd97c]" : "bg-transparent"
                }`}
              ></div>
              <div className="flex items-center justify-center mr-2">
                <VscGearCompact className="w-6 h-6 text-[#032b41]" />
              </div>
              <div className="text-[#032b41] text-base">Settings</div>
            </Link>

            <div className="flex items-center h-14 text-[#032b41] mb-2 cursor-not-allowed">
              <div className="w-1.25 h-full bg-transparent mr-4"></div>
              <div className="flex items-center justify-center mr-2">
                <MdHelpOutline className="w-6 h-6 text-[#032b41]" />
              </div>
              <div className="text-[#032b41] text-base">Help and Support</div>
            </div>

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center h-14 text-[#032b41] hover:bg-[#f0efef] mb-2 cursor-pointer"
              >
                <div className="w-1.25 h-full bg-transparent mr-4"></div>
                <div className="flex items-center justify-center mr-2">
                  <MdLogout className="w-6 h-6 text-[#032b41]" />
                </div>
                <div className="text-[#032b41] text-base">Logout</div>
              </button>
            ) : (
              <button
                onClick={() => {
                  closeSidebar();
                  openModal();
                }}
                className="w-full flex items-center h-14 text-[#032b41] hover:bg-[#f0efef] mb-2 cursor-pointer"
              >
                <div className="w-1.25 h-full bg-transparent mr-4"></div>
                <div className="flex items-center justify-center mr-2">
                  <MdLogin className="w-6 h-6 text-[#032b41]" />
                </div>
                <div className="text-[#032b41] text-base">Login</div>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default function Sidebar() {
  return (
    <Suspense
      fallback={
        <aside className="hidden md:block fixed top-0 left-0 w-50 min-w-50 h-screen bg-[#f7faf9]" />
      }
    >
      <SidebarContent />
    </Suspense>
  );
}
