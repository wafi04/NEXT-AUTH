import cloudinary from "@/config";
import { UploadApiResponse, UploadApiErrorResponse, v2 } from "cloudinary";

type UploadResponse = 
  { success: true; result?: UploadApiResponse } | 
  { success: false; error: UploadApiErrorResponse };

export const uploadToCloudinary = (
  fileUri: string, 
  fileName: string,
  folder:  string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    v2.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder,
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};