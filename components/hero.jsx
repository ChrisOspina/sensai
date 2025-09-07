"use client";

import React, { useRef } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef();

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
            Your AI Career Coach for
            <br />
            Job Search Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Unlock your potential with personalized AI-driven career coaching,
            interview prep, and AI powered job matching.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className={"px-8 "}>
              Get Started
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/banner3.jpeg"}
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
