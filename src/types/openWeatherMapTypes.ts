export type Weather = {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export type SearchResultWeatherData = {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
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
    dt: number;
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        country: string;
    };
    rain: null;
    snow: null;
    clouds: {
        all: number;
    };
    weather: Array<Weather>;
};

export type SearchLocationResult = {
    message: string;
    cod: string;
    count: number;
    list: Array<SearchResultWeatherData>;
}

export type FiveDayForecastResult = {
    message: string;
    cod: string;
    cnt: number;
    list: Array<ForecastWeatherData>;
    city: ForecastCity;
}

export type GroupedForecast = {
    [key: string]: Array<ForecastWeatherData & { offsetMinutes: number }>;
}

export type FiveDayForecastProcessedResult = {
    message: string;
    cod: string;
    cnt: number;
    list: Array<ForecastWeatherData>;
    city: ForecastCity;
    grouped: GroupedForecast;
}


export type ForecastWeatherData = {
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
    weather: Array<Weather>;
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
}

export type ForecastCity = {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export type CurrentWeatherData = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Array<Weather>;
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
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

