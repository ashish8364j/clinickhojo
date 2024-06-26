import React from "react";
function ProfileUser({ fullName, profileImage, uniqueDoctorId, email }) {
  console.log(profileImage);
  return (
    <div
      className={` flex md:flex-row gap-0 md:gap-5 text-white bg-[#03229F] md:ms-9 md:me-10 rounded-lg md:w-[470px] h-[144px] `}
    >
      <div className=" w-20 h-20  flex justify-center items-center mt-8  md:m-8 ">
        <img
          src={profileImage}
          alt="noImage"
          className=" w-20 h-20 max-h-full rounded-full "
        />
      </div>

      <div className="text-white font-normal me-14 mt-5   ">
        <span className=" font-medium " style={{ fontSize: "25px" }}>
          {fullName}{" "}
        </span>
        <br />
        <span className=" opacity-80">UniqueId : </span>#{uniqueDoctorId} <br />
        <div>
          <span className=" opacity-80">Email : </span>
          {email}
          <br />
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
