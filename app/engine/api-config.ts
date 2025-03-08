import { CitySuggestionApiConfigInterface } from "./api-config-types";

export const citySuggestionApiConfig: CitySuggestionApiConfigInterface = {
  endpoint:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBZIM7mTeaHwCkPEXwmHdzJKOv-ji2Bsfk",
  requestOptions: {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  },
};
