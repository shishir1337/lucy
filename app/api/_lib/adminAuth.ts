import crypto from 'crypto'
import { cookies } from 'next/headers'

const ADMIN_COOKIE_NAME = 'admin_session'

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

export function computeAdminSignature(): string {
  const pin = requireEnv('ADMIN_PIN')
  // Bind the signature to deployment URL to reduce reuse across environments
  const salt = process.env.NEXT_PUBLIC_SUPABASE_URL || 'local'
  return crypto.createHash('sha256').update(`${pin}::${salt}`).digest('hex')
}

export async function setAdminCookie() {
  const store = await cookies()
  const sig = computeAdminSignature()
  store.set(ADMIN_COOKIE_NAME, sig, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 12, // 12 hours
  })
}

export async function clearAdminCookie() {
  const store = await cookies()
  store.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: 0,
  })
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies()
  const c = store.get(ADMIN_COOKIE_NAME)
  if (!c) return false
  return c.value === computeAdminSignature()
}


