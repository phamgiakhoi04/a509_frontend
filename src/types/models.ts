import { ReactNode } from "react";

export type NavItem = { to: string; label: string };

export type User = {
  roles: any[]; 
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

export type Country = {
  name: ReactNode;
  id: number;
  countryName: string;
  continent?: string;
  flagImageUrl?: string;
  description?: string;
  slug?: string; 
};

export type EquipmentItem = {
  id: number;
  slug?: string; 
  name: string;
  description?: string;
  history?: string;
  material?: string; 
  country: Country; 
  createdAt?: string;
  updatedAt?: string;

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

export interface Uniform {
  id: number;
  name: string;
  description?: string;
  history?: string;
  material?: string;
  countryId: number;
  country?: { id: number; countryName: string };
  images?: Array<{ id: number; imageUrl: string; description?: string }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CountryOption {
  id: number;
  countryName: string;
}