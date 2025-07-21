import React from "react";

const partners = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  },
  {
    name: "Oracle Logo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg"
  },
  {
    name: "Amazon Web Services",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
  },
  {
    name: "IBM Logo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
  },
  {
    name: "Cisco Logo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Cisco_logo_blue_2016.svg"
  }
];

const Partner = () => {
  return (
    <section id="partner" className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">Partner Kami</h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Berikut adalah beberapa mitra yang mendukung program pembelajaran kami
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-5 justify-items-center">
          {partners.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow flex items-center justify-center w-36 h-20 md:w-40 md:h-24">
              <img
                src={item.logo}
                alt={item.name}
                className="max-h-8 md:max-h-10 object-contain mx-auto"
                onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100x32?text=" + encodeURIComponent(item.name); }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partner;
