import { useState } from "react";
import Button from "@/components/ui/Button";
import { authApi } from "@/api/authApi";
import type { User } from "@/types/models";
import { X, Camera, User as UserIcon, Phone, Mail, Shield, Save, AlertCircle, CheckCircle2 } from "lucide-react";

interface Props {
  user: User;
  onClose: () => void;
  onUpdateSuccess: (updatedUser: User) => void;
}

export default function Profile({ user, onClose, onUpdateSuccess }: Props) {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [phone, setPhone] = useState(user.phoneNumber || "");
  const [email, setEmail] = useState(user.email || "");
  
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 30 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File quá lớn! Giới hạn là 50MB.");
      e.target.value = "";
      return;
    }

    setAvatarPreview(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleSave = async () => {
    console.log("--> Bắt đầu lưu profile...");
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const updatedData = await authApi.updateProfile({
        fullName,
        phoneNumber: phone,
        email,
        avatarFile: selectedFile,
      });

      console.log("--> API Phản hồi thành công:", updatedData);

      const currentUser = authApi.getCurrentUser();
      if (currentUser) {
        const newUserState = { ...currentUser, ...updatedData };
        authApi.saveToken(localStorage.getItem("ACCESS_TOKEN") || "", newUserState);
        onUpdateSuccess(newUserState);
      }

      setSuccessMsg("Đã lưu thành công!");
      
      setTimeout(() => {
        console.log("--> Đóng modal");
        onClose();
      }, 1500);

    } catch (err: any) {
      console.error("--> LỖI KHI LƯU:", err);
      
      const msg = err.response?.data?.message || err.response?.data;
      const displayMsg = typeof msg === "string" ? msg : "Không thể kết nối Server (Lỗi Mạng/CORS).";
      
      setError(displayMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-redDark/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-brand-yellow animate-fade-in flex flex-col md:flex-row max-h-[90vh]">
        
        <div className="bg-gray-50 md:w-2/5 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 shrink-0 relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-brand-redDark"></div>
           
           <div className="relative group mb-6">
            <div className="w-36 h-36 rounded-full border-4 border-brand-yellow bg-white overflow-hidden shadow-lg">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-bg text-brand-redDark font-black text-5xl">
                  {(user.username?.[0] || "U").toUpperCase()}
                </div>
              )}
            </div>
            
            <label className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="text-white mb-1" size={32} />
              <span className="text-[10px] text-white font-bold uppercase">Đổi ảnh</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          
          <h3 className="font-display font-black text-xl text-brand-redDark uppercase text-center break-words w-full px-2">
            {fullName || user.username}
          </h3>
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-white">
          
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
            <h2 className="text-lg font-display font-black text-brand-redDark uppercase flex items-center gap-2">
              <UserIcon size={20} className="text-brand-yellow" /> Cập nhật thông tin
            </h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-brand-red hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="px-6 pt-4">
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-brand-red text-brand-redDark text-sm font-bold rounded-r flex items-center gap-2">
                <AlertCircle size={20} className="shrink-0" /> {error}
              </div>
            )}
            {successMsg && (
              <div className="p-3 bg-green-50 border-l-4 border-green-500 text-green-800 text-sm font-bold rounded-r flex items-center gap-2">
                <CheckCircle2 size={20} className="shrink-0" /> {successMsg}
              </div>
            )}
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar space-y-5 flex-1">
            <div className="space-y-4">
              <div className="group">
                <label className="text-xs font-black text-gray-400 uppercase ml-1 mb-1.5 flex items-center gap-1">
                  <Shield size={12} /> Tên đăng nhập
                </label>
                <div className="w-full px-4 py-3 bg-gray-100 rounded-xl font-bold text-gray-500 cursor-not-allowed flex items-center gap-2">
                   <span>{user.username}</span>
                </div>
              </div>

              <div className="group">
                <label className="text-xs font-black text-brand-redDark uppercase ml-1 mb-1.5">Họ và tên</label>
                <input 
                  value={fullName} onChange={e => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-bg/30 border-2 border-transparent rounded-xl font-bold text-brand-text focus:bg-white focus:border-brand-yellow outline-none transition-all placeholder:text-gray-400"
                  placeholder="Nhập họ tên"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-brand-redDark uppercase ml-1 mb-1.5 flex items-center gap-1">
                    <Mail size={12} /> Email
                  </label>
                  <input 
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-bg/30 border-2 border-transparent rounded-xl font-bold text-brand-text focus:bg-white focus:border-brand-yellow outline-none transition-all"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-brand-redDark uppercase ml-1 mb-1.5 flex items-center gap-1">
                    <Phone size={12} /> Số điện thoại
                  </label>
                  <input 
                    value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-bg/30 border-2 border-transparent rounded-xl font-bold text-brand-text focus:bg-white focus:border-brand-yellow outline-none transition-all"
                    placeholder="SĐT"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-gray-100 bg-gray-50 shrink-0">
            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="w-full py-3.5 bg-brand-redDark text-white font-black text-lg shadow-pop hover:shadow-pop-hover active:scale-95 transition-all flex items-center justify-center gap-2 rounded-xl"
            >
              {loading ? "ĐANG LƯU..." : <><Save size={20} /> LƯU THAY ĐỔI</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}