import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
const Alerts = ({ data }) => {
  const renderWeatherAlerts = () => {
    if (data != null && JSON.stringify(data) != JSON.stringify({})) {
      console.log(data);
      const alertInfo = data.features.map((element, i) => {
        console.log(element.properties.event);
        return <p key={i}>{element.properties.event}</p>;
      });
      console.log(alertInfo);
      return (
        <>
          <div className="relative flex w-full text-gray-400">
            {data.features.map((element, i) => {
              console.log(element);
              return (
                <>
                  <Card className="bg-slate-500	 text-white p-5 m-5">
                    <CardHeader>
                      <p key={i}>{element.properties.event}</p>
                    </CardHeader>
                    <CardBody>
                      <p key={i}>Severity: {element.properties.severity}</p>
                      <p key={i}>
                        Area Affected: {element.properties.areaDesc}
                      </p>
                      <p key={i}>
                        Description: {element.properties.description}
                      </p>
                    </CardBody>
                  </Card>
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
