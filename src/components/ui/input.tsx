import * as React from "react";

import { cn } from "../../lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  prefixIcon?: React.ReactElement; // Specifically for icons (JSX.Element)
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefixIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {prefixIcon && (
          <span className="absolute flex items-center pointer-events-none left-3 text-zinc-500">
            {React.cloneElement(prefixIcon, {
              className: cn("h-4 w-4", prefixIcon.props.className), // Ensure consistent icon sizing
            })}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            prefixIcon ? "!pl-10" : "!pl-3", // Adjust padding for prefixIcon
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
