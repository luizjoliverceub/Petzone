import { PaginationConfig } from "@/components/PaginatioConfig";
import { GetUserInfo } from "@/utils/actions/GetUserInfo"
import { Plus } from "lucide-react";
import { VetServices } from "./components/VetServices";

export default async function ConfigPage() {
    const getUserInfo = await GetUserInfo()

    console.log(getUserInfo);

    return (
        <div className="ml-64 w-full h-full flex flex-col gap-2 justify-center items-center animate-fade-in">
            <PaginationConfig />
            <VetServices />
        </div>
    );
}
