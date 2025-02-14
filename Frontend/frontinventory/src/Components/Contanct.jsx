import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gradient-to-r  text-white">
      {/* Contact Details Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10">
        <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-6">📞 Contact Us</h2>
          <div className="space-y-4 text-lg">
            <p className="flex items-center"><span className="text-2xl">👤</span> <span className="ml-3 font-semibold">SivaSri Gunasekaran</span></p>
            <p className="flex items-center"><span className="text-2xl">📍</span> <span className="ml-3">Edaiyar Street, Thanjavur</span></p>
            <p className="flex items-center"><span className="text-2xl">📧</span> <span className="ml-3">Sivasri@gmail.com</span></p>
            <p className="flex items-center"><span className="text-2xl">📱</span> <span className="ml-3">+91 98765 43210</span></p>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="w-full lg:w-1/2 h-screen">
        <iframe
          title="Google Maps"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          className="w-full h-full rounded-l-2xl shadow-lg"
          src="https://www.google.com/maps?q=Edaiyar+Street,Thanjavur&output=embed"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
