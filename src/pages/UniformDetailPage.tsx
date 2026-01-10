import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { adminApi } from "@/api/adminApi";
import { Loader2, ArrowLeft, Calendar, MapPin, Package } from "lucide-react";

export default function UniformDetailPage() {
  const { itemSlug } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchDetail();
  }, [itemSlug]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const id = itemSlug;
      const data = await adminApi.getUniformById(Number(id));
      setItem(data);
    } catch (error) {
      console.error("Lỗi tải chi tiết:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-brand-red mx-auto mb-4" size={48} />
          <p className="font-display text-2xl text-brand-text/70">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-3xl text-brand-text/50">Không tìm thấy quân trang</p>
          <Link to="/quan-trang" className="mt-4 inline-block text-brand-red font-bold hover:underline">
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-body text-brand-text bg-brand-bg min-h-screen">
      <section
        className="relative min-h-[30vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/A509 Header 3.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
        <div className="container-page relative z-10">
          <button
            onClick={() => navigate("/quan-trang")}
            className="flex items-center gap-2 text-white hover:text-brand-yellow transition-colors font-bold mb-4"
          >
            <ArrowLeft size={20} /> Quay lại danh sách
          </button>
          <h1 className="font-display font-black text-4xl md:text-5xl text-brand-yellow drop-shadow-2xl">
            {item.name}
          </h1>
          {item.country && (
            <div className="mt-4 inline-block bg-brand-yellow text-brand-redDark text-sm font-black px-4 py-2 rounded-full uppercase">
              {item.country.countryName}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 container-page">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-pop border-4 border-brand-yellow/20">
              {item.images && item.images.length > 0 ? (
                <>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-brand-bg bg-brand-bg/50">
                    <img
                      src={item.images[selectedImage]?.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {item.images.length > 1 && (
                    <div className="grid grid-cols-5 gap-3 mt-4">
                      {item.images.map((img: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                            selectedImage === idx
                              ? "border-brand-red shadow-lg scale-105"
                              : "border-brand-bg hover:border-brand-yellow"
                          }`}
                        >
                          <img
                            src={img.imageUrl}
                            alt={`${item.name} ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[4/3] rounded-2xl bg-brand-bg/50 flex items-center justify-center">
                  <span className="text-brand-red/30 font-black text-6xl">?</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-pop border-4 border-brand-yellow/20">
              <h2 className="font-display font-black text-2xl text-brand-redDark mb-6 pb-4 border-b-2 border-brand-yellow/30">
                THÔNG TIN CHI TIẾT
              </h2>

              <div className="space-y-6">
                {item.material && (
                  <div className="flex items-start gap-3">
                    <Package className="text-brand-red flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-sm font-black text-brand-text/50 uppercase mb-1">Chất liệu</div>
                      <div className="text-lg font-bold text-brand-text">{item.material}</div>
                    </div>
                  </div>
                )}

                {item.country && (
                  <div className="flex items-start gap-3">
                    <MapPin className="text-brand-red flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-sm font-black text-brand-text/50 uppercase mb-1">Quốc gia</div>
                      <div className="text-lg font-bold text-brand-text">{item.country.countryName}</div>
                    </div>
                  </div>
                )}

                {item.createdAt && (
                  <div className="flex items-start gap-3">
                    <Calendar className="text-brand-red flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-sm font-black text-brand-text/50 uppercase mb-1">Ngày thêm</div>
                      <div className="text-lg font-bold text-brand-text">
                        {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {item.description && (
              <div className="bg-white rounded-3xl p-8 shadow-pop border-4 border-brand-yellow/20">
                <h2 className="font-display font-black text-2xl text-brand-redDark mb-4">MÔ TẢ</h2>
                <p className="text-base leading-relaxed text-brand-text/80">{item.description}</p>
              </div>
            )}

            {item.history && (
              <div className="bg-white rounded-3xl p-8 shadow-pop border-4 border-brand-yellow/20">
                <h2 className="font-display font-black text-2xl text-brand-redDark mb-4">LỊCH SỬ SỬ DỤNG</h2>
                <p className="text-base leading-relaxed text-brand-text/80">{item.history}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/quan-trang"
            className="inline-block bg-brand-red text-white font-black text-lg px-10 py-4 rounded-full shadow-pop hover:bg-brand-redDark hover:shadow-pop-hover transition-all"
          >
            ← Quay lại danh sách quân trang
          </Link>
        </div>
      </section>
    </div>
  );
}