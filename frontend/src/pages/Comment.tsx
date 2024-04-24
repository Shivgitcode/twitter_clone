import { useNavigate, useParams } from "react-router-dom"
import { solo } from "../assets"
import { FaArrowLeft } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { BsRepeat } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { Post } from "../utils";
import SingleComment from "../components/SingleComment";

interface Data {
    message: string,
    data: Post
}

export default function Comment() {
    const [user, setUser] = useState<undefined | Data>(undefined)
    const [currentUser, setCurrentUser] = useState<undefined | Data>(undefined)
    // const [comment,setComment]=useState()

    const navigate = useNavigate()
    const params = useParams()
    const { id } = params

    console.log(id)

    const fetchCurrentUser = async () => {
        const response = await fetch("http://localhost:3000/api/v1/user", {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }

        })
        if (response.ok) {
            const data = await response.json()
            setCurrentUser(data)

        }
        else {
            const data = await response.json()
            console.log(data)
        }

    }
    useEffect(() => {

        fetchCurrentUser()






        const fetchUser = async (id: string) => {
            const response = await fetch(`http://localhost:3000/api/v1/post/${id}`, {
                method: "GET",
                mode: "cors",
                credentials: "include"

            })
            if (response.ok) {
                const data = await response.json()
                console.log("this is user data", data)
                setUser(data)
            }
            else {
                const data = await response.json()
                console.log(data)
            }
        }

        fetchUser(id as string)


    }, [])
    // console.log(user)

    return (
        <div className=" bg-black min-w-screen min-h-screen">
            <div className="w-[30%] mx-auto border-[1px] min-h-screen border-myBorder">
                <div className="px-5 py-2 border-b-[1px] border-myBorder">
                    <div className="text-[16px] leading-6 flex items-center text-white mb-2 gap-3"><button onClick={() => { navigate("/") }}><span><FaArrowLeft></FaArrowLeft></span></button>Tweet</div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center text-white ">
                            <div className="w-[48px] h-[48px] rounded-full ">
                                <img src={user?.data.user.img} alt="" className="w-full object-cover rounded-full " />
                            </div>

                            <div className="pl-2 flex flex-col items-start justify-start flex-1">
                                <h3 className=" text-base font-bold capitalize">
                                    Shivansh Agarwal
                                </h3>
                                <p className="text-base text-myBorder">@shivneeraj</p>

                            </div>

                        </div>


                        <div className="text-[#71767b] text-lg ">11:27 2024-04-04</div>

                    </div>

                    <div className="flex items-center w-full justify-start gap-24 mt-[10px]">
                        <div className="flex items-center gap-1">
                            <GoComment fontSize={20} fill="#71767b" ></GoComment>


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

                <div className="my-5 px-5 border-b-[1px] border-myBorder">
                    <Input value={currentUser} input="comment" id={id}></Input>

                </div>

                <div>
                    {
                        user?.data.comments.map((el) => {
                            return <SingleComment el={el} username={user.data.user.username} email={user.data.user.email} img={user.data.user.img} ></SingleComment>
                        })
                    }
                </div>




            </div>

        </div>
    )
}
