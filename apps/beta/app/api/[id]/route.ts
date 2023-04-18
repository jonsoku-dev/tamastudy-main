import { NextResponse } from 'next/server';

/**
 * The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. If an unsupported method is called, Next.js will return a 405 Method Not Allowed response.
 * @constructor
 */
export async function GET(request: Request, { params }) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  return NextResponse.json({ query: query, params: params });
}
