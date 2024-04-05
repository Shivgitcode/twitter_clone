import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Posts from "../components/Posts";
import { trpc } from "../utils";
import { useEffect,useState } from "react";
// import { object } from "zod";

export default function Home() {
  interface User{
    id:string,
    username:string,
    img:string,
    email:string,
    password:string
  }
  const [user,setUser]=useState({})
  const navigate=useNavigate()
  const userQuery=trpc.getUser.useQuery()
  const logoutQuery=trpc.logout.useMutation({onSuccess(data){
    console.log(data)
  }})


  const handleLogout=()=>{
    logoutQuery.mutate()
    navigate("/login")

  }
  useEffect(()=>{
    console.log(userQuery.data?.user)
    setUser(userQuery.data?.user as object)

  },[])
  
  console.log("this is user",user)
  return (
    <div className="w-screen bg-black">
      <div className="text-white w-[30%] border-[1px] border-[#2F3336] mx-auto">
        <p className="p-[16px] text-[18px] leading-[28px] font-medium">Home</p>
        <Input value={user}></Input>
        <div>
        <Posts></Posts>
        <Posts></Posts>
        <Posts></Posts>
        <Posts></Posts>
        <Posts></Posts>


        </div>
      </div>
      <div className="w-full flex justify-center py-3 ">
      <button className="bg-white px-2 py-1 rounded-full " onClick={handleLogout}>logout</button>

      </div>
    </div>
  );
}
