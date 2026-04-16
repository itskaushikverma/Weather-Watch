import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { normalizeValue } from '@/lib/normalizeValue';
import WeatherStore from '@/stores/weather-store';
import { WeatherStoreType } from '@/lib/types';
import Loader from './Loader';

export default function RadarGraph() {
  const store: WeatherStoreType = WeatherStore();
  const { weatherData, isLoading } = store;

  const data = [
    {
      para: 'Temperature',
      value: normalizeValue('Temperature', weatherData?.main.temp ?? 0),
    },
    {
      para: 'Humidity',
      value: normalizeValue('Humidity', weatherData?.main.humidity ?? 0),
    },
    {
      para: 'Wind Speed',
      value: normalizeValue('Wind Speed', weatherData?.wind.speed ?? 0),
    },
    {
      para: 'Cloud Cover',
      value: normalizeValue('Cloud Cover', weatherData?.clouds.all ?? 0),
    },
    {
      para: 'Pressure',
      value: normalizeValue('Pressure', weatherData?.main.pressure ?? 0),
    },
    {
      para: 'Feels Like',
      value: normalizeValue('Feels Like', weatherData?.main.feels_like ?? 0),
    },
  ];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border bg-white/10 shadow-sm backdrop-blur-sm">
      {isLoading ? (
        <Loader />
      ) : (
        weatherData && (
          <ResponsiveContainer width="100%" height="90%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="para"
                tick={({ payload, x, y, textAnchor }) => (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill="#ffffff"
                    fontSize={12}
                    className="font-semibold"
                  >
                    {payload.value}
                  </text>
                )}
              />

              <Radar
                dataKey="value"
                fill="#8884d8"
                stroke="#8884d8"
                fillOpacity={0.6}
                className="text-white"
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        )
      )}

      <div className="text-center">Current Weather Profile</div>
    </div>
  );
}
