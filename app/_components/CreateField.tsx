"use client";
import { CaseSensitive, WholeWord } from "lucide-react";
import React, { FormEvent } from "react";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateField = () => {
  const { userId, getToken } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !contents) {
      alert("Please enter title and contents");
      return;
    }

    const token = await getToken({ template: "supabase" });
    const createTodo = await fetch(
      `http://localhost:3000/api/todos?token=${token}&userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, contents }),
      }
    ).then((res) => res.json());

    setTitle("");
    setContents("");

    router.refresh();
  };

  return (
    <form className="mb-0 mt-8 max-w-lg space-y-4" onSubmit={handleCreate}>
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

      <button
        onClick={() => handleCreate}
        type="submit"
        className="w-full py-4 rounded bg-indigo-500 font-semibold hover:bg-indigo-500/90 focus:bg-indigo-500/50 transition-colors duration-300"
      >
        Create
      </button>
    </form>
  );
};

export default CreateField;
