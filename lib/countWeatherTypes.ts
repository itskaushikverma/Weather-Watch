import { ForecastApiItem } from './types';

export const countWeatherTypes = (list: ForecastApiItem['list']) => {
  const frequency: Record<string, number> = {};
  for (const item of list) {
    const main = item?.weather?.[0]?.main;
    if (main) {
      frequency[main] = (frequency[main] || 0) + 1;
    }
  }

  return Object.entries(frequency).map(([name, value]) => ({ name, value }));
};
