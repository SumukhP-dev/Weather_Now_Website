"use client";

import NavBar from "@/app/components/NavBar";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

export default function HomePage() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const convertCoorToCity = async () => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    axios.get(url).then(async (response) => {
      await setLat(response.data[0].lat);
      await setLon(response.data[0].lon);
    });
  };

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    convertCoorToCity();
    const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    axios.get(url2).then((response) => {
      setWeather(response.data);
      console.log(response.data);
    });
    setLoading(false);
  };

  return (
    <>
      <NavBar />

      {/* Search */}
      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
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
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <button onClick={fetchWeather}>
            <BsSearch size={20} />
          </button>
        </form>
      </div>
    </>
  );
}
