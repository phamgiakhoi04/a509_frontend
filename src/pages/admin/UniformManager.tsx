import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    history: "",
    material: "",
    countryId: 1,
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await adminApi.getAllUniforms();
      setItems(data);
    } catch (error) {
      console.error("Lỗi tải danh sách:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (files.some((f) => f.size > 5 * 1024 * 1024)) {
      alert("Mỗi ảnh tối đa 5MB");
      return;
    }
    if (files.length + selectedImages.length > 5) {
      alert("Tối đa 5 ảnh cho một quân trang");
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removePreview = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("history", formData.history || "");
      formDataToSend.append("material", formData.material || "");
      formDataToSend.append("countryId", formData.countryId.toString());

      selectedImages.forEach((file) => {
        formDataToSend.append("imageFiles", file);
      });

      await adminApi.createUniform(formDataToSend);

      setShowForm(false);
      setFormData({ name: "", description: "", history: "", material: "", countryId: 1 });
      setSelectedImages([]);
      setPreviewUrls([]);
      fetchItems();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data || "Lỗi khi lưu quân trang");
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setShowDeleteModal(false);
    try {
      await adminApi.deleteUniform(deleteId);
      fetchItems();
    } catch (err: any) {
      alert(err.response?.data || "Không thể xóa (có thể có dữ liệu liên quan)");
    } finally {
      setDeleteId(null);
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-brand-text mb-3">Mô tả</label>
                  <textarea
                    className="w-full border-2 border-brand-red/30 rounded-xl p-4 h-32 text-lg focus:ring-4 focus:ring-brand-yellow outline-none resize-none transition-all"
                    placeholder="Mô tả chi tiết..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-lg font-bold text-brand-text mb-3">Lịch sử sử dụng</label>
                  <textarea
                    className="w-full border-2 border-brand-red/30 rounded-xl p-4 h-32 text-lg focus:ring-4 focus:ring-brand-yellow outline-none resize-none transition-all"
                    placeholder="Lịch sử..."
                    value={formData.history}
                    onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-lg font-bold text-brand-text mb-3">Chất liệu</label>
                  <input
                    className="w-full border-2 border-brand-red/30 rounded-xl p-4 text-lg focus:ring-4 focus:ring-brand-yellow outline-none transition-all"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-brand-text mb-3">Quốc gia (Country ID)</label>
                  <input
                    type="number"
                    className="w-full border-2 border-brand-red/30 rounded-xl p-4 text-lg focus:ring-4 focus:ring-brand-yellow outline-none transition-all"
                    value={formData.countryId}
                    onChange={(e) => setFormData({ ...formData, countryId: Number(e.target.value) })}
                    min={1}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-lg font-bold text-brand-text mb-3">Hình ảnh (tối đa 5 ảnh)</label>
                  <div className="border-4 border-dashed border-brand-red/30 rounded-3xl p-10 text-center hover:border-brand-yellow transition-all relative group cursor-pointer bg-brand-bg/50">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {previewUrls.length > 0 ? (
                      <div className="grid grid-cols-3 gap-4">
                        {previewUrls.map((url, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={url}
                              alt={`preview-${idx}`}
                              className="w-full h-32 object-cover rounded-xl shadow"
                            />
                            <button
                              type="button"
                              onClick={() => removePreview(idx)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={64} className="mx-auto mb-4 text-brand-red/60 group-hover:text-brand-yellow transition-colors" />
                        <p className="text-lg font-medium text-brand-text/70 group-hover:text-brand-yellow">
                          Click hoặc kéo thả ảnh (tối đa 5MB mỗi ảnh)
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

      <div className="bg-white rounded-3xl shadow-pop overflow-hidden border-2 border-brand-red/10 overflow-x-auto">
        <table className="w-full text-left min-w-[1200px]">
          <thead className="bg-brand-bg text-brand-redDark text-sm font-bold uppercase tracking-wider">
            <tr>
              <th className="p-5">ID</th>
              <th className="p-5">Ảnh</th>
              <th className="p-5">Tên hiện vật</th>
              <th className="p-5">Quốc gia</th>
              <th className="p-5">Mô tả</th>
              <th className="p-5">Chất liệu</th>
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
                    {item.images?.[0]?.imageUrl ? (
                      <img src={item.images[0].imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-brand-text/50">No img</div>
                    )}
                  </div>
                </td>
                <td className="p-5 font-bold text-brand-text text-lg max-w-[200px]">
                  <div className="line-clamp-2">{item.name}</div>
                </td>
                <td className="p-5 text-brand-text/70">{item.country?.countryName || "-"}</td>
                <td className="p-5 text-brand-text/70 max-w-[250px]">
                  <div className="line-clamp-3">{item.description || "-"}</div>
                </td>
                <td className="p-5 text-brand-text/70">{item.material || "-"}</td>
                <td className="p-5 text-brand-text/70 whitespace-nowrap">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString("vi-VN") : "-"}
                </td>
                <td className="p-5 text-right space-x-3">
                  <button
                    onClick={() => navigate(`/admin/quan-trang/edit/${item.id}`)}
                    className="p-3 text-brand-yellow hover:bg-brand-yellow/20 rounded-xl transition-colors"
                  >
                    <Edit size={22} />
                  </button>
                  <button
                    onClick={() => requestDelete(item.id)}
                    className="p-3 text-brand-red hover:bg-brand-red/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan={8} className="p-16 text-center text-brand-text/50 italic text-xl">
                  Chưa có quân trang nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl border-4 border-brand-yellow/30">
            <h3 className="text-2xl font-display font-black text-brand-redDark mb-6 text-center">
              XÁC NHẬN XÓA
            </h3>
            <p className="text-brand-text mb-8 text-center">
              Bạn có chắc chắn muốn xóa quân trang này? Hành động không thể hoàn tác.
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="px-8 py-3 rounded-xl font-bold text-brand-text hover:bg-brand-bg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-8 py-3 bg-brand-red text-white rounded-xl font-bold shadow-pop hover:bg-brand-redDark hover:shadow-pop-hover transition-all"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}