import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ResponsiveCarousel = ({ items }: any) => {
  const responsive: any = items;
  console.log(responsive);
  return (
    <div
      className="self-stretch
"
    >
      <Carousel
        centerMode
        centerSlidePercentage={33}
        showArrows={true}
        showIndicators={true}
        infiniteLoop={true}
        dynamicHeight={false}
      >
        {responsive.features.map((item: any) => (
          <>
            {/* Alert card */}
            <Card className="bg-slate-500 text-white p-5 m-3 min-h-dvh max-w-lg"            >
              <CardHeader>
                <p key={item}>{item.properties.event}</p>
              </CardHeader>
              <CardBody>
                <p key={item}>Severity: {item.properties.severity}</p>
                <br />
                <p key={item}>Area Affected: {item.properties.areaDesc}</p>
                <br />
                <p key={item}>Description: {item.properties.description}</p>
              </CardBody>
            </Card>
          </>
        ))}
      </Carousel>
    </div>
  );
};

const Alerts = ({ data }: any) => {
  const renderWeatherAlerts = () => {
    console.log(typeof data);
    if (data != null && JSON.stringify(data) != JSON.stringify({})) {
      return (
        <>
          <div className="relative text-gray-400 m-10">
            {/* Alert carousel */}
            <ResponsiveCarousel items={data} />
          </div>
        </>
      );
    }
  };

  return renderWeatherAlerts();
};

export default Alerts;
