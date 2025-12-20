import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authApi } from "@/api/auth";
import type { User } from "@/types/models";
import AuthModal from "@/components/auth/AuthModal";
import { LogOut, User as UserIcon } from "lucide-react"; // Thêm icon cho đẹp

// Danh sách menu chính
const navLinks = [
  { to: "/gioi-thieu", label: "GIỚI THIỆU" },
  { to: "/phuc-dung", label: "PHỤC DỰNG" },
  { to: "/quan-trang", label: "QUÂN TRANG" },
  { to: "/tai-lieu", label: "TÀI LIỆU" },
  { to: "/tin-tuc", label: "TIN TỨC" },
  { to: "/lien-he", label: "LIÊN HỆ" },
];

export default function Header() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Kiểm tra đăng nhập
  useEffect(() => {
    const user = authApi.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
  };

  // Style chung cho các mục menu (để đồng bộ TÀI KHOẢN với các mục khác)
  const navItemClass = "font-display font-bold text-sm text-white hover:text-brand-yellow transition-colors uppercase tracking-wide px-2 py-1";
  const activeNavItemClass = "text-brand-yellow scale-105";

  return (
    <>
      <header className="sticky top-0 z-40 bg-brand-redDark shadow-pop border-b-4 border-brand-yellow">
        <div className="container-page py-3">
          <div className="flex items-center justify-between">
            
            {/* 1. LOGO */}
            <Link to="/" className="group relative z-50">
              <div className="h-14 w-14 md:h-16 md:w-16 bg-brand-bg rounded-full border-4 border-brand-yellow flex items-center justify-center overflow-hidden shadow-lg group-hover:rotate-12 transition-transform hover:scale-110">
                 <img src="/images/A509-vuong-org.png" className="w-10 h-10 md:w-12 md:h-12 object-cover" alt="Logo" />
              </div>
            </Link>

            {/* 2. MENU DESKTOP (Gộp chung Navigation & Tài khoản) */}
            <nav className="hidden md:flex items-center gap-4 bg-brand-red/30 px-8 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
              
              {/* Render các Link chính */}
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => 
                    `${navItemClass} ${isActive ? activeNavItemClass : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Vạch ngăn cách */}
              <div className="w-[1px] h-5 bg-white/30 mx-1"></div>

              {/* Phần TÀI KHOẢN (Đã sửa lại cho cân đối) */}
              {currentUser ? (
                // --- ĐÃ ĐĂNG NHẬP (Giao diện mới cân đối hơn) ---
                <div className="flex items-center gap-3 pl-1">
                  {/* Avatar */}
                  <div className="h-8 w-8 rounded-full border border-brand-yellow bg-white overflow-hidden shadow-sm shrink-0">
                    {currentUser.avatarUrl ? (
                      <img src={currentUser.avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-redDark bg-brand-bg">
                        <UserIcon size={16} />
                      </div>
                    )}
                  </div>

                  {/* Tên & Xin chào (Căn giữa vertical) */}
                  <div className="flex flex-col justify-center leading-none">
                    <span className="text-[10px] text-brand-yellow font-bold opacity-80 mb-0.5">XIN CHÀO</span>
                    <span className="font-display font-bold text-white text-sm truncate max-w-[120px]">
                      {currentUser.fullName || currentUser.username}
                    </span>
                  </div>

                  {/* Nút Logout (Icon nhỏ gọn) */}
                  <button 
                    onClick={handleLogout} 
                    className="ml-2 text-white/50 hover:text-brand-yellow transition-colors"
                    title="Đăng xuất"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                // --- CHƯA ĐĂNG NHẬP (Giống hệt menu link) ---
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className={navItemClass}
                >
                  TÀI KHOẢN
                </button>
              )}
            </nav>

            {/* 3. MOBILE MENU BUTTON */}
            <button 
              className="md:hidden text-brand-yellow text-3xl leading-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-redDark border-t border-brand-yellow/30 p-4 space-y-2 animate-fade-in shadow-inner">
             {navLinks.map(item => (
                <Link 
                  key={item.to} 
                  to={item.to} 
                  className="block font-display font-bold text-white py-3 border-b border-white/5 hover:text-brand-yellow hover:pl-2 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
             ))}
             
             {/* Mobile Auth */}
             <div className="pt-4 mt-2">
                {currentUser ? (
                  <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                       <div className="h-8 w-8 rounded-full bg-brand-yellow flex items-center justify-center text-brand-redDark font-bold">
                          {(currentUser.username[0] || "U").toUpperCase()}
                       </div>
                       <span className="font-bold text-white text-sm">{currentUser.fullName || currentUser.username}</span>
                    </div>
                    <button onClick={handleLogout} className="text-xs font-bold text-brand-yellow border border-brand-yellow px-3 py-1.5 rounded hover:bg-brand-yellow hover:text-brand-redDark transition">
                      ĐĂNG XUẤT
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }}
                    className="w-full py-3 bg-brand-yellow text-brand-redDark font-black uppercase rounded shadow-md"
                  >
                    Đăng nhập / Đăng ký
                  </button>
                )}
             </div>
          </div>
        )}
      </header>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      )}
    </>
  );
}