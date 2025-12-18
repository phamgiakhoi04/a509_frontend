import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";
import { authApi } from "@/api/auth";
import type { User } from "@/types/models";
// Import Modal đăng nhập/đăng ký
import AuthModal from "@/components/auth/AuthModal";

// Danh sách menu
const nav = [
  { to: "/gioi-thieu", label: "GIỚI THIỆU" },
  { to: "/phuc-dung", label: "PHỤC DỰNG" },
  { to: "/quan-trang", label: "QUÂN TRANG" },
  { to: "/tai-lieu", label: "TÀI LIỆU" },
  { to: "/tin-tuc", label: "TIN TỨC" },
  { to: "/lien-he", label: "LIÊN HỆ" },
];

export default function Header() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false); // State bật/tắt Modal
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State bật/tắt menu Mobile

  // Kiểm tra trạng thái đăng nhập khi load trang
  useEffect(() => {
    const user = authApi.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
  };

  return (
    <>
      {/* --- HEADER CHÍNH --- */}
      <header className="sticky top-0 z-40 bg-brand-redDark shadow-pop text-white border-b-4 border-brand-yellow">
        <div className="container-page py-3">
          <div className="flex items-center justify-between">
            
            {/* 1. LOGO TRÒN (Về trang chủ) */}
            <Link to="/" className="group relative z-50">
              <div className="h-16 w-16 bg-brand-bg rounded-full border-4 border-brand-yellow flex items-center justify-center overflow-hidden shadow-lg group-hover:rotate-12 transition-transform hover:scale-110">
                 {/* Lưu ý: Kiểm tra đúng tên file ảnh trong public/images/ */}
                 <img src="/images/A509-vuong-org.png" className="w-12 h-12 object-cover" alt="Logo" />
              </div>
            </Link>

            {/* 2. MENU DESKTOP */}
            <nav className="hidden md:flex items-center gap-1 bg-brand-red/50 p-1.5 rounded-full border border-white/20">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "px-4 py-1.5 rounded-full font-display font-bold text-sm transition-all whitespace-nowrap",
                      isActive 
                        ? "bg-brand-yellow text-brand-redDark shadow-md scale-105" 
                        : "text-white hover:bg-white/20 hover:text-brand-yellow",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* 3. KHU VỰC TÀI KHOẢN (LOGIN/USER INFO) */}
            <div className="hidden md:block">
              {currentUser ? (
                // --- TRƯỜNG HỢP: ĐÃ ĐĂNG NHẬP ---
                <div className="flex items-center gap-3 bg-brand-red/30 px-3 py-1 rounded-full border border-white/10">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-brand-yellow uppercase leading-tight">Xin chào</div>
                    <div className="font-display font-bold text-sm leading-tight max-w-[100px] truncate">
                      {currentUser.fullName || currentUser.username}
                    </div>
                  </div>
                  
                  {/* Avatar User */}
                  <div className="h-9 w-9 rounded-full border-2 border-brand-yellow bg-white overflow-hidden">
                    {currentUser.avatarUrl ? (
                      <img src={currentUser.avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-redDark font-black text-xs">
                        {(currentUser.username[0] || "U").toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Nút thoát */}
                  <button 
                    onClick={handleLogout} 
                    className="ml-1 text-xs font-bold text-white/70 hover:text-brand-yellow underline decoration-dotted"
                  >
                    Thoát
                  </button>
                </div>
              ) : (
                // --- TRƯỜNG HỢP: CHƯA ĐĂNG NHẬP ---
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-brand-yellow text-brand-redDark hover:bg-white border-2 border-brand-redDark font-black shadow-md px-6"
                >
                  TÀI KHOẢN
                </Button>
              )}
            </div>

            {/* 4. NÚT MENU MOBILE (Hamburger) */}
            <button 
              className="md:hidden text-brand-yellow text-3xl leading-none pb-1" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
        
        {/* --- MENU MOBILE DROPDOWN --- */}
        {isMenuOpen && (
            <div className="md:hidden bg-brand-redDark border-t border-brand-yellow p-4 space-y-2 animate-fade-in">
                {nav.map(item => (
                    <Link 
                      key={item.to} 
                      to={item.to} 
                      className="block font-display font-bold text-white py-3 border-b border-white/10 hover:text-brand-yellow"
                      onClick={() => setIsMenuOpen(false)} // Đóng menu khi click
                    >
                      {item.label}
                    </Link>
                ))}
                
                {/* Nút đăng nhập/Info trên mobile */}
                <div className="pt-4">
                  {currentUser ? (
                    <div className="flex items-center justify-between text-white">
                      <span className="font-bold">👤 {currentUser.fullName || currentUser.username}</span>
                      <button onClick={handleLogout} className="text-brand-yellow underline">Đăng xuất</button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => setShowAuthModal(true)}
                      className="bg-brand-yellow text-brand-redDark hover:bg-white border-2 border-brand-redDark font-black shadow-md px-6"
                    >
                      ĐĂNG NHẬP
                    </Button>
                  )}
                </div>
            </div>
        )}
      </header>

      {/* --- MODAL AUTHENTICATION (Popup) --- */}
      {/* Chỉ hiển thị khi showAuthModal = true */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      )}
    </>
  );
}