"use client";

import NavBar from "@/app/components/NavBar";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Weather from "../components/Weather";
import Link from "next/link";
import Spinner from "@/app/components/Spinner";
import Alerts from "@/app/components/Alerts";

export default function HomePage() {
  const [city, setCity] = useState("Atlanta");
  const [state, setState] = useState("Georgia");
  const [weather, setWeather] = useState({});
  const [alerts, setAlerts] = useState({});
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const states = require("us-state-converter");

  const convertCoorToCity = (resolve) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    axios.get(url).then((response) => {
      setLat(response.data[0].lat);
      setLon(response.data[0].lon);
      const url2: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=imperial`;
      resolve(url2);
    });
  };

  const fetchWeather = async (e) => {
    let myPromise = new Promise(async function (resolve) {
      e.preventDefault();
      setLoading(true);
      convertCoorToCity(resolve);
    });
    const url2: string = await myPromise;
    axios.get(url2).then((response) => {
      setWeather(response.data);
    });
    setLoading(false);
  };

  const fetchAlerts = (e) => {
    e.preventDefault();
    setLoading(true);
    const stateSymbol = states.abbr(state);
    const url3 = `https://api.weather.gov/alerts/active?area=${stateSymbol}`;
    axios.get(url3).then((response) => {
      setAlerts(response.data);
    });
    setLoading(false);
    console.log(alerts);
    console.log(state);
    console.log(stateSymbol);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <NavBar />

        {/* Welcome Section */}
        <div className="p-5">
          <h1 className="flex h-10 items-center justify-center text-6xl">
            Welcome to Weather Now
          </h1>
          <p className="flex h-10 mt-5 items-center justify-center p-3 text-xl">
            This is a weather tracking website to get both current and future
            weather information that you may need using openweather's api
            catalogue.
          </p>
          <p className="flex h-10 items-center justify-center p-3 text-xl">
            Use the search bar below to search for a city's weather.
          </p>
        </div>

        {/* Search Weather */}
        <div className="justify-between items-center max-w-[500px] w-full m-auto pt-4 z-10 ">
          <form
            onSubmit={fetchWeather}
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

          {/* Weather */}
          <Weather data={weather} />
        </div>

        {/* Alerts Section */}
        <div className="p-5">
          <h1 className="flex h-10 items-center justify-center text-5xl">
            Alerts
          </h1>
          <p className="flex h-10 mt-5 items-center justify-center p-3 text-xl">
            Use the search bar below to search for alerts within the state.
          </p>
        </div>

        {/* Search Alerts */}
        <div className="m-auto pt-4 text-white">
          <div className="justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
            <form
              onSubmit={fetchAlerts}
              className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
            >
              <div>
                <input
                  id="stateInput"
                  type="text"
                  placeholder="Search state"
                  className="bg-transparent border-none text-white focus:outline-none text-2xl"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <button>
                <BsSearch size={20} />
              </button>
            </form>
          </div>
          {/* Alerts */}
          <Alerts data={alerts} />
        </div>
      </>
    );
  }
}
