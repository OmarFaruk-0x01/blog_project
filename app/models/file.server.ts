import { writeAsyncIterableToWritable } from "@remix-run/node";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SEC,
  cloud_name: process.env.CLOUD_NAME,
});

async function uploadImage(data: AsyncIterable<Uint8Array>) {
  const uploadPromise = new Promise<cloudinary.UploadApiResponse | undefined>(
    async (res, rej) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "featured_image",
          allowed_formats: ["png", "webp", "jpg", "jpeg"],
        },
        (err, result) => {
          console.log(err, result);

          if (err) {
            rej(err);
            return;
          }
          res(result);
        }
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );
  return uploadPromise;
}

async function deleteImage(id: string) {
  return await cloudinary.v2.uploader.destroy(id);
}

export { uploadImage, deleteImage };
