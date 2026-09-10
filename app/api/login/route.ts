import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000";

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${JSON_SERVER_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  console.log("JSON Server response:", data);

  if (!response.ok) {
    return NextResponse.json(data, {
      status: response.status,
    });
  }

  if (!data?.accessToken) {
    console.error("Login proxy: thiếu accessToken trong phản hồi");
    return NextResponse.json(
      { message: "Đăng nhập thất bại, thiếu thông tin xác thực" },
      { status: 502 }
    );
  }

  const res = NextResponse.json(
    {
      user: data.user,
    },
    {
      status: response.status,
    }
  );

  res.cookies.set("token", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  })

  return res;
}