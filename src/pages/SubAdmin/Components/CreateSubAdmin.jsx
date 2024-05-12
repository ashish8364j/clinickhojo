import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import Sidebar from "../../AdminHome/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import CreateSubAdminFormA from "./Cards/CreateSubAdminFormA";
function CreateSubAdmin() {
  const [formData, setFormData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (location.state != null) {
      const { data } = location.state;
      setFormData(data);
    }
  }, []);
  return (
    <div
      className="flex flex-row justify-between h-screen w-screen bg-[#0529BB] "
    >
      <div
        className=" bg-white flex flex-col justify-between"
        style={{ backgroundColor: "#c2c0bc" }}
      >
        <div className="me-7">
          <Sidebar someData={{'index':1}}/>
        </div>
        <div>
          <FiLogOut
            className="ms-8"
            style={{ color: "#061ba1", fontSize: "40px" }}
          />
        </div>
      </div>

      <div className=" flex flex-col">
        <div className=" flex flex-row ms-8 mt-5 gap-64">
          <div className="bg-[#D9D9D9] h-12 w-48 mt-3 ms-[-300px] ">
            <p className="text-black mt-3 ms-7 ">User Management</p>
          </div>

          <div className="bg-[#229649] h-12 w-64 mt-3 ms-[-220px] rounded-2xl">
            <p className="text-black mt-3 ms-7 ">
              Create Additional User Profile
            </p>
          </div>
        </div>

        <div className=" mt-5 me-64">
          <CreateSubAdminFormA formDataa={formData} />
        </div>
      </div>
    </div>
  );
}

export default CreateSubAdmin;
