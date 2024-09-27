import { GetUserInfo } from "@/utils/actions/GetUserInfo"
import AlterUserForm from "../components/AlterUserForm";
import { PaginationConfig } from "@/components/PaginatioConfig";

export default async function ConfigPage() {

  const getUserInfo = await GetUserInfo()

  console.log(getUserInfo);

  return (
    <div className="ml-64 w-full h-full flex flex-col gap-2 justify-center items-center">
      <PaginationConfig />
      <AlterUserForm
        email={getUserInfo.email}
        name={getUserInfo.name}
        password={getUserInfo.password}
        emailVerified={getUserInfo.emailVerified}
        role={getUserInfo.role} />
    </div>
  );
}
