import React from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'

const resources = [
  { name: 'Panduan LMS', type: 'PDF', link: '#' },
  { name: 'Video Tutorial', type: 'Video', link: '#' },
  { name: 'Contoh Gambar', type: 'Image', link: '#' },
  { name: 'Template Materi', type: 'PDF', link: '#' },
]

const Resources = () => (
  <div className="flex min-h-screen bg-white">
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-pink-700 mb-4">Resources</h1>
          <p className="mb-8 text-gray-600">
            Kumpulan resource dan materi pendukung untuk pembelajaran.
          </p>
          <ul className="space-y-4">
            {resources.map((res, idx) => (
              <li
                key={idx}
                className="bg-pink-50 rounded-xl p-4 shadow flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-pink-700">{res.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{res.type}</div>
                </div>
                <a
                  href={res.link}
                  className="text-blue-600 underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default Resources
