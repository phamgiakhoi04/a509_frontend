import { useState, useEffect } from "react";
import { adminApi } from "@/api/adminApi";
import Button from "@/components/ui/Button";
import { Plus, Trash2, Edit, UploadCloud, X, Loader2, Globe } from "lucide-react";

export default function ReenactmentManager() {
  const [countries, setCountries] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    countryName: "",
    continent: "",
    description: "",
    flagImageUrl: "", // Nếu không upload file, dùng text input
  });
  const [selectedFlag, setSelectedFlag] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const data = await adminApi.getAllCountries();
      // Map thêm slug cho route FE nếu cần (:countrySlug)
      const mapped = data.map((c: any) => ({
        ...c,
        slug: c.countryName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      }));
      setCountries(mapped);
    } catch (error) {
      console.error("Lỗi tải danh sách quốc gia:", error);
    }
  };

  const handleFlagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("Ảnh cờ tối đa 5MB");
        return;
      }
      setSelectedFlag(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let flagUrl = formData.flagImageUrl;

      if (selectedFlag) {
        const uploadResult = await adminApi.uploadImage(selectedFlag);
        flagUrl = uploadResult?.url || uploadResult?.imageUrl;
        if (!flagUrl) throw new Error("Không upload được cờ quốc gia");
      }

      const payload = {
        countryName: formData.countryName,
        continent: formData.continent,
        description: formData.description,
        flagImageUrl: flagUrl,
      };

      await adminApi.createCountry(payload);

      setShowForm(false);
      setFormData({ countryName: "", continent: "", description: "", flagImageUrl: "" });
      setSelectedFlag(null);
      setPreviewUrl("");
      fetchCountries();
    } catch (error: any) {
      alert(error.response?.data || "Lỗi khi lưu quốc gia");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Xác nhận xóa quốc gia này? (Không thể xóa nếu có quân trang liên quan)")) return;

    try {
      await adminApi.deleteCountry(id);
      fetchCountries();
    } catch (err: any) {
      alert(err.response?.data || "Không thể xóa quốc gia (có thể có dữ liệu liên quan)");
    }
  };

  return (
    <div className="space-y-8 p-8 font-body">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-display font-black text-brand-redDark uppercase tracking-wide">
          Quản lý Phục Dựng (Quốc gia)
        </h1>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold shadow-pop hover:bg-brand-redDark hover:shadow-pop-hover transition-all flex items-center gap-2"
        >
          <Plus size={22} /> Thêm Quốc gia Mới
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-brand-yellow/30">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-brand-text hover:text-brand-red transition-colors"
            >
              <X size={32} />
            </button>

            <h2 className="text-3xl font-display font-black text-brand-redDark mb-10 border-b-4 border-brand-yellow/40 pb-4">
              THÊM QUỐC GIA MỚI
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-brand-text mb-3">Tên Quốc gia</label>
                  <input
                    className="w-full border-2 border-brand-red/30 rounded-xl p-4 text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                    value={formData.countryName}
                    onChange={(e) => setFormData({ ...formData, countryName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-brand-text mb-3">Châu lục</label>
                  <input
                    className="w-full border-2 border-brand-red/30 rounded-xl p-4 text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                    value={formData.continent}
                    onChange={(e) => setFormData({ ...formData, continent: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-brand-text mb-3">Mô tả</label>
                  <textarea
                    className="w-full border-2 border-brand-red/30 rounded-xl p-4 h-40 text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none resize-none transition-all"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-brand-text mb-3">Link Cờ Quốc gia (Flag URL)</label>
                  <div className="relative">
                    <input
                      className="w-full border-2 border-brand-red/30 rounded-xl p-4 text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                      value={formData.flagImageUrl}
                      onChange={(e) => setFormData({ ...formData, flagImageUrl: e.target.value })}
                      placeholder="https://example.com/flag.png"
                    />
                    <p className="text-sm text-gray-500 mt-1">Hoặc upload file bên dưới (nếu BE hỗ trợ)</p>
                  </div>

                  <div className="mt-4 border-4 border-dashed border-brand-red/30 rounded-3xl p-10 text-center hover:border-brand-yellow transition-all relative group cursor-pointer bg-brand-bg/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFlagChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {previewUrl ? (
                      <div className="relative inline-block">
                        <img src={previewUrl} alt="flag preview" className="max-h-56 object-contain rounded-2xl shadow-pop" />
                        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-bold text-xl">Thay đổi</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={64} className="mx-auto mb-4 text-brand-red/60 group-hover:text-brand-yellow transition-colors" />
                        <p className="text-lg font-medium text-brand-text/70 group-hover:text-brand-yellow">
                          Upload cờ (tối đa 5MB) - nếu BE hỗ trợ
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-6 pt-8 border-t border-brand-red/20">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 rounded-xl font-bold text-brand-text hover:bg-brand-bg transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-3 bg-brand-red text-white rounded-xl font-bold shadow-pop hover:bg-brand-redDark hover:shadow-pop-hover disabled:opacity-50 flex items-center gap-3 transition-all"
                >
                  {loading && <Loader2 className="animate-spin" size={22} />}
                  {loading ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-pop overflow-hidden border-2 border-brand-red/10">
        <table className="w-full text-left">
          <thead className="bg-brand-bg text-brand-redDark text-sm font-bold uppercase tracking-wider">
            <tr>
              <th className="p-5">ID</th>
              <th className="p-5">Cờ</th>
              <th className="p-5">Tên Quốc gia</th>
              <th className="p-5">Châu lục</th>
              <th className="p-5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-red/10">
            {countries.map((country) => (
              <tr key={country.id} className="hover:bg-brand-bg/60 transition-colors">
                <td className="p-5 text-brand-text font-mono">#{country.id}</td>
                <td className="p-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-brand-bg border-2 border-brand-yellow/30 shadow-pop">
                    {country.flagImageUrl ? (
                      <img src={country.flagImageUrl} alt="flag" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-brand-text/50">
                        <Globe size={32} />
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-5 font-bold text-brand-text text-lg">{country.countryName}</td>
                <td className="p-5 text-brand-text/70">{country.continent || "-"}</td>
                <td className="p-5 text-right space-x-3">
                  <button className="p-3 text-brand-yellow hover:bg-brand-yellow/20 rounded-xl transition-colors">
                    <Edit size={22} />
                  </button>
                  <button
                    onClick={() => handleDelete(country.id)}
                    className="p-3 text-brand-red hover:bg-brand-red/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))}

            {countries.length === 0 && (
              <tr>
                <td colSpan={5} className="p-16 text-center text-brand-text/50 italic text-xl">
                  Chưa có quốc gia nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}