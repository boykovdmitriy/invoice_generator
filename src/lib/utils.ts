import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    return null;
  }
}

export function createErrorResponse(
  message: string,
  statusCode: number
): NextResponse {
  const errorResponse = {
    status: statusCode >= 500 ? "error" : "fail",
    message,
  };

  return new NextResponse(JSON.stringify(errorResponse), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

export function withErrorHandler(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void | NextResponse<unknown>> | NextResponse<unknown>
): (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void | NextResponse<unknown>> | NextResponse<unknown> {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (error: any) {
      console.error(error);
      return createErrorResponse(error.message, 500);
    }
  };
}
