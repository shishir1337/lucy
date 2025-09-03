'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/utils/supabase/client'
import { ScamVictim, ScamVictimInput } from '@/types/database'

export default function Home() {
  const [formData, setFormData] = useState<ScamVictimInput>({
    name: '',
    phone: '',
    total_amount: 0
  })
  const [victims, setVictims] = useState<ScamVictim[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Add viewport meta tag for mobile optimization
  useEffect(() => {
    // Ensure proper viewport scaling on mobile
    const viewport = document.querySelector('meta[name="viewport"]')
    if (!viewport) {
      const meta = document.createElement('meta')
      meta.name = 'viewport'
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      document.head.appendChild(meta)
    }
  }, [])

  // Fetch data on component mount
  useEffect(() => {
    fetchVictims()
  }, [])

  // Calculate total amount whenever victims data changes
  useEffect(() => {
    const total = victims.reduce((sum, victim) => sum + victim.total_amount, 0)
    setTotalAmount(total)
  }, [victims])

  const fetchVictims = async () => {
    try {
      const { data, error } = await supabase
        .from('scam_victims')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setVictims(data || [])
    } catch (error) {
      console.error('Error fetching victims:', error)
      toast.error('ডেটা লোড করতে সমস্যা হয়েছে')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.phone.trim() || formData.total_amount <= 0) {
      toast.error('সব তথ্য সঠিকভাবে পূরণ করুন')
      return
    }

    // Validate phone number format (must start with 01 and be exactly 11 digits)
    if (!/^01\d{9}$/.test(formData.phone)) {
      toast.error('ফোন নম্বর ০১ দিয়ে শুরু হয়ে ঠিক ১১টি সংখ্যা হতে হবে')
      return
    }

    setIsSubmitting(true)

    try {
      // Check if phone number already exists in database
      const { data: existingVictim, error: checkError } = await supabase
        .from('scam_victims')
        .select('id, name, total_amount')
        .eq('phone', formData.phone)
        .single()

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw checkError
      }

      if (existingVictim) {
        // Phone number already exists
        toast.error(
          `এই ফোন নম্বরটি ইতিমধ্যে জমা হয়েছে।`,
          {
            duration: 6000, // Show for 6 seconds
            action: {
              label: 'ঠিক আছে',
              onClick: () => {}
            }
          }
        )
        setIsSubmitting(false)
        return
      }

      // If no duplicate found, proceed with insertion
      const { error } = await supabase
        .from('scam_victims')
        .insert([formData])

      if (error) throw error

      toast.success(
        `আপনার তথ্য সফলভাবে জমা হয়েছে! 
        নাম: ${formData.name}, 
        পরিমাণ: ৳${formatNumber(formData.total_amount)}`,
        {
          duration: 5000,
          action: {
            label: 'ধন্যবাদ',
            onClick: () => {}
          }
        }
      )
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        total_amount: 0
      })

      // Refresh data
      fetchVictims()
    } catch (error) {
      console.error('Error in form submission:', error)
      toast.error('তথ্য জমা করতে সমস্যা হয়েছে')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('bn-BD').format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 mb-3 sm:mb-4 leading-tight px-2">
            আপনি ফারহনা হক লুসি এর কাছে থেকে কত টাকা পাবেন
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-3 leading-relaxed">
            যদি আপনার ফারহনা হক লুসির কাছে টাকা পাওনা থাকে, অনুগ্রহ করে আপনার তথ্য আমাদের সাথে শেয়ার করুন। 
            আসুন, আমরা সবাই মিলে জেনে নেই কতজন মানুষ এভাবে ক্ষতিগ্রস্ত হয়েছেন।
          </p>
        </div>

        {/* Total Amount Display */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">
            মোট ক্ষতিগ্রস্ত টাকার পরিমাণ
          </h2>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-600 mb-2 leading-none px-2">
            ৳{formatNumber(totalAmount)}
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            মোট <span className="font-semibold text-red-600">{victims.length}</span> জন ব্যক্তি ক্ষতিগ্রস্ত
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6 text-center">
            আপনার তথ্য জমা দিন
          </h2>
          
          <p className="text-sm text-gray-600 text-center mb-4 sm:mb-6">
            প্রতিটি ফোন নম্বর শুধুমাত্র একবার জমা করা যাবে
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                নাম
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                placeholder="আপনার নাম লিখুন"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                ফোন নম্বর
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers and limit to 11 digits
                  if (/^\d{0,11}$/.test(value)) {
                    setFormData({ ...formData, phone: value });
                  }
                }}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                placeholder="আপনার ফোন নম্বর"
                pattern="01\d{9}"
                maxLength={11}
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                মোট টাকার পরিমাণ
              </label>
              <input
                type="number"
                id="amount"
                value={formData.total_amount || ''}
                onChange={(e) => setFormData({ ...formData, total_amount: Number(e.target.value) })}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                placeholder="টাকার পরিমাণ"
                min="0"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base sm:text-lg active:scale-95"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>জমা হচ্ছে...</span>
                </div>
              ) : (
                'তথ্য জমা করুন'
              )}
            </button>
          </form>
        </div>

        {/* Recent Submissions */}
        {/* {victims.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              সাম্প্রতিক জমাকৃত তথ্য
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">নাম</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">ফোন</th>
                    <th className="text-left py-3 px-4 font-semibold text-red-600">টাকার পরিমাণ</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">তারিখ</th>
                  </tr>
                </thead>
                <tbody>
                  {victims.slice(0, 10).map((victim) => (
                    <tr key={victim.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{victim.name}</td>
                      <td className="py-3 px-4">{victim.phone}</td>
                      <td className="py-3 px-4 font-semibold text-red-600">
                        ৳{formatNumber(victim.total_amount)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(victim.created_at).toLocaleDateString('bn-BD')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )} */}
        
        {/* Mobile-optimized footer */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-500 px-4 mb-1">
            এই তথ্যগুলো শুধু দেখানোর জন্য, মানুষ কত টাকা ক্ষতিগ্রস্ত হয়েছে এবং এখনো কত টাকা ফেরত পাওয়ার বাকি আছে।
          </p>
          <p className="text-xs sm:text-sm text-gray-500 px-4 mb-1">
            সবার ব্যক্তিগত তথ্য (যেমন নাম বা মোবাইল নম্বর) গোপন রাখা হচ্ছে।
          </p>
          <p className="text-xs sm:text-sm text-gray-500 px-4">
            এগুলো কোনো আইনি কাজে ব্যবহার করা হবে না। শুধু সচেতনতা বাড়ানো এবং মোট কত টাকা ক্ষতি হয়েছে তার হিসাব বোঝার জন্য এই তথ্য রাখা হচ্ছে।
          </p>
          {/* <a 
            href="/data" 
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            ডেটা প্রবেশ →
          </a> */}
          <div className="mt-3">
            <a 
              href="/disclaimer" 
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 mr-3"
            >
              Disclaimer
            </a>
            <span className="text-gray-300">•</span>
            <a 
              href="/privacy" 
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-3"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
