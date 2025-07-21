import React, { useEffect, useRef } from "react";

const testimonials = [
  {
    text: "Learning at Jagoan Academy has been a game-changer for my career. The courses are well-structured and the instructors are incredibly knowledgeable.",
    name: "Sarah Johnson",
    role: "Software Developer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    text: "The hands-on projects and industry-relevant content have prepared me well for my career. The platform is user-friendly.",
    name: "James Brown",
    role: "Web Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    text: "The flexible learning schedule makes it easy for me to balance work and education. Highly recommend!",
    name: "Michael Chen",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg"
  },
  {
    text: "I love the practical projects and real-world case studies. The instructors are always available to help.",
    name: "David Kim",
    role: "Data Scientist",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    text: "Materi yang diajarkan sangat relevan dengan kebutuhan industri saat ini. Saya merasa lebih percaya diri setelah mengikuti kursus ini.",
    name: "Ayu Lestari",
    role: "Frontend Developer",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    text: "Instruktur sangat responsif dan selalu membantu jika ada kesulitan. Platformnya juga mudah digunakan.",
    name: "Rizky Pratama",
    role: "Backend Developer",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg"
  },
  {
    text: "Saya suka dengan studi kasus yang diberikan, sangat aplikatif dan menambah wawasan baru.",
    name: "Dewi Anggraini",
    role: "Mobile Developer",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    text: "Belajar di Jagoan Academy membuat saya lebih siap menghadapi dunia kerja. Materinya up-to-date dan mudah dipahami.",
    name: "Andi Wijaya",
    role: "Fullstack Developer",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg"
  },
  {
    text: "Sistem pembelajaran sangat interaktif dan mudah diikuti. Saya sangat merekomendasikan!",
    name: "Putri Maharani",
    role: "QA Engineer",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg"
  },
  {
    text: "Banyak latihan soal yang membantu saya memahami materi lebih dalam.",
    name: "Budi Santoso",
    role: "DevOps Engineer",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg"
  },
  {
    text: "Mentor sangat ramah dan profesional. Saya jadi lebih semangat belajar.",
    name: "Siti Aminah",
    role: "UI Designer",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    text: "Materi selalu update mengikuti perkembangan teknologi terbaru.",
    name: "Agus Salim",
    role: "Cloud Engineer",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    text: "Berkat Jagoan Academy, saya berhasil mendapatkan pekerjaan impian saya.",
    name: "Lina Marlina",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg"
  }
];

const Testimonial = () => {
  return (
    <section id="testimonial" className="w-full py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center mb-6">
          <span className="px-4 py-1 rounded-full bg-pink-200 text-pink-700 font-semibold text-sm mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-2">
            What Our Students Say
          </h2>
          <p className="text-center text-gray-500 mb-8 max-w-2xl">
            Hear from our satisfied students about their learning experience
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
          style={{ height: 400, position: "relative" }}
        >
          <AutoScrollTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
};

function AutoScrollTestimonials({ testimonials }) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const items = [...testimonials, ...testimonials]; // duplikat supaya looping panjang

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    let leftPos = 0;
    let rightPos = 0;
    let leftHeight = 0;
    let rightHeight = 0;

        const leftSpeed = 0.16;
        const rightSpeed = 0.10;

    let leftFrame, rightFrame;

    const updateHeights = () => {
      leftHeight = left?.scrollHeight / 2 || 0;
      rightHeight = right?.scrollHeight / 2 || 0;
    };

    const animateLeft = () => {
      if (left && leftHeight > 0) {
        leftPos -= leftSpeed;
        if (Math.abs(leftPos) >= leftHeight) leftPos = 0;
        left.style.transform = `translate3d(0, ${leftPos}px, 0)`;
      }
      leftFrame = requestAnimationFrame(animateLeft);
    };

    const animateRight = () => {
      if (right && rightHeight > 0) {
        rightPos -= rightSpeed;
        if (Math.abs(rightPos) >= rightHeight) rightPos = 0;
        right.style.transform = `translate3d(0, ${rightPos}px, 0)`;
      }
      rightFrame = requestAnimationFrame(animateRight);
    };

    updateHeights();
    animateLeft();
    animateRight();

    window.addEventListener("resize", updateHeights);

    return () => {
      cancelAnimationFrame(leftFrame);
      cancelAnimationFrame(rightFrame);
      window.removeEventListener("resize", updateHeights);
    };
  }, [testimonials.length]);

  return (
    <>
      {/* Kolom kiri (atau satu-satunya di mobile) */}
      <div
        ref={leftRef}
        className="flex flex-col gap-6 will-change-transform pointer-events-none"
      >
        {items
          .filter((_, i) => i % 2 === 0)
          .map((item, idx) => (
            <TestimonialCard key={idx} {...item} />
          ))}
      </div>

      {/* Kolom kanan (muncul hanya di md ke atas) */}
      <div
        ref={rightRef}
        className="hidden md:flex flex-col gap-6 will-change-transform pointer-events-none"
      >
        {items
          .filter((_, i) => i % 2 === 1)
          .map((item, idx) => (
            <TestimonialCard key={idx} {...item} />
          ))}
      </div>
    </>
  );
}

function TestimonialCard({ text, name, role, avatar }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col justify-between min-h-[180px] transition hover:shadow-2xl">
      <p className="text-gray-800 text-base mb-6">{text}</p>
      <div className="flex items-center gap-3 mt-auto">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <div>
          <div className="font-semibold text-gray-900 text-sm">{name}</div>
          <div className="text-gray-400 text-xs">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
