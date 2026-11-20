"use client"

import Sidebar from "@/shared/components/sidebar";
import Searchbar from "@/shared/components/Searchbar";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import AudioPlayer from "@/app/UI/AudioPlayer";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/app/lib/firebase/config";
import { arrayUnion, doc, setDoc } from "firebase/firestore";

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

function Player() {
    
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const { fontSize, user } = useAuth();

    useEffect(() => {
        if (!id) return;

        async function getBook() {
            try {
                const { data } = await axios.get<Book>(
                    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
                );
                setBook(data);
            } catch (error) {
                console.error("failed to get book details:", error)
            } finally {
                setLoading(false);
            }
        }

        getBook()
    }, [id])

    async function handleBookFinished() {
        if (!user || !book) return;

        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(
                userRef,
                {
                    finishedBooks: arrayUnion(book.id),
                },
                { merge: true }
            );
        } catch (error) {
            console.error("failed to add to finished books", error);
        }
    }

    return (
    <>
        <div className="flex">
            <Sidebar />
            <div className="relative flex flex-col w-full md:ml-50 md:2-[calc(100%-200px)]">
                <Searchbar />

            {loading ? (
            <div className="p-6 max-w-200 w-full mx-auto animate-pulse space-y-4">
                <div className="h-8 w-2/3 bg-gray-200 rounded mb-8" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
            ) : (
            book && (
            <>
            <div className="relative w-full overflow-y-auto h-[(100vh-140px)]">
                <div className="whitespace-pre-line p-6 max-w-200 mx-auto">
                    <div className="text-[#032b41] text-[24px] border-b border-[#e1e7ea] mb-8 pb-4 leading-normal">
                        {book.title}
                    </div>
                    <div className={`whitespace-pre-line leading-[1.4] text-[#032b41] ${fontSize}`}>
                        {book.summary}
                    </div>
                </div>
            </div>
            <AudioPlayer book={book} onEnded={handleBookFinished} />
            </>
            )    
        )}
        </div>
        </div>
    </>
    );
}

export default function PlayerPage() {
    return (
        <Suspense fallback={<div className="p-10">Loading player...</div>}>
            <Player />
        </Suspense>
    )
}