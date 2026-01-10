import axiosClient from "./axiosClient";

export const adminApi = {
  getAllCountries: async () => {
    const { data } = await axiosClient.get("/api/countries");
    return data;
  },

  getCountryById: async (id: number) => {
    const { data } = await axiosClient.get(`/api/countries/${id}`);
    return data;
  },

  createCountry: async (countryPayload: {
    countryName: string;
    continent?: string;
    description?: string;
  }, flagFile?: File) => {
    const formData = new FormData();
    formData.append("countryName", countryPayload.countryName);
    if (countryPayload.continent) {
      formData.append("continent", countryPayload.continent);
    }
    if (countryPayload.description) {
      formData.append("description", countryPayload.description);
    }
    if (flagFile) {
      formData.append("flagFile", flagFile);
    }
    const { data } = await axiosClient.post("/api/countries", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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
    formData.append("countryName", countryPayload.countryName);
    if (countryPayload.continent) {
      formData.append("continent", countryPayload.continent);
    }
    if (countryPayload.description) {
      formData.append("description", countryPayload.description);
    }
    if (flagFile) {
      formData.append("flagFile", flagFile);
    }
    const { data } = await axiosClient.put(`/api/countries/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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
    const { data } = await axiosClient.post("/api/uniforms", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  },

  getUniformById: async (id: number) => {
    const { data } = await axiosClient.get(`/api/uniforms/${id}`);
    return data;
  },

  updateUniform: async (id: number, formData: FormData) => {
    const { data } = await axiosClient.put(`/api/uniforms/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  },

  deleteUniform: async (id: number) => {
    await axiosClient.delete(`/api/uniforms/${id}`);
  },
};