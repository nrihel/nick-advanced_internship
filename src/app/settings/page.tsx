"use client"

import { useAuth } from "@/context/AuthContext";
import Searchbar from "@/shared/components/Searchbar"
import Sidebar from "@/shared/components/sidebar"
import Link from "next/link";

export default function Settings() {
    const { user, isPremium, loading } = useAuth();
    
    return (
        <>
        <Sidebar />
        <Searchbar />
        <div className="py-10 w-full">
            <div className="max-w-267.5 w-full mx-auto px-6 md:ml-50">
                <div className="text-left border-b border-[#e1e7ea] pb-4 text-[24px] md:text-[32px] text-[#032b41] mb-8 font-semibold">Settings</div>

                {loading ? (
                    <div className="animate-pulse">
                        <div className="border-b border-[#e1e7ea] pb-6 mb-6">
                            <div className="h-5 w-48 bg-gray-200 rounded mb-3" />
                            <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                            <div className="h-10 w-44 bg-gray-200 rounded" />
                        </div>
                        <div className="border-b border-[#e1e7ea] pb-6 mb-6">
                            <div className="h-5 w-20 bg-gray-200 rounded mb-3" />
                            <div className="h-4 w-56 bg-gray-200 rounded" />
                        </div>
                    </div>
                ) : (
                <>
                <div className="flex flex-col items-start gap-2 mb-8 border-b border-[#e1e7ea] pb-6">
                    <div className="text-lg font-semibold text-[#032b41]">Your Subscription plan</div>
                    <div className="text-[#032b41]">
                        {isPremium ? "Premium" : "Basic"}
                    </div>
                    <div className="ml-24">
                        {!isPremium && (
                            <Link
                                href="/choose-plan"
                                className="inline-block bg-[#2bd97c] hover:bg-[#20ba68] font-medium px-6 py-2.5 rounded transition-colors"
                            >
                            Upgrade to Premium
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2 mb-8 border-b border-[#e1e7ea] pb-6">
                    <div className="text-lg font-semibold text-[#032b41]">Email</div>
                    <div className="text-[#032b41]">
                        {user?.email || "Not signed in"}
                    </div>
                </div>                    
                </>
            )}
            </div>
        </div>
        </>
    )
}

