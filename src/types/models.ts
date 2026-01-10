import { ReactNode } from "react";

export type NavItem = { 
  to: string; 
  label: string; 
};

export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  roleName: string;
  roles: any[];
};

export type AuthResponse = {
  token: string;
  userInfo: User;
};

export type Country = {
  id: number;
  name: string;
  slug: string;
  countryName: string;
  continent?: string;
  flagImageUrl?: string;
  description?: string;
};

export type EquipmentItem = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  excerpt?: string;
  history?: string;
  material?: string;
  categorySlug: string;
  origin?: string;
  usedBy?: string;
  usedPeriod?: string;
  country: Country | null;
  images: {
    id: number;
    imageUrl: string;
    caption?: string;
    description?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
};

export type Uniform = {
  id: number;
  name: string;
  description?: string;
  history?: string;
  material?: string;
  countryId?: number;
  country?: {
    id: number;
    countryName: string;
  };
  images?: {
    id: number;
    imageUrl: string;
    description?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
};

export type CountryOption = {
  id: number;
  countryName: string;
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
  periodLabel: string;
  excerpt: string;
  content: string;
  imageCaptions: any[];
  notes?: string;
  updatedAt: string;
};

export type EquipmentCategory = { 
  slug: string; 
  name: string; 
  description: string; 
};

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
  id: number;
  content: string;
  uniformId: number;
  userId: number;
  username: string;
  userAvatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};