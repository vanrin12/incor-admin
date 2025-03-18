import { useCallback } from "react";
import axios from "axios";

const useFileUpload = () => {
  // Function to upload a file
const uploadUrl = `${process.env.REACT_APP_API_URL}/api/v1/admin/s3-upload`;
const authToken = '';
  const uploadFile = useCallback(
    async (file) => {
      if (!file) return null;

      try {
        const formData = new FormData();
        formData.append("upload", file);

        const headers = {
          "Content-Type": "multipart/form-data",
        };

        if (authToken) {
          headers["Authorization"] = `Bearer ${authToken}`;
        }

        const response = await axios.post(uploadUrl, formData, { headers });

        return response.data.data.url; // Assuming response contains { data: { url: "file_url" } }
      } catch (error) {
        console.error("Upload failed:", error);
        throw new Error("Upload failed");
      }
    },
    [uploadUrl, authToken]
  );

  // Function to create CKEditor Upload Adapter
  const uploadAdapter = useCallback(
    (loader) => ({
      upload: () =>
        new Promise(async (resolve, reject) => {
          try {
            const file = await loader.file;
            const uploadedUrl = await uploadFile(file);
            if (uploadedUrl) {
              resolve({ default: uploadedUrl });
            } else {
              reject("Upload failed");
            }
          } catch (error) {
            reject("Upload failed");
          }
        }),
      abort: () => {},
    }),
    [uploadFile]
  );

  return { uploadFile, uploadAdapter };
};

export default useFileUpload;
