import { countWeatherTypes } from '@/lib/countWeatherTypes';
import { WeatherStoreType } from '@/lib/types';
import WeatherStore from '@/stores/weather-store';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Loader from './Loader';

export default function PieGraph() {
  const store: WeatherStoreType = WeatherStore();
  const { forecastData, isLoading } = store;

  const data = countWeatherTypes(forecastData?.list || []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border bg-white/10 shadow-sm backdrop-blur-sm">
      {isLoading ? (
        <Loader />
      ) : (
        forecastData && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      )}

      <div className="text-center">5-Day Forecast Breakdown</div>
    </div>
  );
}
