import { API_BASE_URL } from "@/config";
import type {
  Country,
  Unit,
  PeriodArticle,
  EquipmentCategory,
  EquipmentItem,
  Post,
} from "@/types/models";

function requireBase(): string {
  if (!API_BASE_URL) throw new Error("Thiếu VITE_API_BASE_URL. Hãy dùng dữ liệu local hoặc cấu hình .env");
  return API_BASE_URL;
}

async function getJson<T>(path: string): Promise<T> {
  const base = requireBase();
  const res = await fetch(`${base}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
  return (await res.json()) as T;
}

export const remote = {
  countries: () => getJson<Country[]>("/countries"),
  units: () => getJson<Unit[]>("/units"),
  periodArticles: () => getJson<PeriodArticle[]>("/period-articles"),

  equipmentCategories: () => getJson<EquipmentCategory[]>("/equipment/categories"),
  equipmentItems: () => getJson<EquipmentItem[]>("/equipment/items"),

  posts: () => getJson<Post[]>("/posts"),
};
