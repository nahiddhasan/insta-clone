"use client";

import { login } from "@/utils/actions";
import { LoginSchema } from "@/utils/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { z } from "zod";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  };
  return (
    <div className="flex items-center justify-center h-full w-full bg-[url('/img/loginBg.jpg')] bg-contain">
      <div className="w-[30%] h-3/4 flex gap-2 justify-between rounded-md bg-zinc-900/65 backdrop-blur-sm overflow-hidden ">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-center p-2"
        >
          <h1 className="text-3xl text-center mb-4">Log in</h1>
          <div className="px-5 ">
            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email")}
              className={`w-full p-2 px-0 bg-transparent outline-none border-b ${
                errors.email ? "border-rose-500" : "border-zinc-300"
              }`}
            />
            {errors.email && (
              <span className="text-rose-500">{errors.email.message}</span>
            )}
            <input
              type="password"
              placeholder="********"
              {...register("password")}
              className={`w-full p-2 px-0 bg-transparent outline-none border-b ${
                errors.email ? "border-rose-500" : "border-zinc-300"
              }`}
            />
            {errors.password && (
              <span className="text-rose-500">{errors.password.message}</span>
            )}
            {error && <span className="text-rose-500">{error}</span>}
            <button
              disabled={isPending}
              className={`disabled:cursor-not-allowed w-full p-2 px-4 bg-green-700 hover:bg-green-700/80 transition-all  my-4 rounded-full`}
            >
              Login
            </button>
            <p className="text-center">Or</p>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 p-2 px-4 ring-1 ring-zinc-700 hover:bg-zinc-800 transition-all  my-4 rounded-full"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
            >
              <FaGoogle />
              Sign in with google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 p-2 px-4 ring-1 ring-zinc-700 hover:bg-zinc-800 transition-all  my-4 rounded-full"
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/",
                })
              }
            >
              <FaGithub />
              Sign in with github
            </button>
            <p className="">
              {"Don't"} have an account?&nbsp;
              <Link
                className="text-green-700 hover:underline transition-all"
                href={"/auth/register"}
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
