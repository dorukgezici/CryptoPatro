import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ url }) =>
  new Response(
    `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${process.env.PUBLIC_SITE_URL || url.origin}/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
