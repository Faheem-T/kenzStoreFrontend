const url = "https://api.cloudinary.com/v1_1/dlicxnblg/image/upload";
const uploadPreset = "kenzStoreImages";
export const uploadToCloudinary = async (
  file: FormDataEntryValue
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to cloudinary:", error);
    throw new Error("Failed to upload image to cloudinary");
  }
};
