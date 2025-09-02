import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">৪০৪</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          পেজ পাওয়া যায়নি
        </h2>
        <p className="text-gray-600 mb-8">
          আপনি যে পেজ খুঁজছেন তা পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          মূল পেজে ফিরে যান
        </Link>
      </div>
    </div>
  )
}
