import { createErrorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const GET = async () => {
  console.log("GET /api/user");
  const session = await getSession();

  return NextResponse.json({
    user: session?.user || "not found",
  });
};

export { GET };
