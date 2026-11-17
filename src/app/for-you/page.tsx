import Searchbar from "@/shared/components/Searchbar";
import Sidebar from "@/shared/components/sidebar";
import Selected from "../selected book/Selected";
import Recommended from "../recommended book/recommended";
import Suggested from "../suggested/Suggested";

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