"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

// --- Zod Schema ---
const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().min(1, "Last Name is required."),
  country: z.string().min(1, "Please select a country."),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required.")
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid phone number for the selected country.",
    }),
  email: z.string().email("Invalid email address."),
  consent: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

// --- Mock Data ---
const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "MX", name: "Mexico" },
] as const;

export default function ClubMemberForm() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      consent: false,
    },
  });

  const selectedCountry = watch("country");

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    alert("Form Validated and Submitted!");
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen py-[200px] bg-gray-50 flex items-center justify-center font-sans text-[#1e3a5f]">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-10 space-y-10 order-1 lg:order-1 pt-4 lg:pt-10">
          {/* Header Section */}
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-wide uppercase mb-4 leading-tight">
              Be Inspired To <br />{" "}
              <span className="font-semibold">Become a Club Member</span>
            </h1>
            {/* THEME COLOR ACCENT */}
            <div className="h-1.5 w-20 bg-[#C6AC5E] mb-6"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join a world of exclusive experiences and unforgettable memories.
              Your journey starts with a simple conversation.
            </p>
          </div>

          {/* Images */}
          <div className="relative h-[320px] w-full">
            <div className="absolute left-0 top-0 w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Resort View"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute left-40 top-32 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl z-20">
              <Image
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Palm Trees"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 uppercase">
              Need Assistance?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Our vacation specialists are ready to help you craft your perfect
              plan.
            </p>

            <div className="flex flex-col gap-1">
              {/* THEME COLOR TEXT */}
              <span className="text-2xl font-bold text-[#C6AC5E]">
                888-204-0407
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">
                Mon-Fri | 10AM - 6PM EST
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 w-full order-2 lg:order-2">
          <div className="bg-white p-6 md:p-12 rounded-2xl shadow-xl border-t-4 border-[#C6AC5E]">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1e3a5f]">Get Started</h2>
              <p className="text-gray-500 text-sm mt-1">
                Please complete the details below.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    First Name <span className="text-[#C6AC5E]">*</span>
                  </label>
                  <input
                    {...register("firstName")}
                    placeholder="Jane"
                    className={`w-full p-3 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C6AC5E] focus:border-transparent transition-all ${
                      errors.firstName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Last Name <span className="text-[#C6AC5E]">*</span>
                  </label>
                  <input
                    {...register("lastName")}
                    placeholder="Doe"
                    className={`w-full p-3 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C6AC5E] focus:border-transparent transition-all ${
                      errors.lastName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Country Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Country of Residence <span className="text-[#C6AC5E]">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("country")}
                    className={`w-full p-3 bg-gray-50 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#C6AC5E] focus:border-transparent transition-all ${
                      errors.country
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                {errors.country && (
                  <p className="text-red-500 text-xs">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Phone Number  */}
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-bold uppercase tracking-wider ${
                    !selectedCountry ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Phone Number <span className="text-[#C6AC5E]">*</span>
                </label>

                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      disabled={!selectedCountry}
                      defaultCountry={selectedCountry as any}
                      country={selectedCountry as any}
                      value={value}
                      onChange={onChange}
                      international
                      withCountryCallingCode
                      className={`phone-input-container w-full p-3 border rounded-md transition-all ${
                        !selectedCountry
                          ? "bg-gray-100 cursor-not-allowed opacity-60"
                          : "bg-gray-50 focus-within:ring-2 focus-within:ring-[#C6AC5E] focus-within:border-transparent"
                      } ${
                        errors.phoneNumber
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                    />
                  )}
                />
                {!selectedCountry && (
                  <p className="text-xs text-[#C6AC5E] opacity-80 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    Select a country first to enable phone input
                  </p>
                )}
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Email Address <span className="text-[#C6AC5E]">*</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  className={`w-full p-3 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C6AC5E] focus:border-transparent transition-all ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              <hr className="border-gray-100" />

              {/* Consent Checkbox */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="h-5 w-5 rounded border-gray-300 text-[#C6AC5E] focus:ring-[#C6AC5E]"
                  />
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  <span className="font-bold text-[#1e3a5f]">
                    Communication Consent
                  </span>{" "}
                  <br />
                  YES! I want to receive promotional materials and information
                  with The Marriott Vacation Clubs timeshare by mail, email,
                  phone and/or text (at the number provided with this consent).
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#C6AC5E] hover:bg-[#A38D48] text-white font-bold uppercase tracking-widest rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Start My Journey
              </button>
            </form>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Already an Owner?{" "}
              <a href="#" className="text-[#C6AC5E] underline font-semibold">
                Log in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
