import { adminApi } from "@/api/adminApi";
import type { Country, EquipmentItem } from "@/types/models";

const createSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const mapUniformToEquipment = (uniform: any): EquipmentItem => ({
  id: uniform.id,
  slug: createSlug(uniform.name),
  name: uniform.name,
  description: uniform.description || "",
  excerpt: uniform.description || "",
  categorySlug: "trang-bi",
  images: uniform.images?.map((img: any) => ({
    id: img.id,
    imageUrl: img.imageUrl,
    caption: img.description || "",
  })) || [],
  country: uniform.country
    ? {
        id: uniform.country.id,
        slug: createSlug(uniform.country.countryName),
        name: uniform.country.countryName,
        countryName: uniform.country.countryName,
        continent: uniform.country.continent,
        flagImageUrl: uniform.country.flagImageUrl,
      }
    : null,
});

export const repo = {
  async getCountries(): Promise<Country[]> {
    try {
      const countries = await adminApi.getAllCountries();
      return countries.map((country: any) => ({
        id: country.id,
        slug: createSlug(country.countryName),
        name: country.countryName,
        countryName: country.countryName,  // ← THÊM dòng này
        continent: country.continent,
        flagImageUrl: country.flagImageUrl,
        description: country.description || "",
      }));
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách quốc gia:", error);
      return [];
    }
  },

  async getEquipmentItems(): Promise<EquipmentItem[]> {
    try {
      const rawData = await adminApi.getAllUniforms();
      const uniformList = Array.isArray(rawData) ? rawData : rawData.content || [];
      return uniformList.map(mapUniformToEquipment);
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách quân trang:", error);
      return [];
    }
  },

  async getPosts() {
    console.warn("⚠️ getPosts - Chưa có API backend");
    return [];
  },
};