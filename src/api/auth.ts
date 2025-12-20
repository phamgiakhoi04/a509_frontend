import client from "./client";
import type { AuthResponse, User } from "@/types/models";

// Định nghĩa kiểu dữ liệu cho form đăng ký
export type RegisterRequest = {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phoneNumber: string;
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

  // 3. Quên mật khẩu (Gửi email yêu cầu)
  forgotPassword: async (email: string) => {
    // Backend dùng @RequestParam nên gửi qua params
    const res = await client.post("/auth/forgot-password", { email });
    return res.data;
  },

  // 4. Đặt lại mật khẩu (Gửi token + pass mới)
  resetPassword: async (token: string, newPassword: string) => {
    const res = await client.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return res.data;
  },

  // --- Các hàm tiện ích ---
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