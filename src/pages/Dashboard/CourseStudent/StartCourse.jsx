import React, { useState, useRef, useEffect } from 'react'
import NavbarCourse from '../../../components/NavbarCourse'
import RightBarCourse from '../../../components/RightBarCourse'
import BottomBar from './BottomBar'
import Footer from '../../../components/Footer'

const dummySections = [
  {
    title: 'Section 1: Introduction & Getting Started',
    lectures: [
      {
        title: 'Welcome to the Course!',
        duration: '3min',
        content: `Welcome to this comprehensive course! In this lecture, you will get an overview of what you will learn, how to navigate the course, and tips to get the most out of your learning experience.

We recommend you download the resources and join the community forum for support.

This course is designed for absolute beginners as well as those looking to refresh their web development skills. Throughout the modules, you will find hands-on projects, quizzes, and real-world examples to help you understand each concept deeply.

Here are some tips to maximize your learning:
- Take notes as you go through each lecture.
- Don’t hesitate to pause and replay sections that are unclear.
- Try out the code examples on your own computer.
- Participate in the discussion forums to ask questions and help others.
- Set a regular study schedule and stick to it for consistent progress.

By the end of this course, you will have built your own portfolio website and gained the confidence to tackle more advanced web development topics.

Remember, learning to code is a journey. Celebrate your small wins, stay curious, and don’t be afraid to make mistakes. We’re here to support you every step of the way!

In addition to the main course content, don’t forget to explore the extra resources provided in each section. These include downloadable cheat sheets, recommended reading, and bonus exercises to further strengthen your understanding. Make sure to check the “Announcements” tab regularly for updates, tips, and important information from your instructor.

Our learning platform is equipped with features to help you succeed. Use the “Notes” tab to jot down important points or questions as you watch each lecture. You can also bookmark lectures you find challenging and revisit them anytime. If you ever feel stuck, reach out in the community forum—our mentors and fellow students are always ready to help.

We encourage you to connect with your peers. Collaboration and discussion are key to mastering new skills. Share your progress, ask for feedback on your projects, and don’t hesitate to help others who might be struggling. Remember, teaching is one of the best ways to solidify your own knowledge.

As you progress, set personal goals and celebrate your achievements. Whether it’s completing a module, building your first web page, or helping a classmate, every step forward is a victory. Stay motivated by tracking your progress and rewarding yourself for milestones reached.

Finally, keep an open mind and embrace the challenges ahead. The tech world is always evolving, and continuous learning is the key to long-term success. We’re excited to see what you’ll create and how you’ll grow throughout this journey.

Let’s get started and happy learning!`,
      },
      {
        title: 'How to Use the Platform',
        duration: '7min',
        content:
          'This lecture covers how to use the Jagoan Academy platform, including how to mark lectures as complete, ask questions, and download materials.\n\nIf you have any technical issues, please contact our support team.',
      },
      {
        title: 'Meet Your Instructor',
        duration: '5min',
        content:
          'Get to know your instructor and their background in web development.',
      },
    ],
  },
  {
    title: 'Section 2: Fundamentals of Web Development',
    lectures: [
      {
        title: 'What is Web Development?',
        duration: '12min',
        content:
          'In this lecture, we discuss the basics of web development, the difference between frontend and backend, and the technologies you will encounter.',
      },
      {
        title: 'HTML & CSS Basics',
        duration: '18min',
        content:
          'Learn the building blocks of the web: HTML for structure and CSS for styling.\n\nYou will create your first simple web page and style it with CSS.',
      },
      {
        title: 'JavaScript Essentials',
        duration: '22min',
        content:
          'JavaScript is the language of the web. In this lecture, you will learn about variables, functions, and how to make your web pages interactive.',
      },
      {
        title: 'Developer Tools & Debugging',
        duration: '10min',
        content: 'How to use browser developer tools and debug your code.',
      },
      {
        title: 'Version Control with Git',
        duration: '15min',
        content: 'Introduction to Git and GitHub for managing your code.',
      },
    ],
  },
  {
    title: 'Section 3: Project: Build Your First Website',
    lectures: [
      {
        title: 'Project Overview',
        duration: '5min',
        content:
          'This lecture introduces the final project: building your own portfolio website.\n\nYou will plan your site, choose a design, and set up your project folder.',
      },
      {
        title: 'Step-by-Step: Coding the Homepage',
        duration: '30min',
        content:
          'Follow along as we code the homepage together, adding sections for About, Projects, and Contact.\n\nYou will learn best practices for layout and responsive design.',
      },
      {
        title: 'Adding Interactivity with JavaScript',
        duration: '20min',
        content:
          'Make your site interactive with JavaScript events and DOM manipulation.',
      },
      {
        title: 'Responsive Design',
        duration: '18min',
        content: 'Learn how to make your website look great on all devices.',
      },
      {
        title: 'Deploying Your Website',
        duration: '15min',
        content:
          'Learn how to deploy your finished website to the internet using free hosting services.\n\nCelebrate your achievement and share your site with the world!',
      },
    ],
  },
  {
    title: 'Section 4: JavaScript Deep Dive',
    lectures: [
      {
        title: 'Functions & Scope',
        duration: '14min',
        content: 'Understand JavaScript functions, scope, and closures.',
      },
      {
        title: 'Arrays & Objects',
        duration: '16min',
        content: 'Work with arrays and objects for data management.',
      },
      {
        title: 'Asynchronous JavaScript',
        duration: '20min',
        content: 'Learn about callbacks, promises, and async/await.',
      },
      {
        title: 'APIs & Fetch',
        duration: '18min',
        content: 'How to fetch data from APIs and display it on your site.',
      },
      {
        title: 'Error Handling',
        duration: '10min',
        content: 'Best practices for handling errors in JavaScript.',
      },
      {
        title: 'Mini Project: Weather App',
        duration: '25min',
        content: 'Build a simple weather app using a public API.',
      },
    ],
  },
  {
    title: 'Section 5: Advanced Topics & Tools',
    lectures: [
      {
        title: 'Introduction to Frameworks',
        duration: '12min',
        content: 'Overview of popular frameworks like React, Vue, and Angular.',
      },
      {
        title: 'State Management',
        duration: '15min',
        content: 'How to manage state in modern web apps.',
      },
      {
        title: 'Build Tools & Automation',
        duration: '13min',
        content: 'Intro to build tools like Webpack, Babel, and npm scripts.',
      },
      {
        title: 'Testing Your Code',
        duration: '14min',
        content: 'Basics of unit and integration testing.',
      },
      {
        title: 'Performance Optimization',
        duration: '11min',
        content: 'Tips to make your site faster and more efficient.',
      },
      {
        title: 'Accessibility & SEO',
        duration: '10min',
        content: 'Make your site accessible and search engine friendly.',
      },
    ],
  },
  {
    title: 'Section 6: Bonus & Career Guidance',
    lectures: [
      {
        title: 'Building Your Portfolio',
        duration: '10min',
        content:
          'Tips for creating a standout portfolio, what to include, and how to present your projects to potential employers.',
      },
      {
        title: 'Interview Preparation',
        duration: '15min',
        content: 'How to prepare for web developer interviews.',
      },
      {
        title: 'Freelancing & Remote Work',
        duration: '12min',
        content: 'Getting started with freelancing and finding remote jobs.',
      },
      {
        title: 'Continuous Learning',
        duration: '8min',
        content: 'How to keep your skills sharp and stay up-to-date.',
      },
      {
        title: 'Course Wrap-Up & Next Steps',
        duration: '7min',
        content: 'Summary of what you have learned and where to go next.',
      },
    ],
  },
]

