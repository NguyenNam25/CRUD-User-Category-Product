import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000/categories";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const authorization = request.headers.get("Authorization");

  const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
    headers: {
      Authorization: authorization ?? "",
    },
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body = await request.json();

  const authorization = request.headers.get("Authorization");

  const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization ?? "",
    },
    body: JSON.stringify(body),
  });

  const category = await response.json();

  return NextResponse.json(category, {
    status: response.status,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const authorization = request.headers.get("Authorization");

  const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: authorization ?? "",
    },
  });

  return NextResponse.json(
    { message: "Category deleted successfully" },
    { status: response.status },
  );
}
