"use client";

import CurrentDayForecast from "@/app/components/CurrentDayForecast";
import NavBar from "@/app/components/NavBar";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function ForecastPage() {
  const [city, setCity] = useState("Atlanta");
  const [currentDayForecast, setCurrentDayForecast] = useState({});
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [wfo, setWFO] = useState(0);

  {
    /* Converts a city to its coordinates and returns a api url 
    to fetch the weather data from the nearest station */
  }
  const convertCityToCoor = (resolve: string) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    axios.get(url).then((response) => {
      setLat(response.data[0].lat);
      setLon(response.data[0].lon);
      const url2: string = `https://api.weather.gov/points/${lat},${lon}`;
      resolve(url2);
    });
  };

  {
    /* Fetches an api url for the hourly forecast of the weather */
  }
  const findForecastURL = async (resolve: string) => {
    let myPromise = new Promise(async function (resolve) {
      convertCityToCoor(resolve);
    });
    const url2: string = await myPromise;
    axios.get(url2).then((response) => {
      const url3 = response.data.properties.forecastHourly;
      resolve(url3);
    });
  };

  {
    /* Fetches the hourly forecast data */
  }
  const fetchCurrentDayForecast = async (e: { preventDefault: () => void }) => {
    let myPromise2 = new Promise(async function (resolve) {
      e.preventDefault();
      setLoading(true);
      findForecastURL(resolve);
    });
    const url3: string = await myPromise2;
    axios.get(url3).then((response) => {
      setCurrentDayForecast(response.data.properties.periods);
    });
    setLoading(false);
  };

  return (
    <>
      <NavBar />

      {/* Current Day Forecast */}
      <div className="p-5">
        <h1 className="flex mt-5 h-10 items-center justify-center text-6xl">
          Current Day Forecast
        </h1>
        <p className="flex h-10 mt-5 items-center justify-center p-3 text-xl">
          This is a current day forecast widget where you use the slider to see
          the weather later in the day.
        </p>
      </div>

      <div className="m-auto pt-4 text-white mb-20">
        {/* Search Current Day Forecast */}
        <div className="justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
          <form
            onSubmit={fetchCurrentDayForecast}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <div>
              <input
                id="cityInput"
                type="text"
                placeholder="Search city"
                className="bg-transparent border-none text-white focus:outline-none text-2xl"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <button>
              <BsSearch size={20} />
            </button>
          </form>
        </div>
        {/* Current Day Forecats Widget */}
        <CurrentDayForecast data={currentDayForecast} />
      </div>
    </>
  );
}
