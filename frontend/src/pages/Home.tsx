import Input from "../components/Input";
import Posts from "../components/Posts";

export default function Home() {
  return (
    <div className="w-screen bg-black">
      <div className="text-white w-[30%] border-[1px] border-[#2F3336] mx-auto">
        <p className="p-[16px] text-[18px] leading-[28px] font-medium">Home</p>
        <Input></Input>
        <div>
        <Posts></Posts>
        <Posts></Posts>
        <Posts></Posts>
        <Posts></Posts>
        <Posts></Posts>


        </div>
      </div>
    </div>
  );
}
