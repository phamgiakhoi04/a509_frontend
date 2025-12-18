import type {
  Country,
  Unit,
  PeriodArticle,
  EquipmentCategory,
  EquipmentItem,
  Post,
} from "@/types/models";

export const countries: Country[] = [
  {
    slug: "viet-nam",
    name: "Việt Nam",
    description: "Các ấn phẩm, nghiên cứu và tái hiện liên quan tới lịch sử Việt Nam.",
  },
  {
    slug: "nuoc-ngoai",
    name: "Nước ngoài",
    description: "Các chủ đề tái hiện thuộc những quốc gia/khu vực khác.",
  },
];

export const units: Unit[] = [
  {
    slug: "qdndvn",
    countrySlug: "viet-nam",
    name: "Quân đội nhân dân Việt Nam",
    description: "Tổng hợp trang phục, quân trang, tư liệu và bối cảnh theo từng giai đoạn.",
  },
  {
    slug: "dan-quan",
    countrySlug: "viet-nam",
    name: "Dân quân / Du kích",
    description: "Ấn phẩm về lực lượng địa phương và trang bị thường gặp (placeholder).",
  },
];

export const periodArticles: PeriodArticle[] = [
  {
    slug: "thoi-ky-x",
    countrySlug: "viet-nam",
    unitSlug: "qdndvn",
    title: "Trang phục QĐNDVN trong thời kỳ X",
    periodLabel: "Thời kỳ X",
    excerpt: "Tổng quan về kiểu dáng, chất liệu và các biến thể thường gặp (placeholder).",
    updatedAt: "2025-02-02T10:30:00Z",
    content:
      "Nội dung demo để bạn dựng UI.\n\n- Viết mô tả bối cảnh lịch sử\n- Liệt kê đặc điểm trang phục\n- Nêu nguồn tham khảo (sách, ảnh, hồi ký, bảo tàng)\n\nSau này bạn có thể thay bằng markdown hoặc dữ liệu từ backend.",
    imageCaptions: [
      { id: "img-1", caption: "Chú thích ảnh 01 (placeholder)" },
      { id: "img-2", caption: "Chú thích ảnh 02 (placeholder)" },
      { id: "img-3", caption: "Chú thích ảnh 03 (placeholder)" },
    ],
    notes: "Tiếp tục các ảnh minh hoạ hoặc nội dung (placeholder).",
  },
  {
    slug: "giai-doan-1954-1968",
    countrySlug: "viet-nam",
    unitSlug: "qdndvn",
    title: "Quân đội nhân dân Việt Nam — giai đoạn 1954–1968",
    periodLabel: "1954–1968",
    excerpt: "Tóm tắt các điểm nhận diện (placeholder).",
    updatedAt: "2025-01-10T08:00:00Z",
    content:
      "Nội dung demo.\n\nGợi ý: chia mục theo\n1) Đơn vị\n2) Chiến trường\n3) Năm\n4) Biến thể trang phục.",
    imageCaptions: [{ id: "img-4", caption: "Ảnh minh hoạ lớn (placeholder)" }],
  },
];

export const equipmentCategories: EquipmentCategory[] = [
  { slug: "mu-non", name: "Mũ nón", description: "Mũ, nón, khăn, mũ sắt…" },
  { slug: "quan-ao", name: "Quần áo", description: "Áo, quần, áo khoác, áo mưa…" },
  { slug: "trang-bi", name: "Trang bị", description: "Dây đai, túi đạn, bi đông…" },
  { slug: "giay", name: "Giày", description: "Giày, dép, ủng…" },
  { slug: "balo", name: "Balo", description: "Ba lô, túi xách, bao tải…" },
  { slug: "vu-khi", name: "Vũ khí", description: "Súng, dao, lựu đạn (mô tả, không hướng dẫn sử dụng)." },
];

export const equipmentItems: EquipmentItem[] = [
  {
    slug: "bi-dong-co-ban",
    categorySlug: "trang-bi",
    name: "Bi đông cơ bản",
    origin: "X (placeholder)",
    usedBy: "X (placeholder)",
    usedPeriod: "X (placeholder)",
    excerpt: "Mô tả ngắn về bi đông (placeholder).",
    content:
      "Thông tin chi tiết (placeholder).\n\nGợi ý: thêm\n- kích thước\n- chất liệu\n- biến thể\n- cách phân biệt hàng thật/đúng chuẩn (nếu cần).",
    images: [
      { id: "eimg-1", caption: "Chú thích 1 (placeholder)" },
      { id: "eimg-2", caption: "Chú thích 2 (placeholder)" },
      { id: "eimg-3", caption: "Chú thích 3 (placeholder)" },
      { id: "eimg-4", caption: "Chú thích 4 (placeholder)" },
    ],
  },
  {
    slug: "mu-cotton",
    categorySlug: "mu-non",
    name: "Mũ vải cotton",
    origin: "X (placeholder)",
    usedBy: "X (placeholder)",
    usedPeriod: "X (placeholder)",
    excerpt: "Một loại mũ thông dụng (placeholder).",
    content: "Thông tin chi tiết (placeholder).",
    images: [{ id: "eimg-5", caption: "Chú thích (placeholder)" }],
  },
];

export const posts: Post[] = [
  {
    type: "tai-lieu",
    slug: "tai-lieu-001",
    title: "Tài liệu số 001 (placeholder)",
    excerpt: "Tóm tắt ngắn cho danh sách tài liệu.",
    createdAt: "2025-02-20T09:10:00Z",
    coverCaption: "Chú thích ảnh (placeholder)",
    content:
      "Nội dung tài liệu (placeholder).\n\nBạn có thể đưa PDF link, ảnh scan, trích đoạn, ghi chú nguồn…",
  },
  {
    type: "tin-tuc",
    slug: "tin-tuc-001",
    title: "Tin tức số 001 (placeholder)",
    excerpt: "Tóm tắt ngắn cho danh sách tin tức.",
    createdAt: "2025-03-01T12:00:00Z",
    coverCaption: "Chú thích ảnh (placeholder)",
    content:
      "Nội dung tin tức (placeholder).\n\nBạn có thể thêm hoạt động nhóm, sự kiện, cập nhật dự án.",
  },
];
