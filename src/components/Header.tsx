"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MoveRight } from "lucide-react";

const navItems = [
  { title: "Events", href: "/" },
  { title: "My Tickets", href: "/my-tickets" },
  { title: "About Project", href: "#" }
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-3xl border border-[#197686]">
      <header className="sticky top-0 w-full text-white z-50 p-4 flex items-center justify-between">
        {/* Mobile Drawer */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild aria-label="Open navigation menu" tabIndex={0}>
            <Image src="/images/Logo.png" alt="logo" width={92} height={36} />
          </DrawerTrigger>
          <DrawerContent className="bg-[#0C212B] text-white p-6 ">
            <DrawerTitle className="flex justify-center items-center mt-3">
              <Image src="/images/Logo.png" alt="logo" width={92} height={36} />
            </DrawerTitle>
            <nav className="mt-3 flex flex-col gap-4" role="menu">
              {navItems.map(({ title, href }) => (
                <Link
                  key={href}
                  href={href}
                  role="menuitem"
                  aria-current={pathname === href ? "page" : undefined}
                  className={`hover:text-gray-300 ${
                    pathname === href ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
                  }`}
                >
                  {title}
                </Link>
              ))}
            </nav>
          </DrawerContent>
        </Drawer>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6" role="menu">
            {navItems.map(({ title, href }) => (
              <Link
                key={href}
                href={href}
                role="menuitem"
                aria-current={pathname === href ? "page" : undefined}
                className={`hover:text-gray-300 ${
                  pathname === href ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
                }`}
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => router.push("/my-tickets")}
          aria-label="My Tickets"
          className="group bg-white hover:text-white flex justify-center items-center text-black px-4 py-2 rounded-md hover:bg-[#24A0B5] transition-colors duration-300"
        >
          MY TICKETS
          <MoveRight
            strokeWidth={3}
            className="ml-2 transition-transform duration-300 group-hover:-rotate-45"
          />
        </Button>
      </header>
    </div>
  );
};

export default Header;
