import { NextResponse } from 'next/server'
import { setAdminCookie } from '../../_lib/adminAuth'

export async function POST(request: Request) {
  const { pin } = await request.json().catch(() => ({ pin: '' }))
  const expected = process.env.ADMIN_PIN
  if (!expected) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }
  if (pin !== expected) {
    return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
  }
  await setAdminCookie()
  return NextResponse.json({ ok: true })
}


