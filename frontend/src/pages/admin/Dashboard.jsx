import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login");
    }
  }, []);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/admin-login");
          return;
        }
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admissions/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setAdmissions(res.data?.admissions);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchAdmissions();

  }, [])


  const data = [
    {
      name: "Aayush",
      email: "aayush@gmail.com",
      contact: "9800000000",
      program: "Computer Science",
      academic: "View",
      birth: "View",
      details: "Interested in IT",
    },
    {
      name: "Ram",
      email: "ram@gmail.com",
      contact: "9811111111",
      program: "Management",
      academic: "View",
      birth: "View",
      details: "Wants business study",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hello, Admin</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Contact</th>
              <th className="p-3 border">Program</th>
              <th className="p-3 border">Academic Certificate</th>
              <th className="p-3 border">Birth Certificate</th>
              <th className="p-3 border">Additional Details</th>
            </tr>
          </thead>

          <tbody>
            {admissions?.map((item, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">{item.email}</td>
                <td className="p-3 border">{item.contactNumber}</td>
                <td className="p-3 border">{item.program}</td>

                <td className="p-3 border text-blue-600 cursor-pointer">
                  <a href={item.seeCertificate} target="_blank" rel="noreferrer">
                    View SEE Certificate
                  </a>
                </td>

                <td className="p-3 border text-blue-600 cursor-pointer">
                  <a href={item.birthCertificate} target="_blank" rel="noreferrer">
                    view Birth Certificate
                  </a>
                </td>

                <td className="p-3 border">{item.additionalDetails}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}