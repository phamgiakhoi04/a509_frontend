import axiosClient from "./axiosClient";

export const adminApi = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axiosClient.post("/api/admin/images/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  getAllUniforms: async () => {
    const { data } = await axiosClient.get("/api/admin/uniforms");
    return data;
  },

  createUniform: async (data: any) => {
    const { data: result } = await axiosClient.post("/api/admin/uniforms", data);
    return result;
  },

  deleteUniform: async (id: number) => {
    const { data } = await axiosClient.delete(`/api/admin/uniforms/${id}`);
    return data;
  },
};