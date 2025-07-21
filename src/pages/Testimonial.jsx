import React from "react";

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
  }
];

const Testimonial = () => {
  return (
    <section id="testimonial" className="w-full py-20 bg-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center mb-6">
          <span className="px-4 py-1 rounded-full bg-pink-200 text-pink-700 font-semibold text-sm mb-3">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-2">What Our Students Say</h2>
          <p className="text-center text-gray-500 mb-8 max-w-2xl">Hear from our satisfied students about their learning experience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-7 flex flex-col justify-between min-h-[180px]">
              <p className="text-gray-800 text-base mb-6">{item.text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                  <div className="text-gray-400 text-xs">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
