"use client";
import Image from "next/image";
import contactImg from "@/public/img/faq.png";
import { useState } from "react";
import { useCreateInquiryMutation } from "@/redux/features/blog/blogApi";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, Send } from "lucide-react";

export default function Contact() {
  const [createInquiry, { isLoading }] = useCreateInquiryMutation();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    reason: "general",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await createInquiry(form).unwrap();
      setSubmitted(true);
    } catch {
      toast.error("Failed to send. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-20 sm:py-24 transition-colors"
    >
      <Toaster position="top-right" />
      <div className="lg:px-20 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-0">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden">
          <Image src={contactImg} alt="Contact" fill className="object-cover" priority />
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div className="w-full bg-white dark:bg-gray-800 p-6 sm:p-10 lg:p-12 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">

            {submitted ? (
              /* ── Success State ── */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Message Sent!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Thank you for reaching out. One of our team members will be in touch shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "", reason: "general" }); }}
                  className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-base sm:text-lg">
                  Have a question or want to get in touch? Fill out the form below and we&apos;ll respond as quickly as possible.
                </p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#C6AC5E] outline-none transition"
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email *"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#C6AC5E] outline-none transition"
                  />

                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Your Message *"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#C6AC5E] outline-none transition resize-none"
                  />

                  {/* Reason for Visit */}
                  <div className="flex flex-col gap-3 pt-2">
                    <p className="font-medium text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                      Select the option that best describes the reason for your visit:
                    </p>

                    {[
                      { value: "learn", label: "I'd like to learn more about timeshare ownership." },
                      { value: "owner-services", label: "I'm an existing Owner who needs Owner Services assistance." },
                      { value: "vacation-portfolio", label: "I'm an existing Owner who wants to add to my vacation portfolio." },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-3 text-gray-900 dark:text-gray-200 text-sm sm:text-base cursor-pointer">
                        <input
                          type="radio"
                          name="reason"
                          value={opt.value}
                          checked={form.reason === opt.value}
                          onChange={handleChange}
                          className="accent-[#C6AC5E]"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 sm:py-4 rounded-xl bg-[#C6AC5E] hover:bg-opacity-90 disabled:opacity-70 text-white font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
