'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { ScamVictim } from '@/types/database'

export default function DataPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [victims, setVictims] = useState<ScamVictim[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [searchPhone, setSearchPhone] = useState('')

  // Check localStorage for existing authentication on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('lucy_admin_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Save authentication state to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('lucy_admin_auth', 'true')
    } else {
      localStorage.removeItem('lucy_admin_auth')
    }
  }, [isAuthenticated])

  // Fetch data when authenticated
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isAuthenticated) {
      fetchVictims()
    }
  }, [isAuthenticated])

  // Calculate total amount whenever victims data changes
  useEffect(() => {
    const total = victims.reduce((sum, victim) => sum + victim.total_amount, 0)
    setTotalAmount(total)
  }, [victims])

  const fetchVictims = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchName.trim()) params.set('name', searchName.trim())
      if (searchPhone.trim()) params.set('phone', searchPhone.trim())

      const res = await fetch(`/api/victims${params.toString() ? `?${params.toString()}` : ''}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Failed to load data')
      }
      const body = await res.json()
      setVictims(body.data || [])
    } catch (error) {
      console.error('Error fetching victims:', error)
      toast.error('ডেটা লোড করতে সমস্যা হয়েছে')
    } finally {
      setIsLoading(false)
    }
  }

  // Debounce search
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isAuthenticated) return
    const id = setTimeout(() => {
      fetchVictims()
    }, 400)
    return () => clearTimeout(id)
  }, [searchName, searchPhone, isAuthenticated])

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Invalid PIN')
      }
      setIsAuthenticated(true)
      toast.success('সফলভাবে প্রবেশ করা হয়েছে')
    } catch (err) {
      toast.error('ভুল পিন নম্বর')
      setPin('')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {}
    setIsAuthenticated(false)
    setPin('')
    toast.success('সফলভাবে বের হয়েছেন')
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('bn-BD').format(num)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-4 px-3">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
              ডেটা প্রবেশ
            </h1>
            
            <form onSubmit={handlePinSubmit} className="space-y-6">
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                  পিন নম্বর
                </label>
                <input
                  type="password"
                  id="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-lg font-mono"
                  placeholder="****"
                  maxLength={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 active:scale-95"
              >
                প্রবেশ করুন
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-700 mb-3 sm:mb-4">
            ফারহনা হক লুসি - ভিকটিম ডেটা
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            সমস্ত জমাকৃত তথ্যের বিস্তারিত তালিকা
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center">
            <h3 className="text-sm sm:text-base font-medium text-gray-700 mb-2">
              মোট ভিকটিম
            </h3>
            <div className="text-2xl sm:text-3xl font-bold text-red-600">
              {victims.length}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center">
            <h3 className="text-sm sm:text-base font-medium text-gray-700 mb-2">
              মোট ক্ষতিগ্রস্ত টাকা
            </h3>
            <div className="text-2xl sm:text-3xl font-bold text-red-600">
              ৳{formatNumber(totalAmount)}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
              সমস্ত জমাকৃত তথ্য
            </h2>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm w-full sm:w-56"
                placeholder="নাম দিয়ে খুঁজুন"
              />
              <input
                type="text"
                value={searchPhone}
                onChange={(e) => {
                  const v = e.target.value
                  if (/^\d{0,11}$/.test(v)) setSearchPhone(v)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm w-full sm:w-56"
                placeholder="ফোন দিয়ে খুঁজুন"
                maxLength={11}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={fetchVictims}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
              >
                {isLoading ? 'রিফ্রেশ হচ্ছে...' : 'রিফ্রেশ করুন'}
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                বের হন
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">ডেটা লোড হচ্ছে...</p>
            </div>
          ) : victims.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">নাম</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">ফোন নম্বর</th>
                    <th className="text-left py-3 px-4 font-semibold text-red-600">টাকার পরিমাণ</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">জমার তারিখ</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">আইডি</th>
                  </tr>
                </thead>
                <tbody>
                  {victims.map((victim) => (
                    <tr key={victim.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{victim.name}</td>
                      <td className="py-3 px-4 font-mono">{victim.phone}</td>
                      <td className="py-3 px-4 font-semibold text-red-600">
                        ৳{formatNumber(victim.total_amount)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {formatDate(victim.created_at)}
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-400 font-mono">
                        #{victim.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">কোন ডেটা পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
