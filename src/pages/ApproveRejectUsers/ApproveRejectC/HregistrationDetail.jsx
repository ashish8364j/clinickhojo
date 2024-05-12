import React, { useEffect, useState } from "react";
import RadioButtons from "../../../components/ui/RadioButtons";
const HregistartionDetail = React.memo(
  ({ BasicDetail, onRadioChange, radioData }) => {
    const [doctorRegistrationDetail, setDoctorRegistrationDetail] =
      useState("");
    const [variable, setVariaable] = useState("");
    const proof = BasicDetail.registrationProof[0];
    useEffect(() => {
      setDoctorRegistrationDetail(radioData);
      if (!proof) {
        setVariaable("pointer-events-none");
      }
    }, [radioData]);
    const handleChange = (event) => {
      const selectedOption = event.target.value;
      setDoctorRegistrationDetail(selectedOption);
      onRadioChange(selectedOption);
    };
    const handleViewProofClick = () => {
      const pdfUrl = `${BasicDetail.registrationProof[0]}`;
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");
      }
    };
    return (
      <div
        className="bg-[#D9D9D9] w-[437px] h-[180px] mb-4 rounded-sm"
        style={{ width: `${BasicDetail.boxWidth}` }}
      >
        <div className="flex flex-row">
          <h1 className="text-lg ms-4  text-black font-semibold">
            Registration Detail :
          </h1>
          <div className="mt-1 ms-3">
            <RadioButtons
              handleChange={handleChange}
              selectedOption={doctorRegistrationDetail}
            />
          </div>
        </div>
        <div>
          <div className="text-black font-medium  ms-2 mb-5">
            <div className="mt-3">
              <span className="font-sm p">Registration Number: </span>
              {BasicDetail.registrationNumber || "null"}
              <br />
            </div>
            <div className="mt-1">
              <span className="font-sm">Year of Registration : </span>
              {BasicDetail.yearOfRegistration || "null"}
              <br />
            </div>
            <div className="mt-1">
              <span className="font-sm">Registring Authority : </span>
              {BasicDetail.registrationAuthority || "null"}
              <br />
            </div>
            <div className="justify-end">
              <span
                className={`${variable} inline-block rounded-md cursor-pointer h-9 px-4 py-1 m-1 ms-72 text-sm  text-white pt-2 bg-[#4575f7] `}
                onClick={handleViewProofClick}
              >
                View Proof
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default HregistartionDetail;
