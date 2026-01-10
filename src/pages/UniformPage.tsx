import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { adminApi } from "@/api/adminApi";
import { Loader2, Filter, Grid, List, Search } from "lucide-react";

export default function UniformPage() {
  const { categorySlug } = useParams();
  const [items, setItems] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [uniformsData, countriesData] = await Promise.all([
        adminApi.getAllUniforms(),
        adminApi.getAllCountries(),
      ]);
      setItems(uniformsData);
      setCountries(countriesData || []);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCountry = selectedCountry ? item.country?.id === selectedCountry : true;
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="font-body text-brand-text bg-brand-bg min-h-screen">
      <section
        className="relative min-h-[40vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/A509 Header 3.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="container-page relative z-10 text-center text-white">
          <h1 className="font-display font-black text-5xl md:text-6xl text-brand-yellow drop-shadow-2xl">
            QUÂN TRANG
          </h1>
          <p className="mt-4 text-xl font-bold opacity-90">
            Tìm hiểu về trang phục, phù hiệu và trang bị quân đội qua các thời kỳ
          </p>
        </div>
      </section>

      <section className="py-12 container-page">
        <div className="bg-white rounded-3xl p-6 shadow-pop border-4 border-brand-yellow/20 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/40" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm quân trang..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-brand-red/30 rounded-xl text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-brand-red" />
                <select
                  value={selectedCountry || ""}
                  onChange={(e) => setSelectedCountry(e.target.value ? Number(e.target.value) : null)}
                  className="px-4 py-3 border-2 border-brand-red/30 rounded-xl text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all bg-white font-bold"
                >
                  <option value="">Tất cả quốc gia</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.countryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 bg-brand-bg rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-brand-red text-white"
                      : "text-brand-text/60 hover:text-brand-red"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-brand-red text-white"
                      : "text-brand-text/60 hover:text-brand-red"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="font-bold text-brand-text/70">
              Tìm thấy: <span className="text-brand-red">{filteredItems.length}</span> kết quả
            </span>
            {selectedCountry && (
              <button
                onClick={() => setSelectedCountry(null)}
                className="px-3 py-1 bg-brand-red/10 text-brand-red rounded-full text-sm font-bold hover:bg-brand-red hover:text-white transition-colors"
              >
                ✕ Xóa bộ lọc
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-3 py-1 bg-brand-red/10 text-brand-red rounded-full text-sm font-bold hover:bg-brand-red hover:text-white transition-colors"
              >
                ✕ Xóa tìm kiếm
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-red mb-4" size={48} />
            <p className="font-display text-2xl text-brand-text/70">Đang tải dữ liệu...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-pop">
            <p className="font-display text-3xl text-brand-text/50">Không tìm thấy kết quả phù hợp</p>
            <p className="mt-2 text-brand-text/70">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                to={`/quan-trang/trang-bi/${item.id}`}
                className="group"
              >
                <div className="bg-white rounded-4xl p-4 border-4 border-brand-bg shadow-pop group-hover:shadow-pop-hover group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-brand-bg bg-brand-bg/50 relative">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].imageUrl}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={item.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-red/30 font-black text-4xl">
                        ?
                      </div>
                    )}
                    {item.country && (
                      <div className="absolute top-3 left-3 bg-brand-yellow text-brand-redDark text-xs font-black px-3 py-1 rounded-full uppercase shadow-sm">
                        {item.country.countryName}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 px-2 flex-1 flex flex-col">
                    <h3 className="font-display font-black text-xl text-brand-redDark line-clamp-2 leading-tight group-hover:text-brand-red transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-brand-text/60 line-clamp-3">
                      {item.description || "Chưa có mô tả..."}
                    </p>
                    {item.material && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs font-black text-brand-text/50 uppercase">Chất liệu:</span>
                        <span className="text-sm font-bold text-brand-red">{item.material}</span>
                      </div>
                    )}
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-brand-bg flex justify-between items-center">
                      <span className="font-bold text-brand-red text-sm">Xem chi tiết</span>
                      <span className="bg-brand-red text-white w-8 h-8 flex items-center justify-center rounded-full font-black group-hover:bg-brand-yellow group-hover:text-brand-redDark transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                to={`/quan-trang/trang-bi/${item.id}`}
                className="group block"
              >
                <div className="bg-white rounded-3xl p-6 border-4 border-brand-bg shadow-pop group-hover:shadow-pop-hover group-hover:-translate-y-1 transition-all duration-300">
                  <div className="flex gap-6">
                    <div className="w-48 h-48 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-brand-bg bg-brand-bg/50 relative">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0].imageUrl}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt={item.name}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-red/30 font-black text-4xl">
                          ?
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display font-black text-2xl text-brand-redDark group-hover:text-brand-red transition-colors">
                            {item.name}
                          </h3>
                          {item.country && (
                            <div className="mt-2 inline-block bg-brand-yellow text-brand-redDark text-xs font-black px-3 py-1 rounded-full uppercase">
                              {item.country.countryName}
                            </div>
                          )}
                        </div>
                        <span className="bg-brand-red text-white w-10 h-10 flex items-center justify-center rounded-full font-black group-hover:bg-brand-yellow group-hover:text-brand-redDark transition-colors flex-shrink-0">
                          →
                        </span>
                      </div>

                      <p className="mt-4 text-base text-brand-text/80 line-clamp-3">
                        {item.description || "Chưa có mô tả..."}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-4">
                        {item.material && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-brand-text/50 uppercase">Chất liệu:</span>
                            <span className="text-sm font-bold text-brand-red">{item.material}</span>
                          </div>
                        )}
                        {item.history && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-brand-text/50 uppercase">Lịch sử:</span>
                            <span className="text-sm font-bold text-brand-text/70 line-clamp-1">
                              {item.history}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}