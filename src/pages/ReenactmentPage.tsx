import { useEffect, useState } from "react";
import { adminApi } from "@/api/adminApi";
import { Loader2, Search, Globe, MapPin, Shield, Users, Flag, ChevronDown, ChevronUp } from "lucide-react";

// Danh mục phân cấp — sub-items sẽ lấy từ API sau khi backend sẵn sàng
const reenactmentCategories = [
  {
    id: "quandoi",
    name: "Quân đội nhân dân Việt Nam",
    icon: Shield,
    description: "Lịch sử quân đội nhân dân Việt Nam qua các thời kỳ",
    subItems: [
      { id: "quandoi-1", name: "Thời kỳ kháng chiến chống Pháp (1945–1954)" },
      { id: "quandoi-2", name: "Thời kỳ kháng chiến chống Mỹ (1955–1975)" },
      { id: "quandoi-3", name: "Thời kỳ bảo vệ Tổ quốc (1975–1989)" },
      { id: "quandoi-4", name: "Thời kỳ hiện đại (1989–nay)" },
    ],
  },
  {
    id: "congan",
    name: "Công an nhân dân Việt Nam",
    icon: Users,
    description: "Lịch sử công an nhân dân Việt Nam qua các thời kỳ",
    subItems: [
      { id: "congan-1", name: "Cảnh sát vũ trang" },
      { id: "congan-2", name: "Cảnh sát phòng cháy chữa cháy" },
      { id: "congan-3", name: "Cảnh sát giao thông" },
      { id: "congan-4", name: "An ninh nhân dân" },
    ],
  },
  {
    id: "khac",
    name: "Các lực lượng khác",
    icon: Flag,
    description: "Các lực lượng vũ trang và bán quân sự khác",
    subItems: [
      { id: "khac-1", name: "Dân quân tự vệ" },
      { id: "khac-2", name: "Bộ đội biên phòng" },
      { id: "khac-3", name: "Cảnh sát biển" },
      { id: "khac-4", name: "Lực lượng dự bị động viên" },
    ],
  },
];

export default function ReenactmentPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

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

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      // Click lại để đóng
      setSelectedCategory(null);
      setSelectedSubItem(null);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSubItem(null);
    }
  };

  const filteredCountries = countries.filter((country) =>
    searchQuery
      ? country.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.continent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const activeCategoryData = reenactmentCategories.find(
    (c) => c.id === selectedCategory
  );

  return (
    <div className="font-body text-brand-text bg-brand-bg min-h-screen">

      {/* HERO */}
      <section
        className="relative min-h-[40vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/A509 Header.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="container-page relative z-10 text-center text-white">
          <h1 className="font-display font-black text-5xl md:text-6xl text-brand-yellow drop-shadow-2xl">
            PHỤC DỰNG TRANG PHỤC
          </h1>
          <p className="mt-4 text-xl font-bold opacity-90">
            Tái hiện lịch sử quân đội các quốc gia qua từng thời kỳ
          </p>
        </div>
      </section>

      <section className="py-12 container-page">

        {/* 3 DANH MỤC CHÍNH */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reenactmentCategories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`bg-white rounded-2xl p-6 shadow-pop border-4 transition-all duration-300 flex flex-col items-center text-center w-full ${
                    isActive
                      ? "border-brand-red ring-4 ring-brand-red/20 -translate-y-1"
                      : "border-brand-yellow/20 hover:border-brand-yellow hover:-translate-y-1"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                      isActive ? "bg-brand-red text-white" : "bg-brand-bg text-brand-red"
                    }`}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="font-display font-black text-lg text-brand-redDark">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-brand-text/60">{category.description}</p>
                  <div className="mt-3 text-brand-red/60">
                    {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SUB-ITEMS — hiện ra khi click 1 danh mục */}
        {selectedCategory && activeCategoryData && (
          <div className="mb-8 bg-white rounded-3xl p-6 shadow-pop border-4 border-brand-red/20 animate-in fade-in slide-in-from-top-2 duration-200">
            <h4 className="font-display font-black text-lg text-brand-redDark mb-4 flex items-center gap-2">
              <activeCategoryData.icon size={20} className="text-brand-red" />
              {activeCategoryData.name}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activeCategoryData.subItems.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() =>
                    setSelectedSubItem(selectedSubItem === sub.id ? null : sub.id)
                  }
                  className={`px-4 py-3 rounded-xl text-sm font-bold text-left transition-all border-2 ${
                    selectedSubItem === sub.id
                      ? "bg-brand-red text-white border-brand-red shadow-pop"
                      : "bg-brand-bg text-brand-text border-brand-yellow/30 hover:border-brand-red hover:text-brand-redDark"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
            {selectedSubItem && (
              <p className="mt-4 text-sm text-brand-text/60 italic">
                Đang lọc theo:{" "}
                <span className="font-bold text-brand-red">
                  {activeCategoryData.subItems.find((s) => s.id === selectedSubItem)?.name}
                </span>
                {" — "}
                <button
                  onClick={() => setSelectedSubItem(null)}
                  className="underline hover:text-brand-red transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </p>
            )}
          </div>
        )}

        {/* THANH TÌM KIẾM */}
        <div className="bg-white rounded-3xl p-6 shadow-pop border-4 border-brand-yellow/20 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/40"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-brand-red/30 rounded-xl text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-brand-text/70">
                <span className="text-brand-red">{filteredCountries.length}</span> kết quả
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

        {/* DANH SÁCH QUỐC GIA */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-red mb-4" size={48} />
            <p className="font-display text-2xl text-brand-text/70">Đang tải dữ liệu...</p>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-pop">
            <p className="font-display text-3xl text-brand-text/50">
              Không tìm thấy kết quả phù hợp
            </p>
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
                        <span className="text-sm font-bold text-brand-text/60">
                          {country.continent}
                        </span>
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
