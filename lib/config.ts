export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_OPENWEATHER_API_URL,
  GEO: process.env.NEXT_PUBLIC_OPENWEATHER_API_GEO,
  API_KEY: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
  DEFAULT_PARAMS: {
    units: 'metric',
    appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
  },
};
