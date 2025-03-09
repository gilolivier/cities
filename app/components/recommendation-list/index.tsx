import { FC } from "react";

// render our list of recommendation based on the value of suggestionValue
// straight forward comp that should call the api again, with suggestionValue, and display the results
export const RecommendationList: FC<{ suggestionValue: string }> = ({
  suggestionValue,
}) => (
  <div>
    Render a list of recommendations based on this city: {suggestionValue}
  </div>
);
