import { GetUserInfo } from "@/utils/actions/GetUserInfo"
import AlterUserForm from "../components/AlterUserForm";


export default async function ConfigPage() {


  const getUserInfo = await GetUserInfo()

  console.log(getUserInfo);
  
  return (
    <div className="ml-64 w-full h-full flex justify-center items-center">
      <AlterUserForm email={getUserInfo.email} name={getUserInfo.name} password={getUserInfo.password} emailVerified={getUserInfo.emailVerified}
      
      role={getUserInfo.role}/>
    </div>
  );
}
