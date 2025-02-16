import React from "react";

import { cn } from "@/lib/utils";
import { TicketOptionProps } from "../../types";

const TicketOption = ({
  type,
  price,
  remaining,
  isSelected,
  onSelect
}: TicketOptionProps) => {
  return (
    <div
      onClick={onSelect}
      tabIndex={0} // Added tabIndex to make it focusable
      role="button" // Added role for screen readers
      aria-pressed={isSelected} // Indicates if the option is selected
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(); // Allow selection with keyboard
        }
      }}
      className={cn(
        "p-2 font-roboto rounded-lg cursor-pointer w-full transition text-white border-2 border-[#197686] hover:bg-[#2C545B] focus:outline-none focus:ring-2 focus:ring-[#197686]", // Added focus styles
        isSelected
          ? "rounded-[12px] border-2 border-[#197686] bg-[#12464E]"
          : ""
      )}
    >
      <div className={cn("rounded-md text-sm font-semibold")}>
        {price === 0 ? "Free" : `$ ${price}`}
      </div>
      <div className="flex flex-col">
        <p className="font-normal uppercase font-roboto text-base">{type}</p>
        <p className="text-sm">{remaining} / 52</p>
      </div>
    </div>
  );
};

export default TicketOption;
