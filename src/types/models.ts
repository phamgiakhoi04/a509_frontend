export type NavItem = { to: string; label: string };

// --- 1. USER (Khớp với BE) ---
export type User = {
  roles: any[]; // BE trả mảng roles
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  roleName: string; // Nếu BE trả roleName string
};

export type AuthResponse = {
  token: string;
  userInfo: User;
};

// --- 2. COUNTRY (Khớp hoàn toàn với BE) ---
export type Country = {
  id: number; // country_id
  countryName: string; // tên trường chính xác từ BE
  continent?: string;
  flagImageUrl?: string;
  description?: string;
  slug?: string; // Optional: FE tự generate (ví dụ: countryName.toLowerCase().replace(/\s+/g, '-'))
};

// --- 3. UNIFORM (Quân phục - Khớp với BE) ---
export type EquipmentItem = {
  id: number;
  slug?: string; // Optional: FE tự generate nếu cần route chi tiết
  name: string;
  description?: string;
  history?: string; // Từ BE
  material?: string; // Từ BE
  country: Country; // Object Country đầy đủ (BE eager fetch)
  createdAt?: string;
  updatedAt?: string;

  // Các trường cũ giữ optional để tránh lỗi compile
  categorySlug?: string;
  origin?: string;
  usedBy?: string;
  usedPeriod?: string;
  excerpt?: string;

  images: {
    id: number;
    imageUrl: string;
    description?: string;
    caption?: string;
  }[];
};

// --- Các type cũ giữ nguyên để tránh lỗi compile tạm thời ---
export type Unit = { slug: string; countrySlug: string; name: string; description: string };
export type PeriodArticle = {
  slug: string;
  countrySlug: string;
  unitSlug: string;
  title: string;
  periodLabel: string;
  excerpt: string;
  content: string;
  imageCaptions: any[];
  notes?: string;
  updatedAt: string;
};
export type EquipmentCategory = { slug: string; name: string; description: string };
export type PostType = "tai-lieu" | "tin-tuc";
export type Post = {
  type: PostType;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string;
  coverCaption?: string;
};
export type Comment = {
  id: string;
  postType: PostType;
  postSlug: string;
  name: string;
  text: string;
  createdAt: string;
};