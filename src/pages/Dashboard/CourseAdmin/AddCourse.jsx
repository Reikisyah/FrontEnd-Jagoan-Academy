import React from 'react'

const AddCourse = ({
  form,
  formError,
  formLoading,
  addStep,
  totalAddSteps,
  handleFormChange,
  handleFormSubmit,
  handleNextAddStep,
  handleBackAddStep,
  closeModal,
  showAdd,
}) => {
  if (!showAdd) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
          onClick={closeModal}
        >
          ×
        </button>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-pink-700 font-bold">
              Step {addStep} of {totalAddSteps}
            </span>
            <span className="font-bold text-pink-700 text-lg">Add Course</span>
          </div>
          <div className="w-full h-2 bg-pink-100 rounded-full mb-4">
            <div
              className="h-2 bg-pink-500 rounded-full transition-all duration-300"
              style={{
                width: `${((addStep - 1) / (totalAddSteps - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          {addStep === 1 && (
            <div>
              <label className="font-semibold mb-1 block">Course Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="e.g., Learn Advanced JavaScript"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full"
                required
                autoFocus
              />
              <div className="text-gray-500 text-sm mt-1">
                Name your course. You can change this later.
              </div>
            </div>
          )}
          {addStep === 2 && (
            <div>
              <label className="font-semibold mb-1 block">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="What will students learn in your course?"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full"
                rows={3}
                required
              />
            </div>
          )}
          {addStep === 3 && (
            <div>
              <label className="font-semibold mb-1 block">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleFormChange}
                placeholder="Select a category"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full"
                required
              />
              <label className="font-semibold mb-1 block mt-3">
                Sub Category
              </label>
              <input
                type="text"
                name="sub_category"
                value={form.sub_category}
                onChange={handleFormChange}
                placeholder="Sub Category (optional)"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full"
              />
            </div>
          )}
          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          {addStep === totalAddSteps && (
            <div>
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                disabled={formLoading}
              >
                {formLoading ? 'Saving...' : 'Add'}
              </button>
            </div>
          )}
          {addStep < totalAddSteps && (
            <button
              type="button"
              className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
              onClick={handleNextAddStep}
              disabled={formLoading}
            >
              Next
            </button>
          )}
          {addStep > 1 && (
            <button
              type="button"
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              onClick={handleBackAddStep}
              disabled={formLoading}
            >
              Back
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddCourse
