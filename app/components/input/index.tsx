"use client";

import { FC, useState, useEffect } from "react";
import { InputFieldInterface } from "./types";
import { citySuggestionApiConfig } from "../../engine/api-config";

const getCities = async (inputValue: string) => {
  const options = {
    ...citySuggestionApiConfig.requestOptions,
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              // [TODO] this prompt needs some  serious refactoring and cleani
              // 1. move to a config
              // 2. clean up  the result from the LLM
              // 3. clean up empty results
              // 4. tidy up the entire response and strip what we don't need
              // 5. Move response formatting to use schema through the model config
              // 6. cater for errors
              // 7. sanitise user inputs
              text: `Return a unique set of 20 cities names in the world that contains the following word: ${inputValue}. Do a simple string match on the string.
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
    console.log(JSON.parse(result.candidates[0].content.parts[0].text));
  } catch (error) {
    // [TODO] cater for errors here
    console.error(error);
  }
};

export const InputField: FC<InputFieldInterface> = ({ placeholder }) => {
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    if (inputVal !== "") {
      getCities(inputVal);
    }
  }, [inputVal]);

  return (
    <input
      className="box-border border-1 w-150 block text-5xl cursor-auto p-2"
      placeholder={placeholder}
      onChange={(e) => setInputVal(e.target.value)}
      value={inputVal}
    />
  );
};
