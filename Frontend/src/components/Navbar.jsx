import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 shadow-lg h-16 fixed">
      <div className="flex justify-between">
        <h1 className="text-2xl cursor-pointer font-bold">
          Word<span className="text-3xl text-green-500">2</span>PDF
        </h1>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="mt-1 text-xl cursor-pointer font-bold hover:scale-105 duration-300"
          >
            Word to PDF
          </Link>
          <Link
            to="/image-to-pdf"
            className="mt-1 text-xl cursor-pointer font-bold hover:scale-105 duration-300"
          >
            Image to PDF
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
