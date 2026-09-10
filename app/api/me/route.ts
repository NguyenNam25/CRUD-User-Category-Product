import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:4000";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    // JWT có dạng:
    // header.payload.signature
    const payload = token.split(".")[1];

    if (!payload) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    const decodedPayload = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    );

    const userId = decodedPayload.sub;

    if (!userId) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${JSON_SERVER_URL}/600/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { user: null },
        { status: response.status }
      );
    }

    const user = await response.json();

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error("GET /api/me error:", error);

    return NextResponse.json(
      { user: null },
      { status: 401 }
    );
  }
}
