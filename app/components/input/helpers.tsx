import { citySuggestionApiConfig } from "../../engine/api-config";
import { LoadingIcon } from "../loading-icon";
import { AutosuggestInputPropInterface } from "./types";
import { RecommendationList } from "../recommendation-list";

// call our api and return the JSON list of data
export const getCities = async ({
  value,
  setSuggestions,
  setProcessingRequest,
}: {
  value: string;
  setSuggestions: (arg: string[]) => void;
  setProcessingRequest: (arg: boolean) => void;
}) => {
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

// calculate the standard props for the input field
// passed to the autosuggest comp
export const resolveInputProps = ({
  placeholder,
  inputVal,
  setInputVal,
}: {
  placeholder: string;
  inputVal: string;
  setInputVal: (arg: string) => void;
}): AutosuggestInputPropInterface => ({
  className: "box-border border-1 w-150 block text-5xl cursor-auto p-2 mt-0",
  placeholder,
  onChange: (e: React.SyntheticEvent) =>
    setInputVal((e.target as HTMLInputElement).value),
  value: inputVal,
});

// when the autosuggest comp detects a change
// call the fn to get the list of cities
export const onSuggestionsFetchRequested = ({
  setProcessingRequest,
  value,
  setSuggestions,
}: {
  setProcessingRequest: (arg: boolean) => void;
  value: string;
  setSuggestions: (arg: string[]) => void;
}) => {
  setProcessingRequest(true);
  if (value !== "") {
    getCities({ value, setSuggestions, setProcessingRequest });
  }
};

export const onSuggestionsClearRequested = ({
  setSuggestions,
}: {
  setSuggestions: (arg: string[]) => void;
}) => setSuggestions([]);

export const getSuggestionValue = (suggestion: { text: string }) =>
  suggestion.text;

export const renderSuggestion = (suggestion: string) => (
  <span>{suggestion}</span>
);

// specific rendering for the input comp
export const renderInputComponent = (
  inputProps: AutosuggestInputPropInterface,
  processingRequest: boolean,
) => (
  <div className="flex-col flex-nowrap">
    <input {...inputProps} />
    {processingRequest ? (
      <LoadingIcon /> // add loading icon component here
    ) : null}
  </div>
);

export const onSuggestionSelected = ({
  suggestionValue,
}: {
  suggestionValue: string;
}) => {
  // [TODO] render the list of recommendations based on suggestionValue value
  // load the comp <RecommendationList />
  // a few different ways to do this:
  // 1. could set general context here and render RecommendationList higher up based on this value
  // 2. could use a callback function here from parent component that would render the comp
  console.log(suggestionValue);
};
