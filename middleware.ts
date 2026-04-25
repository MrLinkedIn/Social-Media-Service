export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/create/:path*",
    "/calendar/:path*",
    "/analytics/:path*",
    "/settings/:path*",
  ],
};
