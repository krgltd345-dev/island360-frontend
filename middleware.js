import { NextResponse } from 'next/server';
import { ROLES } from './lib/utils';

export function middleware(request) {
  const jwt = request.cookies.get("accessToken");
  const key = request.cookies.get("authKey");
  const roleCookie = request.cookies.get("role");
  const role = roleCookie?.value || null;
  const isAuthenticated = !!key?.value;
  const { pathname, searchParams } = request.nextUrl;
  console.log(key, "key");
  const createRedirectUrl = (targetPath) => {
    const url = new URL(targetPath, request.url);
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    return url;
  };

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/activityDetail', ];

  // Protected routes by role
  const userRoutes = ['/mybookings', '/profile', '/vendorsignup', '/checkout'];
  const adminRoutes = ['/adminpanel'];
  const vendorRoutes = ['/vendordashboard', '/activitymanagement', '/myactivities'];

  // Check if current route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname === route || pathname.startsWith(route + '/');
  });

  // If route is public, allow access
  if (isPublicRoute) {
    // If user is logged in and tries to access login page, redirect to profile
    if (pathname === '/login' && isAuthenticated) {
      return NextResponse.redirect(createRedirectUrl('/profile'));
    }
    return NextResponse.next();
  }

  // If route is protected and user is not authenticated, redirect to login
  if (!isAuthenticated) {
    const loginUrl = createRedirectUrl('/login');
    loginUrl.searchParams.set('redirect', pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''));
    return NextResponse.redirect(loginUrl);
  }

  // Check if route requires specific role
  const isUserRoute = userRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  const isAdminRoute = adminRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  const isVendorRoute = vendorRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

  // User routes: accessible by all authenticated users (USER, ADMIN, SUPER_ADMIN, VENDOR)
  if (isUserRoute) {
    return NextResponse.next();
  }

  // Admin routes: only accessible by ADMIN or SUPER_ADMIN
  if (isAdminRoute) {
    if (role === ROLES.admin || role === ROLES.supAdmin) {
      return NextResponse.next();
    }
    // Redirect non-admin users to their appropriate page
    if (role === ROLES.vendor) {
      return NextResponse.redirect(createRedirectUrl('/vendordashboard'));
    }
    return NextResponse.redirect(createRedirectUrl('/profile'));
  }

  // Vendor routes: only accessible by VENDOR (and optionally ADMIN/SUPER_ADMIN for oversight)
  if (isVendorRoute) {
    if (role !== ROLES.user) {
      return NextResponse.next();
    }
    // Redirect non-vendor users to their appropriate page
    return NextResponse.redirect(createRedirectUrl('/vendorsignup'));
  }

  // If route doesn't match any category but is protected, allow authenticated users
  // This handles any other protected routes that might be added later
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // Fallback: redirect to login
  const loginUrl = createRedirectUrl('/login');
  loginUrl.searchParams.set('redirect', pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''));
  return NextResponse.redirect(loginUrl);
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
    '/((?!api|_next/static|_next/image|favicon.ico|island_logo.png).*)',
  ],
};

