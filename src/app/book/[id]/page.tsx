import { Suspense } from "react";
import Sidebar from "@/shared/components/sidebar";
import Searchbar from "@/shared/components/Searchbar";
import BookDetailsPage from "@/shared/components/BookDetails";

async function BookContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BookDetailsPage id={id} />;
}

export default function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="relative flex flex-col w-full md:ml-50 md:w-[calc(100%-200px)]">
        <Searchbar />
        <Suspense fallback={<div className="p-10">Loading book details...</div>}>
          <BookContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}
