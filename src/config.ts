/**
 * Mặc định dùng dữ liệu local để bạn test UI trước.
 * Khi có backend thật: đổi thành false và set VITE_API_BASE_URL trong .env
 */
export const USE_LOCAL_DATA = true;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;
