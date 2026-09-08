import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000/products";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
    method: "DELETE",
  });

  return NextResponse.json(
    { message: "Product deleted successfully" },
    { status: response.status }
  );
}