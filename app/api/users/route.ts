import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000/users";

export async function GET(request: Request) {
  const token = (await cookies()).get("token")?.value;

  const response = await fetch(JSON_SERVER_URL, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const users = await response.json();

  return NextResponse.json(users, {
    status: response.status,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const token = (await cookies()).get("token")?.value;

  const response = await fetch(JSON_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });

  const user = await response.json();

  return NextResponse.json(user, {
    status: response.status,
  });
}
