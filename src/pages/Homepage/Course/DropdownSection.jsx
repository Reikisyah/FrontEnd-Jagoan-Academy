import React, { useState } from 'react'

function DropdownSection({ section }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b last:border-b-0 border-gray-200">
      <button
        className="w-full flex items-center justify-between px-0 pl-2 sm:pl-8 pr-4 sm:pr-12 py-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-5 flex-1">
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span className="font-semibold text-lg text-gray-900 text-left">
            {section.title}
          </span>
        </span>
        <span className="text-gray-700 text-base font-normal">
          {section.lessons} pelajaran &bull; {section.duration}
        </span>
      </button>
      {open && (
        <div className="bg-white px-8 py-4 text-gray-700 text-base border-t border-gray-100">
          <ul className="list-disc pl-5">
            <li>Contoh materi pelajaran 1</li>
            <li>Contoh materi pelajaran 2</li>
            <li>Contoh materi pelajaran 3</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownSection
