import React, { useEffect, useState } from "react";
import RadioButtons from "../../../components/ui/RadioButtons.jsx";

const renderDetails = (Hbasicdetailconst) => {
  return Hbasicdetailconst.map((item, index) => {
    const [key, value] = Object.entries(item)[0];
    return (
      <div className="mt-2" key={key}>
        <label className="font-sm">{key} : </label>
        <input
          type="text"
          value={value}
          readOnly
          className="bg-[#FFFFFF] bg-opacity-80 border-none text-black rounded-sm text-center ms-3 text-opacity-100 h-7"
        />
        <br />
      </div>
    );
  });
};

const Hbasicdetail = ({ BasicDetail, onRadioChange, radioData }) => {
  const [hbasicdetailOption, setHbasicdetailOption] = useState("");
  const handleChange = (event) => {
    const selectedOption = event.target.value;
    onRadioChange(selectedOption);
    setHbasicdetailOption(selectedOption);
  };

  useEffect(() => {
    setHbasicdetailOption(radioData);
  }, [radioData]);

  const primarySpecialization = BasicDetail.specializations[0] || {};
  const otherSpecializations = BasicDetail.specializations.slice(1);

  const formatSpecialization = (spec) => {
    return `${spec.name} (fees: ${spec.fee})`;
  };

  const formattedPrimarySpecialization =
    primarySpecialization.name && formatSpecialization(primarySpecialization);

  const formattedOtherSpecializations = otherSpecializations.map((spec) =>
    formatSpecialization(spec)
  );

  const Hbasicdetailconst = [
    { "Full Name": `${BasicDetail.name}` },
    { "Contact Number": `${BasicDetail.contactNumber}` },
    { "Alternate Contact Number": `${BasicDetail.alternateContactNumber}` },
    { "Email Id": `${BasicDetail.doctorEmail}` },
    { "Year of Establishment": `${BasicDetail.yearOfEstablishment}` },
    { "Primary Specialization": formattedPrimarySpecialization },
    { "Other Specializations": formattedOtherSpecializations.join(" / ") },
    { "Clinic Description": `${BasicDetail.description}` },
  ];

  return (
    <div className="bg-[#03229F] w-[435px] min-h-[310px] mb-4 rounded-sm">
      <div className="flex flex-row">
        <h1 className="text-lg ms-5 m-1 font-semibold text-white">
          Basic Details :
        </h1>
        <div className="mt-1 ms-8">
          <RadioButtons
            handleChange={handleChange}
            selectedOption={hbasicdetailOption}
          />
        </div>
      </div>
      <div>
        <div className="font-medium ms-2 mb-5 opacity-75 text-white">
          {renderDetails(Hbasicdetailconst)}
        </div>
      </div>
    </div>
  );
};
export default Hbasicdetail;
