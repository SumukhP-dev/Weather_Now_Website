// ParentComponent.js
import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div>
      <ChildComponent stateVariable={stateVariable} />
    </div>
  );
};

export default ParentComponent;
