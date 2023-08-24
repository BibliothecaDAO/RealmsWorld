import { useState } from "react";
import { Switch as RadixSwitch } from "@radix-ui/react-switch";

interface Props {
  onChange: (value: boolean) => void;
}

export const Switch = ({ onChange }: Props) => {
  const [enabled, setEnabled] = useState(false);

  const handleChange = (value: boolean) => {
    setEnabled(value);
    onChange(value);
  };

  return (
    <label
      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
        enabled ? "bg-blue-600" : "bg-gray-800"
      }`}
    >
      <span className="sr-only">Enable notifications</span>
      <RadixSwitch
        checked={enabled}
        onCheckedChange={handleChange}
        className="hidden"
      />
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </label>
  );
};
