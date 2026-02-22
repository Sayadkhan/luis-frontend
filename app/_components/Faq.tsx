"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import image from "@/public/img/faq.jpg";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "How do I make a reservation?",
    a: "You can reserve your stay directly through our website. Once your booking is confirmed, you will receive a confirmation email instantly.",
  },
  {
    q: "Is airport pickup available?",
    a: "Yes, we provide luxury airport pickup and drop-off services at an additional cost.",
  },
  {
    q: "Are meals included?",
    a: "Complimentary breakfast is included in all stays. Full-day meal packages are also available.",
  },
  {
    q: "Can I cancel my reservation?",
    a: "Cancellations made at least 7 days before check-in qualify for a full refund.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        backgroundImage: `url(${image.src})`,
      }}
      className="relative w-full min-h-[90vh] bg-cover bg-center bg-no-repeat bg-fixed px-4 py-16 sm:px-6 md:px-16"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/80 via-darkBlue/40 to-transparent"></div>

      {/* FAQ Card */}
      <div className="relative max-w-3xl w-full ml-auto md:mr-20">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl">
     
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 sm:mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((item, i) => {
              const isOpen = open === i;

              return (
                <div
                  key={i}
                  className="bg-white/10 border border-white/20 rounded-xl p-4 sm:p-5"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-white"
                  >
                  
                    <span className="text-base sm:text-lg font-medium">
                      {item.q}
                    </span>

                    <FiChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      } sm:size-22`}
                    />
                  </button>

           
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? "max-h-[500px] mt-2 sm:mt-3" : "max-h-0"
                    }`}
                  >
                    
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
