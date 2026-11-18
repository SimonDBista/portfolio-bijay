import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const isValid = await verifyCredentials(password, username);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials. Please verify username and password.' }, { status: 401 });
    }

    const token = signToken(username || 'admin');

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: { username: username || 'admin' }
    });

    const isSecure = process.env.NODE_ENV === 'production' && !request.headers.get('host')?.includes('localhost') && !request.headers.get('host')?.includes('127.0.0.1');

    response.cookies.set({
      name: 'chef_admin_token',
      value: token,
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error during authentication' }, { status: 500 });
  }
}
