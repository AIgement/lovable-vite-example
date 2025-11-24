import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = ({ label, hint, error, className, ...rest }: InputProps) => {
  return (
    <label className="flex flex-col gap-2 text-left w-full">
      {label && <span className="body-s text-text2">{label}</span>}
      <input
        className={clsx(
          "h-10 rounded-field bg-bg2 text-text1 placeholder:text-text3 px-3 border",
          error ? "border-danger" : "border-line1",
          "focus-ring",
          className
        )}
        {...rest}
      />
      {(hint || error) && (
        <span className={clsx("caption", error ? "text-danger" : "text-text3")}>{error || hint}</span>
      )}
    </label>
  );
};
