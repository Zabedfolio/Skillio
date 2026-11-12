import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { auth } from '@/lib/auth';
import { MongoClient, ObjectId } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://skillio:tQhp0zsKyZ60PD5m@cluster0.mldxc9s.mongodb.net/skillio?retryWrites=true&w=majority';

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoAuthClient) {
    global._mongoAuthClient = new MongoClient(uri);
  }
  clientPromise = Promise.resolve(global._mongoAuthClient);
} else {
  clientPromise = new MongoClient(uri).connect();
}

/**
 * Creates a standard HMAC-SHA256 JWT using Node.js crypto.
 * Compatible with Express jsonwebtoken verification on backend port 5000.
 */
function createJwt(payload: Record<string, unknown>, secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

export async function GET() {
  try {
    const reqHeaders = await headers();
    let user: { id: string; email: string; name?: string; role?: string } | null = null;
    let sessionToken: string | null = null;

    // 1. Attempt official Better Auth server session API
    try {
      const session = await auth.api.getSession({ headers: reqHeaders });
      if (session && session.user) {
        user = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          role: (session.user as { role?: string }).role,
        };
        sessionToken = session.session?.token || null;
      }
    } catch {
      // Fallback to database lookup
    }

    // 2. Fallback: Parse session cookie and verify against MongoDB session collection
    if (!user) {
      const cookieHeader = reqHeaders.get('cookie') || '';
      const match = cookieHeader.match(/(?:^|;\s*)better-auth\.session_token=([^;]+)/);
      if (match) {
        const raw = decodeURIComponent(match[1]);
        // Handle signed cookie format: <token>.<signature>
        sessionToken = raw.split('.')[0];

        const client = await clientPromise;
        const db = client.db();
        const sessionDoc = await db.collection('session').findOne({
          token: sessionToken,
          expiresAt: { $gt: new Date() },
        });

        if (sessionDoc) {
          const userDoc = await db.collection('user').findOne({
            _id: typeof sessionDoc.userId === 'string' ? new ObjectId(sessionDoc.userId) : sessionDoc.userId,
          });

          if (userDoc) {
            user = {
              id: userDoc._id.toString(),
              email: userDoc.email,
              name: userDoc.name,
              role: userDoc.role,
            };
          }
        }
      }
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthenticated: No active session found.' },
        { status: 401 }
      );
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Account does not have administrative privileges.' },
        { status: 403 }
      );
    }

    const secret = process.env.JWT_SECRET || 'change_this_secret';
    const jwtToken = createJwt(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
      },
      secret
    );

    return NextResponse.json({
      success: true,
      token: jwtToken,
      sessionToken,
      admin: {
        _id: user.id,
        email: user.email,
        name: user.name || 'Admin',
        role: user.role,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Token exchange error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
