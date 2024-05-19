// import React from "react";

// function ProfileUser({
//   fullName,
//   profileImage,
//   uniqueDoctorId,
//   email
// }) {
//   return (
//     <div className={` flex flex-row gap-6 bg-[#D9D9D9]  h-28 text-center `}>
//       <div className=" w-20 h-20 bg-[#D9D9D9] flex justify-center items-center mt-3">
//         <img
//           src={profileImage}
//           alt="Placeholder"
//           className=" w-20 h-20 max-h-full rounded-full "
//         />
//       </div>
//       <p className="text-black mt-2   ">
//       <span>Name : </span>
//         {uniqueDoctorId} <br />
//         <span>Mobile No. : </span>
//         {uniqueDoctorId} <br />
//         <span>Email : </span>
//         {email} <br />
//       </p>
//     </div>
//   );
// }

// export default ProfileUser;
import React from "react";
function ProfileUser({
  fullName,
  profileImage,
  uniqueDoctorId,
  email
}) {
  return (
    <div className={` flex flex-row gap-12 text-white bg-[#03229F] ms-9 me-10 rounded-lg `}>
      <div className=" w-20 h-20  flex justify-center items-center m-8 ">
        <img
          src={profileImage}
          alt="Placeholder"
          className=" w-20 h-20 max-h-full rounded-full "
        />
      </div>

      <div className="text-white font-normal me-14 mt-5   ">
        <span className=" font-medium " style={{ fontSize: "25px" }}>
          {fullName}{" "}
        </span>
        <br />
        <span className=" opacity-80">UniqueId : </span>
        #{uniqueDoctorId} <br />
        
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
