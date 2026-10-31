const CLOUDINARY_UPLOAD_PATH = "/image/upload/";
const CLOUDINARY_TRANSFORM_PREFIX = /^(?:w_|h_|c_|q_|f_|g_|dpr_|ar_|fl_|e_|a_|r_)/;

export function isTransformedCloudinaryUrl(src) {
  if (!src) return false;
  try {
    const url = new URL(src);
    if (
      url.hostname !== "res.cloudinary.com" &&
      !url.hostname.endsWith(".res.cloudinary.com")
    ) {
      return false;
    }
    const uploadIndex = url.pathname.indexOf(CLOUDINARY_UPLOAD_PATH);
    if (uploadIndex === -1) return false;
    const remainderStart = uploadIndex + CLOUDINARY_UPLOAD_PATH.length;
    return CLOUDINARY_TRANSFORM_PREFIX.test(
      url.pathname.slice(remainderStart).split("/")[0]
    );
  } catch {
    return false;
  }
}

export function optimizeImageUrl(src, { width = 800, height, crop = "limit" } = {}) {
  if (!src) return src;

  let url;
  try {
    url = new URL(src);
  } catch {
    return src;
  }

  if (
    url.hostname !== "res.cloudinary.com" &&
    !url.hostname.endsWith(".res.cloudinary.com")
  ) {
    return src;
  }

  const uploadIndex = url.pathname.indexOf(CLOUDINARY_UPLOAD_PATH);
  if (uploadIndex === -1) return src;

  const remainderStart = uploadIndex + CLOUDINARY_UPLOAD_PATH.length;
  const remainder = url.pathname.slice(remainderStart);
  if (CLOUDINARY_TRANSFORM_PREFIX.test(remainder.split("/")[0])) return src;

  const transformation = [
    `w_${width}`,
    height ? `h_${height}` : null,
    `c_${crop}`,
    "q_auto",
    "f_auto",
  ]
    .filter(Boolean)
    .join(",");

  url.pathname = `${url.pathname.slice(0, remainderStart)}${transformation}/${remainder}`;
  return url.toString();
}

export function createCloudinarySrcSet(
  src,
  { widths = [320, 640, 960, 1280, 1600], height, crop } = {}
) {
  if (isTransformedCloudinaryUrl(src)) return undefined;

  return widths
    .map(
      (width) =>
        `${optimizeImageUrl(src, { width, height, crop })} ${width}w`
    )
    .join(", ");
}
