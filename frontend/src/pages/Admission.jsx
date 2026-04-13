import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    program: "",
    seeCertificate: null,
    birthCertificate: null,
    details: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();

      data.append("name", formData.fullName);
      data.append("email", formData.email);
      data.append("contactNumber", formData.contact);
      data.append("program", formData.program);
      data.append("additionalDetails", formData.details);

      data.append("seeCertificate", formData.seeCertificate);
      data.append("birthCertificate", formData.birthCertificate);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admissions/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        toast.success("Admission submitted successfully");

        setFormData({
          fullName: "",
          email: "",
          contact: "",
          program: "",
          seeCertificate: null,
          birthCertificate: null,
          details: "",
        });
      } else {
        toast.error("Failed to submit");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-10 items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Apply for Admission
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Complete the admission form below to start your journey with our premium program.
          Please provide accurate details and attach the required documents.
          Our admissions team will review your application and contact you with the next steps.
        </p>
      </div>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 space-y-6"
      >

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Admission Form
        </h2>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <Input
            label="Contact Number"
            name="contact"
            type="tel"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact number"
          />

          {/* Program */}
          <div>
            <label className="block mb-1 font-medium">Program</label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            >
              <option value="">Select Course</option>
              <option>Hotel Management</option>
              <option>Science</option>
              <option>Computer Science</option>
              <option>Business Studies</option>
              <option>Travel & Tourism</option>
            </select>
          </div>

        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <FileInput
            label="Academic Certificate"
            name="seeCertificate"
            onChange={handleFileChange}
          />

          <FileInput
            label="Birth Certificate"
            name="birthCertificate"
            onChange={handleFileChange}
          />

        </div>

        {/* Textarea */}
        <div>
          <label className="block mb-1 font-medium">
            Additional Details
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows="5"
            placeholder="Write anything important..."
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-5 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Submit Application {loading && <AiOutlineLoading3Quarters className="animate-spin ml-2" />}
        </motion.button>

      </motion.form>
    </div>
  );
}

// 
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...props}
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
      />
    </div>
  );
}
//
function FileInput({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type="file"
        {...props}
        className="w-full border p-2 rounded-lg bg-white"
        accept=".pdf,.jpg,.png"
      />
    </div>
  );
}