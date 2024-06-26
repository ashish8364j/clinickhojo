
import React from "react";
import Profile from "./Profile";
function ManagementProfile({managementData}) {
    const uniqueDoctorId =  managementData.clinicKhojoId ;
    const fullName =  managementData.fullName ;
    const ProfilImg = managementData.profilePhoto ;
    const email = managementData.email || '';
    const gender = managementData.gender || '';
    const dob = managementData.dateOfBirth||'';
    return (
      <div className=" flex flex-col bg-[#03229F] md:w-[435px]  md:min-h-[250px]">
       <div className="">
        <h1 className="text-lg font-medium ms-4 underline md:ms-6 text-white">ManageMent Details:</h1>
       </div>
       <div className=" flex flex-col justify-center items-center md:w-[435px] min-h-[250px] rounded-sm">
            <div className="flex mb-4 justify-center items-center md:ms-20">
                <Profile
                    fullName={fullName}
                    profileImage={ProfilImg}
                    uniqueDoctorId={uniqueDoctorId}
                    accountAddedBy={null}
                    bool={false}
                />
            </div>
            <div className="flex flex-col text-lg opacity-90 w-full px-4">
                <div className="mt-1 flex flex-row items-center">
                    <label className="font-sm w-24">Email:</label>
                    <input 
                        type="text" 
                        value={email} 
                        readOnly 
                        className="bg-[#FFFFFF] bg-opacity-90 border-none text-black rounded-sm text-center  text-opacity-100 "
                    />
                </div>
                <div className="mt-1 flex flex-row items-center">
                    <label className="font-sm w-24">Gender:</label>
                    <input 
                        type="text" 
                        value={gender} 
                        readOnly 
                        className="bg-[#FFFFFF] bg-opacity-90 border-none text-black rounded-sm text-center  text-opacity-100 "
                    />
                </div>
                <div className="mt-1 flex flex-row items-center">
                    <label className="font-sm w-24">Dob:</label>
                    <input 
                        type="text" 
                        value={dob} 
                        readOnly 
                        className="bg-[#FFFFFF] bg-opacity-90 border-none text-black rounded-sm text-center  text-opacity-100  "
                    />
                </div>
            </div>
        </div>
      </div>
        
    );
}

export default ManagementProfile;
