import React from "react";
import Image from "next/image";

const Weather = ({ data }) => {
  const renderWeatherWidget = () => {
    if (data != null && JSON.stringify(data) != JSON.stringify({})) {
      return (
        <>
          <div className="relative flex flex-row w-full p-4 text-white z-10 mb-20 justify-center ">
            {/* Top */}
            <div className="relative flex justify-start pt-12 mr-20 ">
              <div className="flex flex-col items-center">
                <Image
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="/"
                  width="100"
                  height="100"
                />
                <p className="text-2xl">{data.weather[0].main}</p>
              </div>
              <p className="text-9xl">{data.main.temp.toFixed(0)}&#176;F</p>
            </div>

            {/* Bottom */}
            <div className=" p-10 rounded-md">
              <p className="text-2xl text-center pb-6">
                Weather in {data.name}
              </p>
              <div className="flex justify-between text-center">
                <div>
                  <p className="font-bold text-2xl px-10">
                    {data.main.feels_like.toFixed(0)}&#176;F
                  </p>
                  <p className="text-xl">Feels Like</p>
                </div>
                <div>
                  <p className="font-bold text-2xl px-5">
                    {data.main.humidity}%
                  </p>
                  <p className="text-xl">Humidity</p>
                </div>
                <div>
                  <p className="font-bold text-2xl px-5">
                    {data.wind.speed.toFixed(0)} MPH
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

  return renderWeatherWidget();
};

export default Weather;
