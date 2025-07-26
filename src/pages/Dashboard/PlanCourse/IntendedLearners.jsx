import React, { useState } from 'react'
import Tab from '../../../components/Tab'
import DashboardHeader from '../../../components/DashboardHeader'
import {
  FaTrash,
  FaGripVertical,
  FaPlus,
  FaLightbulb,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Intended Learners
              </h1>
              <p className="text-gray-600">
                Define your target audience and what they'll learn from your
                course
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Course Setup Progress
                </h3>
                <span className="text-sm text-gray-500">Step 2 of 4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: '50%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Course Info</span>
                <span className="text-pink-600 font-medium">
                  Intended Learners
                </span>
                <span>Curriculum</span>
                <span>Publish</span>
              </div>
            </div>

            {/* Main Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form onSubmit={handleSave} className="space-y-8">
                {/* Learning Objectives Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaLightbulb className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Learning Objectives
                      </h3>
                      <p className="text-gray-500 text-sm">
                        What will students learn in your course? (Minimum 4
                        objectives)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {objectives.map((obj, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-300 transition-colors"
                      >
                        <FaGripVertical className="text-gray-400 flex-shrink-0" />
                        <input
                          type="text"
                          className="flex-1 bg-transparent border-none outline-none text-gray-800 text-base placeholder-gray-500"
                          placeholder={`Learning objective #${idx + 1} (e.g., Master Docker containerization fundamentals)`}
                          value={obj}
                          onChange={(e) =>
                            handleObjectiveChange(idx, e.target.value)
                          }
                        />
                        {objectives.length > minObjectives && (
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            onClick={() => handleRemoveObjective(idx)}
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors"
                      onClick={handleAddObjective}
                    >
                      <FaPlus className="w-4 h-4" />
                      Add another learning objective
                    </button>
                  </div>
                </div>

                {/* Requirements Section */}
                <div className="space-y-6 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaUsers className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Prerequisites & Requirements
                      </h3>
                      <p className="text-gray-500 text-sm">
                        What should students know before taking your course?
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {requirements.map((req, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-300 transition-colors"
                      >
                        <FaGripVertical className="text-gray-400 flex-shrink-0" />
                        <input
                          type="text"
                          className="flex-1 bg-transparent border-none outline-none text-gray-800 text-base placeholder-gray-500"
                          placeholder={`Requirement #${idx + 1} (e.g., Basic programming knowledge)`}
                          value={req}
                          onChange={(e) =>
                            handleRequirementChange(idx, e.target.value)
                          }
                        />
                        {requirements.length > 1 && (
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            onClick={() => handleRemoveRequirement(idx)}
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors"
                      onClick={handleAddRequirement}
                    >
                      <FaPlus className="w-4 h-4" />
                      Add another requirement
                    </button>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    💡 Writing Tips
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>
                        Use action verbs like "Learn", "Master", "Build",
                        "Create"
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Be specific about what students will achieve</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>
                        Keep requirements realistic for your target audience
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Focus on skills and knowledge, not just tools</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
                  >
                    <span>Save & Continue</span>
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default IntendedLearners
