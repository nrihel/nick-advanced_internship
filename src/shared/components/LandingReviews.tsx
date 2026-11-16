import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

interface SectionProps {
    onOpenModal: () => void
}


export default function Reviews({ onOpenModal }: SectionProps) {
    return (
        <>
        <section id="reviews">
      <div className="max-w-267.5 w-full mx-auto px-6">
        <div className="py-10 w-full">
          <div className="text-[32px] text-[#032b41] text-center mb-8 font-bold">What our members say</div>
          <div className="max-w-150 mx-auto">
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm font-light">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div className="text-xl text-[#032b41]">Hanna M.</div>
                <div className="flex items-center gap-1 text-[#0564f1]">
                  {Array.from({ length: 5 }).map((_, index) => (
                  <BsStarFill key={index} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              <div className="text-[#394547] tracking-wide leading-normal">
                This app has been a <b>game-changer</b> for me! It's saved me so
                much time and effort in reading and comprehending books. Highly
                recommend it to all book lovers.
              </div>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm font-light">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div className="text-xl text-[#032b41]">David B.</div>
                <div className="flex items-center gap-1 text-[#0564f1]">
                  {Array.from({ length: 5 }).map((_, index) => (
                  <BsStarFill key={index} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              <div className="text-[#394547] tracking-wide leading-normal">
                I love this app! It provides
                <b>concise and accurate summaries</b> of books in a way that is
                easy to understand. It's also very user-friendly and intuitive.
              </div>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm font-light">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div className="text-xl text-[#032b41]">Nathan S.</div>
                <div className="flex items-center gap-1 text-[#0564f1]">
                  {Array.from({ length: 5 }).map((_, index) => (
                  <BsStarFill key={index} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              <div className="text-[#394547] tracking-wide leading-normal">
                This app is a great way to get the main takeaways from a book
                without having to read the entire thing.
                <b>The summaries are well-written and informative.</b>
                Definitely worth downloading.
              </div>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm font-light">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div className="text-xl text-[#032b41]">Ryan R.</div>
                <div className="flex items-center gap-1 text-[#0564f1]">
                  {Array.from({ length: 5 }).map((_, index) => (
                  <BsStarFill key={index} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              <div className="text-[#394547] tracking-wide leading-normal">
                If you're a busy person who
                <b>loves reading but doesn't have the time</b> to read every
                book in full, this app is for you! The summaries are thorough
                and provide a great overview of the book's content.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-[#2bd97c] text-[#032b41] w-full h-10 rounded-sm text-base hover:bg-[#20ba68] duration-200 max-w-75 cursor-pointer"
            onClick={onOpenModal}>Login</button>
          </div>
        </div>
      </div>
    </section>
    <section id="numbers">
      <div className="py-10 w-full">
        <div className="max-w-267.5 w-full mx-auto px-6">
          <div className="text-3xl flex items-center justify-center text-[#032b41] font-bold mb-8 ">Start growing with Summarist now</div>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-10">
            <div className="bg-[#d7e9ff] flex flex-col items-center text-center p-6 pb-10 rounded-xl">
              <div className="flex items-center h-15 gap-1">
                <BiCrown className="w-12 h-12 text-[#0365f2]"/>
              </div>
              <div className="text-[40px] text-[#032b41] font-semibold mb-4">3 Million</div>
              <div className="text-[#394547] font-light">Downloads on all platforms</div>
            </div>
            <div className="bg-[#d7e9ff] flex flex-col items-center text-center p-6 pb-10 rounded-xl">
              <div className="flex items-center justify-center h-15 mb-2gap-1 text-[#0365f2]">
                {Array.from({ length: 4 }).map((_, index) => (
                  <BsStarFill key={index} className="w-5 h-5" />
                  ))}
                <BsStarHalf className="w-5 h-5"/>
              </div>
              <div className="text-[40px] text-[#032b41] font-bold mb-4">4.5 Stars</div>
              <div className="text-[#394547] font-light">
                Average ratings on iOS and Google Play
              </div>
            </div>
            <div className="bg-[#d7e9ff] flex flex-col items-center text-center p-6 pb-10 rounded-xl">
              <div className="flex items-center justify-center w-15 h-15 gap-1 text-[#0365f2]">
                <RiLeafLine className="w-12 h-12"/>
              </div>
              <div className="text-[40px] text-[#032b41] font-bold mb-4">97%</div>
              <div className="text-[#394547] font-light">
                Of Summarist members create a better reading habit
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
    )
}
