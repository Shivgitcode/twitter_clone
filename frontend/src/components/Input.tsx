import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOn } from "react-icons/ci";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

type Value = {
  message: string,
  data: {
    email: string,
    id: string,
    img: string,
    password: string,
    username: string,


  }


}

export default function Input({ value, input, id }: { value: Value | undefined, input: string, id?: string }) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const { newPost, setNewPost } = useAppContext()
  const newForm = new FormData()
  const newForm2 = new FormData()
  const PostSchema = z.object({
    post: z.string(),
    img: z.any(),
  });

  type Post = z.infer<typeof PostSchema>;

  const { register, handleSubmit, setValue } = useForm<Post>({
    resolver: zodResolver(PostSchema),
  });
  const onDrop = useCallback((acceptedFiles: FileList) => {
    // console.log(acceptedFiles[0]);
    const file = new FileReader();
    console.log(acceptedFiles[0])
    newForm.append("imgFile", acceptedFiles[0])
    setValue("img", acceptedFiles[0])

    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const submitHandler = async (data: Post, e: any) => {
    console.log(data)

    newForm.append("title", data.post)
    newForm.append("imgFile", data.img)
    const response = await fetch("http://localhost:3000/api/v1/post", {
      method: "Post",
      mode: "cors",
      credentials: "include",
      body: newForm


    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      toast.success(data.message)
      setNewPost(!newPost)
    }
    else {
      const data = await response.json()
      console.log(data)
    }
    setValue("post", "")
    setPreview("")


  };

  const commentHandler = async (data: Post, e: any) => {
    newForm2.append("comment", data.post)
    newForm2.append("imgFile", data.img)
    const response = await fetch(`http://localhost:3000/api/v1/comment/${id}`, {
      method: "post",
      mode: "cors",

      credentials: "include",
      body: newForm2

    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
    else {
      const data = await response.json()
      console.log(data)
    }
  }
  console.log(value)
  return (
    <div className="flex w-[93%] mx-auto justify-between">
      <div className="w-[48px] mr-[8px]">
        <img src={value?.data.img} alt="" className="rounded-full" />
      </div>
      <form
        onSubmit={handleSubmit(input === "post" ? submitHandler : commentHandler)}
        className="flex flex-col items-end flex-1"
      >
        <textarea
          id=""
          cols={30}
          rows={2}
          className=" resize-none mb-3 bg-transparent w-full h-[40px] p-[8px] text-white"
          placeholder="What's happening"
          {...register("post")}
        ></textarea>
        <div {...getRootProps()} className="w-full">
          <input {...getInputProps()}  {...register("img")} type="file" className="w-full" />
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
          <button className=" self-end bg-[#308cd8] py-[4px] px-[20px] my-[5px] rounded-full text-white font-medium">
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}
