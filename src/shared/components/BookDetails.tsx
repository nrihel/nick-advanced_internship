"use client"

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, } from "react";
import { AiOutlineRead } from "react-icons/ai";
import { FaRegBookmark, FaRegStar } from "react-icons/fa";
import { FiClock, FiMic } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export default function BookDetailsPage({ id }: {id: string}) {
    const router = useRouter();
    const { user, openModal } = useAuth();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (!id) return;

        async function getBook() {
            try {
                const { data } = await axios.get<Book>(
                    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
                );
                console.log(data)
                setBook(data);
            } catch (error) {
                console.error("failed to get book details:", error);
            } finally {
                setLoading(false);
            }
        }

        getBook();
    }, [id]);

    const handleReadOrListen = () => {
        if (!user) {
            openModal();
            return;
        }
        router.push(`/player/${book?.id}`);
    };

    const handleToggleLibrary = () => {
        if (!user) {
            openModal();
            return;
        }
        setIsSaved((prev) => !prev);
    }

    return (
        <div className="max-w-267.5 w-full mx-auto pb-6 px-6">
            <div className="py-10 w-full">
            {book && (
                <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex justify-center order-1 lg:order-2">
                    <figure className="w-75 h-75 min-w-75">
                    <img
                        src={book.imageLink}
                        alt={book.title}
                        className="w-full h-full object-contain"
                    />
                    </figure>
                </div>

                <div className="w-full order-2 lg:order-1">
                    <div className="text-[#032b41] mb-4 font-semibold text-[32px]">
                    {book.title}
                    </div>
                    <div className="text-[#032b41] mb-4 font-semibold text-base">
                    {book.author}
                    </div>
                    <div className="text-[#032b41] text-[20px] mb-4 font-light">
                    {book.subTitle}
                    </div>

                    <div className="border-b border-t border-[#e1e7ea] p-4 mb-6">
                    <div className="flex flex-wrap max-w-100 gap-y-3">
                        <div className="flex items-center w-1/2 text-[#032b41] text-[14px] font-semibold">
                        <div className="flex h-6 w-6 mr-1">
                            <FaRegStar className="w-full h-full font-bold" />
                        </div>
                        <div>{book.averageRating}&nbsp;</div>
                        <div>({book.totalRating}&nbsp;ratings)</div>
                        </div>
                        <div className="flex items-center w-1/2 text-[#032b41] font-semibold text-[14px]">
                        <div className="flex h-6 w-6 mr-1">
                            <FiClock className="w-full h-full" />
                        </div>
                        <div>03:42</div>
                        </div>
                        <div className="flex items-center w-1/2 text-[#032b41] font-semibold text-[14px]">
                        <div className="flex h-6 w-6 mr-1">
                            <FiMic className="w-full h-full" />
                        </div>
                        <div>{book.type}</div>
                        </div>
                        <div className="flex items-center w-1/2 text-[#032b41] font-semibold text-[14px]">
                        <div className="flex h-6 w-6 mr-1">
                            <HiOutlineLightBulb className="w-full h-full" />
                        </div>
                        <div>{book.keyIdeas} Key ideas</div>
                        </div>
                    </div>
                    </div>

                    <div className="flex gap-4 mb-6">
                    <button
                        onClick={handleReadOrListen}
                        className="flex items-center justify-center w-36 h-12 bg-[#032b41] text-white text-base rounded-sm cursor-pointer gap-2 transition-opacity duration-200 hover:opacity-85"
                    >
                        <div className="flex items-center justify-center h-6 w-6 shrink-0 text-white">
                        <AiOutlineRead className="w-full h-full" />
                        </div>
                        <span>Read</span>
                    </button>

                    <button
                        onClick={handleReadOrListen}
                        className="flex items-center justify-center w-36 h-12 bg-[#032b41] text-white text-base rounded-sm cursor-pointer gap-2 transition-opacity duration-200 hover:opacity-85"
                    >
                        <div className="flex items-center justify-center h-6 w-6 shrink-0 text-white">
                        <FiMic className="w-full h-full" />
                        </div>
                        <span>Listen</span>
                    </button>
                    </div>

                    <button
                    onClick={handleToggleLibrary}
                    className="flex items-center gap-2 text-[#0365f2] font-semibold cursor-pointer mb-10 text-xl transition-colors duration-200 hover:text-[#044298]"
                    >
                    <div className="flex w-5 h-5 shrink-0">
                        <FaRegBookmark className="w-full h-full" />
                    </div>
                    <div>Add title to My Library</div>
                    </button>

                    <div className="text-lg text-[#032b41] mb-4 font-semibold">
                    What&apos;s it about?
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4">
                    {book.tags?.map((tag, index) => (
                        <div
                        key={index}
                        className="bg-[#f1f6f4] px-4 h-12 flex items-center cursor-not-allowed text-[#032b41] font-semibold rounded-sm"
                        >
                        {tag}
                        </div>
                    ))}
                    </div>

                    <div className="text-[#032b41] mb-4 leading-normal">
                    {book.bookDescription}
                    </div>
                    <div className="text-[#032b41] text-lg mb-4 font-semibold">
                    About the author
                    </div>
                    <div className="text-[#032b41] leading-normal">
                    {book.authorDescription}
                    </div>
                </div>
                </div>
            )}
            </div>
        </div>
    )
}