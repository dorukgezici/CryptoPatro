import type { APIRoute } from 'astro';
import { escapeXml } from '../lib/shares';
export const GET: APIRoute = ({ url }) => {
  const origin = escapeXml((process.env.PUBLIC_SITE_URL || url.origin).replace(/\/$/, ''));
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url><url><loc>${origin}/about</loc></url></urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
