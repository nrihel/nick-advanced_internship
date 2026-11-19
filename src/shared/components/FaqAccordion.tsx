"use client"

import { useState } from "react"
import { RxCaretDown } from "react-icons/rx"

const accordionData = [
    {id: 1, title: "How does the free 7-day trial work?", content: "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."},
    {id: 2, title: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?", content: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."},
    {id: 3, title: "What's  included in the Premium plan?", content: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."},
    {id: 4, title: "Can I cancel during my trial or subscription", content: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."},
]

function AccordionItem({ title, content, isExpanded, onToggle} : {
    title: string,
    content: string,
    isExpanded: boolean,
    onToggle: () => void,
}){
    return(
        <div className="border-b border-[#ddd] mb-2">             
            <button 
                type="button"
                aria-expanded={isExpanded}
                className="flex w-full justify-between items-center text-left cursor-pointer py-6 gap-2" 
                onClick={onToggle}
            >
                <div className="font-semibold text-[24px] mb-0 text-[#032b41] transition-all duration-300">
                    {title}
                </div>
                <div className={`w-8 h-8 ${isExpanded ? "rotate-180 transition-all duration-500" : ""}`}>
                    <RxCaretDown className="w-full h-full" />
                </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${
                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
            >
                <div className="overflow-hidden">
                    <div className="pb-6 text-[#394547] leading-normal">{content}</div>
                </div>
            </div>                        
        </div>
    )
}

export default function FaqAccordion() {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <>
            <div className="full">
                {accordionData.map((item) => (
                <AccordionItem 
                    key={item.id}
                    {...item}
                    isExpanded={expandedId === item.id}
                    onToggle={() => toggleExpand(item.id)}
                    />
                ))}
            </div>
        </>
    )
}
