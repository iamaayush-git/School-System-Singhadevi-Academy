import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

const API = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 24;

const GalleryThumbnail = memo(function GalleryThumbnail({ image, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const thumbnailUrl = image.thumbnailUrl || image.url;
  const mediumUrl = image.mediumUrl || thumbnailUrl;

  return (
    <button
      type="button"
      aria-label="Open gallery image"
      className="relative block aspect-square w-full overflow-hidden bg-gray-200 text-left"
      onClick={onClick}
    >
      {!loaded && !failed && (
        <span className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      {failed ? (
        <span className="absolute inset-0 flex items-center justify-center bg-gray-200 text-xs text-gray-500">
          Image unavailable
        </span>
      ) : (
        <img
          src={thumbnailUrl}
          srcSet={
            mediumUrl !== thumbnailUrl
              ? `${thumbnailUrl} 300w, ${mediumUrl} 800w`
              : undefined
          }
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
          alt="School gallery"
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <span className="absolute inset-0 bg-black/10 transition hover:bg-black/0" />
    </button>
  );
});

export default function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImageUrl, setActiveImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loadingGalleryId, setLoadingGalleryId] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${API}/api/gallery?limit=${PAGE_SIZE}`)
      .then((res) => {
        if (!cancelled) setGalleries(res.data.data || []);
      })
      .catch((error) => {
        console.error("Failed to load gallery", error);
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedGalleryId || !selectedImages[currentIndex]) return undefined;
    let cancelled = false;
    setActiveImageUrl(null);
    setImageLoading(true);

    axios
      .get(
        `${API}/api/gallery/${selectedGalleryId}/image/${selectedImages[currentIndex]._id}`
      )
      .then((res) => {
        if (!cancelled) setActiveImageUrl(res.data.data.originalUrl);
      })
      .catch((error) => {
        console.error("Failed to load full gallery image", error);
        if (!cancelled) {
          setActiveImageUrl(
            selectedImages[currentIndex].mediumUrl ||
              selectedImages[currentIndex].url
          );
        }
      })
      .finally(() => {
        if (!cancelled) setImageLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedGalleryId, selectedImages, currentIndex]);

  const openModal = (galleryId, images, index) => {
    setSelectedGalleryId(galleryId);
    setSelectedImages(images);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImages([]);
    setSelectedGalleryId(null);
    setCurrentIndex(0);
    setActiveImageUrl(null);
  };

  const loadMore = async (galleryId, skip) => {
    setLoadingGalleryId(galleryId);
    try {
      const res = await axios.get(
        `${API}/api/gallery/${galleryId}/images?skip=${skip}&limit=${PAGE_SIZE}`
      );
      setGalleries((current) =>
        current.map((gallery) =>
          gallery._id === galleryId
            ? {
                ...gallery,
                images: [...gallery.images, ...res.data.data.images],
                nextSkip: res.data.data.nextSkip,
              }
            : gallery
        )
      );
    } catch (error) {
      console.error("Failed to load more gallery images", error);
    } finally {
      setLoadingGalleryId(null);
    }
  };

  const next = () => {
    setCurrentIndex((index) =>
      index === selectedImages.length - 1 ? 0 : index + 1
    );
  };

  const prev = () => {
    setCurrentIndex((index) =>
      index === 0 ? selectedImages.length - 1 : index - 1
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-10 md:px-10">
      <h1 className="mb-10 text-center text-3xl font-bold md:text-4xl">
        School Gallery
      </h1>

      {loadError ? (
        <p role="alert" className="text-center text-gray-600">
          The gallery could not be loaded. Please try again later.
        </p>
      ) : (
        <div className="space-y-12">
          {galleries.map((gallery) => (
            <section key={gallery._id}>
              <h2 className="mb-4 text-xl font-semibold md:text-2xl">
                {gallery.title}
              </h2>
              <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {gallery.images.map((image, index) => (
                  <motion.div
                    key={image._id}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square overflow-hidden"
                  >
                    <GalleryThumbnail
                      image={image}
                      onClick={() =>
                        openModal(gallery._id, gallery.images, index)
                      }
                    />
                  </motion.div>
                ))}
              </div>
              {gallery.images.length < gallery.imageCount && (
                <button
                  type="button"
                  onClick={() => loadMore(gallery._id, gallery.nextSkip)}
                  disabled={loadingGalleryId === gallery._id}
                  className="mt-4 rounded bg-white px-4 py-2 text-sm font-medium shadow disabled:opacity-50"
                >
                  {loadingGalleryId === gallery._id
                    ? "Loading..."
                    : `Load more (${gallery.imageCount - gallery.images.length} remaining)`}
                </button>
              )}
            </section>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedImages.length > 0 && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 rounded-full bg-white p-2 text-black"
            >
              <RxCross1 size={20} />
            </button>

            {activeImageUrl ? (
              <motion.img
                key={currentIndex}
                src={activeImageUrl}
                alt="Full-size school gallery"
                loading="eager"
                decoding="async"
                onError={() =>
                  setActiveImageUrl(
                    selectedImages[currentIndex].mediumUrl ||
                      selectedImages[currentIndex].url
                  )
                }
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              />
            ) : (
              <div
                className="h-48 w-48 animate-pulse rounded bg-gray-700"
                aria-label={imageLoading ? "Loading image" : "Image unavailable"}
              />
            )}

            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-5 text-3xl text-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-5 text-3xl text-white"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
