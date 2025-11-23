"use client";
import Image from "next/image";
import contactImg from "@/assets/faq.png";

export default function Contact() {
  return (
    <section id={"contact"} className="w-full bg-white text-gray-900 py-24">
      <div className="px-6 lg:px-20 flex flex-col lg:flex-row items-stretch">
        {/* Left Side */}
        <div className="lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 transform -skew-x-12 origin-top-left">
            <Image
              src={contactImg}
              alt="Contact Illustration"
              className="w-full h-full object-cover"
              fill
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-12 relative z-10">
          <div className="w-full bg-white p-12 rounded-3xl shadow-xl border border-gray-200">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-8">
              Have a question or want to get in touch? Fill out the form below
              and we’ll respond as quickly as possible.
            </p>

            <form className="grid grid-cols-1 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl border border-gray-300 placeholder-gray-400 text-gray-900 focus:ring-2 focus:ring-[#C6AC5E] transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-xl border border-gray-300 placeholder-gray-400 text-gray-900 focus:ring-2 focus:ring-[#C6AC5E] transition"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full p-4 rounded-xl border border-gray-300 placeholder-gray-400 text-gray-900 focus:ring-2 focus:ring-[#C6AC5E] transition resize-none"
              ></textarea>

              {/* Reason for Visit */}
              <div className="flex flex-col gap-3 pt-2">
                <p className="font-medium text-gray-700">
                  Select the option that best describes the reason for your
                  visit:
                </p>
                <label className="flex items-center gap-3 text-gray-900">
                  <input
                    type="radio"
                    name="reason"
                    value="learn"
                    className="accent-[#C6AC5E]"
                  />
                  I'd like to learn more about timeshare ownership.
                </label>
                <label className="flex items-center gap-3 text-gray-900">
                  <input
                    type="radio"
                    name="reason"
                    value="owner-services"
                    className="accent-[#C6AC5E]"
                  />
                  I'm an existing Owner who needs Owner Services assistance.
                </label>
                <label className="flex items-center gap-3 text-gray-900">
                  <input
                    type="radio"
                    name="reason"
                    value="vacation-portfolio"
                    className="accent-[#C6AC5E]"
                  />
                  I'm an existing Owner who is interested in adding to my
                  vacation portfolio.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#C6AC5E] hover:bg-opacity-90 text-white font-semibold transition-transform transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
