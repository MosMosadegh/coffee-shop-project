
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log("🚀 ~ middleware ~ pathname:", pathname)

  // اگر مسیر مربوط به API نباشد، Middleware را اجرا نکن
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // دریافت توکن از session
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // // اگر کاربر لاگین نکرده باشد
  // if (!session) {
  //   return new NextResponse(
  //     JSON.stringify({ error: "Unauthorized: No session found" }),
  //     { status: 401, headers: { "Content-Type": "application/json" } }
  //   );
  // }

  // اگر نقش کاربر ادمین نباشد
  if (pathname.startsWith("/api/product/get")) {
    return new NextResponse(
      JSON.stringify({ error: "Forbidden: User is not an admin" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // اگر مسیر مربوط به صفحه پنل کاربری باشد
  if (pathname.startsWith("/p-user")) {

    // اگر کاربر لاگین نکرده باشد
    if (!session) {
      return NextResponse.redirect(new URL("/login-register", req.url));
    }

    // اگر کاربر یوزر نباشد
    if (session.user.role !== "USER") {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }
  // اگر مسیر مربوط به صفحه ادمین باشد
  if (pathname.startsWith("/p-admin")) {

    // اگر کاربر لاگین نکرده باشد
    if (!session) {
      return NextResponse.redirect(new URL("/login-register", req.url));
    }

    // اگر کاربر ادمین نباشد
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }

  // اگر همه چیز درست باشد، ادامه دهید
  return NextResponse.next();
}

// تعیین مسیرهایی که Middleware روی آن‌ها اعمال می‌شود
export const config = {
  matcher: ["/api/:path*", "/admin/:path*"], // Middleware روی تمام API Routes و مسیرهای /admin اعمال می‌شود
};