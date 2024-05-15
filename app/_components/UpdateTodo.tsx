"use client";
import React, { FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { CaseSensitive, FilePenLine, WholeWord } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const UpdateTodo = ({
  todoId,
  currentTitle,
  currentContents,
}: {
  todoId?: number;
  currentTitle?: string;
  currentContents?: string;
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [contents, setContents] = useState(currentContents);

  const { getToken } = useAuth();
  const router = useRouter();

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await getToken({ template: "supabase" });
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/todos?token=${token}&id=${todoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, contents }),
      }
    );
    setTitle("");
    setContents("");
    router.refresh();
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <button
            type="button"
            className="p-3 rounded-md border border-indigo-500 hover:bg-indigo-500 focus:bg-indigo-500/50 transition-colors duration-300"
          >
            <FilePenLine opacity={0.9} />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 border-gray-500">
          <DialogHeader>
            <DialogTitle>Update Todo</DialogTitle>
            <DialogDescription>
              Make changes to your todo. Click save when you are done.
            </DialogDescription>
          </DialogHeader>

          <form
            className="mb-0 mt-8 max-w-lg space-y-4"
            onSubmit={handleUpdate}
          >
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  className="w-full rounded bg-gray-800 outline-none border border-gray-700 p-4 pe-12 text-base text-gray-300 shadow-sm"
                  placeholder="Enter Title"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <CaseSensitive opacity={0.5} />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="contents" className="sr-only">
                Description
              </label>

              <div className="relative">
                <textarea
                  onChange={(e) => setContents(e.target.value)}
                  value={contents}
                  id="contents"
                  className="w-full rounded bg-gray-800 outline-none border border-gray-700 p-4 pe-12 text-base text-gray-300 shadow-sm"
                  rows={4}
                  placeholder="Enter any notes..."
                ></textarea>

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <WholeWord opacity={0.5} />
                </span>
              </div>
            </div>

            <DialogClose asChild>
              <button
                onClick={() => handleUpdate}
                type="submit"
                className="w-full py-4 rounded bg-indigo-500 font-semibold hover:bg-indigo-500/90 focus:bg-indigo-500/50 transition-colors duration-300"
              >
                Save & Update
              </button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTodo;
