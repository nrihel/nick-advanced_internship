"use client"
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai"
import ActiveHeadings from "@/app/UI/ActiveHeader";

const firstGroupHeadings = [
    "Enhance you knowledge",
    "Achieve greater success",
    "Improve your health",
    "Develop better parenting skills",
    "Increase happiness",
    "be the best version of yourself!",
];

const secondGroupHeadings = [
  "Expand your learning",
  "Accomplish your goals",
  "Strengthen your vitality",
  "Become a better caregiver",
  "Improve your mood",
  "Maximize your abilities",
];

const Features = () => {
    return (
        <main>
      <div className="py-10 w-full">
        <div className="max-w-267.5 w-full mx-auto pb-6 px-6">
          <div className="text-[32px] text-[#032b41] text-center mb-8 font-bold">Understand books in few minutes</div>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-10 mb-24">
            <div className="flex flex-col items-center text-center">
              <div className="flex justify-center mb-2 text-[#032b41]">
                <AiFillFileText className="w-15 h-15 text-[#032b41]" />
              </div>
              <div className="text-2xl text-[#032b41] mb-4 font-semibold">Read or listen</div>
              <div className="text-lg text-[#394547] font-light">
                Save time by getting the core ideas from the best books.
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex justify-center mb-2 text-[#032b41]">
                <AiFillBulb className="w-15 h-15 text-[#032b41]" />
              </div>
              <div className="text-2xl text-[#032b41] mb-4 font-semibold">Find your next read</div>
              <div className="text-lg text-[#394547] font-light">
                Explore book lists and personalized recommendations.
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex justify-center mb-2 text-[#032b41]">
                <AiFillAudio className="w-15 h-15 text-[#032b41]"/>
              </div>
              <div className="text-2xl text-[#032b41] mb-4 font-semibold">Briefcasts</div>
              <div className="text-lg text-[#394547] font-light">
                Gain valuable insights from briefcasts
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mb-15 md:mb-24">
            <ActiveHeadings headings={firstGroupHeadings} />
            <div className="w-full flex flex-col justify-center gap-6 bg-[#f1f6f4] py-10 px-6 ">
              <div className="flex gap-4">
                 <div className="text-[#0365f2] text-[20px] font-bold mt-1">93%</div>
                <div className="text-[20px] font-light text-[#394547]">
                  of Summarist members <b>significantly increase</b> reading
                  frequency.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#0365f2] text-[20px] font-bold mt-1">96%</div>
                <div className="text-[20px] font-light text-[#394547]">
                  of Summarist members <b>establish better</b> habits.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#0365f2] text-[20px] font-bold mt-1">90%</div>
                <div className="text-[20px] font-light text-[#394547]">
                  have made <b>significant positive</b> change to their lives.
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mb-15 md:mb-24">
            <div
              className="w-full flex flex-col justify-center gap-6 bg-[#f1f6f4] py-10 px-6 order-1"
            >
              <div className="flex gap-4">
                <div className="text-[#0365f2] text-[20px] font-bold mt-1">91%</div>
                <div className="text-[20px] font-light text-[#394547]">
                  of Summarist members <b>report feeling more productive</b>{""}
                   after incorporating the service into their daily routine.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#0365f2] text-[20px] font-bold mt-1">94%</div>
                <div className="text-[20px] font-light text-[#394547]">
                  of Summarist members have <b>noticed an improvement</b> in
                  their overall comprehension and retention of information.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#0365f2] text-[20px] font-bold mt-1">88%</div>
                <div className="text-[20px] font-light text-[#394547]">
                  of Summarist members <b>feel more informed</b> about current
                  events and industry trends since using the platform.
                </div>
              </div>
            </div>
            <div className="order-1">
            <ActiveHeadings 
                headings={secondGroupHeadings}
                className="md:items-end md:text-right"
            />
            </div>
          </div>
        </div>
      </div>
    </main>
    )
}

export default Features