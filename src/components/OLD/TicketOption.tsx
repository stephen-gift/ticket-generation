import React from "react";

import { cn } from "@/lib/utils";

interface Ticket {
  type: string;
  price: string;
  remaining: number;
}

const TicketOption = ({
  type,
  price,
  remaining,
  isSelected,
  onSelect
}: Ticket & { isSelected: boolean; onSelect: () => void }) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "p-2   border rounded-lg cursor-pointer w-full transition text-white-pure",
        isSelected ? "border-[#197686] bg-[#197686] " : "border-[#07373F] "
      )}
    >
      <div className={cn(" rounded-md text-sm font-semibold")}>{price}</div>
      <div className="flex flex-col">
        <p className="font-thin text-base ">{type}</p>
        <p className="text-sm">{remaining} left</p>
      </div>
    </div>
  );
};

export default TicketOption;
