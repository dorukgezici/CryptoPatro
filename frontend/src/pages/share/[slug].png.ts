import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { getPublicShare, postcardSvg } from '../../lib/shares';
export const GET: APIRoute = async ({ params }) => {
  const { share, status } = await getPublicShare(params.slug || '');
  if (!share)
    return new Response(
      status === 404 ? 'Postcard not found' : 'Postcard temporarily unavailable',
      { status },
    );
  const png = await sharp(Buffer.from(postcardSvg(share)))
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="cryptopatro-postcard.png"',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
