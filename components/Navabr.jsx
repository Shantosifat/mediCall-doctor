"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { FaHeartbeat } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-o top-0 w-full z-50 bg-slate-700 border-b border-border">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FaHeartbeat className="text-primary text-2xl" />
            <span className="text-xl font-bold text-foreground">MediCall</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground hover:text-primary">
              Home
            </Link>
            <Link
              href="/doctors"
              className="text-foreground hover:text-primary"
            >
              Doctors
            </Link>
            <Link
              href="/appointments"
              className="text-foreground hover:text-primary"
            >
              Appointments
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary">
              About
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary"
            >
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex space-x-4">
            <SignedOut>
              {/* <SignInButton /> */}
              {/* <SignUpButton> */}
                <Link href="sign-in">
                <button className="btn text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign In
                </button></Link>
                <Link href="sign-up">
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button></Link>
              {/* </SignUpButton> */}
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{
                elements:{
                    avatarBox: "w-10 h-10"
                }
              }} />
              <Link
                href="/appointments"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
              >
                Book Appointment
              </Link>
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4 space-y-2">
          <Link href="/" className="block text-foreground hover:text-primary">
            Home
          </Link>
          <Link
            href="/doctors"
            className="block text-foreground hover:text-primary"
          >
            Doctors
          </Link>
          <Link
            href="/appointments"
            className="block text-foreground hover:text-primary"
          >
            Appointments
          </Link>
          <Link
            href="/about"
            className="block text-foreground hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-foreground hover:text-primary"
          >
            Contact
          </Link>
          <div className="pt-3">
            <Link
              href="/appointments"
              className="block text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
