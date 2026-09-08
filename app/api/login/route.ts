import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000";

export async function POST(request: Request) {
  const body = await request.json();

  console.log("Login body:", body);

  const response = await fetch(`${JSON_SERVER_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  console.log("JSON Server response:", data);

  return NextResponse.json(data, {
    status: response.status,
  });
}