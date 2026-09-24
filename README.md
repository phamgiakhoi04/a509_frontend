# A509 - Website Lịch sử (React)

## Chạy project
```bash
npm install
npm run dev
```

## Kết nối backend

Frontend gọi các endpoint `/api/...`. Khi chạy local, Vite proxy các request
đến `http://localhost:8080`. Nếu triển khai khác máy, tạo `.env` với URL host
của backend (có thể dùng một trong hai tên biến dưới đây):

```
VITE_API_URL="https://api.example.com"
# hoặc: VITE_API_BASE_URL="https://api.example.com/api"
```

Không đặt cả hai biến khác nhau; `VITE_API_URL` được ưu tiên.
