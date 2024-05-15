"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/sign-in");
    }, 1000);
  }, []);
  return (
    <h1 className="text-center font-bold text-xl text-gray-300">
      Please Wait, Redirecting...
    </h1>
  );
}
