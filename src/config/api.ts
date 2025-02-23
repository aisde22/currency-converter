export const heading: string = "currency converter";
const API_DOMAIN: string = "https://api.exchangerate-api.com/v4";
const API_KEY: string = "USE-YOUR-API-KEY";
export const endpointPath = (from: string): string =>
  `${API_DOMAIN}/latest/${from}`;