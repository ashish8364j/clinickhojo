import React, { useEffect, useState } from "react";
import Sidebar from "../../AdminHome/Sidebar/Sidebar";
import Hbasicdetail from "./Hbasicdetail";
import Profile from "../../ApproveRejectUsers/ApproveRejectB/Profile";
import { useNavigate } from "react-router-dom";
import Buttons from "../../ApproveRejectUsers/ButtonRow/Buttons.jsx";
import Address from "./Address";
import AppoitmentFee from "./AppoitmentFee";
import { useSelector, useDispatch } from "react-redux";
import HregistartionDetail from "./HregistartionDetail.jsx";
import Dialog from "../../../components/ui/Diloge/Dialog.jsx";
import ClipBgB from "../../../components/ui/clipPath/ClipBgB.jsx";
import DoctorSessions from "../../ApproveRejectUsers/ApproveRejectC/DoctorSessions.jsx";
import instance from "../../../axios.js";
import emailService from "../../../components/ui/emailService.js";
import ManagementProfile from "../../ApproveRejectUsers/ApproveRejectC/ManagementProfile.jsx";
import checkAdmin from "../../Protected/checkAdmin.js";
import Photos from "./Photos.jsx";
function VerifiedHospital() {
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
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState("");
  const [sniper, setSniper] = useState(false);
  const [message, setMessage] = useState("");
  const response = useSelector((state) => state.register.hospitalData);
  const hospitalClinicKhojoId = response.hospitalClinicKhojoId;
  const managementEmail = response.managementEmail;
  const fullName = response.name;

  useEffect(() => {
    setNormalFee(response.clinicKhojoAppointmentFeeNormal);
    setEmergencyFee(response.clinicKhojoAppointmentFeeEmergency);
    setRatingg(response.rating);
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
      const check = await checkAdmin();
      if (check) {
        setApproved(isApproved);
        handleDialog("Are you sure you want to Delete Account?", true);
      } else {
        setMessage("SubAdmin can not Delete account");
      }
    }
    if (isApproved == false) {
      setApproved(isApproved);
      handleDialog("Are you sure you want to Suspend Account?", true);
    }
  };

  const areUSureDelete = async (choose) => {
    setSniper(true);
    if (choose) {
      if (approved == true) {
        try {
          await instance.post("api/admin/hospitals/delete", {
            hospitalClinicKhojoId: hospitalClinicKhojoId,
            managementEmail: managementEmail,
          });
          const message = "your Hospital profile deleted";
          await emailService({
            message,
            toName: fullName,
            email: managementEmail,
          });
          localStorage.removeItem(`${hospitalClinicKhojoId}a`);
          localStorage.removeItem(`${hospitalClinicKhojoId}b`);
          navigate("../ApproveReject");
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
      if (approved == false) {
        try {
          await instance.post("api/admin/hospitals/suspend", {
            hospitalClinicKhojoId,
            managementEmail,
          });

          const message = "your Hospital profile suspended";
          await emailService({
            message,
            toName: fullName,
            email: managementEmail,
          });
          if (localStorage.getItem(`${hospitalClinicKhojoId}a`) !== null) {
            localStorage.removeItem(`${hospitalClinicKhojoId}a`);
          }

          if (localStorage.getItem(`${hospitalClinicKhojoId}b`) !== null) {
            localStorage.removeItem(`${hospitalClinicKhojoId}b`);
          }
          navigate("../ApproveReject");
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } else {
      handleDialog("", false);
    }
    setSniper(false);
  };
  return (
    <>
      <div className="flex flex-row justify-end 2xl:justify-center md:max-h-[1500px] w-screen bg-[#0529BB]">
        <div
          className="  flex flex-col justify-between"
        >
          <div className="me-7">
            <Sidebar someData={{ index: 5 }} />
          </div>
        </div>
        <div className=" flex flex-col md:ms-64 bg-[#0529BB] ms-2 me-2 md:me-6">
          <div className=" flex flex-col md:flex-row items-center justify-center md:justify-normal mb-5 md:mb-0">
            <ClipBgB
              width="w-[290px]"
              height="h-[55px]"
              bardervar="32px"
              text="View Profile"
            />
            <div>
              <p className=" text-white text-2xl underline mt-5 md:ms-20">
                Hospital Detail
              </p>
            </div>
          </div>
          <div className="flex flex-col  md:flex-row  mt-6 bg-[#03229F] md:w-[1233px]">
            <div className="flex flex-col ">
              <div className="md:m-11">
                <Profile
                  fullName={response.name}
                  profileImage={response.profilePhoto}
                  uniqueDoctorId={response.hospitalClinicKhojoId}
                  accountAddedBy={null}
                  bool={false}
                />
              </div>
              <div className=" mt-3 mb-3">
                <br/>
              </div>
              <div className=" flex flex-row">
                <div className=" flex flex-col ">
                  <ManagementProfile managementData={response.managementPersonnel}/>
                  <div className=" mb-4 mt-3">
                    <hr />
                  </div>
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
                    hospitalClinicKhojoId={hospitalClinicKhojoId}
                    managementEmail={managementEmail}
                  />
                  <div className=" mt-7">
                    <hr />
                  </div>
                  <HregistartionDetail
                    BasicDetail={response.registration || {}}
                  />

                  <hr />
                </div>

                <div className=" flex flex-col me-7">
                  <div className=" flex flex-row gap-3">
                    <Address addData={response.address} />

                    <DoctorSessions showData={response.doctorSessions || []} />
                  </div>
                  <div className=" mt-7 mb-4">
                    <hr />
                  </div>
                  <div>
                    <Photos photosUrl={response.photos.photoUrls || []} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-row">
            <div className=" ms-5 md:ms-56 mb-4 md:mb-10 mt-7 ">
              <Buttons
                bg="bg-[#0529BB]"
                handleSubmita={() => handleSubmit(true)}
                handleSubmitb={() => handleSubmit(false)}
                texta="Delete Account"
                textb="Suspend Account"
              />
            </div>
            <p className=" text-red-600  ms-5 md:ms-20 text-lg md:mt-8">{message}</p>
          </div>
          ----
        </div>
      </div>

      {dialog.isLoading && (
        <Dialog
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
          sniper={sniper}
        />
      )}
    </>
  );
}
export default VerifiedHospital;
