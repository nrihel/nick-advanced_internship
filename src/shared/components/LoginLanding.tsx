"use client"
import Image from "next/image";

interface SectionProps {
    onOpenModal: () => void
}

export default function Landing({ onOpenModal }: SectionProps) {
    return (
        <main className="flex-1">        
            <div className="py-10 w-full">
                <div className="max-w-267.5 w-full mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:justify-center md:items center">
                        <div className="w-full flex flex-col items-center text-center md:items-start md:text-left justify-center">
                            <div className="text-[#032b41] text-[40px] font-bold mb-6">
                            Gain more knowledge <br className="hidden md:flex" />
                            in less time
                        </div>
                        <div className="text-[#394547] text-2xl leading-normal mb-6">
                        Great summaries for busy people,
                        
                        individuals who barely have time to read,
                        
                        and even people who don’t like to read.
                        </div>
                        <button className="max-w-75 flex items-center justify-center bg-[#2bd97c] hover:bg-[#20ba68] duration-200 text-[#032b41] text-lg w-full h-10 min-w-45 rounded-sm cursor-pointer"
                        onClick={onOpenModal}>Login</button>
                    </div>
                    <figure className="hidden md:flex md:w-full justify-end">
                        <Image
                            src="/landing.png" 
                            alt="landing" 
                            width={400}
                            height={400}
                            className="w-full h-auto max-w-100"
                        />
                    </figure>
                </div>
            </div>
        </div>
    </main>

    )
}
