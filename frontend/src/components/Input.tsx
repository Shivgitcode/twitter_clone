import { useForm } from "react-hook-form";
import { solo } from "../assets";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function Input() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const PostSchema = z.object({
    post: z.string(),
    img: z.any(),
  });

  type Post = z.infer<typeof PostSchema>;

  const { register, handleSubmit } = useForm<Post>({
    resolver: zodResolver(PostSchema),
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const file = new FileReader();
    file.onload = function () {
      console.log(file.result);
      setPreview(file.result);
    };
    file.readAsDataURL(target.files[0]);
  };

  const submitHandler = (data: Post) => {
    const file = new FileReader();
    file.onload = function () {
      console.log(file.result);
    };

    file.readAsDataURL(data.img[0]);

    console.log(data.img[0]);
  };

  return (
    <div className="flex w-[93%] mx-auto justify-between">
      <div className="w-[48px] mr-[8px]">
        <img src={solo} alt="" className="rounded-full" />
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col items-end flex-1"
      >
        <textarea
          id=""
          cols={30}
          rows={4}
          className=" resize-none bg-transparent w-full p-[8px]"
          placeholder="What's happening"
          {...register("post")}
        ></textarea>
        <input
          type="file"
          {...register("img")}
          accept="image/png image/jpg"
          onChange={handleChange}
        />
        <img src={preview} />
        <div className="h-[1px] w-full bg-[#2F3336] mt-1"></div>
        <div className="w-full flex flex-col">
          <button className=" self-end bg-[#308cd8] py-[4px] px-[20px] my-[5px] rounded-full ">
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}
