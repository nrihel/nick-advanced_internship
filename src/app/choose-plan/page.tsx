"use client"

import FaqAccordion from "@/shared/components/FaqAccordion";
import Footer from "@/shared/components/Footer";
import Image from "next/image"
import { useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5"
import { RiPlantFill } from "react-icons/ri";
import { RxCaretDown } from "react-icons/rx";


export default function Pricing() {

    const [selectedPlan, setSelectedPlan] = useState("yearly");

    const handleCheckout = () => {
        if (selectedPlan === "yearly") {
            console.log("starting 7-day free trial")
            // stripe checkout routing logic for yearly plan//
        } else {
            console.log("starting monthly subscription")
            // stripe checkout routing logic for monthly plan //
        }
    }
    return (
        <>
        <div className="ml-0 w-full relative flex flex-col">
            <div className="relative text-center w-full pt-8 md:pt-12 pb-0 bg-[#032b41] rounded-b-[4rem] md:rounded-bl-[16rem] md:rounded-br-[16rem] overflow-hidden">
                <div className="max-w-250 mx-auto text-white px-6">
                    <div className="text-[28px] sm:text-[36px] md:text-[48px] font-bold leading-tight mb-6 md:mb-10">
                    Get unlimited access to many amazing books to read
                    </div>
                    <div className="text-base md:text-[20px] mb-8">
                        Turn ordinary moments into amazing learning opportunities
                    </div>
                    <figure className="flex justify-center w-full max-w-65 sm:max-w-85 mx-auto mb-0 rounded-t-[180px] overflow-hidden">
                        <Image
                            src="/pricing-top.png"
                            alt="pricing image"
                            width={860}
                            height={722}
                            sizes="(max-width: 640px) 260px, 340px"
                            className="w-full h-auto block"
                        />
                    </figure>
                </div>
            </div>
            <div className="max-w-267.5 w-full mx-auto px-6">
                <div className="py-10 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-center text-center gap-8 max-w-200 mx-auto mb-14">
                        <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center text-[#032b41] w-14 h-14 mb-3">
                            <IoDocumentTextSharp className="w-14 h-14" />
                        </div>
                        <div className="text-base text-[#394547] font-light">
                            <b className="font-semibold text-[#032b41]">Key ideas in few min</b>{" "}
                            with many books to read
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center text-[#032b41] w-14 h-14 mb-3">
                            <RiPlantFill className="w-14 h-14" />
                        </div>
                        <div className="text-base text-[#394547] font-light">
                        <b className="font-semibold text-[#032b41]">3 million</b>{" "}
                        people growing with Summarist everyday
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center text-[#032b41] w-14 h-14 mb-3">
                            <FaHandshake className="w-14 h-14" />
                        </div>
                        <div className="text-base text-[#394547] font-light">
                        <b className="font-semibold text-[#032b41]">Precise recommendations</b>{" "}
                        collections curated by experts
                        </div>
                    </div>
                </div>
                <div className="text-[32px]">Choose the plan that fits you</div>
                
                <div 
                    onClick={() => setSelectedPlan("yearly")}
                    className={`flex gap-6 p-6 bg-[#f1f6f4] border-4 rounded-sm cursor-pointer max-w-170 mx-auto
                    ${selectedPlan === "yearly" ? "border-[#2be080]" : "border-[#bac8ce]"}`}
                >
                    <div className="relative w-6 h-6 rounded-full border-2 flex items-center justify-center">
                        <div 
                            className={
                            selectedPlan === "yearly" ? "absolute w-1.5 h-1.5 bg-black rounded-full" : "hidden"}
                        />
                    </div>
                    <div>
                        <div className="text-lg font-semibold text-[#032b41] mb-2">
                            Premium Plus Yearly
                        </div>
                        <div className="text-[24px] font-semibold color-[#032b41] mb-2">
                            $99.99/year
                        </div>
                        <div className="text-[#6b757b] text-sm">
                            7-day free trial included
                        </div>
                    </div>                
                </div>
                <div className="flex items-center justify-center max-w-60 mx-auto my-6 gap-2 text-sm text-[#6b757b]">
                    <div className="flex-1 h-px bg-[#bac8ce]" />
                        <span>or</span>
                    <div className="flex-1 h-px bg-[#bac8ce]" />
                </div>
                <div 
                    onClick={() => setSelectedPlan("monthly")}
                    className={`flex gap-6 p-6 bg-[#f1f6f4] border-4 rounded-sm cursor-pointer max-w-170 mx-auto
                        ${selectedPlan === "monthly" ? "border-[#2be080]" : "border-[#bac8ce]"}`}
                >
                    <div className="relative w-6 h-6 rounded-full border-2 flex items-center justify-center">
                        <div 
                        className={
                        selectedPlan === "monthly" ? "absolute w-1.5 h-1.5 bg-black rounded-full" : "hidden"}
                    />
                    </div>
                <div>
                    <div className="text-lg font-semibold text-[#032b41] mb-2">
                            Premium Monthly
                        </div>
                        <div className="text-[24px] font-semibold color-[#032b41] mb-2">
                            $9.99/month
                        </div>
                        <div className="text-[#6b757b] text-sm">
                            No trial included
                        </div>
                    </div>              
                </div>
                <div className="bg-white sticky bottom-0 z-1 py-8 flex flex-col items-center gap-4">
                    <span>
                        <button 
                            onClick={handleCheckout}
                            className="bg-[#2bd97c] text-[#032b41] w-full h-10 rounded-sm text-base flex items-center justify-center min-w-45"
                            >
                                {selectedPlan === "yearly"
                                    ? "Start your free 7-day trial"
                                    : "Start your first month"}
                            </button>
                    </span>
                    <div className="text-[12px] text-[#6b757b] text-center">Cancel your trial at any time before it ends, and you won't be charged.</div>
                </div>
                <FaqAccordion />
            </div>
        </div>
    </div>
    <Footer />
    </>
  );
}