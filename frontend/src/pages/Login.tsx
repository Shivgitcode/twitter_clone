import { Link, useActionData } from "react-router-dom";
import { twitter } from "../assets";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
  });
  type Login = z.infer<typeof loginSchema>;

  const { register, handleSubmit } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler = (data: Login) => {
    console.log(data);
  };
  return (
    <div className="w-screen h-screen bg-black flex justify-center">
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

            <input
              className="w-full p-2 bg-transparent rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <input
              className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
              type="submit"
              id=""
            />
            <p>
              Don't have an account?
              <Link
                className="font-semibold text-white hover:text-blue-500 transition-all duration-200"
                to="/register"
              >
                {" "}
                sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
