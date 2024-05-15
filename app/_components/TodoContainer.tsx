import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import TodoCard from "./TodoCard";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

type TodosType = {
  id: number;
  user_id: string;
  created_at: Date;
  title: string;
  contents: string;
}[];

async function FetchData() {
  const { userId, getToken } = auth();
  const user = await currentUser();

  const token = await getToken({ template: "supabase" });
  const response = await fetch(
    `http://localhost:3000/api/todos?token=${token}&userId=${userId}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  const userData: TodosType = response.data;

  return (
    <>
      {userData?.length > 0 ? (
        <div className="space-y-7">
          {userData?.map((data, i) => (
            <TodoCard
              key={i}
              title={data.title}
              contents={data.contents}
              author={user?.fullName}
              image={user?.imageUrl}
              todoId={data.id}
            />
          ))}
        </div>
      ) : (
        <h1 className="font-bold text-xl text-gray-500 text-center">
          No data found, please create one!
        </h1>
      )}
    </>
  );
}

const TodoContainer = () => {
  return (
    <>
      <ScrollArea className="h-[35rem] w-full rounded-md border-2 border-indigo-500 p-4">
        <FetchData />
      </ScrollArea>
    </>
  );
};

export default TodoContainer;
