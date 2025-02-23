import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bottom-0 flex justify-center items-center h-svh p-8">
      <div className="text-center justify-center max-w-4xl p-4">
        <h2 className="text-4xl text-white font-extrabold">
          Discover Your Next Adventure with AI:
        </h2>
        <h2 className="text-4xl text-orange-600 font-semibold mt-2">
          Personalized Itineraries at Your Fingertips
        </h2>
        <h4 className="text-2xl text-white opacity-95 mt-6">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </h4>
        <div className="mt-8">
          <Link to="/create-trip">
            <div className="flex items-center justify-center">
              <button className="px-6 py-2 font-medium bg-orange-600 text-white w-fit transition-all hover:shadow-[3px_3px_0px_black] shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                Get Started
              </button>
            </div>
            {/* <button className="bg-orange-600 hover:bg-orange-700 transition duration-200 text-white font-bold py-3 px-6 rounded-lg">
              Get Started
            </button> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
