"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const DeleteTodo = ({ todoId }: { todoId?: number }) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const handleDelete = async (e: any) => {
    const token = await getToken({ template: "supabase" });

    await fetch(`http://localhost:3000/api/todos?token=${token}&id=${todoId}`, {
      method: "DELETE",
    }).then((res) => res.json());

    router.refresh();
  };

  return (
    <button
      type="button"
      className="p-3 rounded-md border border-indigo-500 hover:bg-indigo-500 focus:bg-indigo-500/50 transition-colors duration-300"
      onClick={handleDelete}
    >
      <Trash2 opacity={0.9} />
    </button>
  );
};

export default DeleteTodo;
