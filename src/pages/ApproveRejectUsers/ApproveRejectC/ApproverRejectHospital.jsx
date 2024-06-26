import React, { useEffect, useState } from "react";
import Sidebar from "../../AdminHome/Sidebar/Sidebar";
import { FiLogOut } from "react-icons/fi";
import Photos from "./Photos";
import { useNavigate } from "react-router-dom";
import Buttons from "../ButtonRow/Buttons";
import AppoitmentFee from "../ApproveRejectD/AppoitmentFee";
import WrongInfo from "./WrongInfo";
import { useSelector, useDispatch } from "react-redux";
import HregistartionDetail from "./HregistrationDetail";
import Dialog from "../../../components/ui/Diloge/Dialog.jsx";
import emailjs from "@emailjs/browser";
import Profile from "./Profile.jsx";
import ClipBgB from "../../../components/ui/clipPath/ClipBgB.jsx";
import DoctorSessions from "./DoctorSessions.jsx";
import ManagementProfile from "./ManagementProfile.jsx";
import instance from "../../../axios.js";
import Address from "../ApproveRejectD/Address.jsx";
import Hbasicdetail from "../ApproveRejectB/Hbasicdetail.jsx";
function ApproveRejectHospital() {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const [formData, setFormData] = useState({
    remark: "",
  });
  const [formDataC, setFormDataC] = useState({
    HospitalBasicDetail: "",
    HospitalPhotos: "",
    HospitalAddress: "",
    HospitalRegistration: "",
  });
  const [normalFee, setNormalFee] = useState("");
  const [emergencyFee, setEmergencyFee] = useState("");
  const [deleteData, setDeleteData] = useState([]);
  const [noClinic, setNoClinic] = useState(false);
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState("");
  const [sniper, setSniper] = useState(false);
  const [message, setMessage] = useState("");
  const [bga,SetBga] = useState('bg-green-500');
  const [bgb,SetBgb] = useState('bg-red-500');
  const response = useSelector((state) => state.register.hospitalData);
  const {
    name,
    profilePhoto,
    hospitalClinicKhojoId,
    managementEmail,
    clinicUniqueId,
    marketingInternId,
  } = response || "";

  useEffect(() => {
    const savedDataString = localStorage.getItem(`${hospitalClinicKhojoId}a`);
    if (savedDataString != "ashish") {
      const savedData = JSON.parse(savedDataString);
      setFormDataC(savedData);
    }
  }, [hospitalClinicKhojoId]);

  useEffect(() => {
    if (formDataC !== null) {
      localStorage.setItem(
        `${hospitalClinicKhojoId}a`,
        JSON.stringify(formDataC)
      );
    }
  }, [formDataC]);

  const handleRadioChange = (name, option) => {
    setFormDataC((prevData) => ({ ...prevData, [name]: option }));
  };
  const getDataFromLocalStorage = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const handleChange = (event) => {
    console.log(formData);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
  const handleSubmit = async (isApproved) =>{
    if(!isApproved){
      SetBga('bg-red-500');
      SetBgb('bg-green-500');
    }else{
      SetBga('bg-green-500');
      SetBgb('bg-red-500')
    }
    const counttt = Object.values(formDataC).filter(
      (value) => value !== ""
    ).length;
    if (
      counttt === 4 &&
      normalFee !== "" &&
      emergencyFee !== "" &&
      rating !== ""
    ) {
      setMessage("");
      if (isApproved == true) {
        setApproved(isApproved);
        handleDialog("Are you sure you want to Approve?", true);
      }
      if (isApproved == false) {
        setApproved(isApproved);
        handleDialog("Are you sure you want to Reject?", true);
      }
    } else {
      setMessage(
        "Please Verify All Document(tick radioButtons) and Fill Appoitment fees and ratings"
      );
    }
  };
  const areUSureDelete = async (choose) => {
    setSniper(true);
    const serviceId = "service_om433u9";
    const templateId = "template_zzith2l";
    const publicKey = "9BN6G8lDUWm0rzkqZ";
    const keysWithNo = Object.keys(formDataC).filter(
      (key) => formDataC[key] === "No"
    );
    const message = `You provided wrong ${keysWithNo.join(
      ", "
    )} so your account is rejected.`;
    const templateParams = {
      to_name: name,
      from_name: "ClinicKhojo",
      message: message,
      to_email: managementEmail,
    };
    if (choose) {
      console.log(choose, approved);
      if (1) {
        const userId = getDataFromLocalStorage("UserId");
        try {
          const response = await instance.post("api/admin/hospital/approve", {
            isApproved: approved,
            hospitalClinicKhojoId: hospitalClinicKhojoId,
            approvedBy: userId,
            addRemark: formData.remark,
          });
          if (!approved) {
            console.log("email bhej");
            try {
              const eres = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
              );
              console.log(eres);
            } catch (e) {
              console.log("error sending email", e);
            }
          } else {
            console.log("sent some good gmail");
          }
          if (approved) {
            await instance.post("api/admin/hospitals/setAppointmentFee", {
              hospitalClinicKhojoId: hospitalClinicKhojoId,
              managementEmail: managementEmail,
              clinicKhojoAppointmentFeeNormal: emergencyFee,
              clinicKhojoAppointmentFeeEmergency: normalFee,
            });
          }
          if (approved) {
            await instance.post("api/admin/hospitals/setRatings", {
              hospitalClinicKhojoId: hospitalClinicKhojoId,
              rating: rating,
            });
          }
          localStorage.removeItem(`${hospitalClinicKhojoId}a`);
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
      <div className="flex flex-row  md:max-h-[1500px] w-screen  bg-[#0529BB] gap-9 md:gap-0 ">
        <div className=" bg-[#03229F] flex flex-col justify-between ">
          <div className="">
            <Sidebar someData={{ index: 2 }} />
          </div>
          <div>
            <FiLogOut
              className="ms-8"
              style={{ color: "#061ba1", fontSize: "40px" }}
            />
          </div>
        </div>

        <div className=" flex flex-col md:ms-48 bg-[#0529BB] ms-2 me-2 md:me-16">
          <div className="  flex flex-col items-center justify-center md:justify-normal mb-5 md:mb-0   ">
            <div className=" flex flex-row gap-5">
              <div className="">
                <ClipBgB width="w-[340px]" height="h-[65px]" bardervar="37px" />
              </div>

              <div>
                <p className=" text-white text-2xl underline mt-5 md:ms-24 ">
                  Hospital Detail
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row  mt-6 bg-[#03229F] md:me-3  ">
            <div className="flex flex-col ms-2 mb-7 gap-5 ">
              <div className=" w-full md:m-2 md:mb-10 md:mt-6">
                <Profile
                  fullName={response.name}
                  profileImage={response.profilePhoto}
                  uniqueDoctorId={response.hospitalClinicKhojoId}
                  accountAddedBy={marketingInternId}
                  bool={true}
                />
              </div>
              <ManagementProfile managementData={response.managementPersonnel}/>
              <div className=" mb-4">
                <hr />
              </div>

              <Hbasicdetail
                BasicDetail={response}
                onRadioChange={(option) =>
                  handleRadioChange("HospitalBasicDetail", option)
                }
                radioData={formDataC.HospitalBasicDetail}
              />
              <hr />
              <AppoitmentFee
                normalFee={normalFee}
                setNormalFee={setNormalFee}
                emergencyFee={emergencyFee}
                setEmergencyFee={setEmergencyFee}
                BasicDetail={response.ratings}
                onRatingChange={handleRatingChange}
              />
              <div className=" mb-3">
                <hr />
              </div>

              <HregistartionDetail
                BasicDetail={response.registration}
                onRadioChange={(option) =>
                  handleRadioChange("HospitalRegistration", option)
                }
                radioData={formDataC.HospitalRegistration}
              />
              <div className=" mb-3">
                <hr />
              </div>
              <WrongInfo data={formDataC} />
            </div>

            <div className="  flex flex-col gap-4 md:mt-[157px] ">
              <div className=" flex flex-row gap- md:ms-[-20px]   ">
                <div>
                  <Address
                    addData={response.address}
                    onRadioChange={(option) =>
                      handleRadioChange("HospitalAddress", option)
                    }
                    radioData={formDataC.HospitalAddress}
                  />
                </div>

                <DoctorSessions showData={response.doctorSessions || []} />
              </div>
              <hr />
              <div className=" ms-[-20px]">
                <Photos
                  onRadioChange={(option) =>
                    handleRadioChange("HospitalPhotos", option)
                  }
                  radioData={formDataC.HospitalPhotos}
                  photosUrl={response.photos.photoUrls}
                />
                <hr />
              </div>
              <div className=" bg-[#a9a9ab] md:w-[438px] md:h-[130px] mb-4 rounded-sm md:ms-12 mt-7">
                <div className="h-[130px] border-zinc-100 ">
                  <textarea
                    id="inputTextArea"
                    name="remark"
                    className=" placeholder-white w-full h-full p-2 resize-none bg-[#335af2] text-white border-white"
                    placeholder="Add Remark..."
                    style={{ color: "white", borderColor: "white" }}
                    value={formData.remark}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-5 flex flex-row">
            <div className=" ms-8 md:ms-60 mb-5 bg-[#0529BB]">
              <Buttons
                bg="bg-[#0529BB]"
                handleSubmita={() => handleSubmit(true)}
                handleSubmitb={() => handleSubmit(false)}
              />
            </div>
            <p className=" text-red-600 ms-20 text-lg mt-1">{message}</p>
          </div>
        </div>
      </div>
      {dialog.isLoading && (
        <Dialog
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
          sniper={sniper}
          bga={bga}
          bgb={bgb}
        />
      )}
    </>
  );
}
export default ApproveRejectHospital;
