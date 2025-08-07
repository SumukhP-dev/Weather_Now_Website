import React from "react";
import spinner from "../..//assets/gifs/spinner.gif"

const Spinner = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-start mt-10">
        <img className="w-[2]" src={spinner} alt="loading.." />
      </div>
    </>
  );
};

export default Spinner;
