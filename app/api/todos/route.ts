import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const obj = Object.fromEntries(searchParams.entries());

  const { token, userId } = obj;

  // supabaseClient
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data } = await supabase
    .from("todos")
    .select()
    .eq("user_id", `${userId}`);

  return NextResponse.json({
    status: 200,
    message: "Success",
    data,
  });
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const { title, contents } = await req.json();
  const obj = Object.fromEntries(searchParams.entries());

  const { token, userId } = obj;

  // supabaseClient
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data } = await supabase
    .from("todos")
    .insert({
      user_id: userId,
      title,
      contents,
    })
    .select();

  return NextResponse.json({
    status: 201,
    message: "Created",
    data,
  });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const obj = Object.fromEntries(searchParams.entries());

  const { token, id } = obj;

  // supabaseClient
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data } = await supabase.from("todos").delete().eq("id", id);

  return NextResponse.json({
    status: 204,
    message: "Deleted Successfully",
    data,
  });
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const { title, contents } = await req.json();
  const obj = Object.fromEntries(searchParams.entries());

  const { token, id } = obj;

  // supabaseClient
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data } = await supabase
    .from("todos")
    .update({ title, contents })
    .eq("id", id)
    .select();

  return NextResponse.json({
    status: 200,
    message: "Updated Successfully",
    data,
  });
}
