import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { repo } from "@/api/repository";
import type { Post, EquipmentItem } from "@/types/models";
import { formatDateTime } from "@/utils/format";
import Button from "@/components/ui/Button";

export default function TrangChu() {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [i, p] = await Promise.all([
          repo.getEquipmentItems(),
          repo.getPosts()
        ]);
        setItems(i);
        setPosts(p);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featuredItems = useMemo(() => items.slice(0, 6), [items]);

  return (
    <div className="font-body text-brand-text bg-brand-bg min-h-screen">
      
      {/* 1. HERO SECTION - Full background với ảnh A509 Header 3.jpg */}
      <section 
        className="relative min-h-[70vh] md:min-h-[85vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/A509 Header 3.jpg')"
        }}
      >
        {/* Overlay gradient tối để chữ nổi bật trên ảnh */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

        <div className="container-page relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left text-white drop-shadow-2xl">
            <h1 className="font-display font-black text-5xl md:text-7xl leading-tight text-brand-yellow">
              LỊCH SỬ <br/> 
              <span className="text-white">TRONG TẦM TAY</span>
            </h1>
            <p className="text-lg md:text-xl font-bold opacity-90 max-w-lg mx-auto md:mx-0">
              Dự án tái hiện quân trang và tư liệu lịch sử Việt Nam. <br/> 
              Chân thực - Sống động - Hào hùng.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/quan-trang">
                <Button className="bg-brand-yellow text-brand-redDark border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 font-black text-lg px-8 py-4 rounded-full shadow-2xl hover:bg-yellow-400 transition transform hover:scale-105">
                  KHÁM PHÁ NGAY
                </Button>
              </Link>
            </div>
          </div>

          {/* Phần bên phải bỏ ảnh logo nhỏ để background header nổi bật hơn */}
        </div>
      </section>

      {/* 2. MENU QUÂN TRANG (Hiển thị Card từ BE) */}
      <section className="py-16 container-page">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl text-brand-redDark uppercase tracking-wide inline-block relative">
            Quân Trang Mới
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand-yellow rounded-full"></span>
          </h2>
          <p className="mt-3 font-bold text-brand-text/70">Những hiện vật vừa được cập nhật vào kho dữ liệu</p>
        </div>

        {loading ? (
          <div className="text-center font-display text-2xl animate-bounce text-brand-red">Đang tải dữ liệu...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Link key={item.id} to={`/quan-trang/trang-bi/${item.id}`} className="group">
                <div className="bg-white rounded-4xl p-4 border-4 border-brand-bg shadow-pop group-hover:shadow-pop-hover group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Khung ảnh bo tròn */}
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-brand-bg bg-brand-bg/50 relative">
                    {item.images && item.images.length > 0 ? (
                      <img 
                        src={item.images[0].imageUrl} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt={item.name} 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-red/30 font-black text-4xl">?</div>
                    )}
                    <div className="absolute top-3 right-3 bg-brand-yellow text-brand-redDark text-xs font-black px-3 py-1 rounded-full uppercase shadow-sm">
                      Mới
                    </div>
                  </div>

                  {/* Thông tin */}
                  <div className="mt-4 px-2 flex-1 flex flex-col">
                    <h3 className="font-display font-black text-xl text-brand-redDark line-clamp-2 leading-tight group-hover:text-brand-red transition-colors">
                      {item.name}
                    </h3>
                    <div 
                      className="mt-2 text-sm font-bold text-brand-text/60 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.excerpt || item.description || "Chưa có mô tả..." }}
                    />
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-brand-bg flex justify-between items-center">
                      <span className="font-bold text-brand-red text-sm">Xem chi tiết</span>
                      <span className="bg-brand-red text-white w-8 h-8 flex items-center justify-center rounded-full font-black group-hover:bg-brand-yellow group-hover:text-brand-redDark transition-colors">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link to="/quan-trang">
            <Button className="bg-white text-brand-redDark border-2 border-brand-redDark hover:bg-brand-redDark hover:text-white font-black text-lg px-8 py-3 rounded-full shadow-md">
              XEM TẤT CẢ QUÂN TRANG 
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. TIN TỨC (Dạng list đơn giản hơn) */}
      <section className="py-16 bg-white relative">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="font-display font-black text-3xl text-brand-text uppercase">Bảng tin A509</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {posts.slice(0,4).map(post => (
              <Link key={post.slug} to={`/${post.type}/${post.slug}`} className="flex gap-4 p-4 rounded-3xl bg-brand-bg hover:bg-brand-yellow/20 transition-colors border-2 border-transparent hover:border-brand-yellow">
                <div className="w-24 h-24 bg-brand-red/10 rounded-2xl flex-shrink-0">
                  <img src="/images/A509-vuot-org.png" className="w-full h-full object-cover opacity-80" alt="Post" />
                </div>
                <div>
                  <div className="text-xs font-black text-brand-red uppercase mb-1">{formatDateTime(post.createdAt)}</div>
                  <h3 className="font-display font-bold text-lg leading-tight mb-2">{post.title}</h3>
                  <p className="text-sm line-clamp-2 opacity-70">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}