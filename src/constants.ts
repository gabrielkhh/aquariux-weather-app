import type { SearchResultWeatherData } from "./types/openWeatherMapTypes";

// Used for the coordinates. The remaining weather data in this constant can be stale and it is fine.
export const DEFAULT_LOCATION_SINGAPORE: SearchResultWeatherData = {
    "id": 1880252,
    "name": "Singapore",
    "coord": {
        "lat": 1.2897,
        "lon": 103.8501
    },
    "main": {
        "temp": 27.16,
        "feels_like": 30.52,
        "temp_min": 27.16,
        "temp_max": 29.96,
        "pressure": 1009,
        "humidity": 84,
        "sea_level": 1009,
        "grnd_level": 1008
    },
    "dt": 1747494554,
    "wind": {
        "speed": 0.45,
        "deg": 118
    },
    "sys": {
        "country": "SG"
    },
    "rain": null,
    "snow": null,
    "clouds": {
        "all": 29
    },
    "weather": [
        {
            "id": 802,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03n"
        }
    ]
}