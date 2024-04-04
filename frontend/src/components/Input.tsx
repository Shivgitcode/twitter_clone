import { useForm } from "react-hook-form";
import { solo } from "../assets";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOn } from "react-icons/ci";

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
  const onDrop = useCallback((acceptedFiles: FileList) => {
    // console.log(acceptedFiles[0]);
    const file = new FileReader();
    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const submitHandler = (data: Post) => {
    console.log(data);
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
          rows={2}
          className=" resize-none mb-3 bg-transparent w-full h-[40px] p-[8px]"
          placeholder="What's happening"
          {...register("post")}
        ></textarea>
        <div {...getRootProps()} className="w-full">
          <input {...getInputProps()} {...register("img")} className="w-full" />
          {isDragActive ? (
            <div
              className={`w-full h-[60px] bg-blue-500/40 items-center flex justify-center text-[rgb(255,255,245)]`}
            >
              Drop the files here ...
            </div>
          ) : (
            <div className=" ">
              <CiImageOn fill="#308CD8" fontSize={23}></CiImageOn>
              <img src={preview as string} alt="" />
            </div>
          )}
        </div>

        <div className="h-[1px] w-full bg-[#2F3336] mt-1"></div>
        <div className="w-full flex flex-col py-[0.3rem]">
          <button className=" self-end bg-[#308cd8] py-[4px] px-[20px] my-[5px] rounded-full ">
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}
