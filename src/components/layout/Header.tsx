import { FormEvent, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

const nav = [
  { to: "/gioi-thieu", label: "Giới thiệu" },
  { to: "/phuc-dung", label: "Phục dựng" },
  { to: "/quan-trang", label: "Quân trang" },
  { to: "/tai-lieu", label: "Tài liệu" },
  { to: "/tin-tuc", label: "Tin tức" },
  { to: "/lien-he", label: "Liên hệ" },
];

export default function Header() {
  const [q, setQ] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/tim-kiem?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className="sticky top-0 z-20 bg-slate-50/85 backdrop-blur border-b border-slate-200">
      <div className="container-page py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft">
                Logo
              </span>
              <span className="hidden sm:inline">A509</span>
            </Link>

            <form onSubmit={onSearch} className="flex-1 md:w-[28rem]">
              <div className="flex items-center gap-2 rounded-2xl bg-white ring-1 ring-slate-200 px-3 py-2 shadow-soft">
                <span className="text-slate-400">⌕</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Thanh search"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Login / Username"
              className="w-36 rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2 text-sm outline-none"
            />
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-32 rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2 text-sm outline-none"
            />
            <Button
              type="button"
              onClick={() => alert("Login placeholder (chưa có backend).")}
              className="shrink-0"
            >
              Login
            </Button>
          </div>
        </div>

        <nav className="mt-3 flex flex-wrap items-center gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-xl px-3 py-2 text-sm transition",
                  isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
