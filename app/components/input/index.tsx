import { FC } from "react";
import { InputFieldInterface } from "./types";

export const InputField: FC<InputFieldInterface> = ({ placeholder }) => (
  <input
    className="box-border border-1 w-150 block text-5xl cursor-auto p-2"
    placeholder={placeholder}
  />
);
