"use client"

import Sidebar from "@/shared/components/sidebar";
import Searchbar from "@/shared/components/Searchbar";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

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

function BookCardSkeleton() {
  return (
    <div className="pt-8 px-3 pb-3">
      <div className="w-43 h-43 mx-auto bg-gray-200 animate-pulse rounded-sm mb-2" />
      <div className="w-3/4 h-5 bg-gray-200 animate-pulse rounded-sm mb-2" />
      <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded-sm mb-2" />
      <div className="w-full h-8 bg-gray-200 animate-pulse rounded-sm mb-2" />
      <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded-sm" />
    </div>
  );
}

export default function MyLibrary() {
    const { user, loading: authLoading, openModal, savedBookIds } = useAuth();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (!user || savedBookIds.length === 0) {
            setBooks([]);
            return; 
        }

        async function getSavedBooks() {
            setLoading(true);
            try {
                const requests = savedBookIds.map((bookId) =>
                axios.get<Book>(
                    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
                )
                );
                const responses = await Promise.all(requests);
                setBooks(responses.map((res) => res.data));
            } catch (error) {
                console.error("Failed to fetch saved books:", error);
            } finally {
                setLoading(false);
            }
        }

        getSavedBooks();
    }, [user, savedBookIds]);
    return (
    <div className="flex">
        <Sidebar />
        <div className="relative flex flex-col w-full md:ml-50 md:w-[calc(100%-200px)]">
        <Searchbar />
        <div className="max-w-267.5 w-full mx-auto px-6">
            <div className="py-10">
            {authLoading ? (
                <div>
                     <div className="w-36 h-7 bg-gray-200 animate-pulse rounded-sm mb-2" />
                    <div className="w-16 h-5 bg-gray-200 animate-pulse rounded-sm mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <BookCardSkeleton key={index} />
                        ))}
                    </div>

                    <div className="w-28 h-7 bg-gray-200 animate-pulse rounded-sm mb-2" />
                    <div className="w-16 h-5 bg-gray-200 animate-pulse rounded-sm mb-6" />
                    <div className="w-72 h-28 mx-auto bg-gray-200 animate-pulse rounded-lg" />
                </div>
                ) : !user ? (

                <div className="flex flex-col items-center justify-center max-w-115 mx-auto text-center py-10">
                <Image
                    src="/login.png"
                    alt="Login Required"
                    width={460}
                    height={320}
                    className="w-full h-auto mb-4"
                />
                <div className="text-2xl font-bold text-[#032b41] mb-4">
                    Log in to your account to see your library
                </div>
                <button
                    onClick={openModal}
                    className="h-10 w-40 bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-medium rounded-sm cursor-pointer transition-colors"
                >
                    Login
                </button>
                </div>
            ) : (
                <div>
                <div className="text-[22px] font-bold text-[#032b41] mb-2">
                    Saved Books
                </div>
                <div className="font-light text-[#394547] mb-6">
                    {books.length} {books.length === 1 ? "item" : "items"}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
                    {Array.from({ length: savedBookIds.length || 4 }).map((_, index) => (
                        <BookCardSkeleton key={index} />
                    )
                    )}
                    </div>
                ) : books.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 p-8 rounded-lg text-center mx-auto mb-14 bg-[#f1f6f4] max-w-fit">
                        <div className="font-semibold text-[#042330]">
                            Save your favorite books!
                        </div>
                        <div className="text-[#394547]">
                            When you save a book, it will appear here.
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
                    {books.map((book) => (
                        <Link
                        key={book.id}
                        href={`/book/${book.id}`}
                        className="relative pt-8 px-3 pb-3 rounded-sm hover:bg-[#f1f6f4] transition-colors"
                        >
                        {book.subscriptionRequired && (
                            <div className="bg-[#032b41] text-white text-[10px] font-medium px-2 h-4.5 rounded-full flex items-center absolute top-2 right-2">
                            Premium
                            </div>
                        )}

                        <figure className="w-43 h-43 mx-auto mb-2">
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
                )}

                <div className="text-[22px] font-bold text-[#032b41] mb-2">
                    Finished
                </div>
                <div className="font-light text-[#394547] mb-6">
                    0 items
                </div>
                <div className="flex flex-col items-center gap-2 p-8 rounded-lg mx-auto mb-14 text-center bg-[#f1f6f4] max-w-fit">
                    <div className="text-[#042330] font-semibold">
                    Done and dusted!
                    </div>
                    <div className="text-[#394547]">
                    When you finish a book, you can find it here later.
                    </div>
                </div>
                </div>
            )}
            </div>
        </div>
        </div>
    </div>
    );


}