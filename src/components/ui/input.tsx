import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  extraRight?: React.ReactNode;
  extraLeft?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, extraRight, extraLeft, ...props }, ref) => {
    return (
      <div className="relative">
        {extraLeft && (
          <div className="absolute left-0 top-1/2 flex translate-y-[-50%] cursor-pointer justify-center pl-[12px] align-middle">
            {extraLeft}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `peer h-full w-full border-b-[1.5px] border-textGray bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all  focus:border-blue-400 focus:outline-0 disabled:border-0 disabled:bg-gray ${
              type === "password" || extraRight ? "!pr-[48px]" : ""
            }
          ${extraLeft ? "!pl-[48px]" : ""}  
            `,
            className,
          )}
          ref={ref}
          {...props}
        />
        {extraRight && (
          <div className="absolute right-0 top-1/2 flex translate-y-[-50%] cursor-pointer justify-center align-middle">
            {extraRight}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
