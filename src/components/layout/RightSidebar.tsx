import { Link } from "react-router-dom";
import { formatDateTime } from "@/utils/format";

type Props = {
  recent: {
    kind: "bai-viet";
    title: string;
    to: string;
    date: string;
  }[];
};

export default function RightSidebar({ recent }: Props) {
  return (
    <aside className="space-y-3">
      {/* ================================
          SEARCH
          NOTE:
          Thanh tìm kiếm phía trên sidebar.
      ================================= */}
      <form className="flex h-7">
        <input
          type="text"
          placeholder="Tra cứu..."
          className="min-w-0 flex-1 border border-[#ccc] bg-white px-2 text-xs italic outline-none placeholder:text-[#aaa] focus:border-[#a92323]"
        />

        <button
          type="button"
          className="w-8 bg-[#1976c5] text-sm font-bold text-white hover:bg-[#155fa0]"
          aria-label="Tìm kiếm"
        >
          &gt;
        </button>
      </form>

      {/* ================================
          LOGIN
          NOTE:
          Giao diện giống box "ĐĂNG NHẬP"
          trong ảnh mẫu.
          
          Chưa nối logic login ở đây.
      ================================= */}
      <section className="bg-[#f3f3f3] p-2.5">
        <h3 className="mb-2 text-base font-normal uppercase text-[#333]">
          Đăng nhập
        </h3>

        <input
          type="text"
          className="mb-2 h-7 w-full border border-[#ccc] bg-white px-2 text-sm outline-none"
          aria-label="Tên đăng nhập"
        />

        <input
          type="password"
          className="h-7 w-full border border-[#ccc] bg-white px-2 text-sm outline-none"
          aria-label="Mật khẩu"
        />

        <div className="mt-1 text-right text-xs">
          <Link
            to="/register"
            className="text-[#c62828] hover:underline"
          >
            đăng ký
          </Link>
        </div>
      </section>

      {/* ================================
          RECENT POSTS
          NOTE:
          Danh sách bài viết mới.
      ================================= */}
      <section className="bg-[#f3f3f3] p-2.5">
        <h3 className="mb-2 text-base font-normal uppercase text-[#333]">
          Bài viết mới
        </h3>

        <ul className="space-y-2">
          {recent.slice(0, 6).map((item) => (
            <li
              key={item.to}
              className="relative pl-4 text-sm leading-tight text-[#333]"
            >
              {/* NOTE: dấu bullet */}
              <span className="absolute left-0 top-0">•</span>

              <Link
                to={item.to}
                className="hover:text-[#a92323] hover:underline"
              >
                {item.title}
              </Link>

              <div className="mt-0.5 text-[11px] text-[#999]">
                {formatDateTime(item.date)}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ================================
          NOTE:
          Phần "CẬP NHẬT" sẽ làm sau khi
          bạn gửi cấu trúc dữ liệu tương ứng.
      ================================= */}
    </aside>
  );
}