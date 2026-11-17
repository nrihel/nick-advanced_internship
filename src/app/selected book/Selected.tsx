"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";

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

export default function Selected() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBook() {
            try{
                const { data } = await axios.get<Book[]>(
                    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
                );
                setSelectedBook(data[0] || null);
            } catch (error) {
                console.error("failed to fetch book:", error);
            } finally {
                setLoading(false);
            }
        }

        getBook();
    }, []);


 return (
    <div className="px-6">
    <div className="py-10">
      <div className="text-[22px] font-bold text-[#032b41] mb-4">
        Selected just for you
      </div>

      {loading ? (
        <div className="w-full max-w-170 h-47.5 bg-[#e1e7ea] animate-pulse rounded-sm" />
      ) : (
        selectedBook && (
          <Link
            href={`/book/${selectedBook.id}`}
            className="flex flex-col mb-6 md:flex-row justify-between w-full max-w-170 bg-[#fbefd6] rounded-sm p-6 gap-6"
          >
            <div className="w-full md:w-[40%] text-sm md:text-base text-[#032b41]">
              {selectedBook.subTitle}
            </div>

            <div className="hidden md:block w-px bg-[#bac8ce]" />

            <div className="flex gap-4 w-full md:w-[60%]">
              <figure className="w-35 h-35 min-w-35">
                <img
                  src={selectedBook.imageLink}
                  alt={selectedBook.title}
                  className="w-full h-full object-contain"
                />
              </figure>

              <div className="w-full">
                <div className="font-semibold text-[#032b41] mb-2">
                  {selectedBook.title}
                </div>
                <div className="text-sm text-[#394547] mb-4">
                  {selectedBook.author}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-10 h-10 min-w-10 rounded-full">
                    <FaPlayCircle className="w-10 h-10" />
                  </div>
                  <div className="text-sm font-medium text-[#032b41]">
                    3 mins 23 secs
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      )}
    </div>
    </div>
  );
}
