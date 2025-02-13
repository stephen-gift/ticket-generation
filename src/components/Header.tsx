"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navItems = [
  { title: "Events", href: "/" },
  { title: "My Tickets", href: "/my-tickets" },
  { title: "About Project", href: "/about" }
];

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <header className="sticky top-0 w-full text-white z-50 p-4 flex items-center justify-between">
        {/* Mobile Drawer */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Image
              src="/images/Logo.png"
              alt="logo"
              //   sizes="100vw"

              width={92}
              height={36}
            />
          </DrawerTrigger>
          <DrawerContent className="bg-[#0C212B] text-white p-6 ">
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <nav className="flex flex-col gap-4">
              {navItems.map(({ title, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`hover:text-gray-300 ${
                    pathname === href ? "text-[#F5B503]" : ""
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
          <nav className="flex gap-6">
            {navItems.map(({ title, href }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-gray-300 ${
                  pathname === href ? "text-[#F5B503]" : ""
                }`}
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA Button */}
        <Button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200">
          MY TICKETS →
        </Button>
      </header>
    </div>
  );
};

export default Header;
