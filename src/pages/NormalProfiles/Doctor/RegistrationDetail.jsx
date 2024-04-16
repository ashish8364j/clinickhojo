import React, { useEffect, useState } from "react";
const RegistrationDetail = React.memo(({ BasicDetail }) => {
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
      className="bg-[#D9D9D9] w-[450px] h-[180px] mb-4 rounded-sm"
      style={{ width: `${BasicDetail.boxWidth}` }}
    >
      <div className="flex flex-row">
        <h1 className="text-lg ms-4  text-black font-semibold">
          Registration Detail :
        </h1>
      </div>
      <div>
        <div className="text-black font-medium  ms-2 mb-5">
          <div className="mt-3">
            <span className="font-sm p">Registration Number: </span>
            {BasicDetail.registrationNumber}
            <br />
          </div>
          <div className="mt-1">
            <span className="font-sm">Year of Registration : </span>
            {BasicDetail.yearOfRegistration}
            <br />
          </div>
          <div className="mt-1">
            <span className="font-sm">Registring Authority : </span>
            {BasicDetail.registrationAuthority}
            <br />
          </div>
          <div className="justify-end">
            <span
              className={`${variable} inline-block rounded-md cursor-pointer h-9 px-4 py-1 m-1 ms-72 text-sm  text-white pt-2 bg-[#4575f7] `}
              onClick={(BasicDetail) => handleViewProofClick(BasicDetail)}
            >
              View Proof
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RegistrationDetail;
