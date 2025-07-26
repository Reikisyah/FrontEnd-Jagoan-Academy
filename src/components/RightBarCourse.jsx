import React, { useState } from 'react'
import { IoChevronDown, IoChevronForward, IoClose } from 'react-icons/io5'

const RightBarCourse = ({
  sections,
  activeSection,
  setActiveSection,
  activeLecture,
  setActiveLecture,
  completedLectures = [],
  isLectureRead = false,
  isSidebarOpen,
  setIsSidebarOpen,
  colorClass = {},
}) => {
  const [openSections, setOpenSections] = useState([activeSection])

  React.useEffect(() => {
    // Hanya tambahkan activeSection jika belum ada di openSections
    if (!openSections.includes(activeSection)) {
      setOpenSections((prev) => [...prev, activeSection])
    }
  }, [activeSection]) // Hapus openSections dari dependency

  const activeSectionClass = colorClass.activeSection || 'bg-pink-50'
  const activeLectureClass =
    colorClass.activeLecture || 'text-pink-600 font-bold'
  const accentClass = colorClass.accent || 'accent-pink-600'

  // Helper: apakah lecture boleh diakses
  const isLectureEnabled = (i, j) => {
    if (i === 0 && j === 0) return true
    const isCompleted = completedLectures.some(
      (c) => c.section === i && c.lecture === j,
    )
    if (isCompleted) return true
    // Cek lecture sebelumnya
    if (j > 0) {
      if (i === activeSection && j === activeLecture + 1) {
        return (
          completedLectures.some(
            (c) => c.section === i && c.lecture === j - 1,
          ) && isLectureRead
        )
      }
      return completedLectures.some(
        (c) => c.section === i && c.lecture === j - 1,
      )
    } else if (i > 0) {
      const prevSection = i - 1
      const prevLecture = sections[prevSection].lectures.length - 1
      if (i === activeSection + 1 && j === 0) {
        return (
          completedLectures.some(
            (c) => c.section === prevSection && c.lecture === prevLecture,
          ) && isLectureRead
        )
      }
      return completedLectures.some(
        (c) => c.section === prevSection && c.lecture === prevLecture,
      )
    }
    return false
  }

  // Helper: summary section
  const getSectionSummary = (sec, i) => {
    const completed = sec.lectures.filter((_, j) =>
      completedLectures.some((c) => c.section === i && c.lecture === j),
    ).length
    const total = sec.lectures.length
    const totalMin = sec.lectures.reduce((sum, lec) => {
      const m = parseInt((lec.duration || '').replace(/[^0-9]/g, '')) || 0
      return sum + m
    }, 0)
    return `${completed}/${total} | ${totalMin}min`
  }

  // Helper: toggle section
  const toggleSection = (sectionIndex) => {
    setOpenSections((prev) => {
      if (prev.includes(sectionIndex)) {
        return prev.filter((s) => s !== sectionIndex)
      } else {
        return [...prev, sectionIndex]
      }
    })
  }

  // Helper: toggle sidebar
  const toggleSidebar = () => {
    console.log('Toggle sidebar clicked, current state:', isSidebarOpen)
    setIsSidebarOpen(!isSidebarOpen)
  }

  console.log('RightBarCourse render - isSidebarOpen:', isSidebarOpen)

  return (
    <div className="hidden md:block w-80 border-l bg-gray-50 p-0 sticky top-0 h-screen overflow-y-auto">
      <div className="sticky top-0 z-20 bg-gray-50 border-b px-6 py-4 flex items-center justify-between mt-16">
        <span className="font-bold text-lg">Course content</span>
        <div className="relative group">
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded hover:bg-gray-200 border border-gray-300"
            onClick={toggleSidebar}
            title="Close panel"
          >
            <IoClose size={18} />
          </button>
          {/* Tooltip */}
          <div className="absolute right-0 top-full mt-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
            Close panel
            <div className="absolute -top-1 right-2 w-2 h-2 bg-black transform rotate-45"></div>
          </div>
        </div>
      </div>
      <div className="divide-y">
        {sections.map((sec, i) => (
          <div key={i}>
            <button
              className={`w-full text-left px-6 py-3 font-semibold text-gray-800 bg-gray-50 hover:bg-pink-50 border-b flex items-center justify-between transition-colors duration-200 ${i === activeSection ? activeSectionClass : ''}`}
              onClick={() => toggleSection(i)}
            >
              <div className="flex flex-col items-start">
                <span>{sec.title}</span>
                <span className="text-xs text-gray-500 font-normal">
                  {getSectionSummary(sec, i)}
                </span>
              </div>
              <span
                className={`ml-2 transition-transform duration-200 ${openSections.includes(i) ? 'rotate-90' : ''}`}
              >
                <IoChevronForward size={16} />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections.includes(i) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="pl-8 pb-2">
                {sec.lectures.map((lec, j) => {
                  const isCompleted = completedLectures.some(
                    (c) => c.section === i && c.lecture === j,
                  )
                  const enabled = isLectureEnabled(i, j)
                  const isActive = i === activeSection && j === activeLecture
                  return (
                    <div
                      key={j}
                      className={`flex items-center gap-2 py-1 cursor-pointer rounded-lg pr-2 transition-all duration-200 ${isActive ? 'bg-pink-50' : ''} ${isActive ? activeLectureClass : 'text-gray-700'} ${!enabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
                      onClick={() => {
                        if (enabled) {
                          setActiveSection(i)
                          setActiveLecture(j)
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        readOnly
                        className={accentClass}
                      />
                      <span>
                        {j + 1}. {lec.title}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {lec.duration}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightBarCourse
