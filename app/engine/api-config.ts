import { CitySuggestionApiConfigInterface } from "./api-config-types";

export const citySuggestionApiConfig: CitySuggestionApiConfigInterface = {
  endpoint:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBZIM7mTeaHwCkPEXwmHdzJKOv-ji2Bsfk",
  requestOptions: {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  },
  prompt: ({ value }: { value: string }) => ({
    contents: [
      {
        parts: [
          {
            // [TODO] this prompt needs some serious refactoring and cleaning up
            // 1. move to a config
            // 2. clean up  the result from the LLM.
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
