import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000/categories";

export async function GET(request:Request) {
  const authorization = request.headers.get("Authorization");

  const response = await fetch(JSON_SERVER_URL, {
    headers: {
      Authorization: authorization ?? "",
    },
  });

  const categories = await response.json();

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();

  const authorization = request.headers.get("Authorization");

  const response = await fetch(JSON_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization ?? "",
    },
    body: JSON.stringify(body),
  });

  const category = await response.json()

  return NextResponse.json(category, {
    status: response.status,
  });
}