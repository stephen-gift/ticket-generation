import type { Metadata } from "next";
import { Roboto, Road_Rage } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const JejuMyeongjo = localFont({
  src: "../../public/fonts/JejuMyeongjo.ttf",
  display: "swap",
  variable: "--font-JejuMyeongjo"
});

const RoadRageFont = Road_Rage({
  variable: "--font-road-rage",
  subsets: ["latin"],
  weight: "400"
});

const RobotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Conference Ticket Generator",
  description:
    "A fully responsive Conference Ticket Generator is developed using React or Next.js. Users can enter their details, validate inputs, and upload avatars via Cloudinary. Form validation, state persistence with IndexedDB/local storage, and accessibility features are implemented."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${JejuMyeongjo.variable} ${RobotoFont.variable} ${RoadRageFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
