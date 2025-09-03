"use client"

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/utils/supabase/client'

type PresenceState = {
  [key: string]: Array<{ id: string }>
}

export default function LiveVisitorCount() {
  const [count, setCount] = useState<number>(1)
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  useEffect(() => {
    const channel = supabase.channel('online_users', {
      config: {
        presence: {
          key: crypto.randomUUID(),
        },
      },
    })

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<PresenceState>()
        const total = Object.values(state).reduce((sum, users) => sum + users.length, 0)
        setCount(total || 1)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ id: crypto.randomUUID() })
        }
      })

    channelRef.current = channel

    return () => {
      channel.untrack()
      supabase.removeChannel(channel)
      channelRef.current = null
    }
  }, [])

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-700 border border-red-200 px-3 py-1 text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      <span>লাইভ দর্শনার্থী: {count}</span>
    </div>
  )
}


