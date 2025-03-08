"use client";

import { FC, useState } from "react";
import Autosuggest from "react-autosuggest";
import { InputFieldInterface } from "./types";
import { citySuggestionApiConfig } from "../../engine/api-config";

const getCities = async ({
  value,
  setSuggestions,
}: {
  value: string;
  setSuggestions: (arg: string[]) => void;
}) => {
  const options = {
    ...citySuggestionApiConfig.requestOptions,
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              // [TODO] this prompt needs some  serious refactoring and cleaning up
              // 1. move to a config
              // 2. clean up  the result from the LLM
              // 3. clean up empty results
              // 4. tidy up the entire response and strip what we don't need
              // 5. Move response formatting to use schema through the model config
              // 6. cater for errors
              // 7. sanitise user inputs
              text: `Return a unique set of the 10 most relevant cities names in the world that contains the following word: ${value}. Do a simple string match comparaison.
                Return the results in  JSON format: Return: Array<CityName>
                Strip everything else from the response.
                If there are no cities that match the prompt, return an empty array.`,
            },
          ],
        },
      ],
      generationConfig: {
        response_mime_type: "application/json",
      },
    }),
  };

  try {
    const response = await fetch(
      `${citySuggestionApiConfig.endpoint}`,
      options,
    );
    const result = await response.json();
    setSuggestions(JSON.parse(result.candidates[0].content.parts[0].text));
  } catch (error) {
    // [TODO] cater for errors here
    console.error(error);
  }
};

export const InputField: FC<InputFieldInterface> = ({ placeholder }) => {
  const [inputVal, setInputVal] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const inputProps = {
    className: "box-border border-1 w-150 block text-5xl cursor-auto p-2",
    placeholder,
    onChange: (e: React.SyntheticEvent) =>
      setInputVal((e.target as HTMLInputElement).value),
    value: inputVal,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }: { value: string }) => {
        if (value !== "") {
          getCities({ value, setSuggestions });
        }
      }}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion: { text: string }) => suggestion.text}
      renderSuggestion={(suggestion: string) => {
        return <span>{suggestion}</span>;
      }}
      inputProps={inputProps}
    />
  );
};
