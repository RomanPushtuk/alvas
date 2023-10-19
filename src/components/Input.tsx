"use client";
import { cn } from "@/lib/utils";
import {
  FC,
  InputHTMLAttributes,
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}

const Input: FC<InputProps> = ({ className, ...props }) => {
  const [value, setValue] = useState("");
  // const isFirst = useIsFirstRender();

  // const handleChange = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValue(event.target.value);
  //   },
  //   [setValue]
  // );

  // const isError = value === "" && !isFirst;

  return (
    <div>
      <input
        {...props}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
    </div>
  );
};

export default memo(Input);
