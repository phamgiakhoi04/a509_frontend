import axiosClient from "./axiosClient";

export const adminApi = {
  // Upload ảnh chung (nếu BE thêm endpoint này, hoặc tạm dùng cho flag/uniform)
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosClient.post("/api/images/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data; // Giả định trả { url, publicId, ... }
  },

  // Country APIs - Khớp hoàn toàn BE
  getAllCountries: async () => {
    const { data } = await axiosClient.get("/api/countries");
    return data;
  },

  createCountry: async (countryData: {
    countryName: string;
    continent?: string;
    description?: string;
    flagImageUrl?: string;
  }) => {
    const { data } = await axiosClient.post("/api/countries", countryData);
    return data;
  },

  updateCountry: async (id: number, countryData: any) => {
    const { data } = await axiosClient.put(`/api/countries/${id}`, countryData);
    return data;
  },

  deleteCountry: async (id: number) => {
    await axiosClient.delete(`/api/countries/${id}`);
  },

  // Uniform APIs - Khớp BE
  getAllUniforms: async () => {
    const { data } = await axiosClient.get("/api/uniforms");
    return data.content || data; // BE trả Pageable, lấy content nếu có
  },

  createUniform: async (formData: FormData) => {
    const { data } = await axiosClient.post("/api/uniforms", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  deleteUniform: async (id: number) => {
    await axiosClient.delete(`/api/uniforms/${id}`);
  },

  // Nếu cần thêm sau: getById, updateUniform...
};