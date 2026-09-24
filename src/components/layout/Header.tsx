import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

// MENU CHÍNH

const navLinks = [
  {
    to: "/gioi-thieu",
    label: "GIỚI THIỆU",
  },

  {
    to: "/hoat-dong",
    label: "HOẠT ĐỘNG",
    hasDropdown: true,
    dropdownItems: [
      { to: "/hoat-dong/phuc-dung", label: "Phục dựng" },
      { to: "/hoat-dong/nghien-cuu", label: "Nghiên cứu" },
    ],
  },

  {
    to: "/tai-lieu",
    label: "TÀI LIỆU",
    hasDropdown: true,
    dropdownItems: [
      {
        to: "/tai-lieu/quan-trang",
        label: "Quân trang",
      },
      {
        to: "/tai-lieu/anh-tu-lieu",
        label: "Ảnh tư liệu",
      },
      {
        to: "/tai-lieu/hoi-uc-ccb",
        label: "Hồi ức CCB",
      },
      {
        to: "/tai-lieu/thu-vien",
        label: "Thư viện",
      },
      {
        to: "/tai-lieu/nghien-cuu",
        label: "Từ điển",
      },
    ],
  },

  {
    to: "/tin-tuc",
    label: "TIN TỨC",
    hasDropdown: true,
    dropdownItems: [
      {
        to: "/tin-tuc/thoi-su",
        label: "Thời sự",
      },
      {
        to: "/tin-tuc/phong-su",
        label: "Phóng sự",
      },
    ],
  },

  {
    to: "/kham-pha",
    label: "KHÁM PHÁ",
    hasDropdown: true,
    dropdownItems: [
      { to: "/kham-pha/tim-hieu", label: "Tìm hiểu" },
      { to: "/kham-pha/diy", label: "DIY" },
      { to: "/kham-pha/cac-van-de", label: "Các vấn đề" },
    ],
  },

  {
    to: "/van-hoa",
    label: "VĂN HÓA",
    hasDropdown: true,
    dropdownItems: [
      { to: "/van-hoa/trong-nuoc", label: "Trong nước" },
      { to: "/van-hoa/ngoai-nuoc", label: "Ngoài nước" },
    ],
  },

  {
    to: "/lien-he",
    label: "LIÊN HỆ",
  },
];

