"use client";

import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import Image from "next/image";
import { useStore } from "../../lib/store.tsx";

const CurrentDayForecast = ({ data }: any) => {
  const time = useStore.getState().position;
  const changeMilitaryToStandard = (currentTime: string) => {
    const militaryTime = currentTime.substring(11, 13);
    let convertedTime = militaryTime as unknown as number;

    if (convertedTime == 0) {
      convertedTime = 12;
    }

    if (convertedTime > 12) {
      return `${convertedTime - 12}:00 PM`;
    } else {
      return `${convertedTime}:00 AM`;
    }
  };

  const renderWeatherForecastWidget = () => {
    if (data != null && JSON.stringify(data) != JSON.stringify({})) {
      return (
        <>
          <Slider />
          <p className="p-5 text-4xl text-center pb-6">
            Weather at {changeMilitaryToStandard(data[time[0] - 1].startTime)}
          </p>
          <div className="relative flex flex-row w-full p-4 text-white z-10 mb-20 justify-center ">
            {/* Left */}
            <div className="relative flex justify-start pt-12 ">
              <div className="flex flex-col items-center mr-10">
                <Image
                  src={data[time[0] - 1].icon}
                  alt=""
                  width="200"
                  height="200"
                ></Image>
                <p className="text-2xl p-5">
                  {data[time[0] - 1].shortForecast}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="p-10 rounded-md">
              <p className="flex justify-center items-center text-9xl mb-10">
                {data[time[0] - 1].temperature}&#176;F
              </p>
              <div className="flex justify-between text-center">
                <div>
                  <p className="font-bold text-2xl px-10">
                    {data[time[0] - 1].probabilityOfPrecipitation.value}%
                  </p>
                  <p className="text-xl">Precipitation Chance</p>
                </div>
                <div>
                  <p className="font-bold text-2xl px-10">
                    {data[time[0] - 1].relativeHumidity.value}%
                  </p>
                  <p className="text-xl">Humidity</p>
                </div>
                <div>
                  <p className="font-bold text-2xl px-5">
                    {data[time[0] - 1].windSpeed}
                  </p>
                  <p className="text-xl">Winds</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return <>{renderWeatherForecastWidget()}</>;
};

export default CurrentDayForecast;
