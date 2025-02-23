import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-gray-200 bg-gray-50 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold font-serif text-amber-500 hover:text-amber-600">
            AI Travel Planner
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none "
          aria-controls="navbar-hamburger"
          aria-expanded={isOpen}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto`}
          id="navbar-hamburger"
        >
          <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
            <SignedOut>
              <div className="flex space-x-4">
                <div className="border-2 rounded-3xl px-5 py-2 text-white bg-amber-500 hover:bg-amber-600 transition duration-200">
                  <SignInButton />
                </div>
                <div className="border-2 rounded-3xl px-5 py-2 text-white bg-amber-500 hover:bg-amber-600 transition duration-200">
                  <SignUpButton />
                </div>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-6">
                <Link
                  to="/create-trip"
                  className="border-2 rounded-3xl px-5 py-2 text-white bg-amber-500 hover:bg-amber-600 transition duration-200"
                >
                  Create A Trip
                </Link>
                <Link
                  to="/my-trips"
                  className="border-2 rounded-3xl px-5 py-2 text-white bg-amber-500 hover:bg-amber-600 transition duration-200"
                >
                  My Trips
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "42px",
                        height: "42px",
                      },
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
