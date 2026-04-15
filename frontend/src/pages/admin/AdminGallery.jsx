import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS!

export default function AdminGalleryManager() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [titles, setTitles] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ✅ protect
  useEffect(() => {
    if (!token) {
      toast.error("Please login to access gallery manager");
      navigate("/admin-login");
    }
    fetchTitles();
  }, []);

  // ✅ get titles
  const fetchTitles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery");
      setTitles(res.data);
    } catch (error) {
      toast.error("Failed to fetch gallery titles");
      console.error(error);
    }
  };

  // ➕ add title
  const addTitle = async () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/gallery",
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Title "${newTitle}" added successfully`);
      setNewTitle("");
      fetchTitles();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add title");
      console.error(error);
    }
  };

  // ❌ delete title
  const deleteTitle = async (id, titleName) => {
    if (!window.confirm(`Are you sure you want to delete "${titleName}"?`)) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Title "${titleName}" deleted successfully`);
      fetchTitles();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete title");
      console.error(error);
    }
  };

  // ✏️ rename title
  const renameTitle = async (id, currentTitle) => {
    const name = prompt("Enter new title:", currentTitle);
    if (!name || !name.trim()) {
      if (name === "") toast.error("Title cannot be empty");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/gallery/${id}`,
        { title: name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Title renamed to "${name}"`);
      fetchTitles();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to rename title");
      console.error(error);
    }
  };

  // 📸 upload image
  const uploadImage = async () => {
    if (!image) {
      toast.error("Please select an image to upload");
      return;
    }

    if (!selectedTitle) {
      toast.error("Please select a gallery first");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post(
        `http://localhost:5000/api/gallery/upload/${selectedTitle}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );

      toast.success("Image uploaded successfully!");
      setImage(null);

      // Reset file input
      const fileInput = document.getElementById("file-input");
      if (fileInput) fileInput.value = "";

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload image");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Toaster
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <h2 className="text-2xl font-bold mb-6">Gallery Manager</h2>

      {/* ADD TITLE */}
      <div className="flex gap-2 mb-6">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New Title"
          className="border p-2 rounded w-full"
          onKeyPress={(e) => e.key === 'Enter' && addTitle()}
        />
        <button
          onClick={addTitle}
          className="bg-green-500 text-white px-4 rounded hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>

      {/* TITLES LIST */}
      {titles.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No gallery titles yet. Add your first title above!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {titles.map((t) => (
            <div
              key={t._id}
              className="border p-4 rounded-lg flex flex-col gap-3 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{t.title}</h3>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => renameTitle(t._id, t.title)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 transition"
                >
                  Rename
                </button>

                <button
                  onClick={() => deleteTitle(t._id, t.title)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setSelectedTitle(t._id);
                    toast.success(`Selected gallery: ${t.title}`);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Add Photos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD SECTION */}
      {selectedTitle && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="mb-3 font-semibold">Upload Image to Gallery</h3>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("File size must be less than 5MB");
                    e.target.value = "";
                    return;
                  }
                  setImage(file);
                  toast.success(`Selected: ${file.name}`);
                }
              }}
              className="flex-1"
            />

            <button
              onClick={uploadImage}
              disabled={uploading}
              className={`bg-blue-600 text-white px-4 py-1 rounded transition ${uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>

            <button
              onClick={() => {
                setSelectedTitle(null);
                setImage(null);
                const fileInput = document.getElementById("file-input");
                if (fileInput) fileInput.value = "";
                toast.info("Upload section closed");
              }}
              className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>

          {image && (
            <p className="text-sm text-green-600 mt-2">
              Ready to upload: {image.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
}