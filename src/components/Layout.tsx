import React, { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-deepTeal bg-radial-aqua min-h-screen pt-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
