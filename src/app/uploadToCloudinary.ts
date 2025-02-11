import { allowedFileTypes } from "./components/AddImageFileInputButton";

const url = "https://api.cloudinary.com/v1_1/dlicxnblg/image/upload";
const uploadPreset = "kenzStoreImages";

const convertToPng = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas not supported");

      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject("PNG conversion failed");
      }, "image/png");
    };

    img.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const uploadToCloudinary = async (
  file: FormDataEntryValue
): Promise<string> => {
  if (!(file instanceof File && allowedFileTypes.includes(file.type))) {
    throw new Error("Invalid file type");
  }

  try {
    let pngFile;
    if (!(file.type === "image/png")) {
      const pngBlob = await convertToPng(file);
      pngFile = new File([pngBlob], file.name.replace(/\.[^.]+$/, ".png"), {
        type: "image/png",
      });
    } else pngFile = file;

    const formData = new FormData();
    formData.append("file", pngFile);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (typeof data === "object" && data !== null && "error" in data) {
      throw new Error(data.error.message);
    }
    console.log(data);
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
