import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000/users";

export async function GET() {
  const response = await fetch(JSON_SERVER_URL);

  const users = await response.json();

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(JSON_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const user = await response.json()

  return NextResponse.json(user, {
    status: response.status,
  });
}