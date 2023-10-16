import React, { useState } from "react";

interface Props {
  onChange: (value: string) => void;
  min: number;
  max: number;
}

const NumberSelect = ({ onChange, min, max }: Props) => {
  const [value, setValue] = useState("");

  const handleNumber1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <input
      type="number"
      id="number1"
      value={value}
      min={min}
      max={max}
      onChange={handleNumber1Change}
      placeholder="Enter a number"
      className="mt-1 block w-full rounded-md bg-black/60 p-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
    />
  );
};

export default NumberSelect;
