// InputComponent.tsx
import React, { ChangeEvent, FC } from "react";

interface InputComponentProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number";
  className?: string;
}

export const InputComponent: FC<InputComponentProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};
