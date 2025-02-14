import React from "react";
import { TheTicketComponentProps } from "../../types";
import Image from "next/image";

const TheTicketComponent = ({
  ticketDetails,
  eventInfo,
  isStep = false
}: TheTicketComponentProps) => {
  return (
    <div className="w-full max-w-[280px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[300px] xl:max-w-[300px]">
      <div className="bg-[#072C31] p-5 text-white relative border-2 border-greenone rounded-[20px] border-b-0">
        {/* Top gradient effect */}
        <div className="absolute top-0 z-10 left-0 w-full h-[30vh] bg-[radial-gradient(ellipse_at_top_center,rgba(36,160,181,0.3)_0%,rgba(36,160,181,0)_70%)]" />

        {/* Top left corner */}
        <div className="absolute -top-[2px] -left-[2px] w-8 h-8">
          <div className="absolute w-full h-full bg-[#072C31] rounded-full" />
          <div
            className={`absolute w-[28px] h-[25px] -top-[2px] -left-[2px] ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-2xl border-r-0 -rotate-45 border-b-2 border-greenone`}
          />
        </div>

        {/* Top right corner */}
        <div className="absolute -top-[2px] -right-[2px] w-8 h-8">
          <div className="absolute w-full h-full bg-[#072C31] rounded-full" />
          <div
            className={`absolute w-[28px] h-[25px] -top-[2px] -right-[2px] ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-2xl border-l-0 rotate-45 border-b-2 border-greenone`}
          />
        </div>

        {/* Main content */}
        <div className="space-y-5 relative z-20 border-2 border-greenone p-[14px] rounded-[16px]">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-center font-roadrage mb-3">
              {eventInfo?.title}
            </h1>
            <div className="space-y-1">
              <div className="flex items-center text-center justify-center gap-2">
                <span className="text-cyan-400 hidden sm:block">📍</span>
                <span className="text-sm sm:text-base">
                  {eventInfo?.location}
                </span>
              </div>
              <div className="flex items-center text-center justify-center gap-2">
                <span className="text-cyan-400 hidden sm:block">📅</span>
                <span className="text-sm sm:text-base">
                  {eventInfo?.date} | {eventInfo?.time}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="relative flex justify-center mb-3">
            <div className="border-4 border-greenone/50 w-[100px] sm:w-[120px] md:w-[140px] h-[100px] sm:h-[120px] md:h-[140px] rounded-xl overflow-hidden">
              <Image
                src={ticketDetails.photo || "/api/placeholder/400/400"}
                alt="Profile"
                width={140}
                height={140}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Ticket Details Grid */}
          <div className="grid grid-cols-2 bg-[#08343C] border-2 border-[#133D44] rounded-lg p-4 text-left text-sm sm:text-base">
            <div className="space-y-1 pr-4 col-span-1 pb-2 border-r border-[#12464E]">
              <label className="text-white text-opacity-[0.33] text-xs sm:text-sm">
                Name
              </label>
              <div className="text-white font-bold break-words overflow-hidden">
                {ticketDetails.name}
              </div>
            </div>
            <div className="space-y-1 pl-4 col-span-1 pb-2">
              <label className="text-white text-opacity-[0.33] text-xs sm:text-sm">
                Email
              </label>
              <div className="text-white font-bold break-words overflow-hidden">
                {ticketDetails.email}
              </div>
            </div>
            <div className="space-y-1 pr-4 col-span-1 border-r border-t border-[#12464E] py-2">
              <label className="text-white text-opacity-[0.33] text-xs sm:text-sm">
                Ticket Type:
              </label>
              <div className="text-white break-words overflow-hidden">
                {ticketDetails.ticketType}
              </div>
            </div>
            <div className="space-y-1 pl-4 col-span-1 border-t border-[#12464E] py-2">
              <label className="text-white text-opacity-[0.33] text-xs sm:text-sm">
                Ticket for :
              </label>
              <div className="text-white">{ticketDetails.numberOfTickets}</div>
            </div>
            <div className="space-y-1 col-span-2 border-t border-[#12464E] pt-2">
              <label className="text-white text-opacity-[0.33] text-xs sm:text-sm">
                Special request?
              </label>
              <p className="text-white line-clamp-5">
                {ticketDetails.specialRequest}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom corners of top section */}
        <div className="absolute -bottom-[2px] -left-[2px] w-8 h-4 overflow-hidden">
          <div
            className={`absolute w-8 h-8 -bottom-4 -left-0 ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-full border-2 border-greenone`}
          />
          <div
            className={`absolute w-8 h-8 -bottom-5 -left-2 ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-full`}
          />
        </div>
        <div className="absolute -bottom-[2px] -right-[2px] w-8 h-4 overflow-hidden">
          <div
            className={`absolute w-8 h-8 -bottom-4 -right-0 ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-full border-2 border-greenone`}
          />
          <div
            className={`absolute w-8 h-8 -bottom-5 -right-2 ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-full`}
          />
        </div>
      </div>

      {/* Perforated divider */}
      <div className="mx-8 bg-[#072C31] flex justify-between gap-[2.42px] rounded-lg overflow-hidden">
        {[...Array(25)].map((_, index) => (
          <div
            key={index}
            className="w-4 h-2 rounded-[14.96px] border-2 border-greenone bg-[#02191D]"
          />
        ))}
      </div>

      {/* Bottom section with barcode */}
      <div className="bg-[#072C31] border-t-0 p-6 relative border-2 border-greenone rounded-[20px]">
        <div className="absolute z-10 bottom-0 left-0 w-full h-[30vh] bg-[radial-gradient(ellipse_at_bottom_center,rgba(36,160,181,0.3)_0%,rgba(36,160,181,0)_70%)]" />

        {/* Top corners of bottom section */}
        <div className="absolute -top-[2px] -left-[2px] w-8 h-4 overflow-hidden">
          <div
            className={`absolute w-8 h-8 -top-4 -left-0 ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-full border-2 border-greenone`}
          />
          <div
            className={`absolute w-8 h-8 -top-5 -left-2 ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-full`}
          />
        </div>
        <div className="absolute -top-[2px] -right-[2px] w-8 h-4 overflow-hidden">
          <div
            className={`absolute w-8 h-8 -top-4 -right-0 ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-full border-2 border-greenone`}
          />
          <div
            className={`absolute w-8 h-8 -top-5 -right-2 ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-full`}
          />
        </div>

        {/* Barcode */}
        <div className="flex relative z-20 justify-center items-center">
          <Image
            src="/images/BarCode.png"
            alt="barcode"
            width={336}
            height={68}
            priority
          />
        </div>

        {/* Bottom corners */}
        <div className="absolute -bottom-[2px] -left-[2px] w-8 h-8">
          <div className="absolute w-full h-full bg-[#072C31] rounded-full" />
          <div
            className={`absolute w-[28px] h-[25px] -bottom-[2px] -left-[2px] ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-2xl border-r-0 rotate-45 border-t-2 border-greenone`}
          />
        </div>
        <div className="absolute -bottom-[2px] -right-[2px] w-8 h-8">
          <div className="absolute w-full h-full bg-[#072C31] rounded-full" />
          <div
            className={`absolute w-[28px] h-[25px] -bottom-[2px] -right-[2px] ${
              isStep ? "bg-greentwo" : "bg-[#02191D]"
            } rounded-2xl border-l-0 -rotate-45 border-t-2 border-greenone`}
          />
        </div>
      </div>
    </div>
  );
};

export default TheTicketComponent;
