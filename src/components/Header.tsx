"use client";
import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Code Editor</h1>
      <nav>
        <Link href="/">JavaScript</Link>
        <Link
          className="p-2 mx-2 rounded bg-gray-700 hover:bg-blue-600"
          href="/editor/web"
        >
          HTML + CSS
        </Link>
      </nav>
    </header>
  );
};

export default Header;
