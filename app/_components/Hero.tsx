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
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[30ms]"
          src="/videos/hero-banner-video.mp4"
        ></video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content (optional) */}
        <div className="relative z-10 h-full flex items-end justify-start text-white px-40">
          <div className="w-full">
            <h1 className="text-[105px] font-semibold leading-[110px] pb-9">
              Where{" "}
              <span className="italic font-bodoni font-light">Comfort </span>
              <br /> Meets Paradise
            </h1>
            <hr />
            <div className="py-10 flex items-center justify-between">
              <p className="max-w-[700px]">
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
