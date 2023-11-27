import axiosClient from "./api";

const uploadImage = async (file: File) => {
  const url = "/isthisacat";

  try {
    const formData = new FormData();
    formData.append("file", file);
    return await axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export { uploadImage };
