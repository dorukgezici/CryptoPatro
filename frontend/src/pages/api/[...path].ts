import type { APIRoute } from 'astro';

export const ALL: APIRoute = async ({ request, params, url, clientAddress }) => {
  const path = params.path || '';
  if (!/^[a-zA-Z0-9_\-/]+$/.test(path) || path.split('/').includes('..')) {
    return Response.json({ detail: 'Invalid API path' }, { status: 400 });
  }
  const backend = process.env.BACKEND_URL || 'http://127.0.0.1:8000';
  const headers = new Headers();
  headers.set('X-Forwarded-For', clientAddress || 'unknown');
  for (const name of ['content-type', 'x-portfolio-token']) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  try {
    const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();
    if (body && body.byteLength > 32_768)
      return Response.json({ detail: 'Request too large' }, { status: 413 });
    const response = await fetch(`${backend.replace(/\/$/, '')}/api/${path}${url.search}`, {
      method: request.method,
      headers,
      body,
      signal: AbortSignal.timeout(45_000),
      redirect: 'error',
    });
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        ...(response.headers.get('Retry-After')
          ? { 'Retry-After': response.headers.get('Retry-After')! }
          : {}),
      },
    });
  } catch {
    return Response.json(
      { detail: 'The portfolio service is temporarily unavailable. Please try again.' },
      { status: 503 },
    );
  }
};
