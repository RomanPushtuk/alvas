"use client";
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

const Input: FC<InputProps> = (props) => {
  console.log("рендер");
  const [value, setValue] = useState("");
  const isFirst = useIsFirstRender();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const isError = value === "" && !isFirst;

  return (
    <div>
      <input {...props} onChange={handleChange} />
      {isError && <span className="text-red-600">Введите значение</span>}
    </div>
  );
};

export default memo(Input);
