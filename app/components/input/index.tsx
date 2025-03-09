"use client";

import { FC, useState } from "react";
import Autosuggest from "react-autosuggest";
import { InputFieldInterface, AutosuggestInputPropInterface } from "./types";
import {
  resolveInputProps,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  getSuggestionValue,
  renderSuggestion,
  renderInputComponent,
} from "./helpers";

export const InputField: FC<InputFieldInterface> = ({ placeholder }) => {
  const [inputVal, setInputVal] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [processingRequest, setProcessingRequest] = useState<boolean>(false);

  const inputProps = resolveInputProps({ placeholder, inputVal, setInputVal });

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }: { value: string }) =>
          onSuggestionsFetchRequested({
            setProcessingRequest,
            value,
            setSuggestions,
          })
        }
        onSuggestionsClearRequested={() =>
          onSuggestionsClearRequested({
            setSuggestions,
          })
        }
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={(inputPropsArg: AutosuggestInputPropInterface) =>
          renderInputComponent(inputPropsArg, processingRequest)
        }
      />
    </>
  );
};
