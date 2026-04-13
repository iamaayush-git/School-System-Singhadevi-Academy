import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        name,
        password,
      });

      if (res.status === 200 && res.data?.admin) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 500);
      }
      else {
        toast.error("Login failed");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (admin) {
      navigate("/admin-dashboard"); // or home page
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-5 cursor-pointer w-full bg-orange-500 text-white py-3 rounded-lg"
        >
          Login {loading && <AiOutlineLoading3Quarters className="animate-spin ml-2" />}
        </button>
      </form>
    </div>
  );
}