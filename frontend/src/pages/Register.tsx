import { Link, useNavigate } from "react-router-dom";
import { twitter } from "../assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate()

  const UserSchema = z.object({
    username: z.string().includes("@"),
    email: z.string().email().endsWith("@gmail.com"),
    password: z.string().min(8),
    imgFile: z.any()
  });

  type User = z.infer<typeof UserSchema>;

  const submitHandler = async (data: User) => {
    console.log(data)
    const form = new FormData()
    form.append("imgFile", data.imgFile[0])
    form.append("username", data.username)
    form.append("email", data.email)
    form.append("password", data.password)

    // console.log(form)
    const response = await fetch("http://localhost:3000/api/v1/register", {
      method: "POST",
      mode: "cors",
      // headers: {
      //   "Content-Type": "application/json"
      // },

      credentials: "include",
      body: form

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





  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });
  return (
    <div className="w-screen h-screen bg-black flex  justify-center">
      <div className="flex items-center justify-center">
        <div className="bg-[#2b2d42] border-[4px] border-gray-600 rounded-2xl hover:border-gray-900 transition-all duration-200">
          <form
            onSubmit={handleSubmit(submitHandler)}

            className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col"
          >
            <img src={twitter} className="w-12 h-12" alt="" />
            <h1 className="text-white text-2xl">Sign in to Twitter</h1>
            <input
              className="w-full p-2 bg-transparent rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="Username"
              type="text"
              {...register("username")}
            />
            <div>{errors.username && errors.username.message}</div>
            <input
              className="w-full p-2 bg-transparent rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="Email"
              type="email"
              {...register("email")}
            />
            <div>{errors.email && errors.email.message}</div>

            <input
              className="w-full p-2 bg-transparent rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <div>{errors.password && errors.password.message}</div>
            <input
              className="w-full p-2 bg-transparent rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="Password"
              type="file"
              {...register("imgFile")}
            />
            <input
              className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
              type="submit"
            />
            <p>
              Already Have an account?
              <Link
                className="font-semibold text-white hover:text-blue-500 transition-all duration-200"
                to="/login"
              >
                {" "}
                login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
