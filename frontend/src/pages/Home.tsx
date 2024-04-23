import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Posts from "../components/Posts";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
// import { object } from "zod";

type Post = {

}

export default function Home() {
  interface User {
    message: string
    data: {
      id: string,
      username: string,
      img: string,
      email: string,
      password: string

    }

  }
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()
  const [post, setPost] = useState<any[]>([])
  const { newPost } = useAppContext()


  const handleLogout = async () => {
    const response = await fetch("http://localhost:3000/api/v1/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"

      },


    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      navigate("/login")
      toast.success(data.message)


    }
    else {
      const data = await response.json()
      console.log(data)

    }


  }
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors"

      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setUser(data)

      }
      else {
        const data = await response.json()
        console.log(data)

      }
    }
    fetchUser()

    const fetchPost = async () => {
      const response = await fetch("http://localhost:3000/api/v1/post", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors"

      })
      if (response.ok) {
        const data = await response.json()
        console.log(data.data)
        setPost(data.data)


      }
      else {
        const data = await response.json()
        console.log(data)
      }

    }
    fetchPost()


  }, [newPost])
  console.log("post data", post)

  return (
    <div className="w-screen bg-black">
      <div className="text-white w-[30%] border-[1px] border-[#2F3336] mx-auto">
        <p className="p-[16px] text-[18px] leading-[28px] font-medium">Home</p>
        {user && <Input value={user} input="post"></Input>}
        <div>
          {post.map(el => (
            <Posts el={el}></Posts>
          ))}


        </div>
      </div>
      <div className="w-full flex justify-center py-3 ">
        <button className="bg-white px-2 py-1 rounded-full " onClick={handleLogout}>logout</button>

      </div>
    </div>
  );
}
