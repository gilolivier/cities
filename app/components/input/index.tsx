"use client";

import { FC, useState } from "react";
import Autosuggest from "react-autosuggest";
import { InputFieldInterface } from "./types";
import { citySuggestionApiConfig } from "../../engine/api-config";
import { LoadingIcon } from "../loading-icon";

const getCities = async ({
  value,
  setSuggestions,
  setProcessingRequest,
}: {
  value: string;
  setSuggestions: (arg: string[]) => void;
  setProcessingRequest: (arg: boolean) => void;
}) => {
  // call our api and return the JSON list of data
  const options = {
    ...citySuggestionApiConfig.requestOptions,
    body: JSON.stringify(citySuggestionApiConfig.prompt({ value })),
  };

  try {
    const response = await fetch(
      `${citySuggestionApiConfig.endpoint}`,
      options,
    );
    const result = await response.json();
    // [TODO] this is no pretty at all. Surely we can get the LLM to return the data in a much direct way.
    const resultData = JSON.parse(
      result?.candidates?.[0]?.content?.parts?.[0]?.text,
    );
    if (resultData) {
      setSuggestions(
        JSON.parse(result?.candidates?.[0]?.content?.parts?.[0]?.text),
      );
    } else {
      // [TODO] something terrible has gone wrong here, handle this error
      // set to empty for now!
      setSuggestions([]);
    }
    setProcessingRequest(false);
  } catch (error) {
    // [TODO] cater for errors here
    console.error(error);
  }
};

export const InputField: FC<InputFieldInterface> = ({ placeholder }) => {
  const [inputVal, setInputVal] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [processingRequest, setProcessingRequest] = useState(false);

  const inputProps = {
    className: "box-border border-1 w-150 block text-5xl cursor-auto p-2 mt-0",
    placeholder,
    onChange: (e: React.SyntheticEvent) =>
      setInputVal((e.target as HTMLInputElement).value),
    value: inputVal,
  };

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }: { value: string }) => {
          setProcessingRequest(true);
          if (value !== "") {
            getCities({ value, setSuggestions, setProcessingRequest });
          }
        }}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={(suggestion: { text: string }) => suggestion.text}
        renderSuggestion={(suggestion: string) => {
          return <span>{suggestion}</span>;
        }}
        inputProps={inputProps}
        renderInputComponent={(inputProps: { [key: string]: string }) => (
          <div className="flex-col flex-nowrap">
            <input {...inputProps} />
            {processingRequest ? (
              <LoadingIcon /> // add loading icon component here
            ) : null}
          </div>
        )}
      />
    </>
  );
};
