export const normalizeValue = (
  para: keyof typeof ranges | 'Humidity' | 'Cloud Cover',
  rawValue: number,
): number => {
  if (para === 'Humidity' || para === 'Cloud Cover') {
    return Math.min(100, Math.max(0, rawValue));
  }
  const range = ranges[para];
  if (!range) return rawValue;

  const normalized = ((rawValue - range.min) / (range.max - range.min)) * 100;
  return Number(normalized.toFixed(1));
};

const ranges = {
  Temperature: { min: 0, max: 40 },
  Pressure: { min: 970, max: 1040 },
  'Wind Speed': { min: 0, max: 10 },
  'Feels Like': { min: 0, max: 40 },
};
