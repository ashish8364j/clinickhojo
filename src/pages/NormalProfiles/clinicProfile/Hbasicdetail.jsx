
import React from "react";
const renderDetails = (Hbasicdetailconst) => {
  return Hbasicdetailconst.map((item, index) => {
    const [key, value] = Object.entries(item)[0];
    const isLargeField = key === "Full Name" || key === "Clinic Description";
    return (
      <div className=" flex flex-col md:flex-row mt-2 " key={key}>
        <label className="font-sm">{key} : </label>
        {isLargeField ? (
          <textarea
            value={value}
            readOnly
            className="bg-[#FFFFFF] bg-opacity-90 border-none text-black rounded-sm text-center md:ms-3 text-opacity-100 w-[66%] h-8"
          />
        ) : (
          <input
            type="text"
            value={value}
            readOnly
            className="bg-[#FFFFFF] bg-opacity-90 border-none text-black rounded-sm text-center md:ms-3 h-7 text-opacity-100"
          />
        )}
        <br />
      </div>
    );
  });
};

const Hbasicdetail = ({ BasicDetail }) => {


 
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
    { "Email Id": `${BasicDetail.managementEmail}` },
    { "Year of Establishment": `${BasicDetail.yearOfEstablishment}` },
    { "Clinic Description": `${BasicDetail.description}` },
  ];

  return (
    <div className="bg-[#03229F] md:w-[435px] md:min-h-[270px] mb-4 rounded-sm">
      <div className="flex flex-row">
        <h1 className="text-lg ms-5 m-1 font-semibold text-white">
          Basic Details :
        </h1>
       
      </div>
      <div>
        <div className="font-medium ms-2 mb-5 opacity-90 text-white">
          {renderDetails(Hbasicdetailconst)}
        </div>
      </div>
    </div>
  );
};

export default Hbasicdetail;