const dummyCourse = {
  title: 'Complete Web Development Bootcamp: From Zero to Hero',
  overview:
    'Master web development from scratch! Learn HTML, CSS, JavaScript, and build real-world projects. This course is designed for absolute beginners and covers everything you need to become a professional web developer.\n\nBy the end of this course, you will have built your own portfolio website and have the skills to create modern, responsive web applications.',
  rating: 4.8,
  ratingCount: 1287,
  students: 10432,
  duration: '12.5 hours',
  lastUpdated: 'July 2023',
}

const dummyNotes = [
  {
    title: 'HTML Structure',
    content:
      'Jangan lupa selalu gunakan <!DOCTYPE html> di awal file HTML. Struktur dasar: html, head, body.',
  },
  {
    title: 'CSS Selector',
    content:
      'Gunakan class dan id selector untuk styling yang lebih spesifik. Contoh: .btn-primary, #main-header.',
  },
  {
    title: 'JavaScript Function',
    content:
      'function greet(name) { return `Hello, ${name}`; } // Fungsi untuk menyapa user.',
  },
]

const dummyAnnouncements = [
  {
    date: '2023-07-10',
    message:
      'Selamat datang di batch baru! Silakan cek materi dan join grup diskusi.',
  },
  {
    date: '2023-07-15',
    message:
      'Live Q&A akan diadakan hari Jumat, jam 19.00 WIB. Siapkan pertanyaan kalian!',
  },
  {
    date: '2023-07-20',
    message:
      'Project submission diperpanjang sampai 25 Juli. Manfaatkan waktu sebaik mungkin.',
  },
]

const dummyReviews = [
  {
    name: 'Andi',
    rating: 5,
    comment: 'Materi sangat lengkap dan mudah dipahami. Mentor responsif!',
  },
  {
    name: 'Siti',
    rating: 4,
    comment:
      'Cocok untuk pemula. Ada beberapa bagian yang terlalu cepat, tapi overall bagus.',
  },
  {
    name: 'Budi',
    rating: 5,
    comment: 'Project akhirnya benar-benar membantu untuk portofolio.',
  },
]

const dummyTools = [
  {
    name: 'Code Editor',
    desc: 'Gunakan VSCode atau Sublime Text untuk pengalaman coding yang nyaman.',
  },
  {
    name: 'Online Playground',
    desc: 'Coba kode HTML/CSS/JS langsung di https://codepen.io atau https://jsfiddle.net.',
  },
  {
    name: 'Image Optimizer',
    desc: 'Optimalkan gambar sebelum upload ke web: https://tinypng.com.',
  },
]

