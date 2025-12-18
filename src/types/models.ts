export type NavItem = { to: string; label: string };

export type Country = {
  slug: string;
  name: string;
  description: string;
};

export type Unit = {
  slug: string;
  countrySlug: string;
  name: string;
  description: string;
};

export type PeriodArticle = {
  slug: string;
  countrySlug: string;
  unitSlug: string;
  title: string;
  periodLabel: string; // e.g., "Thời kỳ X" or "Giai đoạn 1954–1968"
  excerpt: string;
  content: string;
  imageCaptions: { id: string; caption: string }[]; // placeholder images
  notes?: string;
  updatedAt: string; // ISO datetime
};

export type EquipmentCategory = {
  slug: string;
  name: string;
  description: string;
};

export type EquipmentItem = {
  slug: string;
  categorySlug: string;
  name: string;
  origin: string;      // Nguồn gốc
  usedBy: string;      // Sử dụng bởi
  usedPeriod: string;  // Thời kì sử dụng
  excerpt: string;
  content: string;
  images: { id: string; caption: string }[]; // placeholder images
};

export type PostType = "tai-lieu" | "tin-tuc";

export type Post = {
  type: PostType;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string; // ISO datetime
  coverCaption?: string;
};

export type Comment = {
  id: string;
  postType: PostType;
  postSlug: string;
  name: string;
  text: string;
  createdAt: string; // ISO datetime
};
