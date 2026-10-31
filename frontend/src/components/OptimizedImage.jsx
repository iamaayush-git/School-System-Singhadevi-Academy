import { useState } from "react";
import {
  createCloudinarySrcSet,
  isTransformedCloudinaryUrl,
  optimizeImageUrl,
} from "../utils/imageOptimization.js";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23e5e7eb'/%3E%3Cpath d='M240 295l70-75 50 55 38-42 70 82H172z' fill='%239ca3af'/%3E%3Ccircle cx='390' cy='155' r='24' fill='%239ca3af'/%3E%3C/svg%3E";

export default function OptimizedImage({
  src,
  srcSet,
  sizes = "100vw",
  width = 800,
  height = 600,
  alt = "",
  loading = "lazy",
  priority = false,
  optimize = true,
  crop = "limit",
  className = "h-full w-full object-cover",
  wrapperClassName = "",
  pictureSources = [],
  onLoad,
  ...imageProps
}) {
  const [imageState, setImageState] = useState(null);
  const loaded = imageState?.src === src && imageState.loaded;
  const failed = imageState?.src === src && imageState.failed;

  const imageSrc = failed
    ? FALLBACK_IMAGE
    : optimize
      ? optimizeImageUrl(src, { width, height, crop })
      : src;
  const responsiveSrcSet =
    srcSet ||
    (optimize &&
    src?.includes("res.cloudinary.com") &&
    !isTransformedCloudinaryUrl(src)
      ? createCloudinarySrcSet(src, { height, crop })
      : undefined);

  return (
    <span
      className={`relative block overflow-hidden ${wrapperClassName}`}
      aria-busy={!loaded && !failed}
    >
      {!loaded && !failed && (
        <span className="absolute inset-0 animate-pulse bg-gray-200" aria-hidden="true" />
      )}
      <picture className="block h-full w-full">
        {pictureSources.map((source) => (
          <source
            key={source.media}
            media={source.media}
            srcSet={source.srcSet}
            sizes={source.sizes || sizes}
            type={source.type}
          />
        ))}
        <img
          {...imageProps}
          src={imageSrc}
          srcSet={failed ? undefined : responsiveSrcSet}
          sizes={sizes}
          width={width}
          height={height}
          alt={alt}
          loading={priority ? "eager" : loading}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={(event) => {
            setImageState({ src, loaded: true, failed });
            onLoad?.(event);
          }}
          onError={() => setImageState({ src, loaded: false, failed: true })}
          className={`${className} ${
            !loaded && !failed ? "opacity-0" : "opacity-100"
          } transition-opacity duration-200`}
        />
      </picture>
    </span>
  );
}
