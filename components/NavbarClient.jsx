"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Calendar,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { checkAndAllocateCredits } from "@/actions/credits";
import { Badge } from "./ui/badge";

export default function NavbarClient({ user }) {
  const [isOpen, setIsOpen] = useState(false);
   const [credits, setCredits] = useState(user?.credits ?? 0);
  // ✅ run side-effect AFTER render
  useEffect(() => {
    async function handleCredits() {
      if (user) {
        const result = await checkAndAllocateCredits(user);
        if (result?.credits !== undefined) {
          setCredits(result.credits);
        }
      }
    }
    handleCredits();
  }, [user]);

  return (
    <nav className="fixed left-0 top-0 w-full z-50 bg-slate-700 border-b border-border">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FaHeartbeat className="text-primary text-2xl" />
            <span className="text-xl font-bold text-foreground">MediCall</span>
          </Link>

          {/* Desktop Menu */}
          {/* <div className="hidden md:flex space-x-8">
            <Link href="/">Home</Link>
            <Link href="/doctors">Doctors</Link>
            <Link href="/appointments">Appointments</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div> */}

          {/* CTA */}
          <div className="hidden md:flex space-x-4">
            <SignedIn>
              {/* Admin Links */}
              {user?.role === "ADMIN" && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin Dashboard
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <ShieldCheck className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {/* Doctor Role */}
              {user?.role === "DOCTOR" && (
                <Link href="/doctor">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2"
                  >
                    <Stethoscope className="h-4 w-4" />
                    Doctor Dashboard
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <Stethoscope className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {/* Patient Links */}
              {user?.role === "PATIENT" && (
                <Link href="/appointments">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    My Appointments
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {/* Unassigned Role */}
              {user?.role === "UNASSIGNED" && (
                <Link href="/onboarding">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Complete Profile
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </SignedIn>

            {(!user || user?.role !== "ADMIN") && (
              <Link href=
              {user?.role === "PATIENT" ? "/pricing" : "/doctor"}>
                <Badge
                  variant="outline"
                  className="h-9 bg-emerald-900/20 border-emerald-700/30 px-3 py-1 flex items-center gap-2"
                >
                  <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">
                    {user && user.role !== "ADMIN" ? (
                      <>
                        {user.credits}{" "}
                        <span className="hidden md:inline">
                          {user?.role === "PATIENT"
                            ? "Credits"
                            : "Earned Credits"}
                        </span>
                      </>
                    ) : (
                      <>Pricing</>
                    )}
                  </span>
                </Badge>
              </Link>
            )}
            <SignedOut>
              <Link href="/sign-in">
                <button className="bg-black text-white rounded-full font-medium px-4 py-2">
                  Sign In
                </button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{ elements: { avatarBox: "w-10 h-10" } }}
              />
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
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/doctors" className="block">
            Doctors
          </Link>
          <Link href="/appointments" className="block">
            Appointments
          </Link>
          <Link href="/about" className="block">
            About
          </Link>
          <Link href="/contact" className="block">
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
