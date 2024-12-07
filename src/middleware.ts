import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { APIResponse } from "./shared/controllers";
import { UserResponse } from "./shared/types";

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register") {
    return NextResponse.next();
  }

  const cookies = req.cookies;

  try {
    const response = await axios.get<APIResponse<UserResponse>>(`${process.env.NEXT_PUBLIC_ENV}/api/users/me`, {
      headers: {
        Cookie: cookies.toString(),
      },
      withCredentials: true,
    });

    const user = response.data.data;
    const responseHeaders = new Headers();
    responseHeaders.set("x-user-data", JSON.stringify(user));

    return NextResponse.next({
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    try {
      const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_ENV}/api/auth/refresh-token`, {}, {
        headers: {
          Cookie: cookies.toString(),
        },
        withCredentials: true,
      });

      const setCookies = refreshResponse.headers["set-cookie"];
      const headers: HeadersInit = {};
      if (setCookies) {
        headers["set-cookie"] = Array.isArray(setCookies) ? setCookies.join(", ") : setCookies;
      }

      return NextResponse.next({
        status: refreshResponse.status,
        headers,
      });
    } catch (refreshError: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      } else if (refreshError instanceof AxiosError) {
        console.log(refreshError.message);
      } else {
        console.log(error);
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js|png|jpeg|woff2?|svg|json)).*)"],
};
