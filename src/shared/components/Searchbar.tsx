"use client"

import { IoMdSearch } from "react-icons/io";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "@/context/AuthContext"

export default function Searchbar() {

    const { toggleSidebar } = useAuth();
    return (
        <>
        <div className="bg-white border-b border-[#e1e7ea] h-20 z-1 justify-end">
            <div className="relative flex items-center justify-between px-8 max-w-267.5 mx-auto h-full">
                <div className="xs:invisible md:invisible sm:visible w-40 h-10">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={160}
                        height={40}
                        className="w-full h-auto"
                    />
                </div>
                <div className="flex items-center gap-6 w-full max-w-85">
                    <div className="flex items-center w-full">
                        <div className="relative flex items-center">
                            <input className="h-10 w-full pl-4 pr-12 bg-[#f1f6f4] text-[#042330] rounded-lg outline-none border-2 border-[#e1e7ea]" 
                                type="text" 
                                placeholder="Search for books" />
                            <div className="flex items-center absolute top-0 right-2 justify-end h-full border-l border-[#e1e7ea] pl-2">
                                <IoMdSearch className="text-[#032b41]" />
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                        className="flex md:hidden items-center justify-center cursor-pointer text-[#032b41]">
                        <RxHamburgerMenu className="h-6 w-6 text-[#032b41]" />
                    </button>
                </div>
            </div>
        </div>
        
        </>
    )
}

