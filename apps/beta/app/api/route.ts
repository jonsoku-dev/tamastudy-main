import { NextResponse } from 'next/server';

/**
 * The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. If an unsupported method is called, Next.js will return a 405 Method Not Allowed response.
 * https://beta.nextjs.org/docs/api-reference/file-conventions/route
 */
export async function GET() {
  return NextResponse.json({ data: [] });
}

export async function HEAD(request: Request) {
  return NextResponse.json({ data: [] });
}

export async function POST(request: Request) {
  return NextResponse.json({ data: [] });
}

export async function PUT(request: Request) {
  return NextResponse.json({ data: [] });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ data: [] });
}

export async function PATCH(request: Request) {
  return NextResponse.json({ data: [] });
}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {
  return NextResponse.json({ data: [] });
}
