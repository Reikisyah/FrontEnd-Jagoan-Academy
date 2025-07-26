import React from 'react'

const OverviewSection = ({ dummyCourse }) => (
  <div>
    <div className="font-bold text-2xl mb-4">{dummyCourse.title}</div>
    <div className="flex flex-wrap gap-8 items-center text-base mb-2">
      <span className="flex items-center gap-1 text-yellow-700 font-bold text-lg">
        <span>★</span> {dummyCourse.rating}
      </span>
      <span>{dummyCourse.ratingCount} ratings</span>
      <span>{dummyCourse.students} Students</span>
      <span>{dummyCourse.duration} Total</span>
    </div>
    <div className="text-xs text-gray-400 mb-4">
      Last updated {dummyCourse.lastUpdated}
    </div>
    <div className="mb-6">
      <span className="inline-block bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded mr-2">
        English
      </span>
      <span className="inline-block bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded">
        English [Auto]
      </span>
    </div>
    {/* Schedule learning time box */}
    <div className="border rounded-lg p-5 mb-6 flex flex-col md:flex-row md:items-center gap-4 bg-white">
      <div className="flex-1">
        <div className="font-semibold mb-1 flex items-center gap-2">
          <span className="inline-block text-2xl">⏲️</span> Schedule learning
          time
        </div>
        <div className="text-sm text-gray-600">
          Learning a little each day adds up. Research shows that students who
          make learning a habit are more likely to reach their goals. Set time
          aside to learn and get reminders using your learning scheduler.
        </div>
      </div>
      <div className="flex gap-2">
        <button className="bg-pink-600 text-white px-4 py-2 rounded font-semibold">
          Get started
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded font-semibold text-gray-700">
          Dismiss
        </button>
      </div>
    </div>
    {/* By the numbers & Features */}
    <div className="flex flex-wrap gap-8 mb-6 text-sm">
      <div>
        <div className="font-semibold mb-1">By the numbers</div>
        <div>Skill level: All Levels</div>
        <div>Students: {dummyCourse.students}</div>
        <div>Languages: English</div>
        <div>Captions: Yes</div>
      </div>
      <div>
        <div className="font-semibold mb-1">Lectures: 30</div>
        <div>Video: 2 total hours</div>
      </div>
      <div>
        <div className="font-semibold mb-1">Features</div>
        <div>
          Available on{' '}
          <a href="#" className="text-pink-600 underline">
            iOS
          </a>{' '}
          and{' '}
          <a href="#" className="text-pink-600 underline">
            Android
          </a>
        </div>
      </div>
    </div>
    {/* Description */}
    <div>
      <div className="font-semibold mb-1">Description</div>
      <div className="whitespace-pre-line text-gray-700">
        {dummyCourse.description || dummyCourse.overview}
      </div>
    </div>
  </div>
)

const NotesSection = () => (
  <div className="max-w-2xl mx-auto">
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <input
        type="text"
        className="border rounded px-3 py-2 flex-1 bg-gray-50"
        placeholder="Create a new note at 0:00"
        disabled
      />
      <button
        className="bg-pink-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-1"
        disabled
      >
        <span className="text-lg font-bold">+</span>
      </button>
    </div>
    <div className="flex gap-2 mb-8">
      <select className="border rounded px-3 py-2 text-sm" disabled>
        <option>All lectures</option>
      </select>
      <select className="border rounded px-3 py-2 text-sm" disabled>
        <option>Sort by most recent</option>
      </select>
    </div>
    <div className="text-center text-gray-500 mt-16">
      Click the "Create a new note" box, the "+" button, or press "B" to make
      your first note.
    </div>
  </div>
)

const AnnouncementsSection = () => (
  <div className="text-center py-16">
    <div className="text-2xl font-bold mb-2">No announcements posted yet</div>
    <div className="text-gray-500 max-w-xl mx-auto">
      The instructor hasn’t added any announcements to this course yet.
      Announcements are used to inform you of updates or additions to the
      course.
    </div>
  </div>
)

