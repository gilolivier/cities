import { FC } from "react";
import { InputFieldInterface } from "./types";

export const InputLabel: FC<InputFieldInterface> = ({ labelText }) => (
  <span>{labelText}</span>
);
