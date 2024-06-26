import React, { useEffect, useState } from "react";

const HregistartionDetail = React.memo(({ BasicDetail }) => {
  const [variable, setVariaable] = useState("");
  const proof = BasicDetail.registrationProof[0];

  useEffect(() => {
    if (!proof) {
      setVariaable("pointer-events-none");
    }
  }, []);

  const handleViewProofClick = () => {
    const pdfUrl = `${BasicDetail.registrationProof[0]}`;
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <div
      className="bg-[#03229F] md:w-[450px] md:h-[180px] mb-4 rounded-sm text-white"
      style={{ width: `${BasicDetail.boxWidth}` }}
    >
      <div className="flex flex-row">
        <h1 className="text-lg ms-4 font-semibold">Registration Detail :</h1>
      </div>
      <div>
        <div className="font-medium ms-2 mb-5 opacity-90">
          <div className="mt-3 flex flex-col md:flex-row">
            <span className="font-sm p">Registration Number: </span>
            <input
              type="text"
              value={BasicDetail.registrationNumber || "null"}
              readOnly
              className="bg-[#FFFFFF] bg-opacity-90 h-7 border-none text-black rounded-sm text-center md:ms-3 text-opacity-100"
            />
            <br />
          </div>
          <div className="mt-2 flex flex-row">
            <span className="font-sm">Year of Registration : </span>
            <input
              type="text"
              value={BasicDetail.yearOfRegistration || "null"}
              readOnly
              className="bg-[#FFFFFF] bg-opacity-90 h-7 border-none text-black rounded-sm text-center md:ms-3 text-opacity-100"
            />
            <br />
          </div>
          <div className="mt-2 flex flex-col md:flex-row">
            <span className="font-sm">Registring Authority : </span>
            <input
              type="text"
              value={BasicDetail.registrationAuthority || "null"}
              readOnly
              className="bg-[#FFFFFF] bg-opacity-90 h-7 border-none text-black rounded-sm text-center md:ms-3 text-opacity-100"
            />
            <br />
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
});

export default HregistartionDetail;
