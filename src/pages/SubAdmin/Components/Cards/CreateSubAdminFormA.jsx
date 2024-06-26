
import React, { useEffect, useState } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import RadioButtonsC from "../../../../components/ui/RadioButtonC";
import instance from "../../../../axios";
function FormGroup({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col md:flex-row mt-2 p-2 opacity-80">
      <label
        className="block text-lg md:text-xl font-medium mt-1 md:ms-6"
        htmlFor={placeholder}
      >
        {label} :
      </label>
      <div className="w-full md:w-96 me-14 ms-auto rounded-md">
        {type === "date" ? (
          <input
            placeholder={placeholder}
            type="date"
            value={value}
            onChange={onChange}
            className="rounded-md appearance-none bg-[#F2EFEF] relative block w-full px-3 py-2 border border-blue-600 placeholder-black focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm text-black"
          />
        ) : (
          <Input
            placeholder={placeholder}
            type={type}
            value={value}
            handleChange={onChange}
            bg1="bg-[#F2EFEF]"
          />
        )}
      </div>
    </div>
  );
}

function CreateSubAdminFormA({ formDataa }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [assignedUserPassword, setAssignedUserPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [oldUserId, setOldUserId] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (formDataa) {
      setFullName(formDataa.fullName || "");
      setContactNumber(formDataa.contactNumber || "");
      setEmail(formDataa.email || "");
      setSelectedOption(formDataa.gender || "");
      setDateOfBirth(formDataa.dateOfBirth || "");
      setAddress(formDataa.address || "");
      setAssignedUserId(formDataa.assignedUserId || "");
      setOldUserId(formDataa.assignedUserId || "");
      setAssignedUserPassword(formDataa.assignedUserPassword || "");
    }
  }, [formDataa]);

  const createAdminButton = async () => {
    const formData = {
      fullName,
      contactNumber,
      email,
      gender: selectedOption,
      dateOfBirth,
      address,
      newAssignedUserId: assignedUserId,
      newAssignedPassword: assignedUserPassword,
      assignedUserId: oldUserId,
    };

    if (formDataa.length !== 0) {
      setDisabled(true);
      try {
        const response = await instance.put("api/admin/editSubAdmin", formData);
        setDisabled(false);
        navigate("../SubAdminMainProfile");
      } catch (error) {
        setDisabled(false);
        console.error("Error editing sub-admin:", error.message);
      }
    } else {
      const newFormData = {
        fullName,
        contactNumber,
        email,
        gender: selectedOption,
        dateOfBirth,
        address,
        assignedUserId,
        assignedUserPassword,
      };

      setDisabled(true);
      try {
        const response = await instance.post("api/admin/createSubAdmin", newFormData);
        setDisabled(false);
        navigate("../SubAdminMainProfile");
      } catch (error) {
        setDisabled(false);
        console.error("Error creating sub-admin:", error);
      }
    }
  };

  return (
    <div className="bg-[#03229F] w-screen md:max-w-3xl p-4 md:p-6 rounded-sm flex justify-center items-center text-white mx-auto">
      <div className="w-full">
        <div className="pb-2">
          <h1 className="text-lg font-medium underline shadow-sm">
            Create SubAdmin Profile :
          </h1>
        </div>

        <div className="w-full">
          <div className="rounded">
            <FormGroup
              label="Full Name"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <FormGroup
              label="Contact Number"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <FormGroup
              label="Email Id"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex flex-col md:flex-row gap-4 md:gap-48 m-3">
              <div className="text-lg md:text-xl font-medium">
                <p className="opacity-75">Gender :</p>
              </div>
              <div>
                <RadioButtonsC
                  handleChange={handleChange}
                  selectedOption={selectedOption}
                />
              </div>
            </div>
            <FormGroup
              label="DOB"
              placeholder="DOB"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <FormGroup
              label="Address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormGroup
              label="Assigned User Id"
              placeholder="Assigned User Id"
              value={assignedUserId}
              onChange={(e) => setAssignedUserId(e.target.value)}
            />
            <FormGroup
              label="Assigned User Password"
              placeholder="Assigned User Password"
              type="password"
              value={assignedUserPassword}
              onChange={(e) => setAssignedUserPassword(e.target.value)}
            />

            <div className=" w-48 flex ms-auto mt-6 me-16">
              <Button
                text="Save Profile"
                handleSubmit={createAdminButton}
                bg="bg-[#229649]"
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSubAdminFormA;
