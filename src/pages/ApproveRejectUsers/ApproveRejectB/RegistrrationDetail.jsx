import React, { useEffect, useState } from "react";
import RadioButtons from "../../../components/ui/RadioButtons";
const RegistrationDetail = React.memo(
  ({ BasicDetail, onRadioChange, radioData }) => {
    const [doctorRegistrationDetail, setDoctorRegistrationDetail] =
      useState("");
    const [variable, setVariable] = useState("");
    const proof = BasicDetail.registrationProof[0];

    useEffect(() => {
      setDoctorRegistrationDetail(radioData);
      if (!proof) {
        setVariable("pointer-events-none");
      }
    }, [radioData, proof]);

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
      console.log(pdfUrl);
    };

    return (
      <div
        className="bg-[#03229F] md:w-[450px] md:h-[180px] mb-4 rounded-sm text-white"
        style={{ width: `${BasicDetail.boxWidth}` }}
      >
        <div className="flex flex-row">
          <h1 className="text-lg ms-4 font-semibold">Registration Detail:</h1>
          <div className="mt-1 md:ms-10">
            <RadioButtons
              handleChange={handleChange}
              selectedOption={doctorRegistrationDetail}
            />
          </div>
        </div>
        <div>
          <div className="font-medium ms-2 mb-5 opacity-90">
            <div className="mt-3 flex flex-row">
              <label className="font-sm p">Registration Number:</label>
              <input
                type="text"
                value={BasicDetail.registrationNumber}
                readOnly
                className="bg-[#FFFFFF] bg-opacity-90 border-none text-black rounded-sm text-center md:ms-3 text-opacity-100 h-7"
              />
            </div>
            <div className="mt-2 flex flex-row">
              <label className="font-sm">Year of Registration:</label>
              <input
                type="text"
                value={BasicDetail.yearOfRegistration}
                readOnly
                className="bg-[#FFFFFF] bg-opacity-90 border-none text-black rounded-sm text-center md:ms-3 text-opacity-100 h-7"
              />
            </div>
            <div className="mt-2 flex flex-row">
              <label className="font-sm">Registering Authority:</label>
              <input
                type="text"
                value={BasicDetail.registrationAuthority}
                readOnly
                className="bg-[#FFFFFF] bg-opacity-90 border-none text-black rounded-sm text-center md:ms-3 text-opacity-100 h-7"
              />
            </div>
            <div className="justify-end mt-3">
              <span
                className={`${variable} inline-block rounded-md cursor-pointer h-9 px-4 py-1 m-1 md:ms-72 text-sm text-white pt-2 bg-[green]`}
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

export default RegistrationDetail;
