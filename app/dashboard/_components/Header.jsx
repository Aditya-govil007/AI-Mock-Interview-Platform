// "use client";
// import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import React, { useEffect } from "react";

// function Header() {
//   const path = usePathname();
//   useEffect(() => {
//     console.log(path);
//   }, []);
//   return (
//     <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
//       <Image src={"/logo.svg"} width={80} height={50} alt="logo" />
//       <ul className="hidden md:flex gap-6">
//         <li
//           className={`hover: text-primary hover:font-bold transition-all cursor-pointer
//         ${path == "/dashboard" && " text-primary font-bold"}
//         `}
//         >
//           Dashboard
//         </li>
//         <li
//           className={`hover: text-primary hover:font-bold transition-all cursor-pointer
//         ${path == "/dashboard/interview/common" && " text-primary font-bold"}
//         `}
//         >
//           Questions
//         </li>
//         <li
//           className={`hover: text-primary hover:font-bold transition-all cursor-pointer
//         ${path == "/dashboard/upgrade" && " text-primary font-bold"}
//         `}
//         >
//           Upgrade
//         </li>
//         <li
//           className={`hover: text-primary hover:font-bold transition-all cursor-pointer
//         ${path == "/dashboard/how" && " text-primary font-bold"}
//         `}
//         >
//           How it Works?
//         </li>
//       </ul>
//       <UserButton />
//     </div>
//   );
// }

// export default Header;
"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    console.log(path);
  }, []);

  // Close mobile menu on outside click or Esc key
  useEffect(() => {
    function handleClickOutside(event) {
      if (!isMobileMenuOpen) return;
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
      const clickedOutsideButton = toggleButtonRef.current && !toggleButtonRef.current.contains(event.target);
      if (clickedOutsideMenu && clickedOutsideButton) {
        setIsMobileMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [path]);

  return (
    <div className="relative flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={80} height={50} alt="logo" />

      <ul className="hidden md:flex gap-6">
        <li>
          <Link
            href="/dashboard"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === "/dashboard" && "text-primary font-bold"
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/interview/common"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === "/dashboard/interview/common" && "text-primary font-bold"
            }`}
          >
            Questions
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/upgrade"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === "/dashboard/upgrade" && "text-primary font-bold"
            }`}
          >
            Upgrade
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/how"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === "/dashboard/how" && "text-primary font-bold"
            }`}
          >
            How it Works?
          </Link>
        </li>
      </ul>

      {/* Right cluster: profile and mobile hamburger */}
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <UserButton />
        <button
          ref={toggleButtonRef}
          className="md:hidden p-1"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-6 bg-current mb-1" />
          <span className="block h-0.5 w-6 bg-current mb-1" />
          <span className="block h-0.5 w-6 bg-current" />
        </button>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden absolute top-full left-0 right-0 bg-secondary shadow-sm border-t overflow-hidden transform transition-all duration-200 ease-out origin-top ${
          isMobileMenuOpen ? "opacity-100 scale-y-100 max-h-96" : "opacity-0 scale-y-95 max-h-0 pointer-events-none"
        }`}
        role="menu"
      >
          <ul className="flex flex-col gap-4 p-4">
            <li>
              <Link
                href="/dashboard"
                className={`hover:text-primary hover:font-bold transition-all ${
                  path === "/dashboard" && "text-primary font-bold"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/interview/common"
                className={`hover:text-primary hover:font-bold transition-all ${
                  path === "/dashboard/interview/common" && "text-primary font-bold"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Questions
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/upgrade"
                className={`hover:text-primary hover:font-bold transition-all ${
                  path === "/dashboard/upgrade" && "text-primary font-bold"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Upgrade
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/how"
                className={`hover:text-primary hover:font-bold transition-all ${
                  path === "/dashboard/how" && "text-primary font-bold"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works?
              </Link>
            </li>
          </ul>
      </div>
    </div>
  );
}

export default Header;
