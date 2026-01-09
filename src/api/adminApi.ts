import axiosClient from "./axiosClient";

export const adminApi = {
  getAllCountries: async () => {
    const { data } = await axiosClient.get("/api/countries");
    return data;
  },

  createCountry: async (countryPayload: {
    countryName: string;
    continent?: string;
    description?: string;
  }, flagFile?: File) => {
    const formData = new FormData();
    formData.append("country", JSON.stringify(countryPayload));
    if (flagFile) {
      formData.append("flagFile", flagFile);
    }
    const { data } = await axiosClient.post("/api/countries", formData);
    return data;
  },

  updateCountry: async (
    id: number,
    countryPayload: {
      countryName: string;
      continent?: string;
      description?: string;
    },
    flagFile?: File
  ) => {
    const formData = new FormData();
    formData.append("country", JSON.stringify(countryPayload));
    if (flagFile) {
      formData.append("flagFile", flagFile);
    }
    const { data } = await axiosClient.put(`/api/countries/${id}`, formData);
    return data;
  },

  deleteCountry: async (id: number) => {
    await axiosClient.delete(`/api/countries/${id}`);
  },

  getAllUniforms: async () => {
    const { data } = await axiosClient.get("/api/uniforms");
    return data.content || data;
  },

  createUniform: async (formData: FormData) => {
    const { data } = await axiosClient.post("/api/uniforms", formData);
    return data;
  },

  deleteUniform: async (id: number) => {
    await axiosClient.delete(`/api/uniforms/${id}`);
  },
};