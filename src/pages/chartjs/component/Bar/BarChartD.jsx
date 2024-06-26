import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Spinner from "../../../../components/ui/clipPath/Spinner";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const processAndPrepareData = async (appointments) => {
  const doctorData = {};
  appointments.forEach((appointment) => {
    const { doctor, patient } = appointment;
    if (!doctorData[doctor]) {
      doctorData[doctor] = { male: 0, female: 0, total: 0 };
    }
    if (patient.gender === "male") {
      doctorData[doctor].male += 1;
    } else if (patient.gender === "female") {
      doctorData[doctor].female += 1;
    }
    doctorData[doctor].total += 1;
  });
  const sortedDoctors = Object.entries(doctorData).sort(
    (a, b) => b[1].total - a[1].total
  );

  const labels = sortedDoctors.map((_, index) => `Rank ${index + 1}`);
  const maleData = sortedDoctors.map(([, data]) => data.male);
  const femaleData = sortedDoctors.map(([, data]) => data.female);
  return { labels, maleData, femaleData, sortedDoctors };
};

const BarChartD = ({userData}) => {
  const appointmentData = {
    totalAppointments: 10,
    allAppointments: [
      {
        patient: {
          name: "Alice",
          age: 31,
          gender: "male",
          mobileNumber: "243",
        },
        _id: "6617afd3e73807f8ccf15af2",
        type: "emergency",
        doctor: "661398a2ec3fcffe5c052da711",
        block: "A",
        timing: "2024-04-05T10:00:00.000Z",
        arrived: true,
        createdBy: "1237767890",
        isAccepted: false,
        appointmentUniqueId: "57345644",
        expiresAt: "2024-04-12T09:39:31.269Z",
        createdAt: "2024-04-11T09:39:31.269Z",
        __v: 0,
      },
      {
        patient: {
          name: "Alice",
          age: 31,
          gender: "male",
          mobileNumber: "243",
        },
        _id: "6617b024e73807f8ccf15aff",
        type: "normal",
        doctor: "661398a2ec3fcffe5c052da7a",
        block: "A",
        timing: "2024-04-05T10:00:00.000Z",
        arrived: true,
        createdBy: "243",
        isAccepted: true,
        appointmentUniqueId: "04075609",
        createdAt: "2024-04-11T09:40:52.791Z",
        __v: 0,
      },
      {
        patient: {
          name: "Alice",
          age: 31,
          gender: "female",
          mobileNumber: "243",
        },
        _id: "6617b166884f3ed8ffb384da",
        type: "normal",
        doctor: "661398a2ec3fcffe5c052da7a",
        block: "A",
        timing: "2024-04-05T10:00:00.000Z",
        arrived: false,
        createdBy: "243",
        isAccepted: false,
        appointmentUniqueId: "06493805",
        createdAt: "2024-04-11T09:46:14.361Z",
        __v: 0,
      },
      {
        patient: {
          name: "Alice",
          age: 31,
          gender: "female",
          mobileNumber: "243",
        },
        _id: "66190e32c71f9ceced24d1af",
        type: "normal",
        doctor: "661398a2ec3fcffe5c052da7",
        block: "A",
        timing: "2024-04-05T10:00:00.000Z",
        arrived: true,
        createdBy: "243",
        isAccepted: true,
        appointmentUniqueId: "90653569",
        createdAt: "2024-04-12T10:34:26.020Z",
        __v: 0,
      },
      {
        patient: {
          name: "Alice",
          age: 31,
          gender: "male",
          mobileNumber: "243",
        },
        _id: "661970d7a32c7cf15f163b0b",
        type: "normal",
        doctor: "66196a579e044b0dba29a740",
        block: "A",
        timing: "2024-04-05T10:00:00.000Z",
        arrived: true,
        createdBy: "243",
        isAccepted: false,
        appointmentUniqueId: "14503563",
        createdAt: "2024-04-12T17:35:19.621Z",
        __v: 0,
      },
      {
        patient: {
          name: "Alice",
          age: 31,
          gender: "male",
          mobileNumber: "243",
        },
        _id: "661970daa32c7cf15f163b10",
        type: "normal",
        doctor: "66196a579e044b0dba29a740",
        block: "A",
        timing: "2024-04-05T10:00:00.000Z",
        arrived: false,
        createdBy: "243",
        isAccepted: false,
        appointmentUniqueId: "96561214",
        createdAt: "2024-04-12T17:35:22.574Z",
        __v: 0,
      },
    ],
  };

  const [chartData, setChartData] = useState(null);
  const [sortedDoctors, setSortedDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { labels, maleData, femaleData, sortedDoctors } =
        await processAndPrepareData(userData);
      setChartData({
        labels,
        datasets: [
          {
            label: "Male",
            data: maleData,
            backgroundColor: "rgb(75, 29, 192,1)",
            borderWidth: 1,
          },
          {
            label: "Female",
            data: femaleData,
            backgroundColor: "rgb(255, 9, 132,1)",
            borderWidth: 1,
          },
        ],
      });
      setSortedDoctors(sortedDoctors);
    };
    fetchData();
  }, []);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Doctor Rank based on gender",
          color: "black",
          font: {
            size: 16,
          },
        },
        ticks: {
          color: "black",
        },
        grid: {
          color: "#808a9c",
        },
      },
      y: {
        title: {
          display: true,
          text: "Appointments Served",
          color: "black",
          font: {
            size: 16,
          },
        },
        ticks: {
          color: "black",
        },
        grid: {
          color: "#808a9c",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "black",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const doctorIndex = context.dataIndex;
            const doctor = sortedDoctors[doctorIndex][0];
            return `${context.dataset.label} Appointments: ${context.raw} (Doctor ID: ${doctor})`;
          },
        },
      },
    },
  };

  return (
    <div className=" w-full">
      {chartData ? (
        <div className="w-full md:max-w-[960px] mx-auto bg-white">
          <div className="w-full h-full md:h-[540px]">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-blue-600 bg-opacity-70">
          <div className="">
            <Spinner
              height="h-[80px]"
              width="w-[80px]"
              fontSize="text-[1rem]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChartD;
