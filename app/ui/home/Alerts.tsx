import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "components/ExampleCarouselImage";

function ControlledCarousel(element: any) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: React.SetStateAction<number>) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Card className="bg-slate-500 text-white p-10 m-3">
          <CardHeader>
            <p key={element}>{element.properties.event}</p>
          </CardHeader>
          <CardBody>
            <p key={element}>Severity: {element.properties.severity}</p>
            <p key={element}>Area Affected: {element.properties.areaDesc}</p>
            <p key={element}>Description: {element.properties.description}</p>
          </CardBody>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const Alerts = ({ data }: any) => {
  const renderWeatherAlerts = () => {
    if (data != null && JSON.stringify(data) != JSON.stringify({})) {
      const alertInfo = data.features.map((element: any) => {
        return <p key={element}>{element.properties.event}</p>;
      });
      return (
        <>
          <div className="relative flex-wrap text-gray-400 m-10 grid grid-cols-4 rounded-full">
            {data.features.map((individualElement: any) => {
              return (
                <>
                  {/* Alert card */}
                  <ControlledCarousel element={individualElement} />
                </>
              );
            })}
          </div>
        </>
      );
    }
  };

  return renderWeatherAlerts();
};

export default Alerts;
