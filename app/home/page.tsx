"use client";

import NavBar from "@/app/components/NavBar";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Weather from "../components/Weather";
import Link from "next/link";
import Spinner from "@/app/components/Spinner";

export default function HomePage() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

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

        {/* Search */}
        <div className="flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
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
      </>
    );
  }
}
