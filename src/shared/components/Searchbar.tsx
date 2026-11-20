"use client"

import { IoMdClose, IoMdSearch } from "react-icons/io";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

export default function Searchbar() {
    const [search, setSearch] = useState<string>("");
    const [searchBooks, setSearchBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { toggleSidebar } = useAuth();

    useEffect(() => {
        if (!search.trim()) {
            setSearchBooks([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const delayDebounce = setTimeout(async () => {
            try {
            const { data } = await axios.get<Book[]>(
                `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
                    search.trim()
                )}`
            );
            setSearchBooks(data);
            } catch(error) {
                console.error("failed to get books", error);
            } finally {
                setLoading(false);
            }
        }, 300);

    return () => clearTimeout(delayDebounce);
}, [search]);

    return (
        <>
        <div className="bg-white border-b border-[#e1e7ea] h-20 z-1 justify-end">
            <div className="relative flex items-center justify-between px-8 max-w-267.5 mx-auto h-full">
                <div className="hidden min-[480px]:block w-full max-w-40 shrink-0 md:invisible">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={160}
                        height={40}
                        className="w-full h-auto"
                    />
                </div>
                <div className="flex items-center gap-6 w-full max-w-85">
                    <div className="flex items-center justify-end gap-4 w-full ml-auto">
                        <div className="relative flex items-center">
                            <input className="h-10 w-full pl-4 pr-12 bg-[#f1f6f4] text-[#042330] rounded-lg outline-none border-2 border-[#e1e7ea]" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text" 
                                placeholder="Search for books" />
                            <div className="flex items-center absolute top-0 right-2 justify-end h-full border-l border-[#e1e7ea] pl-2">
                                {search ? (
                                <button
                                    onClick={() => setSearch("")}
                                    aria-label="clear search"
                                    className="cursor-pointer text-[#032b41]"
                                >
                                    <IoMdClose className="text-[#032b41]" />
                                </button>
                                ) : (
                                <IoMdSearch className="h-5 w-5 text-[#032b41]" />
                                )}
                                {search.trim() !== "" && (
                                    <div className="absolute top-14 right-0 w-full sm:w-96 max-h-96 overflow-y-auto bg-white border border-[#e1e7ea] rounded-lg shadow-lg p-4 z-50">
                                        {loading ? (
                                            <div className="space-y-3 animate-pulse">
                                            {[1, 2, 3].map((n) => (
                                                <div key={n} className="flex items-center gap-3">
                                                    <div className="w-12 h-16 bg-gray-200 rounded shrink-0" />
                                                    <div className="flex-1 space-y-2">
                                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                        ) : searchBooks.length > 0 ? (
                                            <div className="divide-y divide-[#e1e7ea]">
                                                {searchBooks.map((book) => (
                                                    <Link
                                                        key={book.id}
                                                        href={`/book/${book.id}`}
                                                        onClick={() => setSearch("")}
                                                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 hover:bg-[#f1f6f4] rounded transition-colors px-2"
                                                    >
                                                        <img
                                                            src={book.imageLink}
                                                            alt={book.title}
                                                            className="w-12 h-16 object-cover rounded shrink-0"
                                                        />
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-semibold text-[#032b41] truncate">
                                                                {book.title}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-[#6b757b] text-center py-4">
                                                No books Found
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                        className="flex md:hidden items-center justify-center cursor-pointer text-[#032b41]">
                        <RxHamburgerMenu className="h-6 w-6 text-[#032b41]" />
                    </button>
                </div>
            </div>
        </div>
        
        </>
    )
}

