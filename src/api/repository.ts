import { USE_LOCAL_DATA } from "@/config";
import * as local from "@/mocks/data";
import { remote } from "@/api/endpoints";
import type {
  Country,
  Unit,
  PeriodArticle,
  EquipmentCategory,
  EquipmentItem,
  Post,
} from "@/types/models";

function delay<T>(value: T, ms = 150) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));
}

export const repo = {
  async getCountries(): Promise<Country[]> {
    return USE_LOCAL_DATA ? delay(local.countries) : remote.countries();
  },
  async getUnits(): Promise<Unit[]> {
    return USE_LOCAL_DATA ? delay(local.units) : remote.units();
  },
  async getPeriodArticles(): Promise<PeriodArticle[]> {
    return USE_LOCAL_DATA ? delay(local.periodArticles) : remote.periodArticles();
  },
  async getEquipmentCategories(): Promise<EquipmentCategory[]> {
    return USE_LOCAL_DATA ? delay(local.equipmentCategories) : remote.equipmentCategories();
  },
  async getEquipmentItems(): Promise<EquipmentItem[]> {
    return USE_LOCAL_DATA ? delay(local.equipmentItems) : remote.equipmentItems();
  },
  async getPosts(): Promise<Post[]> {
    return USE_LOCAL_DATA ? delay(local.posts) : remote.posts();
  },
};
