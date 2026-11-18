import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-luxury-chef-portfolio-key-2026';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const SCRYPT_SALT = process.env.ADMIN_SALT || 'chefbijay2026_salt_987';
const DEFAULT_SCRYPT_HASH = '6051cfcc7ddc11e259fb394e9c4e6396dc1ca47cd4bd964c6744962db5e0276095cb1ce0eed712b4466bce83ee6efa547b6ed0a56213a7497057a2125200a0c0';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || DEFAULT_SCRYPT_HASH;

export interface AdminPayload {
  username: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export function hashPassword(password: string): string {
  return crypto.scryptSync(password, SCRYPT_SALT, 64).toString('hex');
}

export async function verifyCredentials(password: string, username?: string): Promise<boolean> {
  if (username && username.trim().toLowerCase() !== ADMIN_USERNAME.toLowerCase()) {
    return false;
  }

  if (ADMIN_PASSWORD_HASH.startsWith('$2')) {
    try {
      return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    } catch {
      // fallback
    }
  }

  try {
    const computed = hashPassword(password);
    const target = Buffer.from(ADMIN_PASSWORD_HASH, 'hex');
    const actual = Buffer.from(computed, 'hex');
    if (target.length !== actual.length) return false;
    return crypto.timingSafeEqual(target, actual);
  } catch (err) {
    return false;
  }
}

export function signToken(username: string): string {
  return jwt.sign(
    { username, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (err) {
    return null;
  }
}

export function getAdminSession(): AdminPayload | null {
  const cookieStore = cookies();
  const token = cookieStore.get('chef_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
