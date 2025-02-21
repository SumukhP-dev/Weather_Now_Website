import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

const Alerts = ({ data }: any) => {
  const renderWeatherAlerts = () => {
    if (data != null && JSON.stringify(data) != JSON.stringify({})) {
      const alertInfo = data.features.map((element: any) => {
        return <p key={element}>{element.properties.event}</p>;
      });
      return (
        <>
          <div className="relative flex-wrap text-gray-400 m-10 grid grid-cols-4 rounded-full">
            {data.features.map((element: any) => {
              return (
                <>
                  {/* Alert card */}
                  <Card className="bg-slate-500 text-white p-10 m-3">
                    <CardHeader>
                      <p key={element}>{element.properties.event}</p>
                    </CardHeader>
                    <CardBody>
                      <p key={element}>
                        Severity: {element.properties.severity}
                      </p>
                      <p key={element}>
                        Area Affected: {element.properties.areaDesc}
                      </p>
                      <p key={element}>
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
