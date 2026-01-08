import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authApi } from "@/api/authApi";
import type { User } from "@/types/models";
import AuthModal from "@/components/auth/AuthModal";
import Profile from "@/components/auth/Profile";
import { LogOut, User as UserIcon, ChevronDown, Settings, Shield } from "lucide-react";

const navLinks = [
  { to: "/gioi-thieu", label: "GIỚI THIỆU" },
  { to: "/phuc-dung", label: "PHỤC DỰNG" },
  { to: "/quan-trang", label: "QUÂN TRANG" },
  { to: "/tai-lieu", label: "TÀI LIỆU" },
  { to: "/tin-tuc", label: "TIN TỨC" },
  { to: "/lien-he", label: "LIÊN HỆ" },
];

const getAvatarWithCache = (url: string | undefined | null) => {
  if (!url) return undefined;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${Date.now()}`;
};

export default function Header() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const checkIsAdmin = (user: User | null) => {
    if (!user) return false;
    const hasAdminInRoles = user.roles?.some((r: any) => 
      r.name === "ADMIN" || r.name === "ROLE_ADMIN"
    );
    const hasAdminRoleName = user.roleName === "ADMIN" || user.roleName === "ROLE_ADMIN";
    return hasAdminInRoles || hasAdminRoleName;
  };

  const [isAdmin, setIsAdmin] = useState(checkIsAdmin(null));

  useEffect(() => {
    const loadUser = () => {
      const user = authApi.getCurrentUser();
      if (user) {
        setCurrentUser({
          ...user,
          avatarUrl: getAvatarWithCache(user.avatarUrl),
        });
        setIsAdmin(checkIsAdmin(user));
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
    };

    loadUser();

    // Optional: nếu authApi có event listener cho login/logout thì subscribe ở đây
    // Ví dụ: authApi.onAuthChange(loadUser); (nếu có)

    return () => {
      // cleanup nếu dùng listener
    };
  }, []);

  useEffect(() => {
    // Đảm bảo khi currentUser thay đổi thì isAdmin cũng cập nhật lại
    setIsAdmin(checkIsAdmin(currentUser));
  }, [currentUser]);

  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const navItemClass =
    "font-display font-bold text-sm text-white hover:text-brand-yellow transition-colors uppercase tracking-wide px-2 py-1 relative";

  const activeNavItemClass =
    "text-brand-yellow border-b-2 border-brand-yellow pb-1";

  return (
    <>
      <header className="sticky top-0 z-40 bg-brand-redDark shadow-pop border-b-4 border-brand-yellow">
        <div className="container-page py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="group relative z-50">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-brand-bg rounded-full border-4 border-brand-yellow overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                <img
                  src="/images/A509-vuong-org.png"
                  alt="Logo A509"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-4 bg-brand-red/30 px-8 py-2.5 rounded-full border border-white/10 backdrop-blur-sm relative z-40">
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

              <div className="w-[1px] h-5 bg-white/30 mx-1"></div>

              {currentUser ? (
                <div className="relative group">
                  <button className="flex items-center gap-3 pl-1 py-1 rounded-full hover:bg-white/10 transition-colors">
                    <div className="h-8 w-8 rounded-full border border-brand-yellow bg-white overflow-hidden shadow-sm shrink-0">
                      {currentUser.avatarUrl ? (
                        <img
                          src={currentUser.avatarUrl}
                          className="w-full h-full object-cover"
                          alt="Avatar"
                          onError={(e) => {
                            e.currentTarget.src = "/default-avatar.png";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-redDark bg-brand-bg">
                          <UserIcon size={16} />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[10px] text-brand-yellow font-bold opacity-80 mb-0.5">
                        XIN CHÀO
                      </span>
                      <span className="font-display font-bold text-white text-sm truncate max-w-[100px] text-left">
                        {currentUser.fullName || currentUser.username}
                      </span>
                    </div>

                    <ChevronDown
                      size={14}
                      className="text-white/50 group-hover:text-brand-yellow transition-colors"
                    />
                  </button>

                  <div className="absolute right-0 top-full pt-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                    <div className="bg-white rounded-xl shadow-2xl border-2 border-brand-yellow overflow-hidden animate-fade-in-up">
                      <div className="bg-brand-bg p-3 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase">
                          Tài khoản
                        </p>
                        <p className="text-sm font-black text-brand-redDark truncate">
                          {currentUser.username}
                        </p>
                      </div>

                      <div className="p-1">
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-brand-red/10 hover:text-brand-redDark rounded-lg transition-colors"
                          >
                            <Shield size={18} /> Quản trị
                          </Link>
                        )}
                        <button
                          onClick={() => setShowProfileModal(true)}
                          className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-brand-red/10 hover:text-brand-redDark rounded-lg transition-colors"
                        >
                          <Settings size={18} /> Hồ sơ cá nhân
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut size={18} /> Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={navItemClass}
                >
                  TÀI KHOẢN
                </button>
              )}
            </nav>

            <button
              className="md:hidden text-brand-yellow text-3xl leading-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-brand-redDark border-t border-brand-yellow/30 p-4 space-y-2 animate-fade-in shadow-inner">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block font-display font-bold text-white py-3 border-b border-white/5 hover:text-brand-yellow hover:pl-2 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 mt-2">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white px-2">
                    <div className="h-8 w-8 rounded-full bg-brand-yellow text-brand-redDark flex items-center justify-center font-bold">
                      {(currentUser.username[0] || "U").toUpperCase()}
                    </div>
                    <span className="font-bold">
                      {currentUser.fullName || currentUser.username}
                    </span>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="w-full py-2 bg-white/10 text-white font-bold rounded hover:bg-white/20 text-sm flex items-center justify-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield size={16} /> Quản trị
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setShowProfileModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-2 bg-white/10 text-white font-bold rounded hover:bg-white/20 text-sm flex items-center justify-center gap-2"
                  >
                    <Settings size={16} /> Hồ sơ cá nhân
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-brand-red text-white font-bold rounded hover:bg-red-600 text-sm flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-3 bg-brand-yellow text-brand-redDark font-black uppercase rounded shadow-md"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(user) => {
            setCurrentUser({
              ...user,
              avatarUrl: getAvatarWithCache(user.avatarUrl),
            });
            setIsAdmin(checkIsAdmin(user));
          }}
        />
      )}

      {showProfileModal && currentUser && (
        <Profile
          user={currentUser}
          onClose={() => setShowProfileModal(false)}
          onUpdateSuccess={(updated) => {
            setCurrentUser(updated);
            setIsAdmin(checkIsAdmin(updated));
          }}
        />
      )}
    </>
  );
}