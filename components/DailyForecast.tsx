'use client';

import {
  WbSunny as SunIcon,
  Cloud as CloudIcon,
  Grain as RainIcon,
  Thunderstorm as StormIcon,
  AcUnit as SnowIcon,
  Opacity as HumidityIcon,
  Air as WindIcon,
  Visibility as VisibilityIcon,
  Thermostat as TempIcon,
} from '@mui/icons-material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { DailyForecastItem, WeatherStoreType } from '@/lib/types';
import WeatherStore from '@/stores/weather-store';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from './ui/card';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Gauge } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { pollutantFullForms } from '@/lib/constants';
import type { JSX } from 'react';

export default function DailyForecast() {
  const [hoveredDay, setHoveredDay] = useState<DailyForecastItem | null>(null);
  const store: WeatherStoreType = WeatherStore();
  const { forecastData, airData, unit } = store;
  const [portfolioUrl, setPortfolioUrl] = useState('kaushikverma-portfolio.vercel.app');

  useEffect(() => {
    const handleGet = async () => {
      try {
        const resp = await fetch('https://pget.vercel.app');
        const data = await resp.json();
        setPortfolioUrl(data);
      } catch (e) {
        console.log(e);
      }
    };

    handleGet();
  }, []);

  const mapWeatherIcon = (apiIcon: string) => {
    if (apiIcon.includes('01')) return 'sunny';
    if (apiIcon.includes('02')) return 'partly_cloudy';
    if (apiIcon.includes('03') || apiIcon.includes('04')) return 'cloudy';
    if (apiIcon.includes('09') || apiIcon.includes('10')) return 'light_rain';
    if (apiIcon.includes('11')) return 'thunderstorm';
    if (apiIcon.includes('13')) return 'snow';
    if (apiIcon.includes('50')) return 'fog';
    return 'cloudy';
  };

  const dailyForecast = forecastData?.list
    .filter((item) => item.dt_txt.includes('12:00:00'))
    .slice(0, 7)
    .map((item) => {
      const date = new Date(item.dt * 1000);
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        minTemp: Math.round(item.main.temp_min),
        maxTemp: Math.round(item.main.temp_max),
        condition: item.weather[0].main,
        icon: mapWeatherIcon(item.weather[0].icon),
        feel: item.main.feels_like,
        pop: item.pop,
        wind: item.wind.speed,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        visibility: item.visibility,
      };
    });

  const getWeatherIcon = (condition: string) => {
    const iconProps = {
      sx: {
        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
        transition: 'all 0.3s ease',
        animation: 'pulse 2s infinite ease-in-out',
        '@keyframes pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    };

    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return (
          <SunIcon {...iconProps} sx={{ ...iconProps.sx, color: '#FFD700' }} fontSize="large" />
        );
      case 'cloudy':
      case 'partly cloudy':
      case 'overcast':
        return (
          <CloudIcon {...iconProps} sx={{ ...iconProps.sx, color: '#A9A9A9' }} fontSize="large" />
        );
      case 'rainy':
      case 'rain':
      case 'light_rain':
      case 'drizzle':
        return (
          <RainIcon {...iconProps} sx={{ ...iconProps.sx, color: '#4682B4' }} fontSize="large" />
        );
      case 'thunderstorm':
      case 'storm':
        return (
          <StormIcon {...iconProps} sx={{ ...iconProps.sx, color: '#4B0082' }} fontSize="large" />
        );
      case 'snow':
      case 'snowy':
      case 'sleet':
        return (
          <SnowIcon {...iconProps} sx={{ ...iconProps.sx, color: '#E0FFFF' }} fontSize="large" />
        );
      default:
        return (
          <SunIcon {...iconProps} sx={{ ...iconProps.sx, color: '#FFD700' }} fontSize="large" />
        );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 xl:h-[270px] xl:flex-row">
        <div className="w-full overflow-hidden xl:w-[60%]">
          <Card className="border border-white/10 bg-white/10 shadow-lg backdrop-blur-lg transition-all duration-500">
            <CardTitle>
              <h1 className="px-4">5 Day Forecast</h1>
            </CardTitle>
            <CardContent>
              <div className="flex w-full justify-between gap-5 overflow-hidden overflow-x-visible p-2 duration-500">
                {dailyForecast?.map((day, index) => (
                  <div
                    key={index}
                    className="w-[120px] flex-shrink-0 cursor-pointer rounded-2xl border border-white/10 bg-white/10 p-3 text-center text-white shadow-lg backdrop-blur-lg transition-all duration-500 hover:scale-105 md:w-auto"
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    <p className="mb-1 text-sm font-bold">{day.day}</p>
                    <p className="mb-3 text-xs opacity-70">{day.date}</p>
                    <div className="mb-2 flex justify-center gap-2 text-sm">
                      <span className="flex items-center text-blue-500 opacity-70">
                        <ArrowDown className="mr-1 h-4 w-4" /> +{day.minTemp}°
                      </span>
                      <span className="flex items-center font-semibold text-red-500">
                        <ArrowUp className="mr-1 h-4 w-4" />+{day.maxTemp}°
                      </span>
                    </div>
                    <div className="mb-2 flex h-12 items-center justify-center">
                      {getWeatherIcon(day.icon)}
                    </div>
                    <p className="text-xs opacity-90">{day.condition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-between xl:w-[40%]">
          <div className="h-full w-full">
            <Card className="h-full w-full border border-white/10 bg-white/10 shadow-lg backdrop-blur-lg transition-all duration-500">
              <CardTitle>
                <h1 className="text-center">More Detail</h1>
              </CardTitle>
              <CardContent className="h-full px-7 text-sm">
                {hoveredDay ? (
                  <MoreDetail hoveredDay={hoveredDay} getWeatherIcon={getWeatherIcon} unit={unit} />
                ) : (
                  <AirDetail airData={airData} />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="h-10 w-full py-4 text-center text-sm">
            Designed and Built by{' '}
            <span className="font-bold text-blue-500 underline">
              <Link href={portfolioUrl} target="_blank">
                Kaushik Verma
              </Link>
            </span>{' '}
            with Next JS, Chart.js, and OpenWeatherAPI.
          </div>
        </div>
      </div>
    </>
  );
}

const AirDetail = ({ airData }: { airData: WeatherStoreType['airData'] }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-base font-semibold tracking-wider">Сoncentration of</h1>
      <div className="ml-10 grid grid-cols-2 gap-2 text-sm">
        {airData?.list[0]?.components &&
          Object.entries(airData.list[0].components).map(([name, value], index) => (
            <div key={index}>
              <HoverCard>
                <HoverCardTrigger>
                  <span className="cursor-pointer">
                    {name.toUpperCase()}: {value} μg/m
                    <sub>3</sub>
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-full bg-transparent text-xs backdrop-blur-2xl">
                  Сoncentration of <strong>{pollutantFullForms[name] || name.toUpperCase()}</strong>{' '}
                  in air : {value}
                  μg/m<sub>3</sub>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
      </div>
    </div>
  );
};

const MoreDetail = ({
  hoveredDay,
  getWeatherIcon,
  unit,
}: {
  hoveredDay: DailyForecastItem;
  getWeatherIcon: (condition: string) => JSX.Element;
  unit: string;
}) => {
  return (
    <div className="flex h-full w-full flex-row items-center justify-center gap-5 text-base md:gap-10 xl:gap-5">
      <div className="mb-2 flex h-20 items-center justify-center">
        {getWeatherIcon(hoveredDay.icon)}
      </div>
      <div className="flex flex-col items-start justify-start gap-3">
        <div className="flex items-center gap-2">
          <WindIcon color="primary" fontSize={'small'} className="h-5 w-5" />
          Wind: {hoveredDay.wind} {unit === 'metric' ? 'm/s' : 'mph'}
        </div>
        <div className="flex items-center gap-2">
          <HumidityIcon color="primary" fontSize={'small'} className="h-5 w-5" />
          Humidity: {hoveredDay.humidity}%
        </div>
        <div className="flex items-center gap-2">
          <VisibilityIcon color="primary" fontSize={'small'} className="h-5 w-5" />
          Visibility: {hoveredDay.visibility} km
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <TempIcon sx={{ fontSize: '0.8rem !important' }} />
          Feels Like: {hoveredDay.feel}° {unit === 'metric' ? 'C' : 'F'}
        </div>
        <div className="flex items-center gap-2">
          <WaterDropIcon color="primary" fontSize={'small'} className="h-5 w-5" />
          Precipitation: {hoveredDay.pop}%
        </div>
        <div className="flex items-center gap-2">
          <Gauge size={20} color="#007bff" strokeWidth={2} />
          Pressure: {hoveredDay.pressure} hPa
        </div>
      </div>
    </div>
  );
};
