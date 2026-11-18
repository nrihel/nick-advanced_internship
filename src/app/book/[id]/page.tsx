"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/shared/components/sidebar";
import Searchbar from "@/shared/components/Searchbar";
import BookDetailsPage from "@/shared/components/BookDetails";

function BookContent() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  return <BookDetailsPage id={id} />;
}

export default function BookPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="relative flex flex-col w-full md:ml-50 md:w-[calc(100%-200px)]">
        <Searchbar />
        <Suspense fallback={<div className="p-10">Loading book details...</div>}>
          <BookContent />
        </Suspense>
      </div>
    </div>
  );
}
