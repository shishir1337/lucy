export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for the awareness platform.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-6 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          We value the privacy and security of everyone who contributes information to this awareness platform. This policy explains how we handle the information you provide.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Information We Collect</h2>
        <p className="text-gray-700 mb-2">When you submit data to this website, we may collect the following details:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Name (used only for verification purposes)</li>
          <li>Mobile number (used to prevent duplicate entries)</li>
          <li>Total amount of money reported as outstanding</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Information We Display Publicly</h2>
        <p className="text-gray-700 mb-2">We only display aggregated totals on the website, such as:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>The total number of reported victims</li>
          <li>The total amount of money reported</li>
        </ul>
        <p className="text-gray-700 mb-4 font-medium">⚠️ We never display or share individual names or phone numbers publicly.</p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. How We Use Your Data</h2>
        <p className="text-gray-700 mb-2">The data you provide is used only for:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Verifying the authenticity of submissions</li>
          <li>Preventing duplicate entries</li>
          <li>Calculating accurate totals for awareness reporting</li>
        </ul>
        <p className="text-gray-700 mb-2">Your data is not used for:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Marketing or promotional activities</li>
          <li>Sales or commercial purposes</li>
          <li>Legal proceedings, lawsuits, or law enforcement cases</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Data Protection</h2>
        <p className="text-gray-700 mb-4">We are committed to keeping your information safe:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Your personal details remain confidential</li>
          <li>They will never be sold, rented, or disclosed to third parties</li>
          <li>They are used only for internal verification and aggregation</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Voluntary Submissions</h2>
        <p className="text-gray-700 mb-4">By submitting your information, you agree that:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Your details will be used only for awareness and aggregation purposes</li>
          <li>They will not be used for marketing, legal action, or commercial use</li>
          <li>You understand that the website is based on fictional characters and entities</li>
        </ul>
      </div>
    </div>
  )
}
