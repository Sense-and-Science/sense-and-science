import ImageKit from 'imagekit';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const imagekit = new ImageKit({
  publicKey: process.env.PRIVATE_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.PRIVATE_IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.PRIVATE_IMAGEKIT_URL_ENDPOINT || '',
});

export async function GET(request: NextRequest, response: NextResponse) {
  const authenticationParameters = imagekit.getAuthenticationParameters();
  return NextResponse.json(authenticationParameters, { status: 200 });
}
