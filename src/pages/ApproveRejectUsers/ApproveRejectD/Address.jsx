import React, { useEffect, useState } from "react";
import RadioButtons from "../../../components/ui/RadioButtons.jsx";
const Address = ({ addData, onRadioChange, radioData }) => {
  const [hAddressOption, setHAddressOption] = useState("");
  const handleChange = (event) => {
    const selectedOption = event.target.value;
    onRadioChange(selectedOption);
    setHAddressOption(selectedOption);
  };
  useEffect(() => {
    setHAddressOption(radioData);
  }, [radioData]);
  return (
    <div className=" bg-[#D9D9D9] w-[430px] h-[310px] mb-4 rounded-sm">
      <div className=" flex flex-row ">
        <h1 className=" text-lg ms-5 m-2   text-black font-semibold ">
          Address :
        </h1>
        <div className=" mt-1 ms-auto me-5 ">
          <RadioButtons
            handleChange={handleChange}
            selectedOption={hAddressOption}
          />
        </div>
      </div>
      <div>
        <div className="text-black font-medium  ms-2 mb-5">
          <div className="mt-3">
            <span className=" font-sm p  ">Street : </span>
            {addData.streetAddress}
            <br />
          </div>
          <div className="mt-1">
            <span className="font-sm ">City : </span>
            {addData.city}
            <br />
          </div>
          <div className="mt-1">
            <span className=" font-sm ">Locality : </span>
            {addData.locality}
            <br />
          </div>
          <div className="mt-1">
            <span className="font-sm ">Location in MAP : </span>
            <br />
          </div>

          <div className="mt-2 ms-4">
            <div className="w-[380px] h-[120px] bg-[#F2EFEF] rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
