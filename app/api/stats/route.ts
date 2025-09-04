import { NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function GET() {
  // Use anon client via REST/RPC would also work, but here we compute safely on server
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('scam_victims')
    .select('total_amount')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const totalVictims = data?.length || 0
  const totalAmount = data?.reduce((sum, r) => sum + Number(r.total_amount || 0), 0) || 0
  return NextResponse.json({ totalVictims, totalAmount })
}


