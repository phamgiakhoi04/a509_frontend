# A509 - Website Lịch sử (React)

## Chạy project
```bash
npm install
npm run dev
```

## Dữ liệu local để test
Sửa file:
- `src/mocks/data.ts`

## Khi có backend thật
1) Tạo `.env` dựa trên `.env.example` và set:
```
VITE_API_BASE_URL="https://api.example.com"
```
2) Trong `src/config.ts` đổi:
```ts
export const USE_LOCAL_DATA = false;
```
