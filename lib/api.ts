import { API_CONFIG } from './config';
const { BASE_URL, API_KEY, GEO } = API_CONFIG;

const getWeather = async (lat: number, lon: number, units: string) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`,
  );
  const data = await response.json();
  return data;
};

const getForecast = async (lat: number, lon: number, units: string) => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`,
  );
  const data = await response.json();
  return data;
};

const searchLocation = async (query: string, units: string, country?: string | '') => {
  const response = await fetch(
    `${GEO}/direct?q=${query},${country ? country : ''}&limit=5&appid=${API_KEY}&units=${units}`,
  );
  return response;
};

const getAirQuality = async (lat: number, lon: number) => {
  const response = await fetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  const data = await response.json();
  return data;
};

export { getWeather, getForecast, searchLocation, getAirQuality };
