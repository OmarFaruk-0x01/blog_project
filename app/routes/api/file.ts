import type { ActionArgs, UploadHandler } from "@remix-run/node";
import type { UploadApiResponse } from "cloudinary";
import { deleteImage, uploadImage } from "@/models/file.server";

import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";

export const action = async ({ request }: ActionArgs) => {
  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data, contentType }) => {
      if (name !== "img") {
        return undefined;
      }
      const uploadedImage = (await uploadImage?.(data)) as UploadApiResponse;

      return `${uploadedImage.public_id}@@@${uploadedImage.secure_url}`;
    },
    createMemoryUploadHandler()
  );

  try {
    switch (request.method.toLowerCase()) {
      case "delete": {
        const formData = await request.formData();
        const imgId = formData.get("id") as string;
        if (!imgId) {
          return json({
            data: null,
            error: { message: "image id not found" },
            status: "failed",
          });
        }
        const resp = await deleteImage(imgId);
        return json({
          data: resp,
          error: null,
          status: "success",
          message: "Image deleted Successfully",
        });
      }
      case "post": {
        const formData = await parseMultipartFormData(request, uploadHandler);
        const imgData = formData.get("img") as string;
        const [imgId, imgSrc] = imgData.split("@@@");
        return json({
          data: { imgSrc, imgId },
          error: null,
          status: "success",
          message: "Image uploaded Successfully",
        });
      }
    }

    // const userId = await requireUserId(request);
  } catch (err) {
    return json({ data: null, error: err, status: "failed" });
  }
};
