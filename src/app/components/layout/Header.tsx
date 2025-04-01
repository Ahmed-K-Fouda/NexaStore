"use client";
import { logoutUser } from "@/actions/auth";
import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeaderSearchBar from "./search_bar/HeaderSearchBar";
import { useCartStore } from "@/store/cart-store";
import { useShallow } from "zustand/shallow";

function AnnouncemnetBar() {
  return (
    <div className="w-full bg-black py-2">
      <div className="container mx-auto flex items-center justify-center px-8 ">
        <span className="text-center text-white text-sm tracking-wide font-medium">
          FREE SHIPPING ON ORDER OVER $15.00 . FREE RETURNS
        </span>
      </div>
    </div>
  );
}

type headerProps = {
  user: Omit<User, "passwordHash"> | null;
  categorySelector: React.ReactNode;
};

export default function Header({ user, categorySelector }: headerProps) {
  const { refresh, push } = useRouter();
  // const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

  const { open, getTotalItems } = useCartStore(
    useShallow((state) => ({
      open: state.open,
      getTotalItems: state.getTotalItems,
    }))
  );

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const scrolledUp = currentScrollY < prevScrollY;

      if (scrolledUp) {
        setIsOpen(true);
      } else if (currentScrollY > 100) {
        setIsOpen(false);
      }
      setPrevScrollY(currentScrollY);
    }

    setPrevScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);
  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className={`w-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <AnnouncemnetBar />
        <div className="flex justify-between items-center w-full py-3 sm:py-4 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm">
          <div className="flex justify-between items-center container mx-auto px-8">
            {/* Right Side */}

            <div className="flex-1 justify-start items-center gap-4 sm:gap-6 flex">
              <button className="text-gray-700 hover:text-gray-900 md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <nav className="hidden md:flex gap-4 lg:gap-6 text-sm font-semibold">
                <Link href="">Shop</Link>
                <Link href="">New Arrivals</Link>
                {categorySelector}
                <Link href="">Sales</Link>
              </nav>
            </div>
            {/* LOGO */}

            <Link
              href="/"
              onClick={() => push("/")}
              className="absolute left-1/2 -translate-x-1/2  hidden lg:block "
            >
              <span className="sm:text-2xl text-xl font-bold tracking-light">
                Click & Pick
              </span>
            </Link>

            {/* Right side */}
            <div className="flex justify-end flex-1 items-center gap-2 sm:gap-4">
              <HeaderSearchBar />

              {user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-xs sm:text-sm text-gray-700 hidden md:block">
                    {user.email}
                  </span>
                  <Link
                    className="text-xs font-medium sm:text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    href={"#"}
                    onClick={async (e) => {
                      e.preventDefault();
                      await logoutUser();
                      refresh();
                    }}
                  >
                    Sign Out
                  </Link>
                </div>
              ) : (
                <React.Fragment>
                  <Link
                    className="text-xs font-medium sm:text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    href="/auth/sign-in"
                  >
                    Sign In
                  </Link>
                  <Link
                    className="text-xs font-medium sm:text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    href="/auth/sign-up"
                  >
                    Sign Up
                  </Link>
                </React.Fragment>
              )}

              <button
                onClick={() => open()}
                className="text-gray-700 hover:text-gray-900 relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              </button>
            </div>
            {/*  */}
          </div>
          {/*  */}
        </div>
        {/*  */}
      </div>
    </header>
  );
}
