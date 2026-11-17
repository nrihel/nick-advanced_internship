import Searchbar from "@/shared/components/Searchbar";
import Sidebar from "@/shared/components/sidebar";
import Selected from "../../shared/components/Selected";
import Recommended from "../../shared/components/recommended";
import Suggested from "../../shared/components/Suggested";

const ForYou = () => {
    return (
        <div className="relative flex flex-col w-full md:ml-50 md:w-[calc(100%-200px)]">
            <Sidebar />
            <Searchbar />
            <Selected />
            <Recommended />
            <Suggested />
        </div>
    )
}

export default ForYou;