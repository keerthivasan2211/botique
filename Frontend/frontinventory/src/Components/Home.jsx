import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const collections = [
    { name: "Bangles", img: "bangle.webp", path: "/shop/bangle" },
    { name: "Earrings", img: "DGES1914.jpg", path: "/shop/earrings" },
    { name: "Blouse", img: "blouse.webp", path: "/shop/blouse" },
    { name: "Mehandi", img: "mehandi.jpeg", path: "/shop/qa" }, // QA Card for Mehendi
  ];

  return (
    <div className="min-h-screen w-full text-gray-900 flex flex-col pt-20 bg-gray-100">
      <header
        className="pt-20 w-full h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center relative px-8"
        style={{ backgroundImage: "url('header.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-6 max-w-7xl">
          <h1 className="text-7xl font-extrabold drop-shadow-lg">Luxury Fashion Boutique</h1>
          <p className="text-3xl max-w-4xl drop-shadow-md mt-4">
            Discover elegance with our exclusive designer collections.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-8 bg-white text-gray-900 px-10 py-4 rounded-lg text-2xl hover:bg-gray-200 transition shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </header>

      {/* Scroll Banner */}
      <div className="w-full h-[20px] bg-gradient-to-r from-red-600 to-red-300 text-white flex items-center overflow-hidden relative">
        <div className="whitespace-nowrap flex gap-8 animate-marquee text-lg md:text-xl">
          {Array(5)
            .fill(
              "✨ Limited Time Offer! | New Arrivals Now Available | Free Shipping on Orders Over $50 | Shop Now ✨"
            )
            .map((text, index) => (
              <span key={index}>{text}</span>
            ))}
        </div>
      </div>

      {/* Collections Section */}
      <section className="w-full flex flex-wrap justify-center gap-12 p-16">
        {collections.map((item, index) => (
          <Link to="/shop" key={index} className="w-full sm:w-1/2 lg:w-1/4">
            <div className="relative group bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
              {/* Background Image */}
              <div className="w-full h-80 overflow-hidden">
                <img
                  src={`/${item.img}`}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h2 className="text-4xl font-bold drop-shadow-md">{item.name}</h2>
                <p className="text-lg mt-2 opacity-80">
                  Discover our exquisite {item.name} collection.
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
