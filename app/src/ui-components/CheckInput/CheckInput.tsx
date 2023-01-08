import TextInput from "@ui/TextInput";
import type { FC } from "react";
import type { CheckInputProps } from "./CheckInput.interface";

const CheckInput: FC<CheckInputProps> = ({ label }) => {
  return (
    <div className="flex items-center justify-start gap-2">
      <input type="checkbox" className="w-fit p-0" id={label} />
      <label className="flex-1" htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

export default CheckInput;
