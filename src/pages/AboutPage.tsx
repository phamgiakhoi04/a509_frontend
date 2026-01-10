import { Shield, BookOpen, Flag, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="font-body text-brand-text bg-brand-bg min-h-screen">
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/A509 Header 3.jpg')"
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />

        <div className="container-page relative z-10 text-center md:text-left text-white">
          <div className="inline-block mb-6 px-6 py-2 bg-brand-yellow text-brand-redDark font-black text-xl uppercase rounded-full shadow-lg">
            A509 - Dự án
          </div>
          <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-2xl">
            GIỚI THIỆU
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-bold max-w-3xl mx-auto md:mx-0 opacity-90">
            Tái hiện chân thực lịch sử quân trang Việt Nam – nơi quá khứ sống động trong từng đường kim mũi chỉ.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-brand-redDark mb-8">
                Sứ mệnh của chúng tôi
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-brand-text/90">
                <p>
                  A509 ra đời với khát vọng lưu giữ và lan tỏa giá trị lịch sử quân trang Việt Nam qua các thời kỳ. Chúng tôi không chỉ là một kho tư liệu, mà còn là cầu nối giúp thế hệ trẻ hiểu sâu hơn về những hy sinh, tinh thần bất khuất và bản sắc dân tộc.
                </p>
                <p>
                  Mỗi quân phục, mỗi huy hiệu, mỗi chi tiết nhỏ đều chứa đựng câu chuyện của cha ông – từ những ngày kháng chiến gian khổ đến thời kỳ hiện đại.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-brand-bg rounded-3xl p-8 text-center shadow-pop hover:shadow-pop-hover transition-all">
                <Shield className="mx-auto mb-4 text-brand-red" size={64} />
                <h3 className="font-black text-2xl text-brand-redDark mb-3">Bảo tồn</h3>
                <p className="text-brand-text/80">Lưu giữ nguyên vẹn giá trị lịch sử</p>
              </div>
              <div className="bg-brand-bg rounded-3xl p-8 text-center shadow-pop hover:shadow-pop-hover transition-all">
                <BookOpen className="mx-auto mb-4 text-brand-red" size={64} />
                <h3 className="font-black text-2xl text-brand-redDark mb-3">Giáo dục</h3>
                <p className="text-brand-text/80">Truyền tải kiến thức đến thế hệ trẻ</p>
              </div>
              <div className="bg-brand-bg rounded-3xl p-8 text-center shadow-pop hover:shadow-pop-hover transition-all">
                <Flag className="mx-auto mb-4 text-brand-red" size={64} />
                <h3 className="font-black text-2xl text-brand-redDark mb-3">Tôn vinh</h3>
                <p className="text-brand-text/80">Ca ngợi tinh thần dân tộc</p>
              </div>
              <div className="bg-brand-bg rounded-3xl p-8 text-center shadow-pop hover:shadow-pop-hover transition-all">
                <HeartHandshake className="mx-auto mb-4 text-brand-red" size={64} />
                <h3 className="font-black text-2xl text-brand-redDark mb-3">Kết nối</h3>
                <p className="text-brand-text/80">Gắn kết cộng đồng yêu lịch sử</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-brand-bg to-white">
        <div className="container-page">
          <h2 className="font-display font-black text-4xl md:text-5xl text-center text-brand-redDark mb-16">
            Hành trình A509
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-brand-yellow/30 hidden md:block" />

            <div className="space-y-12 md:space-y-24">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:text-right md:pr-12">
                  <div className="bg-white rounded-3xl p-8 shadow-pop border-4 border-brand-yellow/20">
                    <div className="text-sm font-black text-brand-red uppercase mb-2">Tháng 5/2020</div>
                    <h3 className="font-black text-2xl text-brand-redDark mb-4">Khởi nguồn ý tưởng</h3>
                    <p className="text-brand-text/80">
                      Từ niềm đam mê lịch sử quân sự, nhóm sáng lập bắt đầu thu thập tư liệu đầu tiên về quân phục Việt Nam qua các thời kỳ.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2" />
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:text-left md:pl-12">
                  <div className="bg-white rounded-3xl p-8 shadow-pop border-4 border-brand-yellow/20">
                    <div className="text-sm font-black text-brand-red uppercase mb-2">Tháng 12/2025</div>
                    <h3 className="font-black text-2xl text-brand-redDark mb-4">Ra mắt phiên bản đầu tiên</h3>
                    <p className="text-brand-text/80">
                      Trang web chính thức được đưa vào hoạt động với hơn 50 quân trang được số hóa và mô tả chi tiết.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2" />
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:text-right md:pr-12">
                  <div className="bg-brand-yellow/10 rounded-3xl p-8 shadow-pop border-4 border-brand-yellow">
                    <div className="text-sm font-black text-brand-red uppercase mb-2">Hiện tại - 2026</div>
                    <h3 className="font-black text-2xl text-brand-redDark mb-4">Cộng đồng đang lớn mạnh</h3>
                    <p className="text-brand-text/90 font-bold">
                      Hàng ngàn người yêu lịch sử đã tham gia, đóng góp tư liệu, bình luận và cùng nhau tái hiện lịch sử Việt Nam.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-redDark text-white">
        <div className="container-page text-center">
          <h2 className="font-display font-black text-4xl md:text-5xl mb-8">
            Cùng chúng tôi viết tiếp lịch sử
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Bạn có tư liệu, hình ảnh, hoặc câu chuyện về quân trang Việt Nam? Hãy tham gia đóng góp để kho tàng lịch sử ngày càng phong phú.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="/lien-he"
              className="inline-block px-10 py-5 bg-brand-yellow text-brand-redDark font-black text-xl rounded-full shadow-2xl hover:bg-yellow-300 transition transform hover:scale-105"
            >
              Liên hệ đóng góp
            </a>
            <a
              href="/quan-trang"
              className="inline-block px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-black text-xl rounded-full hover:bg-white/20 transition"
            >
              Khám phá kho quân trang
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}