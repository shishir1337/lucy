export const metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for the awareness platform.',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-6 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Disclaimer</h1>

        <p className="text-gray-700 mb-4">
          The names <strong>Farhana Haque Lucy</strong> and <strong>Pretty Please</strong> used on this website refer to fictional characters and entities created solely for illustrative and awareness purposes.
        </p>
        <p className="text-gray-700 mb-4">
          These names are not based on any real persons, businesses, or organizations. Any resemblance to actual individuals, companies, or events is purely coincidental and unintentional.
        </p>
        <p className="text-gray-700 mb-4">
          The sole purpose of this platform is to create public awareness regarding financial frauds and scams in general. For this reason, the website displays only aggregated data, such as:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>The total number of people who submitted information</li>
          <li>The total amount of money reported as outstanding</li>
        </ul>
        <p className="text-gray-700 mb-4">This platform does not:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Make or support any legal claims or accusations against any real individual or business</li>
          <li>Provide data or evidence for lawsuits, police cases, or legal investigations</li>
          <li>Engage in marketing, sales, or any commercial activities</li>
        </ul>
        <p className="text-gray-700 mb-4">
          All characters, names, and entities presented on this website are entirely fictitious and should be interpreted only as part of an awareness initiative.
        </p>
        <p className="text-gray-700 mb-4">By visiting and using this website, you acknowledge and agree that:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>The names Farhana Haque Lucy and Pretty Please are fictional</li>
          <li>The displayed information is for awareness purposes only</li>
          <li>This platform bears no responsibility for assumptions, interpretations, or misuse of the data</li>
        </ul>
      </div>
    </div>
  )
}
