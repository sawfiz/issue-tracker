// @/app/NavBar.tsx
"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 px-5 mb-5 border-b h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <Link
            key={link.href}
            // className="text-zinc-500 hover:text-zinc-800 transition-colors"
            className={classNames({
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
              "text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
