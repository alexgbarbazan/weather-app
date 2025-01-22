import { ChangeEvent } from "react";
import { Input as InputUI } from "../input";
import { Label } from "../label";

type InputProps = {
  label?: string;
  value: string;
  handleChange: (value: string) => void;
  placeholder?: string;
};

export default function Input({
  label,
  value,
  handleChange,
  placeholder,
}: InputProps) {
  return (
    <div className="w-full">
        {label && <Label>{label}</Label>}
        <InputUI
          type="text"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target.value)
          }
          style={{ margin: "10px 0", padding: "8px", width: "100%" }}
          placeholder={placeholder}
        />
    </div>
  );
}
