import { USE_LOCAL_DATA } from "@/config";
import * as local from "@/mocks/data";
import client from "@/api/client"; // Import client vừa tạo
import type { Country, EquipmentItem } from "@/types/models";

// Helper để map dữ liệu từ BE -> FE
function mapUniformToEquipment(u: any): EquipmentItem {
  return {
    id: u.id,
    slug: u.id.toString(), // Dùng ID làm slug tạm thời
    name: u.name,
    description: u.description || "",
    // Gộp lịch sử và chất liệu vào nội dung chi tiết
    content: `<strong>Chất liệu:</strong> ${u.material}\n\n<strong>Lịch sử:</strong>\n${u.history || "Chưa có thông tin."}`,
    excerpt: u.description,
    categorySlug: "trang-bi", // Hardcode tạm để hiện ra list
    images: u.images ? u.images.map((img: any) => ({
      id: img.id,
      imageUrl: img.imageUrl,
      caption: img.description
    })) : []
  };
}

export const repo = {
  // 1. Lấy danh sách Quốc gia
  async getCountries(): Promise<Country[]> {
    if (USE_LOCAL_DATA) return Promise.resolve(local.countries);
    try {
      const res = await client.get("/countries");
      // Map dữ liệu BE trả về sang format FE cần
      return res.data.map((c: any) => ({
        id: c.id,
        slug: c.id.toString(), // Tạm dùng ID làm slug
        name: c.countryName,   // BE là countryName
        description: c.description
      }));
    } catch (e) {
      console.error("Lỗi lấy countries", e);
      return [];
    }
  },

  // 2. Lấy danh sách Quân trang (Uniforms)
  async getEquipmentItems(): Promise<EquipmentItem[]> {
    if (USE_LOCAL_DATA) return Promise.resolve(local.equipmentItems);
    try {
      // Gọi API lấy tất cả (Page 0, Size 100 để lấy nhiều)
      const res = await client.get("/uniforms?page=0&size=100");
      const list = res.data.content || []; // Spring Page trả về trong .content
      return list.map(mapUniformToEquipment);
    } catch (e) {
      console.error("Lỗi lấy uniforms", e);
      return [];
    }
  },

  // --- Các hàm chưa có API thật thì giữ nguyên Mock hoặc trả về rỗng ---
  async getUnits() { return Promise.resolve(local.units); },
  async getPeriodArticles() { return Promise.resolve(local.periodArticles); },
  async getEquipmentCategories() { return Promise.resolve(local.equipmentCategories); },
  async getPosts() { return Promise.resolve(local.posts); },
};