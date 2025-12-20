import { useState } from "react";
import Button from "@/components/ui/Button";
import { authApi } from "@/api/auth";
import { AlertTriangle } from "lucide-react";

interface Props {
  onSuccess: (user: any) => void;
  onClose: () => void;
  onSwitchRegister: () => void;
  onSwitchForgot: () => void;
}

export default function Login({ onSuccess, onClose, onSwitchRegister, onSwitchForgot }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // 1. Reset lỗi cũ
    setError("");

    // 2. Validate client
    if (!username || !password) {
      setError("Vui lòng điền đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      // 3. Gọi API (Thêm .trim() để tự động xóa dấu cách thừa khi copy-paste)
      const data = await authApi.login(username.trim(), password);
      
      // 4. Nếu thành công
      authApi.saveToken(data.token, data.userInfo);
      onSuccess(data.userInfo);
      onClose();
      
    } catch (err: any) {
      // 5. XỬ LÝ LỖI MỚI (Dùng .includes để bắt dính mọi biến thể lỗi)
      const data = err.response?.data;
      
      // Chuyển lỗi về dạng chuỗi để kiểm tra
      const errorString = typeof data === 'string' 
          ? data 
          : (data?.message || JSON.stringify(data));

      // Kiểm tra: Nếu lỗi có chứa từ "Bad credentials" hoặc status 401
      if (
        err.response?.status === 401 || 
        (errorString && errorString.includes("Bad credentials"))
      ) {
        setError("Sai tên đăng nhập hoặc mật khẩu");
      } else {
        // Các lỗi khác thì hiển thị như cũ
        setError(typeof data === 'string' ? data : "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-display font-black text-brand-redDark uppercase tracking-wide">Đăng Nhập</h2>
        <p className="text-brand-text/70 text-sm font-bold mt-1">Chào mừng bạn quay lại với A509</p>
      </div>

      {/* KHỐI HIỂN THỊ LỖI */}
      {error && (
        <div className="bg-red-50 border-l-4 border-brand-red p-3 flex items-start gap-3 rounded-r-lg animate-pulse">
          <AlertTriangle className="text-brand-red shrink-0" size={20} />
          <span className="text-sm font-bold text-brand-redDark">{error}</span>
        </div>
      )}

      <div className="space-y-3">
        <input 
          className={`input-style ${error ? "border-brand-red bg-red-50" : ""}`}
          placeholder="Tên đăng nhập" 
          value={username} 
          onChange={e => {
            setUsername(e.target.value);
            setError(""); // Xóa lỗi khi nhập lại
          }} 
          onKeyDown={e => e.key === 'Enter' && handleLogin()} 
        />
        <input 
          className={`input-style ${error ? "border-brand-red bg-red-50" : ""}`}
          type="password" 
          placeholder="Mật khẩu" 
          value={password} 
          onChange={e => {
            setPassword(e.target.value);
            setError("");
          }} 
          onKeyDown={e => e.key === 'Enter' && handleLogin()} 
        />
        
        <div className="flex justify-end">
          <button onClick={onSwitchForgot} className="text-xs font-bold text-brand-red hover:underline transition-all">
            Quên mật khẩu?
          </button>
        </div>
      </div>
      
      <Button 
        className="w-full py-3 text-lg bg-brand-redDark text-white hover:bg-brand-red border-none shadow-pop hover:shadow-pop-hover active:scale-95 transition-all" 
        onClick={handleLogin} 
        disabled={loading}
      >
        {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
      </Button>

      <div className="text-center text-sm font-bold text-brand-text/80">
        Bạn chưa có tài khoản? <button onClick={onSwitchRegister} className="text-brand-redDark underline hover:text-brand-yellow ml-1">Đăng ký ngay</button>
      </div>
    </div>
  );
}