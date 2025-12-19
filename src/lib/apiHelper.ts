
import { api } from "./api";



// Upload API
export const uploadApi = {
  uploadImage: async (formData: FormData): Promise<string> => {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.imageUrl;
  },
  deleteImage: async (imageUrl: string) => {
    const response = await api.delete("/upload", {
      data: { imageUrl },
    });
    return response.data;
  },
};