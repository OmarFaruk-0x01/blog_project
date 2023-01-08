import type { UploadApiErrorResponse } from "cloudinary";
export type FileResponse = {
  data: { imgSrc: string; imgId: string };
  error: UploadApiErrorResponse;
  status: "success" | "failed";
  message: string;
};
