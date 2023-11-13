import { createErrorResponse, withErrorHandler } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import connectDB from "@/lib/connectDb";
import { createUser, getUserByRemoteId, updateUser } from "@/db/userDb";

const GET = withErrorHandler(async () => {
  await connectDB();
  const session = await getSession();
  if (!session) {
    return createErrorResponse("Unauthorized", 401);
  }

  const res = await getUserByRemoteId(session.user.sub);
  if ("user" in res === false) {
    return createErrorResponse("User not found", 404);
  }

  return NextResponse.json({
    user: res.user,
  });
});

const POST = withErrorHandler(async () => {
  await connectDB();
  const session = await getSession();
  if (!session) {
    return createErrorResponse("Unauthorized", 401);
  }
  const res = await getUserByRemoteId(session.user.sub);
  if ("user" in res === true) {
    return createErrorResponse("User already exists", 400);
  }
  const user = await createUser({
    remoteUserId: session.user.sub,
    name: session.user.name,
    email: session.user.email,
  });

  return NextResponse.json({
    user,
  });
});

const Patch = withErrorHandler(async (req) => {
  await connectDB();
  const session = await getSession();
  if (!session) {
    return createErrorResponse("Unauthorized", 401);
  }
  const res = await getUserByRemoteId(session.user.sub);
  if ("user" in res === false) {
    return createErrorResponse("User does not exist", 400);
  }

  const { body } = req;
  const user = await updateUser(res.user._id.toString(), {
    name: body.name,
    address: body.address,
    paymentDetails: body.paymentDetails,
  });

  return NextResponse.json({
    user,
  });
});

export { GET, POST };