const tabList = [
  'Overview',
  'Notes',
  'Announcements',
  'Reviews',
  'Learning tools',
]

const StartCourse = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [activeLecture, setActiveLecture] = useState(0)
  const [completedLectures, setCompletedLectures] = useState([
    { section: 0, lecture: 0 },
  ])
  const [activeTab, setActiveTab] = useState('Overview')
  const [isLectureRead, setIsLectureRead] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const contentRef = useRef(null)
  const section = dummySections[activeSection]
  const lecture = section.lectures[activeLecture]

  // Hitung progress (0-1) berdasarkan completedLectures
  const totalLectures = dummySections.reduce(
    (sum, sec) => sum + sec.lectures.length,
    0,
  )
  const progress = completedLectures.length / totalLectures

  // Fungsi untuk next/prev
  const isFirstLecture = activeSection === 0 && activeLecture === 0
  const isLastLecture =
    activeSection === dummySections.length - 1 &&
    activeLecture === dummySections[activeSection].lectures.length - 1

  // Pastikan lecture pertama otomatis dianggap sudah dibaca
  useEffect(() => {
    if (activeSection === 0 && activeLecture === 0) {
      setIsLectureRead(true)
    }
  }, [activeSection, activeLecture])

  // Reset isLectureRead saat pindah lecture
  useEffect(() => {
    setIsLectureRead(false)
  }, [activeSection, activeLecture])

  // Scroll handler: jika sudah di bawah, mark as read
  const handleContentScroll = (e) => {
    const el = e.target
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 32) {
      setIsLectureRead(true)
    }
  }

  // Jika konten tidak perlu discroll, otomatis dianggap sudah dibaca
  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current
      if (el.scrollHeight <= el.clientHeight + 2) {
        setIsLectureRead(true)
      }
    }
  }, [activeSection, activeLecture])

  const handlePrev = () => {
    if (activeLecture > 0) {
      setActiveLecture(activeLecture - 1)
    } else if (activeSection > 0) {
      const prevSection = activeSection - 1
      setActiveSection(prevSection)
      setActiveLecture(dummySections[prevSection].lectures.length - 1)
    }
  }

  const handleNext = () => {
    let nextSection = activeSection
    let nextLecture = activeLecture
    if (activeLecture < dummySections[activeSection].lectures.length - 1) {
      nextLecture = activeLecture + 1
    } else if (activeSection < dummySections.length - 1) {
      nextSection = activeSection + 1
      nextLecture = 0
    }
    setActiveSection(nextSection)
    setActiveLecture(nextLecture)
  }

  // Mark as completed jika sudah dibaca (scrolled to bottom)
  useEffect(() => {
    const alreadyCompleted = completedLectures.some(
      (c) => c.section === activeSection && c.lecture === activeLecture,
    )
    if (isLectureRead && !alreadyCompleted) {
      setCompletedLectures([
        ...completedLectures,
        { section: activeSection, lecture: activeLecture },
      ])
    }
    // eslint-disable-next-line
  }, [isLectureRead, activeSection, activeLecture])

  return (
    <>
      <div className="min-h-screen bg-white flex flex-row">
        <div className="fixed top-0 left-0 right-0 z-30">
          <NavbarCourse title={dummyCourse.title} progress={progress} />
        </div>
        {/* Main content kiri */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Section/Lecture content */}
          <div className="flex-1 flex flex-col">
            <div
              className="flex-1 w-full max-h-[calc(100vh-120px)] min-h-[650px] md:min-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 pt-20 pb-8 flex flex-col justify-between h-full"
              ref={contentRef}
              onScroll={handleContentScroll}
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-left">
                  {lecture.title}
                </h2>
                <div className="text-gray-700 text-lg mb-8 whitespace-pre-line text-left">
                  {lecture.content}
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={isFirstLecture}
                  className={`px-6 py-2 rounded font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={isLastLecture || !isLectureRead}
                  className={`px-6 py-2 rounded font-semibold border border-pink-500 bg-pink-500 text-white hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
          {/* Tab navigasi bawah */}
          <BottomBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabList={tabList}
            dummyCourse={dummyCourse}
            dummyNotes={dummyNotes}
            dummyAnnouncements={dummyAnnouncements}
            dummyReviews={dummyReviews}
            dummyTools={dummyTools}
          />
        </div>
        {/* Sidebar kanan */}
        <RightBarCourse
          sections={dummySections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          activeLecture={activeLecture}
          setActiveLecture={setActiveLecture}
          completedLectures={completedLectures}
          isLectureRead={isLectureRead}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          colorClass={{
            activeSection: 'bg-pink-50',
            activeLecture: 'text-pink-600 font-bold',
            accent: 'accent-pink-600',
          }}
        />
      </div>
      <Footer />
    </>
  )
}

export default StartCourse
