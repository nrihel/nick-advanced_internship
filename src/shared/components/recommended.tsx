"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

export interface Book {
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

export default function Recommended() {
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { user, isPremium } = useAuth();

    useEffect(() => {
        async function getBooks() {
            try{
                const { data } = await axios.get(
                    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
                );
                setRecommendedBooks(data);
            } catch (error) {
                console.error("failed to fetch books", error)
            } finally {
                setLoading(false);
            }
        }

        getBooks();
    }, []);

     const handleBookClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        book: Book
    ) => {
        if (book.subscriptionRequired && (!user || !isPremium)) {
            e.preventDefault();
            router.push("/choose-plan");
        }    
    }

    return (
    <>
        <div>
            <div className="text-[22px] font-bold text-[#032b41] mb-4 px-6">
                Recommended for You
            </div>
            <div className="font-light text-[#394547] mb-4 px-6">
                We think you'll love these
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory mb-8 gap-4">
                {loading ?
                Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="min-w50 max-w-50 shrink-0 pt-8 px-3 pb-3"
                    >
                        <div className="w-43 h-43 bg-gray-200 animate-pulse rounded-sm mb-2" />
                        <div className="w-full h-5 bg-gray-200 animate-pulse rounded-sm mb-2" />
                        <div className="w-2/3 h-4 bg-gray-200 animate-pulse rounded-sm mb-2" />
                        <div className="w-full h-8 bg-gray-200 animate-pulse rounded-sm mb-2" />
                        <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded-sm" />
                    </div>
                ))
                : recommendedBooks.map((book) => (    
                <Link
                    key={book.id}
                    href={`/book/${book.id}`}
                    onClick={(e) => handleBookClick(e, book)}
                    className="relative snap-center max-w-50 w-full pt-8 px-3 pb-3 rounded-sm hover:bg-[#f1f6f4] transition-colors"
                >
                    {book.subscriptionRequired && (
                    <div className="bg-[#032b41] text-white text-[10px] font-medium px-2 h-4.5 rounded-full flex items-center absolute top-2 right-2">
                        Premium
                    </div>
                    )}
                    <figure className="w-43 h-43">
                        <img 
                            src={book.imageLink}
                            alt={book.title}
                            className="w-full h-full object-contain"
                            />
                    </figure>
                    <div className="font-bold text-base text-[#032b41] mb-2">
                        {book.title}
                    </div>
                    <div className="text-sm text-[#6b757b] font-light mb-2">
                        {book.author}
                    </div>
                    <div className="text-sm text-[#394547] mb-2">
                        {book.subTitle}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-light text-[#6b757b]">
                    <div className="flex items-center gap-1">
                        <AiOutlineClockCircle className="w-4 h-4" />
                        <span>03:24</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <AiOutlineStar className="w-4 h-4" />
                        <span>{book.averageRating}</span>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    </>
    )
}