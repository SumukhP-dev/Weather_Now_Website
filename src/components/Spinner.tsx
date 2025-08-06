import React from "react";
import spinner from "../../public/spinner.gif";
import Image from "next/image";

const Spinner = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-start mt-10">
        <Image className="w-[2]" src={spinner} alt="loading.." />
      </div>
    </>
  );
};

export default Spinner;
