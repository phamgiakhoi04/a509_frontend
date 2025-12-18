import { useState } from "react";
import Button from "@/components/ui/Button";
import { authApi, type RegisterRequest } from "@/api/auth";

// Định nghĩa các màn hình có thể hiển thị trong ô
type ViewState = "LOGIN" | "REGISTER" | "FORGOT" | "RESET";

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [view, setView] = useState<ViewState>("LOGIN"); // Mặc định hiện ô Đăng nhập
  const [loading, setLoading] = useState(false);

  // State lưu dữ liệu nhập vào
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // State cho Đăng ký
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // State cho Quên mật khẩu
  const [token, setToken] = useState("");
  const [newPass, setNewPass] = useState("");

  // --- XỬ LÝ LOGIC GỌI API ---

  const handleLogin = async () => {
    if (!username || !password) return alert("Vui lòng điền đủ thông tin!");
    setLoading(true);
    try {
      const data = await authApi.login(username, password);
      authApi.saveToken(data.token, data.userInfo);
      // alert("Đăng nhập thành công!"); // Bỏ alert cho đỡ phiền, vào thẳng luôn
      onLoginSuccess(data.userInfo);
      onClose();
    } catch (err: any) {
      alert(err.response?.data || "Sai tên đăng nhập hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!username || !password || !email) return alert("Vui lòng điền đủ thông tin bắt buộc (*)");
    setLoading(true);
    try {
      const payload: RegisterRequest = { username, password, email, fullName, phoneNumber: phone };
      await authApi.register(payload);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      setView("LOGIN"); // Chuyển về ô đăng nhập
    } catch (err: any) {
      alert(err.response?.data || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email) return alert("Vui lòng nhập Email");
    setLoading(true);
    try {
      const msg = await authApi.forgotPassword(email);
      alert(msg || "Vui lòng kiểm tra Console (Backend) để lấy Token reset."); 
      setView("RESET"); // Chuyển sang ô nhập Token
    } catch (err: any) {
      alert(err.response?.data || "Email không tồn tại");
    } finally {
      setLoading(false);
    }
  };

  // --- GIAO DIỆN (Cái ô giữa màn hình) ---
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Lớp nền đen mờ phía sau */}
      <div className="absolute inset-0 bg-brand-redDark/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Cái ô chính (Card) */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in border-4 border-brand-yellow">
        
        {/* Nút đóng (X) */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-brand-bg text-brand-redDark hover:bg-brand-red hover:text-white font-black transition-colors z-10"
        >
          ✕
        </button>

        <div className="p-8 pt-10">
          
          {/* --- 1. FORM ĐĂNG NHẬP --- */}
          {view === "LOGIN" && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-3xl font-display font-black text-brand-redDark uppercase tracking-wide">Đăng Nhập</h2>
                <p className="text-brand-text/70 text-sm font-bold mt-1">Chào mừng bạn quay lại với A509</p>
              </div>

              <div className="space-y-3">
                <input className="input-style" placeholder="Tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                <input className="input-style" type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                
                <div className="flex justify-end">
                  <button onClick={() => setView("FORGOT")} className="text-xs font-bold text-brand-red hover:underline">
                    Quên mật khẩu?
                  </button>
                </div>
              </div>
              
              <Button className="w-full py-3 text-lg bg-brand-redDark text-white hover:bg-brand-red border-none shadow-pop hover:shadow-pop-hover" onClick={handleLogin} disabled={loading}>
                {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
              </Button>

              <div className="text-center text-sm font-bold text-brand-text/80">
                Bạn chưa có tài khoản? <button onClick={() => setView("REGISTER")} className="text-brand-redDark underline hover:text-brand-yellow">Đăng ký ngay</button>
              </div>
            </div>
          )}

          {/* --- 2. FORM ĐĂNG KÝ --- */}
          {view === "REGISTER" && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-3xl font-display font-black text-brand-redDark uppercase">Tạo Tài Khoản</h2>
              </div>
              
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                <input className="input-style" placeholder="Tên đăng nhập *" value={username} onChange={e => setUsername(e.target.value)} />
                <input className="input-style" placeholder="Email (để lấy lại mật khẩu) *" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="input-style" type="password" placeholder="Mật khẩu *" value={password} onChange={e => setPassword(e.target.value)} />
                <input className="input-style" placeholder="Họ và tên" value={fullName} onChange={e => setFullName(e.target.value)} />
                <input className="input-style" placeholder="Số điện thoại" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>

              <Button className="w-full py-3 mt-2 bg-brand-yellow text-brand-redDark hover:bg-white border-2 border-brand-yellow font-black" onClick={handleRegister} disabled={loading}>
                {loading ? "ĐANG TẠO..." : "ĐĂNG KÝ NGAY"}
              </Button>
              
              <div className="text-center text-sm font-bold text-brand-text/80">
                Đã có tài khoản? <button onClick={() => setView("LOGIN")} className="text-brand-redDark underline hover:text-brand-yellow">Đăng nhập</button>
              </div>
            </div>
          )}

          {/* --- 3. FORM QUÊN MẬT KHẨU --- */}
          {view === "FORGOT" && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-display font-black text-brand-redDark uppercase">Quên Mật Khẩu?</h2>
                <p className="text-sm text-brand-text/70 mt-2">Nhập email bạn đã đăng ký để nhận mã đặt lại mật khẩu.</p>
              </div>
              
              <input className="input-style" placeholder="Nhập email của bạn" value={email} onChange={e => setEmail(e.target.value)} />
              
              <Button className="w-full py-3 bg-brand-redDark text-white" onClick={handleForgot} disabled={loading}>
                {loading ? "ĐANG GỬI..." : "GỬI YÊU CẦU"}
              </Button>
              
              <div className="flex justify-between text-sm font-bold mt-2">
                <button onClick={() => setView("LOGIN")} className="text-brand-text/60 hover:text-brand-red">← Quay lại</button>
                <button onClick={() => setView("RESET")} className="text-brand-yellow hover:underline">Đã có mã Token?</button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS style cho ô nhập liệu */}
      <style>{`
        .input-style {
          width: 100%;
          border-radius: 1rem;
          background-color: #f9f7f2;
          border: 2px solid transparent;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: #5D4037;
          outline: none;
          transition: all 0.2s;
        }
        .input-style:focus {
          border-color: #C0392B;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(192, 57, 43, 0.1);
        }
        .input-style::placeholder {
          color: #a89f91;
          font-weight: 600;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 4px; }
      `}</style>
    </div>
  );
}