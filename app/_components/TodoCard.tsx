import React from "react";
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";

type TodoCardProps = {
  title?: string;
  contents?: string;
  author?: string | null;
  image?: string;
  todoId?: number;
};

const TodoCard = ({
  title,
  contents,
  author,
  image,
  todoId,
}: TodoCardProps) => {
  return (
    <>
      <div className="rounded-xl border-2 border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <a href="#" className="block shrink-0">
              <img
                alt=""
                src={image}
                className="size-14 rounded-md object-cover"
                width={56}
                height={56}
              />
            </a>

            <div>
              <h3 className="font-semibold sm:text-lg text-gray-100">
                <a href="#" className="hover:underline">
                  {title}
                </a>
              </h3>

              <p className="line-clamp-2 text-sm text-gray-300">{contents}</p>

              <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                <p className="hidden sm:block sm:text-xs sm:text-gray-100">
                  Posted by
                  <a
                    href="#"
                    className="font-medium underline hover:text-gray-300"
                  >
                    {" "}
                    {author}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DeleteTodo todoId={todoId} />
            <UpdateTodo
              todoId={todoId}
              currentTitle={title}
              currentContents={contents}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
