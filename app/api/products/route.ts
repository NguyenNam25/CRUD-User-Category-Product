import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000/products";

export async function GET(request: Request) {
const authorization = request.headers.get("Authorization");

  const response = await fetch(JSON_SERVER_URL, {
    headers: {
      Authorization: authorization ?? "",
    },
  });

  const products = await response.json();

  return NextResponse.json(products);
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

  const product = await response.json();

  return NextResponse.json(product, {
    status: response.status,
  });
}