"use client";
import React, { useEffect, useRef } from "react";

import "@/app/globals.css";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-darkBlue">
      <div className="relative rounded-tl-3xl rounded-tr-3xl h-[calc(100vh-52px)] overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/img/hero-img.jpg"
          className="
            absolute inset-0 w-full h-full object-cover
            transition-transform duration-[30ms]
          "
          src="/videos/hero-banner-video.mp4"
        ></video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div
          className="
            relative z-10 h-full flex items-end justify-start text-white 
            px-6 sm:px-10 md:px-16 lg:px-28 xl:px-40
          "
        >
          <div className="w-full pb-8 sm:pb-12 md:pb-14 lg:pb-16">
            <h1
              className="
                font-semibold leading-[1.05]
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[105px]
              "
            >
              Where{" "}
              <span className="italic font-bodoni font-light">Comfort </span>
              <br className="hidden sm:block" />
              Meets Paradise
            </h1>

            <hr className="my-6 sm:my-8" />

            <div
              className="
                pt-4 sm:pt-6 md:pt-8 
                flex flex-col sm:flex-row sm:items-center sm:justify-between
              "
            >
              <p
                className="
                  max-w-[700px] 
                  text-sm sm:text-base md:text-lg 
                  leading-relaxed
                "
              >
                Escape to a private sanctuary where ocean breezes, timeless
                design, and personalized service come together. Discover your
                perfect stay in paradise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
