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
      className={cn(
        "p-2 font-roboto rounded-lg cursor-pointer w-full transition text-white  border-2 border-[#197686] hover:bg-[#2C545B] ",
        isSelected
          ? "rounded-[12px] border-2 border-[#197686] bg-[#12464E]"
          : ""
      )}
    >
      <div className={cn("rounded-md text-sm font-semibold")}>
        {price === 0 ? "Free" : `$ ${price}`}
        {/* {`$ ${price}`} */}
      </div>
      <div className="flex flex-col">
        <p className="font-normal uppercase  font-roboto text-base">{type}</p>
        <p className="text-sm">{remaining} / 52</p>
      </div>
    </div>
  );
};

export default TicketOption;
