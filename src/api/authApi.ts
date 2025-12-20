import client from "./client";
import type { AuthResponse, User } from "@/types/models";

export type RegisterRequest = {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phoneNumber: string;
};

export type UpdateProfileRequest = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  avatarFile?: File | null;
};

export const authApi = {
  // 1. Đăng nhập
  login: async (username: string, password: string) => {
    const res = await client.post<AuthResponse>("/auth/login", { username, password });
    return res.data;
  },

  // 2. Đăng ký
  register: async (data: RegisterRequest) => {
    const res = await client.post<User>("/auth/register", data);
    return res.data;
  },

  // 3. Quên mật khẩu
  forgotPassword: async (email: string) => {
    const res = await client.post("/auth/forgot-password", { email });
    return res.data;
  },

  // 4. Đặt lại mật khẩu
  resetPassword: async (token: string, newPassword: string) => {
    const res = await client.post("/auth/reset-password", { token, newPassword });
    return res.data;
  },

  // 5. Cập nhật Profile (Đã chuẩn hóa)
  updateProfile: async (data: UpdateProfileRequest) => {
    const formData = new FormData();
    
    // Chỉ đóng gói dữ liệu nếu có giá trị
    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
    if (data.email) formData.append("email", data.email);
    
    // Đóng gói file ảnh
    if (data.avatarFile) {
      formData.append("avatarFile", data.avatarFile);
    }

    // LƯU Ý QUAN TRỌNG: Không set Content-Type thủ công!
    // Axios sẽ tự động thêm boundary cho FormData.
    const res = await client.post<User>("/users/profile", formData); 
    return res.data;
  },

  // --- Tiện ích ---
  saveToken: (token: string, userInfo: User) => {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
  },

  getCurrentUser: (): User | null => {
    const str = localStorage.getItem("USER_INFO");
    try {
      return str ? JSON.parse(str) : null;
    } catch {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_INFO");
    window.location.reload();
  },
};