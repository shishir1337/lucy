import { NextResponse } from 'next/server'
import { clearAdminCookie } from '../../_lib/adminAuth'

export async function POST() {
  await clearAdminCookie()
  return NextResponse.json({ ok: true })
}


