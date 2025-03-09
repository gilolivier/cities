export interface InputFieldInterface {
  placeholder: string;
}

export interface AutosuggestInputPropInterface {
  placeholder: string;
  className: string;
  onChange: (e: React.SyntheticEvent) => void;
  value: string;
  key?: string;
}
