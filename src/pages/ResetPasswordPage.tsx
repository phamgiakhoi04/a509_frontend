import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth";
import { Check, X, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Validate: Tối thiểu 6 ký tự (Backend của bạn có thể yêu cầu khác, ở đây mình để đơn giản)
  const hasMinLength = password.length >= 6;
  const isConfirmMatch = password === confirmPassword && confirmPassword !== "";
  const isPasswordValid = hasMinLength;

  useEffect(() => {
    if (!token) setError("Liên kết không hợp lệ hoặc thiếu Token.");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !isPasswordValid || !isConfirmMatch) return;

    setLoading(true);
    setError("");

    try {
      // Gọi API reset password mà chúng ta đã viết
      await authApi.resetPassword(token, password);
      
      setSuccess(true);
      // Chuyển về trang chủ sau 3 giây
      setTimeout(() => navigate("/"), 3000);
    } catch (err: any) {
      setError(err.response?.data || "Liên kết đã hết hạn hoặc token không đúng.");
    } finally {
      setLoading(false);
    }
  };

  // TRƯỜNG HỢP KHÔNG CÓ TOKEN
  if (!token) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-pop p-12 text-center max-w-md border-4 border-brand-red">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <X className="w-10 h-10 text-brand-red" />
          </div>
          <h1 className="text-2xl font-display font-black text-brand-redDark mb-4 uppercase">Liên kết lỗi</h1>
          <p className="text-brand-text mb-8">Đường dẫn này thiếu mã xác nhận (Token). Vui lòng kiểm tra lại email.</p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-brand-red text-white rounded-full font-bold hover:bg-brand-redDark transition shadow-md"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  // GIAO DIỆN CHÍNH
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Họa tiết trang trí nền */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="bg-white rounded-3xl shadow-2xl border-2 border-brand-yellow w-full max-w-lg overflow-hidden relative z-10 animate-fade-in">
        
        {/* Header Màu Đỏ A509 */}
        <div className="bg-brand-redDark text-white p-8 text-center border-b-4 border-brand-yellow">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
             <Lock className="w-8 h-8 text-brand-yellow" />
          </div>
          <h1 className="text-3xl font-display font-black uppercase tracking-wide text-brand-yellow">Đặt lại mật khẩu</h1>
          <p className="mt-2 text-white/80 text-sm font-bold">Nhập mật khẩu mới cho tài khoản của bạn</p>
        </div>

        <div className="p-8 lg:p-10">
          {success ? (
            // --- MÀN HÌNH THÀNH CÔNG ---
            <div className="text-center py-10">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce border-4 border-green-200">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-black text-green-700 mb-2 uppercase">Thành công!</h2>
              <p className="text-brand-text font-bold">Đang chuyển bạn về trang chủ để đăng nhập...</p>
            </div>
          ) : (
            // --- FORM NHẬP MẬT KHẨU ---
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="bg-red-50 border-2 border-red-100 text-brand-red px-4 py-3 rounded-xl flex items-center gap-3 font-bold text-sm">
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}

              {/* Mật khẩu mới */}
              <div className="space-y-2">
                <label className="block text-sm font-black text-brand-redDark uppercase ml-1">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-12 text-base font-bold text-brand-text border-2 border-brand-bg bg-brand-bg/30 rounded-xl focus:border-brand-red focus:bg-white outline-none transition-all placeholder:text-gray-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-red transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {/* Thanh trạng thái độ dài */}
                <div className="flex items-center gap-2 text-xs font-bold mt-2 ml-1">
                    <div className={`w-2 h-2 rounded-full ${hasMinLength ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={hasMinLength ? 'text-green-600' : 'text-gray-400'}>Tối thiểu 6 ký tự</span>
                </div>
              </div>

              {/* Xác nhận mật khẩu */}
              <div className="space-y-2">
                <label className="block text-sm font-black text-brand-redDark uppercase ml-1">
                  Xác nhận lại
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-12 text-base font-bold text-brand-text border-2 border-brand-bg bg-brand-bg/30 rounded-xl focus:border-brand-red focus:bg-white outline-none transition-all placeholder:text-gray-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-red transition"
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {confirmPassword && !isConfirmMatch && (
                  <p className="text-brand-red text-xs font-bold ml-1 mt-1 flex items-center gap-1">
                    <X size={12} /> Mật khẩu không khớp
                  </p>
                )}
              </div>

              {/* Nút submit */}
              <button
                type="submit"
                disabled={loading || !isPasswordValid || !isConfirmMatch}
                className={`w-full py-4 rounded-full font-black text-white text-lg shadow-pop transition-all transform active:scale-95 ${
                  loading || !isPasswordValid || !isConfirmMatch
                    ? "bg-gray-300 cursor-not-allowed shadow-none"
                    : "bg-brand-red hover:bg-brand-redDark hover:shadow-pop-hover"
                }`}
              >
                {loading ? "ĐANG XỬ LÝ..." : "ĐỔI MẬT KHẨU"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}