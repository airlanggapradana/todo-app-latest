import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import CreateField from "@/app/_components/CreateField";
import { LogOut } from "lucide-react";
import TodoContainer from "@/app/_components/TodoContainer";

export default function MainPage() {
  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div>
        <SignOutButton redirectUrl="/sign-in">
          <button
            type="button"
            className="px-8 py-3 rounded-md border-2 border-indigo-500 font-semibold flex items-center gap-3 hover:bg-indigo-500 transition-colors duration-300"
          >
            <span>
              <LogOut />
            </span>
            SignOut
          </button>
        </SignOutButton>
        <CreateField />
      </div>

      <div className="lg:col-span-2">
        <TodoContainer />
      </div>
    </section>
  );
}
