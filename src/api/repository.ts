// src/api/repository.ts
import { adminApi } from "@/api/adminApi";
import type { Country, EquipmentItem } from "@/types/models";

function mapUniformToEquipment(u: any): EquipmentItem {
  return {
    id: u.id,
    slug: u.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    name: u.name,
    description: u.description || "",
    // content: `<strong>Chất liệu:</strong> ${u.material || "Chưa có thông tin"}\n\n<strong>Lịch sử:</strong>\n${u.history || "Chưa có thông tin."}`,
    excerpt: u.description || "",
    categorySlug: "trang-bi",
    images: u.images
      ? u.images.map((img: any) => ({
          id: img.id,
          imageUrl: img.imageUrl,
          caption: img.description || "",
        }))
      : [],
    country: u
      ? {
          id: u.country.id,
          slug: u.country.countryName
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
          name: u.country.countryName,
          continent: u.country.continent,
          flagImageUrl: u.country.flagImageUrl,
        }
      : {
        name: 'ReactNode',
        id: 1000000000,
        countryName: 'string'
      },
  };
}

export const repo = {
  async getCountries(): Promise<Country[]> {
    try {
      const raw = await adminApi.getAllCountries();
      return raw.map((c: any) => ({
        id: c.id,
        slug: c.countryName
          .toLowerCase()
          .replace(/\s+/g, "-") 
          .replace(/[^a-z0-9-]/g, ""),
        name: c.countryName,
        continent: c.continent,
        flagImageUrl: c.flagImageUrl,
        description: c.description || "",
      }));
    } catch (e) {
      console.error("Lỗi lấy countries:", e);
      return [];
    }
  },

  async getEquipmentItems(): Promise<EquipmentItem[]> {
    try {
      const raw = await adminApi.getAllUniforms();
      const list = Array.isArray(raw) ? raw : raw.content || [];
      return list.map(mapUniformToEquipment);
    } catch (e) {
      console.error("Lỗi lấy uniforms:", e);
      return [];
    }
  },

  async getUnits() {
    console.warn("getUnits - Chưa có API");
    return [];
  },

  async getPeriodArticles() {
    console.warn("getPeriodArticles - Chưa có API");
    return [];
  },

  async getEquipmentCategories() {
    console.warn("getEquipmentCategories - Chưa có API");
    return [];
  },

  async getPosts() {
    console.warn("getPosts - Chưa có API");
    return [];
  },
};