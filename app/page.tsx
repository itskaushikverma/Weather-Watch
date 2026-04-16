'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import WeatherHeader from '@/components/WeatherHeader';
import CurrentWeather from '@/components/CurrentWeather';
import LineGraph from '@/components/LineGraph';
import PieGraph from '@/components/PieGraph';
import RadarGraph from '@/components/RadarGraph';
import WeatherStore from '@/stores/weather-store';
import LocationStore from '@/stores/location-store';
import SearchPanel from '@/components/SearchPanel';
import { WeatherStoreType } from '@/lib/types';
import DailyForecast from '@/components/DailyForecast';
import toast from 'react-hot-toast';
import PreLoader from '@/components/PreLoader';

export default function WeatherDashboard() {
  const store: WeatherStoreType = WeatherStore();
  const { weatherData, forecastData, fetchWeatherData, currentCoordinate } = store;

  const latitude = LocationStore((state) => state.latitude);
  const longitude = LocationStore((state) => state.longitude);
  const updateLocation = LocationStore((state) => state.updateLocation);

  const unit = WeatherStore((state) => state.unit);
  const setUnit = WeatherStore((state) => state.setUnit);

  const [background, setBackgroundImage] = useState<string | null>(null);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchMenuRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(
    async ({ lat, lon, unit }: { lat: number; lon: number; unit: string }) => {
      fetchWeatherData({ lat, lon, unit });
    },
    [fetchWeatherData],
  );

  const getCityByIP = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      updateLocation(data.latitude, data.longitude);
      currentCoordinate(data.latitude, data.longitude);
    } catch (err) {
      console.error('Error fetching location by IP:', err);
      toast.error('Unable to fetch location by IP');
    }
  }, [updateLocation, currentCoordinate]);

  const getUserLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by your browser');
    }
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
        });
      });
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      updateLocation(lat, lon);
      currentCoordinate(lat, lon);
    } catch (error) {
      toast.error('Unable to fetch location, fetching by IP... ');
      console.error('Error getting location:', error);
      await getCityByIP();
    }
  }, [updateLocation, currentCoordinate, getCityByIP]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchData({ lat: latitude, lon: longitude, unit });
    }
  }, [latitude, longitude, unit, fetchData]);

  const toggleUnits = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (weatherData && forecastData && latitude && longitude) {
      fetchData({
        lat: latitude,
        lon: longitude,
        unit: unit === 'metric' ? 'imperial' : 'metric',
      });
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 16) {
      setBackgroundImage('/backgrounds/morning.png');
    } else if (hour >= 16 && hour < 19) {
      setBackgroundImage('/backgrounds/evening.jpg');
    } else {
      setBackgroundImage('/backgrounds/night.png');
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchMenuRef.current &&
        !searchMenuRef.current.contains(e.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setSearchPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [searchMenuRef, searchButtonRef, searchInputRef]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  });

  return (
    <>
      <PreLoader />
      {searchPanelOpen && (
        <SearchPanel
          setSearchPanelOpen={setSearchPanelOpen}
          menuRef={searchMenuRef}
          inputRef={searchInputRef}
        />
      )}
      <div
        className="no-scrollbar max-h-screen overflow-auto"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div>
          <WeatherHeader
            searchPanelOpen={searchPanelOpen}
            setSearchPanelOpen={setSearchPanelOpen}
            searchButtonRef={searchButtonRef as React.RefObject<HTMLButtonElement>}
          />
        </div>
        <div className="p-4 pt-24">
          <div className="flex flex-col items-center justify-center gap-10 xl:flex-row">
            <div className="xl:w-[60%]">
              <CurrentWeather units={unit} onToggleUnits={toggleUnits} />
            </div>
            <div className="flex w-full flex-col gap-5 xl:w-[40%]">
              <div className="h-[230px]">
                <LineGraph />
              </div>
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="h-[230px] w-full rounded-xl border bg-white/10 p-2 shadow-sm sm:w-[60%]">
                  <RadarGraph />
                </div>
                <div className="h-[230px] w-full rounded-xl border bg-white/10 p-2 shadow-sm sm:w-[40%]">
                  <PieGraph />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <DailyForecast />
        </div>
      </div>
    </>
  );
}
