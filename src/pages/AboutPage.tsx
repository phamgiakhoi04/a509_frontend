import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slideshow ảnh hoạt động A509
  // Thay các src bằng ảnh thật khi có — hiện dùng placeholder màu
  const slides = [
    {
      src: "/images/about/activity-1.jpg",
      caption: "Hoạt động phục dựng trang phục lịch sử",
      fallbackColor: "from-brand-redDark to-brand-red",
    },
    {
      src: "/images/about/activity-2.jpg",
      caption: "Triển lãm quân trang tại sự kiện A509",
      fallbackColor: "from-amber-700 to-amber-500",
    },
    {
      src: "/images/about/activity-3.jpg",
      caption: "Nghiên cứu và số hóa tư liệu lịch sử",
      fallbackColor: "from-stone-700 to-stone-500",
    },
    {
      src: "/images/about/activity-4.jpg",
      caption: "Cộng đồng yêu lịch sử Việt Nam",
      fallbackColor: "from-green-800 to-green-600",
    },
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeSlide]);

  return (
    <div className="font-body text-brand-text bg-brand-bg min-h-screen">

      {/* HERO */}
      <section
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/A509 Header.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />
        <div className="container-page relative z-10 text-center md:text-left text-white">
          <div className="inline-block mb-6 px-6 py-2 bg-brand-yellow text-brand-redDark font-black text-xl uppercase rounded-full shadow-lg">
            A509 - Dự án
          </div>
          <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-2xl">
            GIỚI THIỆU
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-bold max-w-3xl mx-auto md:mx-0 opacity-90">
            Tái hiện chân thực lịch sử quân trang Việt Nam – Nơi quá khứ sống động trong từng đường kim mũi chỉ.
          </p>
        </div>
      </section>

      {/* SỨ MỆNH + SLIDESHOW ẢNH */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text sứ mệnh */}
            <div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-brand-redDark mb-8">
                Sứ mệnh của chúng tôi
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-brand-text/90">
                <p>
                  A509 ra đời với khát vọng lưu giữ và lan tỏa giá trị lịch sử quân trang Việt Nam qua các thời kỳ.
                  Chúng tôi không chỉ là một kho tư liệu, mà còn là cầu nối giúp thế hệ trẻ hiểu sâu hơn về những
                  hy sinh, tinh thần bất khuất và bản sắc dân tộc.
                </p>
                <p>
                  Mỗi quân phục, mỗi huy hiệu, mỗi chi tiết nhỏ đều chứa đựng câu chuyện của cha ông –
                  từ những ngày kháng chiến gian khổ đến thời kỳ hiện đại.
                </p>
              </div>
            </div>

            {/* Slideshow ảnh */}
            <div
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Khung ảnh */}
              <div className="relative rounded-3xl overflow-hidden shadow-pop border-4 border-brand-yellow/30 aspect-[4/3]">
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      idx === activeSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.caption}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Nếu chưa có ảnh, hiện placeholder màu
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                    {/* Placeholder fallback khi chưa có ảnh */}
                    <div
                      className={`hidden w-full h-full bg-gradient-to-br ${slide.fallbackColor} items-center justify-center`}
                    >
                      <span className="text-white/40 font-black text-6xl">A509</span>
                    </div>
                  </div>
                ))}

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                  <p className="text-white font-bold text-sm">
                    {slides[activeSlide].caption}
                  </p>
                </div>

                {/* Số thứ tự */}
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {activeSlide + 1} / {slides.length}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-5">
                <button
                  onClick={prevSlide}
                  className="bg-brand-red text-white p-3 rounded-full hover:bg-brand-redDark transition-colors shadow-pop"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Dots */}
                <div className="flex gap-2 items-center">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === activeSlide
                          ? "bg-brand-red w-8"
                          : "bg-brand-red/30 w-2.5 hover:bg-brand-red/60"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="bg-brand-red text-white p-3 rounded-full hover:bg-brand-redDark transition-colors shadow-pop"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HÀNH TRÌNH VÀ THÀNH TỰU */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-brand-bg to-white">
        <div className="container-page">
          <h2 className="font-display font-black text-4xl md:text-5xl text-center text-brand-redDark mb-16">
            Hành trình và thành tựu
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
                      Từ niềm đam mê lịch sử quân sự, nhóm sáng lập bắt đầu thu thập tư liệu đầu tiên
                      về quân phục Việt Nam qua các thời kỳ.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2" />
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:text-left md:pl-12">
                  <div className="bg-white rounded-3xl p-8 shadow-pop border-4 border-brand-yellow/20">
                    <div className="text-sm font-black text-brand-red uppercase mb-2">Tháng 4/2026</div>
                    <h3 className="font-black text-2xl text-brand-redDark mb-4">Ra mắt phiên bản đầu tiên</h3>
                    <p className="text-brand-text/80">
                      Trang web chính thức được đưa vào hoạt động với hơn 50 quân trang được số hóa
                      và mô tả chi tiết.
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
                      Hàng ngàn người yêu lịch sử đã tham gia, đóng góp tư liệu, bình luận và
                      cùng nhau tái hiện lịch sử Việt Nam.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-redDark text-white">
        <div className="container-page text-center">
          <h2 className="font-display font-black text-4xl md:text-5xl mb-8">
            Cùng chúng tôi viết tiếp lịch sử
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Bạn có tư liệu, hình ảnh, hoặc câu chuyện về quân trang Việt Nam?
            Hãy tham gia đóng góp để kho tàng lịch sử ngày càng phong phú.
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
