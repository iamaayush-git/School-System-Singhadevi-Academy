import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function AdminGallery() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [title, setTitle] = useState("");

  const [selectedGallery, setSelectedGallery] = useState(null);
  const [files, setFiles] = useState([]);

  // MODALS
  const [renameModal, setRenameModal] = useState(null);
  const [newName, setNewName] = useState("");

  const [deleteModal, setDeleteModal] = useState(null);

  // FETCH
  const fetchGallery = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/gallery`);
      setGalleries(res.data.data || res.data);
    } catch {
      toast.error("Failed to load gallery");
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchGallery();
  }, [token, fetchGallery]);

  // CREATE
  const createGallery = async () => {
    if (!title.trim()) return toast.error("Title required");

    try {
      setLoading(true);

      await axios.post(
        `${API}/api/gallery`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      fetchGallery();
      toast.success("Gallery created");
    } catch {
      toast.error("Create failed");
    } finally {
      setLoading(false);
    }
  };

  // RENAME
  const renameGallery = async () => {
    if (!newName.trim()) return;

    try {
      setLoading(true);

      await axios.put(
        `${API}/api/gallery/${renameModal}`,
        { title: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Gallery renamed");
      setRenameModal(null);
      setNewName("");
      fetchGallery();
    } catch {
      toast.error("Rename failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteGallery = async () => {
    try {
      setLoading(true);

      await axios.delete(`${API}/api/gallery/${deleteModal}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Gallery deleted");
      setDeleteModal(null);
      fetchGallery();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // UPLOAD
  const uploadImages = async (id) => {
    if (!files.length) return toast.error("Select images");

    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));

    try {
      setLoading(true);

      await axios.post(
        `${API}/api/gallery/upload/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Images uploaded");
      setFiles([]);
      setSelectedGallery(null);
      fetchGallery();
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE IMAGE
  const deleteImage = async (galleryId, imageId) => {
    try {
      await axios.delete(
        `${API}/api/gallery/${galleryId}/image/${imageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Image deleted");
      fetchGallery();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!token) return null;

  return (
    <div className="mt-10 p-4 md:p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Gallery Panel
      </h1>

      {/* CREATE */}
      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Create new gallery"
          className="border p-2 w-full rounded"
        />

        <button
          disabled={loading}
          onClick={createGallery}
          className="bg-green-600 text-white px-4 rounded disabled:opacity-50"
        >
          {loading ? "..." : "Add"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {galleries.map((g) => (
          <motion.div
            key={g._id}
            className="bg-white p-4 rounded shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >

            {/* TITLE */}
            <div className="flex justify-between items-center">
              <h2 className="lg:text-lg text-medium font-semibold">{g.title}</h2>

              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => {
                    setRenameModal(g._id);
                    setNewName(g.title);
                  }}
                  className="text-yellow-600"
                >
                  Rename
                </button>

                <button
                  onClick={() => setDeleteModal(g._id)}
                  className="text-red-600"
                >
                  Delete
                </button>

                <button
                  onClick={() => setSelectedGallery(g._id)}
                  className="text-blue-600"
                >
                  Upload
                </button>
              </div>
            </div>

            {/* IMAGES */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4">
              {g.images.map((img) => (
                <div key={img._id} className="relative group">
                  <img
                    src={img.url}
                    className="h-20 w-full object-cover rounded"
                  />

                  <button
                    onClick={() => deleteImage(g._id, img._id)}
                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full lg:opacity-0 group-hover:opacity-100"
                  >
                    <RxCross1 size={12} />
                  </button>
                </div>
              ))}
            </div>

          </motion.div>
        ))}
      </div>

      {/* UPLOAD MODAL */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded w-[90%] md:w-[400px]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <h2 className="text-lg font-bold mb-3">Upload Images</h2>

              <input
                type="file"
                multiple
                onChange={(e) => setFiles([...e.target.files])}
              />

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setSelectedGallery(null)}>
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={() => uploadImages(selectedGallery)}
                  className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENAME MODAL */}
      <AnimatePresence>
        {renameModal && (
          <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <motion.div className="bg-white p-6 rounded w-[90%] max-w-sm">
              <h2 className="font-bold mb-2">Rename Gallery</h2>

              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-2 w-full rounded"
              />

              <div className="flex justify-end gap-2 mt-3">
                <button onClick={() => setRenameModal(null)}>Cancel</button>
                <button
                  onClick={renameGallery}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <motion.div className="bg-white p-6 rounded text-center">
              <h2 className="font-bold mb-2">Delete Gallery?</h2>
              <p className="text-sm text-gray-500 mb-3">
                This action cannot be undone
              </p>

              <div className="flex justify-center gap-3">
                <button onClick={() => setDeleteModal(null)}>
                  Cancel
                </button>

                <button
                  onClick={deleteGallery}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}