import { NextResponse } from 'next/server'
import { isAdminRequest } from '../_lib/adminAuth'
import { createAdminClient } from '@/utils/supabase/admin'

export async function GET(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const searchName = url.searchParams.get('name')?.trim() || ''
  const searchPhone = url.searchParams.get('phone')?.trim() || ''

  const supabase = createAdminClient()
  let query = supabase
    .from('scam_victims')
    .select('*')
    .order('created_at', { ascending: false })

  if (searchName) {
    query = query.ilike('name', `%${searchName}%`)
  }
  if (searchPhone) {
    query = query.ilike('phone', `%${searchPhone}%`)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}


