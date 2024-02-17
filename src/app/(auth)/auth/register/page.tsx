"use client";
import { registerAction } from "@/utils/actions";
import { RegisterSchema } from "@/utils/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const RegisterPage = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      registerAction(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  };
  return (
    <div className="flex items-center justify-center h-full w-full bg-[url('/img/loginBg.jpg')] bg-contain">
      <div className="w-[30%] h-3/4 flex gap-2 justify-between rounded-md bg-zinc-900/65 backdrop-blur-sm overflow-hidden ">
        {/* <div className="flex-1">
          <div className="relative w-full aspect-square overflow-hidden rounded-sm">
            <Image
              src={"/img/bgsign.jpg"}
              fill
              alt="signUpImg"
              className="object-cover"
            />
          </div>
        </div> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-center p-2"
        >
          <h1 className="text-3xl text-center mb-4">Sign Up</h1>
          <div className="px-5">
            <input
              type="text"
              placeholder="Full name"
              autoComplete="off"
              {...register("name")}
              className={`w-full p-2 px-0 bg-transparent outline-none border-b ${
                errors.name ? "border-rose-500" : "border-zinc-300"
              } `}
            />
            {errors.name && (
              <span className="text-rose-500">{errors.name.message}</span>
            )}
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
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
                errors.password ? "border-rose-500" : "border-zinc-300"
              }`}
            />
            {errors.password && (
              <span className="text-rose-500">{errors.password.message}</span>
            )}
            <span className="text-rose-500">{error}</span>
            <button
              disabled={isPending}
              className="w-full p-2 px-4 bg-green-700 hover:bg-green-700/80 transition-all  my-4 rounded-full"
            >
              Register
            </button>
            <p className="">
              Already have an account?&nbsp;
              <Link
                className="text-green-700 hover:underline transition-all"
                href={"/auth/login"}
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
