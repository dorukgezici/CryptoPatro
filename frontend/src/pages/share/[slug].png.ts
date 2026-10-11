import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { createPostcardPngHandler } from '../../lib/postcard-png';
import { getPublicShare, postcardSvg } from '../../lib/shares';

const postcardPng = createPostcardPngHandler({
  getShare: getPublicShare,
  render: (share) =>
    sharp(Buffer.from(postcardSvg(share)))
      .png()
      .toBuffer(),
});

export const GET: APIRoute = ({ params }) => postcardPng(params.slug || '');
