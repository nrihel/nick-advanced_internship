import Searchbar from "@/shared/components/Searchbar";
import Sidebar from "@/shared/components/sidebar";

const ForYou = () => {
    return (
        <div className="relative flex flex-col w-full md:ml-50 md:w-[calc(100%-200px)]">
            <Sidebar />
            <Searchbar />
        </div>
    )
}

export default ForYou;