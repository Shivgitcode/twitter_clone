import { GoComment } from "react-icons/go";
import { BsRepeat } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { solo, streak } from "../assets";

export default function Posts({ el }: { el: any }) {
  return (
    <div className="w-full p-[20px] border-t-[1px] border-b-[1px] border-myBorder">
      <div className="flex">

        <div className="w-[48px] mr-[8px]">
          <img src={el.user.img} alt="" className=" rounded-full" />
        </div>

        <div className="flex flex-col gap-[2px]">


          <div className="flex w-full items-end justify-start gap">
            <p className="text-[16px] leading-[24px] pr-[4px] font-bold">{el.user.username}</p>
            <span className="text-[16px] leading-[24px] text-[#71767b]">{el.user.email.split("@")[0]} 48 m</span>
          </div>

          <div className="flex flex-col gap-[5px]">
            <p>{el.title}</p>
            <img src={el.img} alt="" className=" max-w-[150px]" />
          </div>

          <div className="flex items-center w-full justify-between mt-[10px]">
            <div className="flex items-center gap-1">
              <GoComment fontSize={20} fill="#71767b"></GoComment>
              <span className="text-[#71767b]">0</span>
            </div>
            <div className="flex items-center gap-2">
              <BsRepeat fontSize={20} fill="#71767b"></BsRepeat>
              <span className="text-[#71767b]">0</span>


            </div>
            <div className="flex items-center gap-2">
              <IoHeartOutline fontSize={20} stroke="#71767b"></IoHeartOutline>
              <span className="text-[#71767b]">0</span>


            </div>
            <div className="flex items-center gap-2">
              <IoShareSocialOutline fontSize={20} stroke="#71767b"></IoShareSocialOutline>
              <span className="text-[#71767b]">0</span>


            </div>
          </div>




        </div>


      </div>

    </div>
  );
}
