import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import { useDispatch } from "react-redux";
import { updateDoctorData } from "../../../data/features/registerSlice";
import InputWithIcon from "../../../components/ui/InputWithIcon";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
const Demo = ({
  text = "Pending Profiles Of Doctors ...",
  Width = "h-[500px]",
  Height = "w-[500px]",
  p1 = "p-3",
  m1 = "m-3",
  text1 = "text-2xl",
  mh2 = "max-h-[400px]",
  mw3 = "max-w-[450px]",
  showData,
  normalVerified,
  newBg = "bg-[#229649]",
  newBga,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState([...showData]);
  const [sortOption, setSortOption] = useState("");
  const [search, setSearch] = useState("");
  console.log("object", showData);
  const filterChange = (e) => {
    setSortOption(e.target.value);
    let sorted = [...showData];
    if (e.target.value === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (e.target.value === "recent") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setSortedData(sorted);
  };
  const handleMe = (update) => {
    dispatch(updateDoctorData(update));
    if (normalVerified) {
      navigate("../VerifiedDoctorProfile");
    } else {
      if (localStorage.getItem(`${update.uniqueDoctorId}a`) === null) {
        const myVal = "ashish";
        localStorage.setItem(`${update.uniqueDoctorId}a`, myVal);
        localStorage.setItem(`${update.uniqueDoctorId}b`, myVal);
      }
      navigate("../ApproveRejectB", { state: { update } });
    }
  };
  const filteredData = sortedData.filter((update) =>
    update.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={` ${Width} ${Height} bg-[#03229F] overflow-hidden  `}>
      <div className={`bg-[#FFFFFF] mt-[-12px] text-black flex flex-col  `}>
        <div className=" h-14 flex items-center ">
          <h3
            className={`${text1} font-medium ${p1} ${m1} text-center text-[#FA0808] `}
          >
            {text}
          </h3>
        </div>

        {sortedData.length === 0 ? (
          ""
        ) : (
          <div className=" flex flex-row bg-[#03229F] gap-3 ">
            <div className=" ms-4 mt-3 ">
              <InputWithIcon
                labelText="Search Profiles"
                labelFor="searchProfiles"
                type="text"
                autoComplete="off"
                placeholder="Search Profiles"
                bg1="bg-[#F2EFEF]"
                handleChange={(e) => setSearch(e.target.value)}
                iconData="BiSearch"
              />
            </div>
            <div className=" mt-6">
              <select
                value={sortOption}
                onChange={(e) => filterChange(e)}
                className="bg-white h-8 ps-3 text-black rounded-lg"
              >
                <option value="namee">Sort by</option>
                <option value="name">Sort by Name</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className={`overflow-auto ${mh2}`}>
        {filteredData.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-[#FFFFFF]  mt-44 text-2xl font-medium">
              No data available
            </p>
          </div>
        ) : (
          filteredData.map((update, index) => (
            <div
              key={index}
              className={`p-4 mb-4  bg-[#E7ECFF] flex flex-row justify-between ml-6 ${mw3} mt-3 cursor-pointer`}
            >
              <p className="text-black font-semibold ">
                <span className="font-bold ">{index + 1}. </span>
                {update.name} <br />
                <div className=" flex flex-row ms-7 gap-2">
                  <p>
                    <BiSolidUserDetail size="25px" color={`${newBga}`} />
                  </p>
                  <p className=" font-medium text-[#535252] ">
                    {" "}
                    #{update.uniqueDoctorId}
                  </p>
                </div>
                <div className=" flex flex-row ms-7 gap-2 mt-">
                  <p className=" mt-[7px]">
                    <FaMapMarkerAlt size="15px" color="red" />
                  </p>
                  <p className=" font-medium text-[#535252]  ">
                    {" "}
                    {update.address.locality}
                  </p>
                </div>
              </p>
              <span
                className={`inline-block rounded-md cursor-pointer h-9 px-4 py-1  text-sm   text-white mt-5 pt-2 ${newBg}`}
                onClick={() => handleMe(update)}
              >
                View...
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Demo;
