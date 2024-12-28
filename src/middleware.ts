"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetcherSSR } from "@/shared/lib";
import { APIResponse, User } from "@/shared/types";

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL('/select-shop', request.url))
  }

  try {
    const [response, accessToken, refreshToken] = await fetcherSSR(`${process.env.NEXT_PUBLIC_ENV}/api/users/me`, {
      method: "GET",
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const { data: user } = await response.json() as APIResponse<User>;

    const res = NextResponse.next();
    res.headers.set("x-user", JSON.stringify(user));
    const cookieStore = await cookies();
    if (accessToken) {
      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 4),
      });
    }

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
    }

    const shopIdMatch = request.nextUrl.pathname.match(/^\/([0-9a-f]{24})\/?/);
    if (shopIdMatch) {
      console.log("shopId", shopIdMatch[1]);
      res.headers.set("x-shop-id", shopIdMatch[1]);
    } else {
      res.headers.set("x-shop-id", "");
    }
    return res;
  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js|png|jpeg|woff2?|svg|json)).*)"],
};