// =====================================================
// HEADER
// =====================================================

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* =================================================
          BANNER HEADER
          ================================================= */}

      <div className="relative aspect-[5.3/1] w-full overflow-hidden bg-[#333]">
        {/* Ảnh nền */}
        <img
          src="/images/A509 Header.JPG"
          alt="A509 Research & Reenactment Group"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-[center_43%]
          "
        />

        {/* Lớp phủ tối */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Logo */}
        <Link
          to="/"
          className="
            absolute
            left-6
            top-1/2
            z-10
            -translate-y-1/2
          "
        >
          <img
            src="/images/A509 Research & Reenactment Group.png"
            alt="A509 Research & Reenactment Group"
            className="
              h-auto
              w-[360px]
              object-contain
              transition-transform
              duration-200
              hover:scale-[1.02]
              md:w-[500px]
              lg:w-[560px]
            "
          />
        </Link>
      </div>

      {/* =================================================
          NAVIGATION
          ================================================= */}

      <nav className="border-b-[3px] border-[#c62828] bg-[#292929]">
        {/* -------------------------------------------------
            DESKTOP NAVIGATION
            ------------------------------------------------- */}
        <div className="relative hidden min-h-[48px] w-full items-stretch justify-between pl-0 pr-6 md:flex">
          {/* Menu chính */}
          {navLinks.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.to}
                className="
                  group
                  relative
                  flex-none
                "
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `
                    flex
                    h-full
                    items-center
                    justify-center
                    px-3
                    font-sans
                    text-[16px]
                    font-semibold
                    tracking-[0.01em]
                    whitespace-nowrap
                    text-white
                    transition-colors
                    hover:bg-[#444]
                    hover:text-[#f5c400]
                    ${
                      isActive
                        ? "bg-[#444] text-[#f5c400]"
                        : ""
                    }
                    `
                  }
                >
                  <span>{item.label}</span>

                </NavLink>

                {/* -------------------------------------------------
                    DROPDOWN
                    ------------------------------------------------- */}

                <div
                  className="
                    invisible
                    absolute
                    left-0
                    top-full
                    z-50
                    w-[230px]
                    pt-1
                    opacity-0
                    transition-all
                    duration-150

                    group-hover:visible
                    group-hover:opacity-100
                  "
                >
                  <div
                    className="
                      overflow-hidden
                      border
                      border-[#444]
                      bg-[#292929]
                      shadow-xl
                    "
                  >
                    {item.dropdownItems?.map((dropdownItem) => (
                      <NavLink
                        key={dropdownItem.to}
                        to={dropdownItem.to}
                        end
                        className={({ isActive }) =>
                          `
                          flex
                          items-center
                          gap-2
                          px-4
                          py-3
                          text-[14px]
                          text-white
                          transition-colors
                          hover:bg-[#444]

                          ${
                            isActive
                              ? "font-bold"
                              : ""
                          }
                          `
                        }
                      >
                        <ChevronRight
                          size={14}
                          className="shrink-0 text-white"
                        />

                        <span>{dropdownItem.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  justify-center
                  ${item.to === "/gioi-thieu" || item.to === "/lien-he" ? "min-w-[112px] px-4" : "px-3"}
                  font-sans
                  text-[16px]
                  font-semibold
                  tracking-[0.02em]
                  whitespace-nowrap
                  text-white
                  transition-colors
                  hover:bg-[#444]
                  hover:text-[#f5c400]
                  ${
                    isActive
                      ? "bg-[#444] text-[#f5c400]"
                      : ""
                  }
                  `
                }
              >
                {item.label}
              </NavLink>
            )
          )}

          {/* =================================================
              NÚT NGÔN NGỮ
              Chỉ giao diện - chưa xử lý chức năng dịch
              ================================================= */}

          <button
            type="button"
            className="
              flex
              h-[50px]
              flex-none
              items-center
              justify-center
              gap-3
              whitespace-nowrap
              border-l
              border-white/10
              px-3
              text-[16px]
              font-semibold
              tracking-[0.01em]
              text-white
              transition-all
              duration-150

              hover:bg-[#444]
              hover:text-[#f5c400]
            "
          >
            {/* Cờ Việt Nam */}
            <span
              className="
                flex
                h-[23px]
                w-[31px]
                items-center
                justify-center
                rounded-[2px]
                bg-[#e51c23]
                font-sans
                text-[15px]
                leading-none
                text-[#ffeb3b]
              "
            >
              ★
            </span>

            <span>TIẾNG VIỆT</span>

          </button>
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
            ================================================= */}

        <div className="px-3 md:hidden">
          <button
            type="button"
            className="
              flex
              h-[48px]
              w-full
              items-center
              justify-between
              text-white
            "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-sm font-bold tracking-wide">
              MENU
            </span>

            <span className="text-xl leading-none">
              {isMenuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {/* =================================================
            MOBILE MENU
            ================================================= */}

        {isMenuOpen && (
          <div
            className="
              border-t
              border-white/10
              bg-[#292929]
              px-3
              pb-3
              md:hidden
            "
          >
            {navLinks.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.to}
                  className="border-b border-white/10"
                >
                  {/* Menu chính */}
                  <Link
                    to={item.to}
                    className="
                      block
                      py-3
                      text-sm
                      font-bold
                      text-white
                      hover:text-[#f5c400]
                    "
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>

                  {/* Sub menu */}
                  <div className="pb-2 pl-4">
                    {item.dropdownItems?.map(
                      (dropdownItem) => (
                        <Link
                          key={dropdownItem.to}
                          to={dropdownItem.to}
                          className="
                            flex
                            items-center
                            gap-2
                            py-1.5
                            text-xs
                            text-white/70
                            transition-colors
                            hover:text-[#f5c400]
                          "
                          onClick={() =>
                            setIsMenuOpen(false)
                          }
                        >
                          <ChevronRight size={12} />

                          {dropdownItem.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="
                    block
                    border-b
                    border-white/10
                    py-3
                    text-sm
                    font-bold
                    text-white
                    hover:text-[#f5c400]
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* -------------------------------------------------
                NGÔN NGỮ MOBILE
                ------------------------------------------------- */}

            <button
              type="button"
              className="
                mt-3
                flex
                w-full
                items-center
                justify-center
                gap-2
                border
                border-white/10
                bg-[#333]
                py-2.5
                text-sm
                font-bold
                text-white
                transition-colors
                hover:bg-[#444]
                hover:text-[#f5c400]
              "
            >
              <span
                className="
                  flex
                  h-[21px]
                  w-[29px]
                  items-center
                  justify-center
                  rounded-[2px]
                  bg-[#e51c23]
                font-sans
                text-[14px]
                leading-none
                text-[#ffeb3b]
              "
            >
                ★
              </span>

              TIẾNG VIỆT

              <ChevronDown size={14} />
            </button>
          </div>
        )}
      </nav>

    </header>
  );
}
