// src/api/repository.ts
import client from "@/api/client"; // Giữ client để gọi API thật
import type { Country, EquipmentItem } from "@/types/models";

// Helper để map dữ liệu từ BE -> FE (giữ nguyên vì hữu ích)
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
  // 1. Lấy danh sách Quốc gia (dùng API thật)
  async getCountries(): Promise<Country[]> {
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

  // 2. Lấy danh sách Quân trang (Uniforms) - dùng API thật
  async getEquipmentItems(): Promise<EquipmentItem[]> {
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

  // Các hàm khác: Trả về rỗng hoặc throw error để buộc build UI mới
  // (bạn sẽ viết lại sau khi có API thật)
  async getUnits() {
    console.warn("getUnits chưa có API thật");
    return Promise.resolve([]); // Trả mảng rỗng để UI không crash
  },

  async getPeriodArticles() {
    console.warn("getPeriodArticles chưa có API thật");
    return Promise.resolve([]);
  },

  async getEquipmentCategories() {
    console.warn("getEquipmentCategories chưa có API thật");
    return Promise.resolve([]);
  },

  async getPosts() {
    console.warn("getPosts chưa có API thật");
    return Promise.resolve([]);
  },
};