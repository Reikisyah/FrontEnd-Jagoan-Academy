import React, { useState } from 'react'
import Tab from '../../../components/Tab'
import DashboardHeader from '../../../components/DashboardHeader'
import { FaTrash, FaGripVertical, FaPlus } from 'react-icons/fa'
import { updateCourse } from '../../../utils/api/courseApi'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const minObjectives = 4

const IntendedLearners = () => {
  const [objectives, setObjectives] = useState(['', '', '', ''])
  const [requirements, setRequirements] = useState([''])

  // Handler untuk input objectives
  const handleObjectiveChange = (idx, value) => {
    setObjectives((prev) => prev.map((o, i) => (i === idx ? value : o)))
  }
  const handleAddObjective = () => setObjectives([...objectives, ''])
  const handleRemoveObjective = (idx) => {
    if (objectives.length > minObjectives) {
      setObjectives(objectives.filter((_, i) => i !== idx))
    }
  }

  // Handler untuk input requirements
  const handleRequirementChange = (idx, value) => {
    setRequirements((prev) => prev.map((r, i) => (i === idx ? value : r)))
  }
  const handleAddRequirement = () => setRequirements([...requirements, ''])
  const handleRemoveRequirement = (idx) => {
    setRequirements(requirements.filter((_, i) => i !== idx))
  }

  // Drag & drop (dummy, bisa diintegrasi react-beautiful-dnd jika perlu)
  // ...

  // Pastikan handleSave async
  const handleSave = async (e) => {
    e.preventDefault()
    const lastCourse = localStorage.getItem('lastCourse')
    const course = lastCourse ? JSON.parse(lastCourse) : null
    if (!course?.id) {
      await Swal.fire({
        icon: 'error',
        title:
          'Course ID tidak ditemukan. Silakan mulai dari halaman Course Admin.',
        confirmButtonColor: '#e11d48',
        customClass: { popup: 'rounded-xl' },
      })
      return
    }
    try {
      const payload = {
        requirements: requirements.filter((r) => r.trim() !== ''),
        course_objectives: objectives.filter((o) => o.trim() !== ''),
      }
      await updateCourse(course.id, payload)
      await Swal.fire({
        icon: 'success',
        title: 'Intended learners berhasil disimpan!',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal menyimpan intended learners',
        text: err.message,
        confirmButtonColor: '#e11d48',
        customClass: { popup: 'rounded-xl' },
      })
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-pink-50">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex items-center justify-center py-8 px-2">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-2xl w-full mx-auto">
            <h2 className="text-2xl font-bold mb-2">Intended learners</h2>
            <p className="text-gray-500 mb-8">
              The following descriptions will be publicly visible on your Course
              Landing Page and will have a direct impact on your course
              performance. These descriptions will help learners decide if your
              course is right for them.
            </p>
            <form onSubmit={handleSave}>
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-2">
                  What will students learn in your course?
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  You must enter at least 4 learning objectives or outcomes that
                  learners can expect to achieve after completing your course.
                </p>
                <div className="flex flex-col gap-3">
                  {objectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-2"
                    >
                      <FaGripVertical className="text-gray-300 mr-2" />
                      <input
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-gray-800 text-base"
                        placeholder={`Learning objective #${idx + 1}`}
                        value={obj}
                        onChange={(e) =>
                          handleObjectiveChange(idx, e.target.value)
                        }
                      />
                      {objectives.length > minObjectives && (
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveObjective(idx)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-pink-600 mt-2"
                    onClick={handleAddObjective}
                  >
                    <FaPlus className="text-gray-400" /> Add more to your
                    response
                  </button>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-2">
                  What are the requirements or prerequisites for taking your
                  course?
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  List the required skills, experience, tools or equipment
                  learners should have prior to taking your course. If there are
                  no requirements, use this space as an opportunity to lower the
                  barrier for beginners.
                </p>
                <div className="flex flex-col gap-3">
                  {requirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-2"
                    >
                      <FaGripVertical className="text-gray-300 mr-2" />
                      <input
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-gray-800 text-base"
                        placeholder={`Requirement #${idx + 1}`}
                        value={req}
                        onChange={(e) =>
                          handleRequirementChange(idx, e.target.value)
                        }
                      />
                      {requirements.length > 1 && (
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveRequirement(idx)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-pink-600 mt-2"
                    onClick={handleAddRequirement}
                  >
                    <FaPlus className="text-gray-400" /> Add more to your
                    response
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-2 rounded-lg shadow text-base"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntendedLearners
