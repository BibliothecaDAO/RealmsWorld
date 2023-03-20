import { useState } from "react";
import { Switch as HeadlessUiSwitch } from "@headlessui/react";

interface Props {
  onChange: (value: string) => void;
}

export const Switch = ({ onChange }: Props) => {
  const [enabled, setEnabled] = useState(false);

  const handleChange = (event: any) => {
    setEnabled(event.target.value);
    onChange(event.target.value);
  };

  return (
    <HeadlessUiSwitch
      checked={enabled}
      onChange={() => handleChange({ target: { value: !enabled } })}
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-800"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HeadlessUiSwitch>
  );
};
