import React from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'

const discussions = [
  { title: 'Bagaimana cara submit tugas?', author: 'Mentor1', replies: 3 },
  { title: 'Tips belajar efektif di LMS', author: 'Admin', replies: 5 },
  { title: 'Jadwal webinar berikutnya?', author: 'Participant1', replies: 2 },
]

const Discussions = () => (
  <div className="flex min-h-screen bg-white">
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-pink-700 mb-4">Discussions</h1>
          <p className="mb-8 text-gray-600">
            Diskusi seputar kursus, tugas, dan pengalaman belajar.
          </p>
          <ul className="space-y-4">
            {discussions.map((d, idx) => (
              <li key={idx} className="bg-pink-50 rounded-xl p-4 shadow">
                <div className="font-semibold text-pink-700">{d.title}</div>
                <div className="text-gray-600 text-sm">
                  Oleh: {d.author} &middot; {d.replies} balasan
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default Discussions
