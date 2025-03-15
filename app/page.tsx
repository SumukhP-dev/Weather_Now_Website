"use client";

import NavBar from "@/app/ui/NavBar";
import { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Weather from "./ui/home/Weather";
import Spinner from "@/app/ui/Spinner";
import Alerts from "@/app/ui/home/Alerts";
import states from "us-state-converter";
import { Geo } from "@vercel/functions";
import Map from "./ui/home/Map";
import dynamic from "next/dynamic";

export default function HomePage() {
  const [city, setCity] = useState("Atlanta");
  const [state, setState] = useState("Georgia");
  const [weather, setWeather] = useState({});
  const [alerts, setAlerts] = useState({});
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  // const Map = dynamic(() => import("../app/ui/home/Map"), { ssr: false });

  {
    /* Converts a city to its coordinates and returns a
    api url to fetch the weather */
  }
  const convertCityToCoor = (resolve: {
    (value: string): void;
    (arg0: string): void;
  }) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    axios.get(url).then((response) => {
      setLat(response.data[0].lat);
      setLon(response.data[0].lon);
      const url2: string = `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=imperial`;
      console.log("url2 " + url2);
      resolve(url2);
    });
  };

  {
    /* Fetches the weather using an api url */
  }
  const fetchWeather = async (e: { preventDefault: () => void }) => {
    setCity((document?.getElementById("cityInput") as HTMLInputElement).value);
    let myPromise = new Promise<string>(async function (resolve) {
      e.preventDefault();
      setLoading(true);
      convertCityToCoor(resolve);
    });
    const url2 = await myPromise;

    let myPromise2 = new Promise<string>(async function (resolve) {
      axios.get(url2).then((response) => {
        setWeather(response.data);
      });
    });
    setLoading(false);
    await myPromise2;
  };

  {
    /* Fetches alerts for a state using an api url */
  }
  const fetchAlerts = (e: { preventDefault: () => void }) => {
    setState(
      (document?.getElementById("stateInput") as HTMLInputElement).value
    );
    e.preventDefault();
    setLoading(true);
    const stateSymbol = states(state).usps;
    console.log(stateSymbol);
    const url3 = `https://api.weather.gov/alerts/active?area=${stateSymbol}`;
    axios.get(url3).then((response) => {
      setAlerts(response.data);
    });
    setLoading(false);
  };

  const SearchWeather = () => {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className="justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <input
              id="cityInput"
              type="text"
              placeholder="Search city"
              className="bg-transparent border-none text-white focus:outline-none text-2xl"
            />
            <button>
              <BsSearch size={20} />
            </button>
          </form>
          {/* Weather */}
          <Weather data={weather} />
        </div>
      );
    }
  };

  const SearchAlerts = () => {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className="m-auto pt-4 text-white mb-20">
          {/* Search Alerts */}
          <div className="justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
            <form
              onSubmit={fetchAlerts}
              className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
            >
              <input
                id="stateInput"
                type="text"
                placeholder="Search state"
                className="bg-transparent border-none text-white focus:outline-none text-2xl"
              />
              <button>
                <BsSearch size={20} />
              </button>
            </form>
          </div>
          {/* Alerts */}
          <Alerts data={alerts} />
        </div>
      );
    }
  };

  return (
    <>
      <NavBar />

      {/* Welcome Section */}
      <div className="">
        <h1 className="flex mt-5 h-10 items-center justify-center text-6xl">
          Welcome to Weather Now
        </h1>

        <p className="flex h-10 mt-10 items-center justify-center text-xl text-center	">
          This is a weather tracking website to get both current and future
          weather information that you may need using openweather&apos;s api
          catalogue.
        </p>
        <p className="flex mb-5 h-10 items-center justify-center text-xl">
          Use the search bar below to search for a city&apos;s weather.
        </p>
      </div>

      <SearchWeather />

      {/* Weather Alerts Section */}
      <div className="p-5 mt-20">
        <h1 className="flex h-10 items-center justify-center text-5xl">
          Weather Alerts
        </h1>
        <p className="flex h-10 mt-5 items-center justify-center p-3 text-xl">
          Use the search bar below to search for weather alerts within the
          state.
        </p>
      </div>

      <SearchAlerts />
    </>
  );
}
