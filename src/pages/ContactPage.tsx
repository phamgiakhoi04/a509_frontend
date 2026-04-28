import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="font-body text-brand-text bg-brand-bg min-h-screen">
      <section
        className="relative min-h-[40vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/A509 Header.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="container-page relative z-10 text-center text-white">
          <h1 className="font-display font-black text-5xl md:text-6xl text-brand-yellow drop-shadow-2xl">
            LIÊN HỆ
          </h1>
          <p className="mt-4 text-xl font-bold opacity-90">
            Kết nối với chúng tôi - Chia sẻ đam mê lịch sử quân trang
          </p>
        </div>
      </section>

      <section className="py-16 container-page">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display font-black text-3xl md:text-4xl text-brand-redDark mb-6">
                Thông tin liên hệ
              </h2>
              <p className="text-lg text-brand-text/80">
                Hãy liên hệ với chúng tôi nếu bạn có câu hỏi, đóng góp ý kiến hoặc muốn đóng góp vào dự án bảo tồn lịch sử quân trang Việt Nam.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-pop border-4 border-brand-yellow/20">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-brand-red" size={24} />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-brand-redDark">Email</h3>
                  <a 
                    href="mailto:a509vietnam@gmail.com" 
                    className="text-brand-text/80 hover:text-brand-red transition-colors"
                  >
                    a509vietnam@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-pop border-4 border-brand-yellow/20">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="text-brand-red" size={24} />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-brand-redDark">Mạng xã hội</h3>
                  <p className="text-brand-text/80">
                    Theo dõi chúng tôi trên các nền tảng mạng xã hội để cập nhật tin tức mới nhất
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-pop border-4 border-brand-yellow/20">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-brand-red" size={24} />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-brand-redDark">Địa chỉ</h3>
                  <p className="text-brand-text/80">
                    Việt Nam
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-pop border-4 border-brand-yellow/20">
            <h2 className="font-display font-black text-2xl text-brand-redDark mb-6">
              Gửi tin nhắn cho chúng tôi
            </h2>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl font-bold">
                ✅ Cảm ơn bạn! Tin nhắn đã được gửi thành công.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-bold text-brand-text/80 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-brand-red/30 rounded-xl focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-bold text-brand-text/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-brand-red/30 rounded-xl focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                    placeholder="Nhập email của bạn"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-bold text-brand-text/80 mb-2">
                  Chủ đề
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-brand-red/30 rounded-xl focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                >
                  <option value="">Chọn chủ đề</option>
                  <option value="general">Chung</option>
                  <option value="contribution">Đóng góp tư liệu</option>
                  <option value="feedback">Góp ý kiến</option>
                  <option value="cooperation">Hợp tác</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-bold text-brand-text/80 mb-2">
                  Nội dung tin nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-brand-red/30 rounded-xl focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all resize-none"
                  placeholder="Nhập nội dung tin nhắn..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-red text-white font-display font-black text-lg py-4 rounded-xl hover:bg-brand-redDark transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Gửi tin nhắn
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}