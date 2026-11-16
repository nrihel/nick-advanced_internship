"use client"
import Image from "next/image";

interface SectionProps {
    onOpenModal: () => void
}

export default function Navbar({ onOpenModal }: SectionProps) {
    return (
        <nav className="w-full h-20">
            <div className="flex justify-between items-center p-6">
                <div className="w-full max-w-65">
                    <Image 
                        src="/logo.png"
                        alt="logo"
                        width={200}
                        height={46}
                        sizes="(max-width: 220px) 100vw, 200px"
                        className="w-full h-auto"
                    />
                </div>
                <ul className="flex gap-6">
                <li className="cursor-pointer text-[#032b41] hover:text-[#2bd97c] text-xl pl-6"
                onClick={onOpenModal}>Login</li>
                <li className="hidden min-[678px]:inline-block cursor-not-allowed text-[#032b41] text-xl">About</li>
                <li className="hidden min-[678px]:inline-block cursor-not-allowed text-[#032b41] text-xl">Contact</li>
                <li className="hidden min-[678px]:inline-block cursor-not-allowed text-[#032b41] text-xl">Help</li>
                </ul>
            </div>
        </nav>
    )
}

    
