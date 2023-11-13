import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import { createErrorResponse } from "./lib/utils";

export default withMiddlewareAuthRequired({
  returnTo: "/api/auth/login",
});

export const config = {
  matcher: ["/api/user/:path*", "/api/invoice/:path*", "/api/company/:path*"],
};
