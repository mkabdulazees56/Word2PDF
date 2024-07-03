import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-center text-gray-400 py-6">
      © {currentYear} All rights reserved. Development with{" "}
      <span className="text-pink-500">❤</span> by{" "}
      <a
        href="https://mkabdulazees.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:underline"
      >
        DevZee
      </a>
      .
    </div>
  );
}

export default Footer;
