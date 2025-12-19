import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";
// import axios from "axios";

const JWT_SECRET = process.env.JWT_SECRET! as string;
const BACKEND_URL = process.env.NEXT_PUBLIC_API_PUBLIC;

interface TokenPayload extends JWTPayload {
  sub: string;
  role: string;
  type: string;
}

async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return decoded.payload as TokenPayload;
  } catch (e) {
    console.log("ERROR in verifying", e);
    return null;
  }
}

// Define your route configurations
const routeConfig = {
  // Public routes that don't require authentication
  publicRoutes: ["/", "/category", "/blogs", "/caes", "/contact", "/events"],

  // Auth routes that authenticated users shouldn't access
  authRoutes: ["/forgot-password", "/reset-password", "/auth/login", "/auth/register"],

  // Protected routes with role requirements
  protectedRoutes: {
    "/profile": ["ADMIN", "EDITOR", "USER"],
    // "/en/membership/certificate": ["ADMIN", "USER"], 
    // "/en/minority/certificate": ["ADMIN", "USER"], 
  },

  // Default redirects
  defaultRedirects: {
    authenticated: "/",
    unauthenticated: "/en/login",
    unauthorized: "/auth/login",
  },
};

function isPublicRoute(pathname: string): boolean {
  return routeConfig.publicRoutes.some((route) => {
    if (route.includes("[") || route.includes(":")) {
      // Handle dynamic routes - convert to regex
      const regexRoute = route.replace(/\[.*?\]/g, "[^/]+");
      return new RegExp(`^${regexRoute}$`).test(pathname);
    }
    return pathname === route || pathname.startsWith(route + "/");
  });
}

function isAuthRoute(pathname: string): boolean {
  return routeConfig.authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

function getRequiredRoles(pathname: string): string[] | null {
  // Check exact match first
  const roles =
    routeConfig.protectedRoutes[
      pathname as keyof typeof routeConfig.protectedRoutes
    ];
  if (roles) {
    return roles;
  }

  // Check for route prefixes
  for (const [route, roles] of Object.entries(routeConfig.protectedRoutes)) {
    if (pathname.startsWith(route + "/")) {
      return roles;
    }
  }

  return null;
}

function hasRequiredRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Get access token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let user: null | TokenPayload = null;
  let newTokens = null;

  // Try to verify access token first
  if (accessToken) {
    user = await verifyToken(accessToken);
  }

  // If access token is invalid/expired but refresh token exists, try to refresh
  if (!user && refreshToken) {
    newTokens = await refreshTokens(refreshToken);
    if (newTokens) {
      // Verify the new access token
      user = await verifyToken(newTokens.accessToken);
    }
  }

  // Handle public routes
  if (isPublicRoute(pathname)) {
    const response = NextResponse.next();

    // Set new tokens if we refreshed them
    if (newTokens) {
      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions = getCookieOptions(isProduction);

      response.cookies.set("accessToken", newTokens.accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60, // 15 minutes
      });

      response.cookies.set("refreshToken", newTokens.refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }
  }

  // Handle auth routes (login, signup, etc.)
  if (isAuthRoute(pathname)) {
    if (user) {
      // Authenticated users shouldn't access auth routes
      const response = NextResponse.redirect(
        new URL(routeConfig.defaultRedirects.authenticated, request.url)
      );

      // Set new tokens if we refreshed them
      if (newTokens) {
        const isProduction = process.env.NODE_ENV === "production";
        const cookieOptions = getCookieOptions(isProduction);

        response.cookies.set("accessToken", newTokens.accessToken, {
          ...cookieOptions,
          maxAge: 15 * 60,
        });

        response.cookies.set("refreshToken", newTokens.refreshToken, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60,
        });
      }

      return response;
    }
    return NextResponse.next();
  }

  // Handle protected routes
  const requiredRoles = getRequiredRoles(pathname);

  if (requiredRoles !== null) {
    // This is a protected route
    if (!user) {
      // User not authenticated and couldn't refresh - redirect to login
      const loginUrl = new URL(
        routeConfig.defaultRedirects.unauthenticated,
        request.url
      );
      loginUrl.searchParams.set("callbackUrl", pathname);
      const response = NextResponse.redirect(loginUrl);

      // Clear invalid tokens
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }

    // Check role-based access
    if (!hasRequiredRole(user.role, requiredRoles)) {
      return NextResponse.redirect(
        new URL(routeConfig.defaultRedirects.unauthorized, request.url)
      );
    }

    // User has access, add user info to headers for pages to use
    const response = NextResponse.next();
    response.headers.set("x-user-id", user.sub);
    response.headers.set("x-user-role", user.role);

    // Set new tokens if we refreshed them
    if (newTokens) {
      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions = getCookieOptions(isProduction);

      response.cookies.set("accessToken", newTokens.accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60,
      });

      response.cookies.set("refreshToken", newTokens.refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60,
      });
    }
    return response;
  }

  // Default: allow access to unspecified routes
  const response = NextResponse.next();

  // Set new tokens if we refreshed them
  if (newTokens) {
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = getCookieOptions(isProduction);

    response.cookies.set("accessToken", newTokens.accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60,
    });

    response.cookies.set("refreshToken", newTokens.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60,
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

async function refreshTokens(refreshToken: string) {
  try {
    // const response = await axios.post(
    //   `${BACKEND_URL}/auth/refresh`,
    //   { refreshToken },
    //   { withCredentials: true }
    // );
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-platform": "mobile",
      },
      credentials: "include", // Important to include cookies
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error("Response Failed");

    // const data = await response.data;
    const data = await response.json();

    return {
      accessToken: data.tokens.accessToken,
      refreshToken: data.tokens.refreshToken,
      accessTokenExpires: new Date(data.tokens.accessTokenExpires),
      refreshTokenExpires: new Date(data.tokens.refreshTokenExpires),
    };
  } catch (error) {
    console.log("Token refresh failed:", error);
    return null;
  }
}

function getCookieOptions(isProduction: boolean) {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict" as const,
    path: "/",
  };
}