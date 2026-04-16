type ForecastApiItem = {
  city: {
    coord: {
      lat: number;
      lon: number;
    };
    id: number;
    name: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
};

type WeatherApiItem = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type AirQualityApiItem = {
  coord: {
    lon: number;
    lat: number;
  };
  list: {
    dt: number;
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }[];
};

type WeatherStoreType = {
  weatherData: WeatherApiItem | null;
  forecastData: ForecastApiItem | null;
  isLoading: boolean;
  error: string | null;
  unit: string;
  currentlat: number | null;
  currentlon: number | null;
  airData: AirQualityApiItem | null;
  currentCoordinate: (currentlat: number, currentlon: number) => void;
  setUnit: (unit: string) => void;
  fetchWeatherData: ({
    lat,
    lon,
    unit,
  }: {
    lat: number;
    lon: number;
    unit: string;
  }) => Promise<void>;
};

type LoacationStoreType = {
  latitude?: number;
  longitude?: number;
  updateLocation: (latitude: number, longitude: number) => void;
};

type DailyForecastItem = {
  day: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
  feel: number;
  pop: number;
  wind: number;
  humidity: number;
  pressure: number;
  visibility: number;
};

export type {
  ForecastApiItem,
  WeatherApiItem,
  WeatherStoreType,
  LoacationStoreType,
  DailyForecastItem,
  AirQualityApiItem,
};
