import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherStoreType } from '@/lib/types';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import WeatherStore from '@/stores/weather-store';
import Loader from './Loader';

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export default function LineGraph() {
  const store: WeatherStoreType = WeatherStore();
  const { forecastData, isLoading } = store;

  const chartData: ChartData[] =
    forecastData?.list?.slice(0, 8).map((item) => ({
      time: format(new Date(item.dt * 1000), 'ha'),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    })) ?? [];

  return (
    <Card className="flex-1 bg-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Today&apos;s Temperature</CardTitle>
      </CardHeader>
      {isLoading ? (
        <Loader />
      ) : (
        forecastData &&
        forecastData.list.length > 0 && (
          <CardContent>
            <div className="h-[140px] w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
                className={'rounded-lg bg-white/10 pt-5 pr-5 backdrop-blur-sm'}
              >
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="time"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}°`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background rounded-lg border p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-muted-foreground text-[0.70rem] uppercase">
                                  Temperature
                                </span>
                                <span className="font-bold">{payload[0].value}°</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-muted-foreground text-[0.70rem] uppercase">
                                  Feels Like
                                </span>
                                <span className="font-bold">{payload[1].value}°</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="feels_like"
                    stroke="#64748b"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        )
      )}
    </Card>
  );
}
