import React, { useEffect, useState } from "react";
import Sidebar from "../../AdminHome/Sidebar/Sidebar";
import { FiLogOut } from "react-icons/fi";
import Hbasicdetail from "./Hbasicdetail";
import Photos from "./Photos";
import Profile from "../../ApproveRejectUsers/ApproveRejectB/Profile";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import AppoitmentFee from "./AppoitmentFee";
import { useSelector, useDispatch } from "react-redux";
import HregistartionDetail from "./HregistartionDetail.jsx";
import Dialog from "../../../components/ui/Diloge/Dialog.jsx";
import Skeletonn from "../../../components/ui/SkeletonPage.jsx/Skeletonn.jsx";
import instance from "../../../axios.js";

function VerifiedClinic() {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const [normalFee, setNormalFee] = useState("");
  const [emergencyFee, setEmergencyFee] = useState("");
  const [ratingg, setRatingg] = useState("");
  const [noClinic, setNoClinic] = useState(false);
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState("");

  const uniqueClinicId = useSelector((state) => state.register.uniqueClinicId);
  const doctorEemail = useSelector((state) => state.register.doctorEmail);
  const uniqueDoctorId = useSelector((state) => state.register.uniqueDoctorId);

  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.post("api/admin/getParticular/hospital", {
          managementEmail: "johndoe@hospital27.com",
          hospitalClinicKhojoId: "094210",
        });
        console.log(response.data);
        setNormalFee(response.data.clinicKhojoAppointmentFeeEmergency || null);
        setEmergencyFee(
          response.data.clinicKhojoAppointmentFeeEmergency || null
        );
        setRatingg(response.data.rating || null);
        setResponse(response.data.hospital);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setNoClinic(true);
      }
    }
    fetchData();
  }, []);
  const navigate = useNavigate();
  const handleRatingChange = (ratingValue) => {
    setRating(ratingValue);
  };
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };
  const handleSubmit = async (isApproved) => {
    if (isApproved == true) {
      setApproved(isApproved);
      handleDialog("Are you sure you want to Delete Account?", true);
    }
    if (isApproved == false) {
      setApproved(isApproved);
      handleDialog("Are you sure you want to Suspend Account?", true);
    }
  };

  const areUSureDelete = async (choose) => {
    if (choose) {
      if (approved == true) {
        try {
          await instance.post("api/admin/delete/doctor", {
            doctorUniqueId: uniqueDoctorId,
          });
          localStorage.removeItem(`${uniqueDoctorId}a`);
          localStorage.removeItem(`${uniqueDoctorId}b`);
          navigate("../ViewProfileMain");
        } catch (error) {
          console.error("Error:", error);
        }
      }
      if (approved == false) {
        try {
          await instance.post("api/admin/delete/doctor", {
            doctorUniqueId: uniqueDoctorId,
          });
          localStorage.removeItem(`${uniqueDoctorId}a`);
          localStorage.removeItem(`${uniqueDoctorId}b`);
          navigate("../ViewProfileMain");
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } else {
      handleDialog("", false);
    }
  };
  return (
    <>
      {loading && (
        <div className=" text-black  font-medium text-3xl flex flex-row gap-28 h-screen w-screen bg-blue-600">
          <div className="flex flex-col justify-between ">
            <div className="me-7">
              <Sidebar someData={{ index: 5 }} />
            </div>
            <div>
              <FiLogOut
                className="ms-8"
                style={{ color: "#061ba1", fontSize: "40px" }}
              />
            </div>
          </div>
          <div className=" flex  items-center ms-60 mt-16 opacity-65 ">
            <Skeletonn count="9" width={800} />
          </div>
        </div>
      )}
      {!loading &&
        (noClinic ? (
          <div className="flex flex-row justify-between h-screen w-screen bg-[#03229F]">
            <div className="  flex flex-col justify-between bg-[#03229F]">
              <div className="me-7">
                <Sidebar someData={{ index: 5 }} />
              </div>
              <div>
                <FiLogOut
                  className="ms-8"
                  style={{ color: "#061ba1", fontSize: "40px" }}
                />
              </div>
            </div>
            <div className="text-white  font-medium text-3xl flex justify-center items-center h-screen me-[600px]">
              No Hospital is available.
            </div>
          </div>
        ) : (
          response && (
            <>
              <div className="flex flex-row justify-end max-h-[1500px] w-screen bg-[#0529BB]">
                <div
                  className=" bg-white flex flex-col justify-between"
                  style={{ backgroundColor: "#c2c0bc" }}
                >
                  <div className="me-7">
                    <Sidebar someData={{ index: 5 }} />
                  </div>
                  <div>
                    <FiLogOut
                      className="ms-8"
                      style={{ color: "#061ba1", fontSize: "40px" }}
                    />
                  </div>
                </div>
                <div className=" flex flex-col ms-52 bg-[#0529BB] me-6">
                  <div className="      flex flex-row justify-between ms-14 mt-5 ">
                    <div className=" bg-[#FF0B0B] h-14 w-44">
                      <p className=" text-white mt-4 ms-7  ">
                        Hospital Details
                      </p>
                    </div>
                    <div>
                      <p className=" text-white text-2xl underline mt-5 me-[800px]">
                        Hospital Detail
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row  mt-6 bg-[#03229F] w-[1233px]">
                    <div className="flex flex-col ">
                      <div className="m-11">
                        <Profile
                          fullName={response.name}
                          profileImage={response.profilePhoto}
                          uniqueDoctorId={response.hospitalClinicKhojoId}
                          accountAddedBy={null}
                          bool={true}
                        />
                      </div>

                      <div className=" flex flex-row">
                        <div className=" flex flex-col">
                          <Hbasicdetail BasicDetail={response} />
                          <hr />
                          <AppoitmentFee
                            normalFee={normalFee}
                            setNormalFee={setNormalFee}
                            emergencyFee={emergencyFee}
                            setEmergencyFee={setEmergencyFee}
                            BasicDetail={response.ratings}
                            onRatingChange={handleRatingChange}
                            rating={ratingg}
                          />
                          <hr />
                          <HregistartionDetail
                            BasicDetail={response.registration}
                          />
                          <hr />
                        </div>

                        <div className=" flex flex-col me-7">
                          <div className=" flex flex-row gap-3">
                            <Address addData={response.address} />
                          </div>
                          <hr />
                          <div>
                            <Photos />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        ))}

      {dialog.isLoading && (
        <Dialog
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}
    </>
  );
}
export default VerifiedClinic;
