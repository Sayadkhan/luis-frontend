"use client";

import { useState, useRef } from "react";
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
  // State can be a number (index of open item) or null
  const [open, setOpen] = useState<number | null>(null);

  // Ref holds an array of HTMLDivElements (or nulls)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section
      id="faq"
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="relative w-full h-[90vh] overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/80 via-darkBlue/30 to-transparent"></div>

      {/* FAQ Card */}
      <div className="absolute right-32 top-1/2 -translate-y-1/2 max-w-3xl w-full">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 rounded-xl p-5 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between text-white cursor-pointer"
                >
                  <span className="text-lg font-medium tracking-wide">
                    {item.q}
                  </span>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      open === i ? "rotate-180" : ""
                    }`}
                    size={22}
                  />
                </button>

                <div
                  // We assign the element to the specific index in the ref array
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className="transition-max-height duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight:
                      open === i
                        ? `${contentRefs.current[i]?.scrollHeight}px`
                        : "0px",
                  }}
                >
                  <p className="mt-3 text-gray-200 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