const ReviewsSection = ({ dummyCourse, dummyReviews }) => (
  <div className="max-w-3xl mx-auto">
    {/* Summary */}
    <div className="mb-8">
      <div className="font-bold text-xl mb-2">Student feedback</div>
      <div className="flex items-center gap-6 mb-2">
        <span className="text-4xl font-bold text-yellow-700">
          {dummyCourse.rating}
        </span>
        <span className="text-lg">Course Rating</span>
      </div>
      {/* Bar rating dummy */}
      <div className="flex flex-col gap-1 mb-4">
        {[5, 4, 3, 2, 1].map((star, idx) => (
          <div key={star} className="flex items-center gap-2">
            <span className="text-yellow-700">{'★'.repeat(star)}</span>
            <div className="bg-gray-200 h-2 rounded w-48">
              <div
                className="bg-pink-400 h-2 rounded"
                style={{ width: `${[60, 31, 6, 2, 1][idx]}%` }}
              ></div>
            </div>
            <span className="text-xs text-pink-600 underline cursor-pointer">
              {[60, 31, 6, 2, 1][idx]}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 flex-1"
          placeholder="Search reviews"
          disabled
        />
        <button className="bg-pink-600 px-4 py-2 rounded text-white" disabled>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              stroke="#fff"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </button>
        <select className="border rounded px-3 py-2 text-sm" disabled>
          <option>All ratings</option>
        </select>
      </div>
    </div>
    {/* List reviews */}
    <div className="space-y-6">
      {dummyReviews.map((r, idx) => (
        <div key={idx} className="border-b pb-4 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600">
            {r.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{r.name}</span>
              <span className="text-yellow-700">{'★'.repeat(r.rating)}</span>
              <span className="text-xs text-gray-400">a month ago</span>
            </div>
            <div>{r.comment}</div>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <button className="flex items-center gap-1" disabled>
                <span>👍</span> Helpful
              </button>
              <button className="flex items-center gap-1" disabled>
                <span>👎</span> Not helpful
              </button>
              <button className="text-pink-600 underline" disabled>
                Report
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const LearningToolsSection = () => (
  <div className="max-w-2xl mx-auto text-center py-16">
    <div className="font-bold text-2xl mb-2">Learning reminders</div>
    <div className="text-gray-500 mb-6">
      Set up push notifications or calendar events to stay on track for your
      learning goals.
    </div>
    <button
      className="bg-pink-600 text-white px-5 py-2 rounded font-semibold flex items-center gap-2 mx-auto"
      disabled
    >
      <span className="text-lg font-bold">+</span> Add a learning reminder
    </button>
  </div>
)

const BottomBar = ({
  activeTab,
  setActiveTab,
  tabList,
  dummyCourse,
  dummyNotes,
  dummyAnnouncements,
  dummyReviews,
  dummyTools,
}) => {
  return (
    <div className="bg-white border-t shadow-sm mt-1">
      <div className="px-8">
        <div className="flex gap-6 pt-4 pb-2">
          {tabList.map((tab) => (
            <button
              key={tab}
              className={`font-semibold px-2 pb-1 border-b-2 transition-all ${activeTab === tab ? 'border-pink-600 text-pink-600' : 'border-transparent text-gray-500 hover:text-pink-600'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="py-4 text-gray-700 text-base">
          {activeTab === 'Overview' && (
            <OverviewSection dummyCourse={dummyCourse} />
          )}
          {activeTab === 'Notes' && <NotesSection />}
          {activeTab === 'Announcements' && <AnnouncementsSection />}
          {activeTab === 'Reviews' && (
            <ReviewsSection
              dummyCourse={dummyCourse}
              dummyReviews={dummyReviews}
            />
          )}
          {activeTab === 'Learning tools' && <LearningToolsSection />}
          {activeTab !== 'Overview' &&
            !['Notes', 'Announcements', 'Reviews', 'Learning tools'].includes(
              activeTab,
            ) && (
              <div className="italic text-gray-400">
                Dummy content for {activeTab}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default BottomBar
