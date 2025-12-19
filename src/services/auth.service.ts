import axiosInstance from "@/utils/axios";

export const googleLogin = async (id_token: string) => {
  const response = await axiosInstance.post("/auth/google", {
    id_token,
  });
  return response.data; // { user, token }
};
