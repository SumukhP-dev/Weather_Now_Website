import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import Image from "next/image";

const CurrentDayForecast = ({ data }) => {
  const changeMilitaryToStandard = (currentTime: string) => {
    const militaryTime = currentTime.substring(11, 13);
    const convertedTime = militaryTime as unknown as number;
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
          <p className="p-5 text-4xl text-center pb-6">
            Weather at {changeMilitaryToStandard(data[0].startTime)}
          </p>
          <div className="relative flex flex-row w-full p-4 text-white z-10 mb-20 justify-center ">
            {/* Left */}
            <div className="relative flex justify-start pt-12 ">
              <div className="flex flex-col items-center mr-10">
                <Image
                  src={data[0].icon}
                  alt=""
                  width="200"
                  height="200"
                ></Image>
                <p className="text-2xl p-5">{data[0].shortForecast}</p>
              </div>
            </div>

            {/* Right */}
            <div className="p-10 rounded-md">
              <p className="text-9xl px-40 mb-10">
                {data[0].temperature}&#176;F
              </p>
              <div className="flex justify-between text-center">
                <div>
                  <p className="font-bold text-2xl">
                    {data[0].probabilityOfPrecipitation.value}%
                  </p>
                  <p className="text-xl">Precipitation Chance</p>
                </div>
                <div>
                  <p className="font-bold text-2xl">
                    {data[0].relativeHumidity.value}%
                  </p>
                  <p className="text-xl">Humidity</p>
                </div>
                <div>
                  <p className="font-bold text-2xl">{data[0].windSpeed}</p>
                  <p className="text-xl">Winds</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Slider />
      {renderWeatherForecastWidget()};
    </>
  );
};

export default CurrentDayForecast;
