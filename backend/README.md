# Backend deployment notes

## Gallery image delivery

Gallery uploads use Cloudinary; image binaries are not stored in MongoDB or on
the Render instance. The backend stores the original secure URL, Cloudinary
public ID, and optional dimensions/format/byte metadata. Public and admin
gallery screens request up to 24 images per gallery, with 300px thumbnails and
800px responsive variants. Cloudinary applies automatic quality and format
selection when delivering those variants. The full stored URL is requested
only when an image is opened.

The existing `GET /api/gallery` response is retained for integrations that
expect all galleries and their existing `url` fields. Optimized clients can
use `GET /api/gallery?limit=24`; additional images are available from
`GET /api/gallery/:id/images?skip=24&limit=24`. The page size is capped at 30.
Existing image records remain readable: Cloudinary records are transformed
using `public_id`, and records without one continue to use their stored URL.
No database migration is required.

## Environment

Set these variables in the backend `.env` for local development and in the
Render service's Environment settings for deployment:

- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`
- `MONGO_URI`

Create a Cloudinary account, copy its cloud name, API key, and API secret into
those variables, and keep the API secret private. Do not put these credentials
in frontend `VITE_*` variables. The existing Cloudinary account and current
stored image records can be used without migration.

Uploads accept JPEG, PNG, and WebP files up to 6 MB each, with up to 10 files
per request. The backend verifies file signatures before sending uploads to
Cloudinary. For Render, no persistent disk is required for gallery images.

If older records point to files on a local disk, those links are preserved for
backward compatibility but are not durable on Render. Upload those files to
Cloudinary from a persistent copy before removing the old storage; do not
delete legacy files or records as part of deployment.
