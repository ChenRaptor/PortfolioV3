import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('next-auth.session-token');
    if (!authCookie) return NextResponse.redirect(new URL('/', request.url));
  }
};