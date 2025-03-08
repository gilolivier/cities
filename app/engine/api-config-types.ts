export interface CitySuggestionApiConfigInterface {
  endpoint: string;
  requestOptions: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: { [key: string]: string }; // [TODO] can we type this using a standard http header type from somewhere?
  };
}
