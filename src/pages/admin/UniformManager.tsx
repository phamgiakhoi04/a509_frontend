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
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-800 uppercase">Quản lý Quân trang</h1>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-red-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus size={20} /> Thêm mới
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl font-bold mb-8 text-red-800 border-b pb-3">THÊM QUÂN TRANG MỚI</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tên hiện vật</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                    placeholder="Ví dụ: Mũ cối 1954..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none resize-none"
                    placeholder="Mô tả chi tiết..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Hình ảnh</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-500 transition-colors relative group cursor-pointer bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {previewUrl ? (
                      <div className="relative inline-block">
                        <img src={previewUrl} alt="preview" className="max-h-48 object-contain rounded shadow" />
                        <div className="absolute inset-0 bg-black/40 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-semibold">Thay đổi</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={48} className="mx-auto mb-3 text-gray-400 group-hover:text-red-500 transition-colors" />
                        <p className="text-sm font-medium text-gray-500 group-hover:text-red-600">Click hoặc kéo thả ảnh (tối đa 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 bg-red-800 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-60 flex items-center gap-2"
                >
                  {loading && <Loader2 className="animate-spin" size={18} />}
                  {loading ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Ảnh</th>
              <th className="p-4">Tên</th>
              <th className="p-4">Ngày tạo</th>
              <th className="p-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 text-gray-500 font-mono">#{item.id}</td>
                <td className="p-4">
                  <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 border border-gray-200">
                    {item.images?.[0]?.url ? (
                      <img src={item.images[0].url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No img</div>
                    )}
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-800">{item.name}</td>
                <td className="p-4 text-sm text-gray-500">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString("vi-VN") : "-"}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-gray-400 italic">
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