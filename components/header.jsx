import React from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <nav>
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="sensai logo"
            width={150}
            height={50}
            className="h-12 py-1 w-auto object-contain"
          ></Image>
        </Link>
      </nav>
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
