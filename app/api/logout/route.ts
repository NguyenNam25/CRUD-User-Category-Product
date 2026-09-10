import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000";

export async function POST() {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    try {
      await fetch(`${JSON_SERVER_URL}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      // Không chặn logout phía client dù backend lỗi
      console.error("Logout: không revoke được token phía server", error);
    }
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
