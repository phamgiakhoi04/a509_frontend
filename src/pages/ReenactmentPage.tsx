import { useEffect, useState } from "react";
import { adminApi } from "@/api/adminApi";
import { Loader2, Search, Globe, MapPin } from "lucide-react";

export default function ReenactmentPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const countriesData = await adminApi.getAllCountries();
      setCountries(countriesData || []);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCountries = countries.filter((country) =>
    searchQuery
      ? country.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.continent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="font-body text-brand-text bg-brand-bg min-h-screen">
      <section
        className="relative min-h-[40vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/A509 Header 3.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="container-page relative z-10 text-center text-white">
          <h1 className="font-display font-black text-5xl md:text-6xl text-brand-yellow drop-shadow-2xl">
            PHỤC DỰNG
          </h1>
          <p className="mt-4 text-xl font-bold opacity-90">
            Tái hiện lịch sử quân đội các quốc gia qua từng thời kỳ
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
                  placeholder="Tìm kiếm quốc gia..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-brand-red/30 rounded-xl text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-brand-text/70">
                Tìm thấy: <span className="text-brand-red">{filteredCountries.length}</span> quốc gia
              </span>
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
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-red mb-4" size={48} />
            <p className="font-display text-2xl text-brand-text/70">Đang tải dữ liệu...</p>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-pop">
            <p className="font-display text-3xl text-brand-text/50">Không tìm thấy kết quả phù hợp</p>
            <p className="mt-2 text-brand-text/70">Thử thay đổi từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCountries.map((country) => (
              <div key={country.id} className="group cursor-default">
                <div className="bg-white rounded-4xl p-4 border-4 border-brand-bg shadow-pop group-hover:shadow-pop-hover group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-brand-bg bg-brand-bg/50 relative">
                    {country.flagImageUrl ? (
                      <img
                        src={country.flagImageUrl}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={country.countryName}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-red/20 to-brand-yellow/20">
                        <Globe size={64} className="text-brand-red/40" />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 px-2 flex-1 flex flex-col">
                    <h3 className="font-display font-black text-2xl text-brand-redDark line-clamp-2 leading-tight">
                      {country.countryName}
                    </h3>
                    
                    {country.continent && (
                      <div className="mt-3 flex items-center gap-2">
                        <MapPin size={16} className="text-brand-text/50" />
                        <span className="text-sm font-bold text-brand-text/60">{country.continent}</span>
                      </div>
                    )}

                    {country.description && (
                      <p className="mt-3 text-sm font-bold text-brand-text/60 line-clamp-3 flex-1">
                        {country.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}