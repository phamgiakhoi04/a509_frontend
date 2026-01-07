// src/pages/admin/UniformManager.tsx
import { useState, useEffect } from "react";
import { adminApi } from "@/api/adminApi";
import Button from "@/components/ui/Button";
import { Plus, Trash2, Edit, UploadCloud, X, Loader2 } from "lucide-react";

export default function UniformManager() {
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: 1,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await adminApi.getAllUniforms();
      setItems(data || []);
    } catch (error) {
      console.error("Lỗi tải danh sách:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("Ảnh tối đa 5MB");
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageId: number | null = null;

      if (selectedImage) {
        const uploadResult = await adminApi.uploadImage(selectedImage);
        imageId = uploadResult?.id || uploadResult?.imageId;

        if (!imageId) throw new Error("Không lấy được ID ảnh");
      }

      const payload = {
        ...formData,
        imageIds: imageId ? [imageId] : [],
      };

      await adminApi.createUniform(payload);

      setShowForm(false);
      setFormData({ name: "", description: "", categoryId: 1 });
      setSelectedImage(null);
      setPreviewUrl("");
      fetchItems();
    } catch (error: any) {
      alert(error.response?.data?.message || "Lỗi khi lưu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Xác nhận xóa?")) return;

    try {
      await adminApi.deleteUniform(id);
      fetchItems();
    } catch (err) {
      alert("Không thể xóa");
    }
  };

  return (
    <div className="space-y-8 p-8 font-body">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-display font-black text-brand-redDark uppercase tracking-wide">
          Quản lý Quân trang
        </h1>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold shadow-pop hover:bg-brand-redDark hover:shadow-pop-hover transition-all flex items-center gap-2"
        >
          <Plus size={22} /> Thêm mới
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
              THÊM QUÂN TRANG MỚI
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-brand-text mb-3">Tên hiện vật</label>
                  <input
                    className="w-full border-2 border-brand-red/30 rounded-xl p-4 text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
                    placeholder="Ví dụ: Mũ cối 1954..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-brand-text mb-3">Mô tả</label>
                  <textarea
                    className="w-full border-2 border-brand-red/30 rounded-xl p-4 h-40 text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none resize-none transition-all"
                    placeholder="Mô tả chi tiết..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-brand-text mb-3">Hình ảnh</label>
                  <div className="border-4 border-dashed border-brand-red/30 rounded-3xl p-10 text-center hover:border-brand-yellow transition-all relative group cursor-pointer bg-brand-bg/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {previewUrl ? (
                      <div className="relative inline-block">
                        <img src={previewUrl} alt="preview" className="max-h-56 object-contain rounded-2xl shadow-pop" />
                        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-bold text-xl">Thay đổi</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={64} className="mx-auto mb-4 text-brand-red/60 group-hover:text-brand-yellow transition-colors" />
                        <p className="text-lg font-medium text-brand-text/70 group-hover:text-brand-yellow">
                          Click hoặc kéo thả ảnh (tối đa 5MB)
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
              <th className="p-5">Ảnh</th>
              <th className="p-5">Tên</th>
              <th className="p-5">Ngày tạo</th>
              <th className="p-5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-red/10">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-brand-bg/60 transition-colors">
                <td className="p-5 text-brand-text font-mono">#{item.id}</td>
                <td className="p-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-brand-bg border-2 border-brand-yellow/30 shadow-pop">
                    {item.images?.[0]?.url ? (
                      <img src={item.images[0].url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-brand-text/50">No img</div>
                    )}
                  </div>
                </td>
                <td className="p-5 font-bold text-brand-text text-lg">{item.name}</td>
                <td className="p-5 text-brand-text/70">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString("vi-VN") : "-"}
                </td>
                <td className="p-5 text-right space-x-3">
                  <button className="p-3 text-brand-yellow hover:bg-brand-yellow/20 rounded-xl transition-colors">
                    <Edit size={22} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="p-3 text-brand-red hover:bg-brand-red/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-16 text-center text-brand-text/50 italic text-xl">
                  Chưa có quân trang nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}