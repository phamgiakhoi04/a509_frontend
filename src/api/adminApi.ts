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

  createCountry: async (
    countryPayload: {
      countryName: string;
      continent?: string;
      description?: string;
    },
    flagFile?: File
  ) => {
    const formData = new FormData();
    formData.append("countryName", countryPayload.countryName);
    if (countryPayload.continent) formData.append("continent", countryPayload.continent);
    if (countryPayload.description) formData.append("description", countryPayload.description);
    if (flagFile) formData.append("flagFile", flagFile);

    const { data } = await axiosClient.post("/api/countries", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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
    if (countryPayload.continent) formData.append("continent", countryPayload.continent);
    if (countryPayload.description) formData.append("description", countryPayload.description);
    if (flagFile) formData.append("flagFile", flagFile);

    const { data } = await axiosClient.put(`/api/countries/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  deleteCountry: async (id: number) => {
    await axiosClient.delete(`/api/countries/${id}`);
  },

  // ==================== UNIFORMS ====================
  getAllUniforms: async () => {
    const { data } = await axiosClient.get("/api/uniforms");
    return data.content || data;
  },

  getUniformById: async (id: number) => {
    const { data } = await axiosClient.get(`/api/uniforms/${id}`);
    return data;
  },

  createUniform: async (formData: FormData) => {
    const { data } = await axiosClient.post("/api/uniforms", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  updateUniform: async (id: number, formData: FormData) => {
    const { data } = await axiosClient.put(`/api/uniforms/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  deleteUniform: async (id: number) => {
    await axiosClient.delete(`/api/uniforms/${id}`);
  },

  // ==================== UNIFORM CATEGORIES ====================
  getAllCategories: async () => {
    const { data } = await axiosClient.get("/api/uniform-categories");
    return data;
  },

  // Hierarchical categories
  getRootCategories: async () => {
    const { data } = await axiosClient.get("/api/uniform-categories/roots");
    return data;
  },

  getRootCategoriesByType: async (type: 'REENACTMENT' | 'UNIFORM' | 'DOCUMENT') => {
    const { data } = await axiosClient.get(`/api/uniform-categories/roots/${type}`);
    return data;
  },

  getChildCategories: async (parentId: number) => {
    const { data } = await axiosClient.get(`/api/uniform-categories/${parentId}/children`);
    return data;
  },

  getCategoriesByType: async (type: 'REENACTMENT' | 'UNIFORM' | 'DOCUMENT') => {
    const { data } = await axiosClient.get(`/api/uniform-categories/type/${type}`);
    return data;
  },

  getCategoryById: async (id: number) => {
    const { data } = await axiosClient.get(`/api/uniform-categories/${id}`);
    return data;
  },

  createCategory: async (categoryPayload: { 
    categoryName: string; 
    description?: string;
    categoryType?: 'REENACTMENT' | 'UNIFORM' | 'DOCUMENT';
    parentId?: number;
    sortOrder?: number;
    icon?: string;
  }) => {
    const { data } = await axiosClient.post("/api/uniform-categories", categoryPayload);
    return data;
  },

  updateCategory: async (id: number, categoryPayload: { 
    categoryName: string; 
    description?: string;
    categoryType?: 'REENACTMENT' | 'UNIFORM' | 'DOCUMENT';
    parentId?: number;
    sortOrder?: number;
    icon?: string;
  }) => {
    const { data } = await axiosClient.put(`/api/uniform-categories/${id}`, categoryPayload);
    return data;
  },

  deleteCategory: async (id: number) => {
    await axiosClient.delete(`/api/uniform-categories/${id}`);
  },

  getUniformsByCategory: async (categoryId: number) => {
    const { data } = await axiosClient.get(`/api/uniforms/category/${categoryId}`);
    return data.content || data;
  },
};