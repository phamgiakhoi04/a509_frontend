export type NavItem = { to: string; label: string };

// --- 1. USER (Khớp với BE) ---
export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  roleName: string;
};

export type AuthResponse = {
  token: string;
  userInfo: User;
};

// --- 2. COUNTRY (Khớp với BE) ---
export type Country = {
  slug: string;       // FE cần slug, ta sẽ map id -> slug
  id: number;         // ID thật từ BE
  name: string;
  description: string;
  flagImageUrl?: string;
};

// --- 3. UNIFORM (Quân phục - Khớp với BE) ---
// FE cũ gọi là EquipmentItem, ta sẽ dùng type này để map dữ liệu
export type EquipmentItem = {
  id: number;          // ID từ BE
  slug: string;        // Map từ ID sang string
  name: string;
  description: string; // BE trả về
  content: string;     // Map từ history + material
  
  // Các trường FE cũ cần (để tránh lỗi, ta cho optional)
  categorySlug?: string; 
  origin?: string;
  usedBy?: string;
  usedPeriod?: string;
  excerpt?: string;
  
  images: { id: number; imageUrl: string; description?: string; caption?: string }[];
};

// Giữ lại các type cũ để tránh lỗi compile tạm thời
export type Unit = { slug: string; countrySlug: string; name: string; description: string };
export type PeriodArticle = { slug: string; countrySlug: string; unitSlug: string; title: string; periodLabel: string; excerpt: string; content: string; imageCaptions: any[]; notes?: string; updatedAt: string };
export type EquipmentCategory = { slug: string; name: string; description: string };
export type PostType = "tai-lieu" | "tin-tuc";
export type Post = { type: PostType; slug: string; title: string; excerpt: string; content: string; createdAt: string; coverCaption?: string };
export type Comment = { id: string; postType: PostType; postSlug: string; name: string; text: string; createdAt: string };