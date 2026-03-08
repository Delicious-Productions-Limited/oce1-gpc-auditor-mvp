import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

  // 301 redirect from legacy gpc.growthauditkit.com to canonical path
  if (host === 'gpc.growthauditkit.com') {
    const path = request.nextUrl.pathname
    const search = request.nextUrl.search
    const destination = `https://growthauditkit.com/gpc-auditor${path === '/' ? '' : path}${search}`
    return NextResponse.redirect(destination, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
