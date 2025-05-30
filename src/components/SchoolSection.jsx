import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Dialog } from "@headlessui/react";

const locations = [
  { name: "Richmond", address: "8360 Granville Ave Richmond, BC, V6Y 1P3", tel: "778.300.2366" },

];

export default function SchoolSection() {
  const [isOpen, setIsOpen] = useState(false);
  const schoolRef = useRef(null);
  const location = useLocation(); // 監聽 URL

  useEffect(() => {
    if (location.hash === "#school" && schoolRef.current) {
      schoolRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);


  return (
    <>

      <section id="school" ref={schoolRef} className="max-w-6xl ml-6 mx-auto p-6 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="w-full h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.5099462973253!2d-123.13621117061204!3d49.1625411222598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54860ab4f7d7e491%3A0x4cd38b73919d0b14!2s8360%20Granville%20Ave%2C%20Richmond%2C%20BC%20V6Y%201P3!5e0!3m2!1szh-TW!2sca!4v1748331787110!5m2!1szh-TW!2sca"
              width="100%"
              height="100%"
              style={{ border: '2px solid #ccc' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-700">Our Location</h2>
          {/* <p className="mt-4 text-gray-600">
            Established in 2025,  has always put an emphasis on putting natural
            materials into our learning environments.
          </p> */}
          <div className="mt-6 space-y-4">
            {locations.map((loc, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-gray-500">📍</span>
                <div>
                  <h4 className="font-semibold text-gray-700 text-2xl">{loc.name} ({loc.tel})</h4>
                  <p className="text-gray-500 text-2xl">{loc.address}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <button
            onClick={() => setIsOpen(true)}
            className="mt-6 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
          >
          Schedule a Tour
        </button> */}
        </div>
        {/* Dialog (Modal) for the form */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
            <h3 className="text-3xl font-light text-gray-700 mb-4">Book a Tour Today</h3>
            <p className="text-gray-600 mb-4">
              Thank you for your interest in Rothewood Academy. Please complete the following inquiry form,
              and we will send you information about our school, how to book a tour, and upcoming events.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name *" className="border p-2 rounded" required />
              <input type="text" placeholder="Last Name *" className="border p-2 rounded" required />
              <input type="tel" placeholder="Phone Number *" className="border p-2 rounded" required />
              <input type="email" placeholder="Email *" className="border p-2 rounded" required />


            </form>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setIsOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg">Submit</button>
            </div>
          </div>
        </Dialog>
      </section>
    </>
  );
}
