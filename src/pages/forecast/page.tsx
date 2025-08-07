"use client";

import CurrentDayForecast from "@/src/components/forecast/CurrentDayForecast";
import Layout from "@/src/components/Layout";
import NavBar from "@/src/components/NavBar";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useStore } from "../../../lib/store.tsx";

export default function ForecastPage() {
  const [currentDayForecast, setCurrentDayForecast] = useState({});
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  {
    /* Converts a city to its coordinates and returns a api url 
    to fetch the weather data from the nearest station */
  }
  const convertCityToCoor = (resolve: {
    (value: string): void;
    (arg0: string): void;
  }) => {
    const city = (document?.getElementById("cityInput") as HTMLInputElement)
      .value;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    axios.get(url).then((response) => {
      // console.log("lat: " + response.data[0].lat);
      // console.log("lon: " + response.data[0].lon);
      setLat(response.data[0].lat);
      setLon(response.data[0].lon);
      const url2 = `https://api.weather.gov/points/${response.data[0].lat},${response.data[0].lon}`;
      resolve(url2);
    });
  };

  {
    /* Fetches an api url for the hourly forecast of the weather */
  }
  const findForecastURL = async (resolve: {
    (value: string): void;
    (arg0: any): void;
  }) => {
    let myPromise = new Promise<string>(async function (resolve) {
      convertCityToCoor(resolve);
    });
    const url2 = await myPromise;
    axios.get(url2).then((response) => {
      const url3 = response.data.properties.forecastHourly;
      resolve(url3);
    });
  };

  {
    /* Fetches the hourly forecast data */
  }
  const fetchCurrentDayForecast = async (e: { preventDefault: () => void }) => {
    let myPromise2 = new Promise<string>(async function (resolve) {
      e.preventDefault();
      setLoading(true);
      findForecastURL(resolve);
    });
    const url3 = await myPromise2;
    axios.get(url3).then((response) => {
      setCurrentDayForecast(response.data.properties.periods);
      // console.log(JSON.stringify(response.data.properties.periods));
    });
    setLoading(false);
  };

  useStore.subscribe((state) => {
    // console.log("state", state, "oldState", oldState);
    fetchCurrentDayForecast({ preventDefault: () => {} });
  });

  return (
    <>
      <Layout>
      {/* Current Day Forecast */}
      <div className="">
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
                className="bg-transparent border-none focus:outline-none text-2xl text-white bg-black"
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
      </Layout>
    </>
  );
}
