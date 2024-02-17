"use client";
import useOutsideClick from "@/hooks/outsideClick";
import useCreatePost from "@/store/useCreatePost";
import { cratePostAction } from "@/utils/actions";
import { uploadImage } from "@/utils/upload";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import Modal from "./Modal";

type createFormValue = {
  caption: string;
};
const CreatePostModal = () => {
  const { isOpen } = useCreatePost();
  const [page, setPage] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (file) {
      setPage(1);
    }
  }, [file]);

  const pageItems = () => {
    if (page === 0) {
      return <PageOne handleChange={handleFileChange} />;
    } else if (page === 1) {
      // const setFileChange = () => {
      //   setFile(null), setPage(0);
      // };
      return <PageTwo file={file} setFile={setFile} setPage={setPage} />;
    }
  };

  if (isOpen) {
    return <div>{pageItems()}</div>;
  }
};

export default CreatePostModal;

const PageOne = ({
  handleChange,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { onClose } = useCreatePost();

  return (
    <Modal onClose={() => onClose()}>
      <div className="flex items-center justify-center w-full p-2">
        <div className="flex items-center justify-center w-full">
          <h2 className="text-xl font-semibold">Select your Image</h2>
        </div>
      </div>
      <hr className="h-[1px] border-none bg-zinc-300 dark:bg-zinc-600 mt-2 w-full" />
      <div className="flex w-full relative items-center flex-col justify-center min-h-[350px] overflow-hidden">
        <svg
          aria-label="Icon to represent media such as images or videos"
          className="x1lliihq x1n2onr6 x5n08af"
          fill="currentColor"
          height="77"
          role="img"
          viewBox="0 0 97.6 77.3"
          width="96"
        >
          <path
            d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
            fill="currentColor"
          ></path>
          <path
            d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
            fill="currentColor"
          ></path>
          <path
            d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
            fill="currentColor"
          ></path>
        </svg>
        <label
          htmlFor="file2"
          className="my-3 px-3 p-1 bg-blue-500 rounded-md cursor-pointer"
        >
          Sellect form your file
        </label>

        <input type="file" hidden onChange={handleChange} id="file2" />
      </div>
    </Modal>
  );
};

const PageTwo = ({
  file,
  setFile,
  setPage,
}: {
  file: File | null;
  setFile: (newFile: File | null) => void;
  setPage: (newPage: number) => void;
}) => {
  const { onClose } = useCreatePost();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const modalRef = useOutsideClick(() => {
    onClose();
    setPage(0);
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createFormValue>();
  const handleShare: SubmitHandler<createFormValue> = (values) => {
    const { caption } = values;
    startTransition(async () => {
      const url = await uploadImage(file!);
      cratePostAction(url, caption);
      setFile(null);
      onClose();
      setPage(0);
    });
  };

  return (
    <div className="dark:bg-zinc-900/10 backdrop-blur-sm fixed inset-0 z-[200]">
      <div
        ref={modalRef}
        className={`fixed drop-shadow-lg top-[50%] left-[50%] max-h-[90%] h-auto md:max-h-[85vh] w-[90%] sm:w-[90vw] sm:max-w-[750px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white dark:bg-zinc-700`}
      >
        <div className="flex items-center flex-col justify-center h-full"></div>
        <div className="w-full flex items-center justify-between p-2">
          <button
            onClick={() => {
              setFile(null), setPage(0);
            }}
            className=" px-3 p-1 text-white"
          >
            <FaArrowLeftLong />
          </button>
          <h2 className="text-xl font-semibold">Add a caption</h2>
          <button
            form="form"
            disabled={isPending}
            className="font-bold text-blue-500 hover:text-white"
          >
            {isPending ? "Uploading..." : "Share"}
          </button>
        </div>
        <hr className="h-[1px] border-none bg-zinc-300 dark:bg-zinc-600 w-full" />
        <div className="flex w-full flex-col sm:flex-row">
          <div className="flex-[2] flex w-full relative items-center flex-col justify-center min-h-[350px] overflow-hidden">
            <div className="relative h-full w-full">
              <Image
                src={(file && URL.createObjectURL(file)) || ""}
                fill
                alt="postImg"
                className="object-cover overflow-hidden"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="p-2 px-3 flex items-center gap-2">
              <Image
                src={session?.user?.image || "/img/avatar.png"}
                height={30}
                width={30}
                alt="userImage"
                className="object-cover rounded-full"
              />
              <span>{session?.user?.username}</span>
            </div>
            <div className="px-4">
              <form action="" onSubmit={handleSubmit(handleShare)} id="form">
                <textarea
                  id=""
                  rows={4}
                  placeholder="Write a caption..."
                  {...register("caption", {
                    maxLength: {
                      value: 120,
                      message: "Maxmium value 120 character!",
                    },
                  })}
                  className="w-full bg-transparent border-none outline-none resize-none"
                />

                {errors?.caption && (
                  <p className="bg-red-600 text-sm rounded-sm p-1">
                    {errors?.caption?.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
