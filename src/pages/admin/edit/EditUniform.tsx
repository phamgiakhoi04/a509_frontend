import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "@/api/adminApi";
import Button from "@/components/ui/Button";
import { UploadCloud, X, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { Uniform, CountryOption } from "@/types/models";

export default function EditUniform() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [uniform, setUniform] = useState<Uniform | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    history: "",
    material: "",
    countryId: 1,
  });

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newSelectedImages, setNewSelectedImages] = useState<File[]>([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [uniformData, countriesData] = await Promise.all([
          adminApi.getUniformById(Number(id)),
          adminApi.getAllCountries(),
        ]);

        setUniform(uniformData);
        setCountries(countriesData || []);

        setFormData({
          name: uniformData.name || "",
          description: uniformData.description || "",
          history: uniformData.history || "",
          material: uniformData.material || "",
          countryId: uniformData.countryId || 1,
        });

        setExistingImages(uniformData.images?.map((img: any) => img.imageUrl) || []);
      } catch (error: any) {
        console.error("Lỗi tải dữ liệu:", error);
        alert(error.response?.data?.message || "Không thể tải thông tin quân trang");
        navigate("/admin/quan-trang");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [id, navigate]);

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (files.some((f) => f.size > 5 * 1024 * 1024)) {
      alert("Mỗi ảnh tối đa 5MB");
      return;
    }

    const totalAfter = newSelectedImages.length + files.length + existingImages.length;
    if (totalAfter > 5) {
      alert(`Tổng số ảnh không được vượt quá 5 (hiện có ${existingImages.length})`);
      return;
    }

    setNewSelectedImages((prev) => [...prev, ...files]);
    setNewPreviewUrls((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeNewPreview = (index: number) => {
    setNewSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!formData.name.trim()) {
      alert("Tên hiện vật không được để trống");
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmSave = async () => {
    setShowConfirmModal(false);
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("history", formData.history || "");
      formDataToSend.append("material", formData.material || "");
      formDataToSend.append("countryId", formData.countryId.toString());

      newSelectedImages.forEach((file) => {
        formDataToSend.append("imageFiles", file);
      });

      await adminApi.updateUniform(Number(id), formDataToSend);

      setShowSuccessToast(true);
    } catch (error: any) {
      console.error("Lỗi cập nhật:", error);
      alert(error.response?.data?.message || "Lỗi khi cập nhật quân trang");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-brand-red" size={48} />
      </div>
    );
  }

  if (!uniform) return null;

  return (
    <div className="p-8 font-body max-w-5xl mx-auto relative">
      <button
        onClick={() => navigate("/admin/quan-trang")}
        className="mb-8 flex items-center gap-2 text-brand-text hover:text-brand-red transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Quay lại danh sách
      </button>

      <h1 className="text-4xl font-display font-black text-brand-redDark uppercase tracking-wide mb-10">
        CHỈNH SỬA QUÂN TRANG
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10 bg-white rounded-3xl p-10 shadow-pop border-4 border-brand-yellow/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-lg font-bold text-brand-text mb-3">Tên hiện vật *</label>
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
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-lg font-bold text-brand-text mb-3">Lịch sử sử dụng</label>
            <textarea
              className="w-full border-2 border-brand-red/30 rounded-xl p-4 h-32 text-lg focus:ring-4 focus:ring-brand-yellow outline-none resize-none transition-all"
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
            <label className="block text-lg font-bold text-brand-text mb-3">Quốc gia *</label>
            <select
              className="w-full border-2 border-brand-red/30 rounded-xl p-4 text-lg focus:ring-4 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all bg-white"
              value={formData.countryId}
              onChange={(e) => setFormData({ ...formData, countryId: Number(e.target.value) })}
              required
            >
              <option value="">-- Chọn quốc gia --</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.countryName}
                </option>
              ))}
            </select>
            {uniform.country && (
              <p className="mt-2 text-sm text-brand-text/70">
                Quốc gia hiện tại: <strong>{uniform.country.countryName}</strong>
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-lg font-bold text-brand-text mb-4">Ảnh hiện tại</label>
            {existingImages.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {existingImages.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden shadow-pop border-2 border-brand-yellow/30 aspect-[4/3]"
                  >
                    <img src={url} alt={`existing-${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-brand-text/60 italic">Chưa có ảnh nào cho quân trang này</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-lg font-bold text-brand-text mb-3">
              Thêm ảnh mới (tổng số ảnh không vượt quá 5)
            </label>
            <div className="border-4 border-dashed border-brand-red/30 rounded-3xl p-10 text-center hover:border-brand-yellow transition-all relative group cursor-pointer bg-brand-bg/50">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              {newPreviewUrls.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {newPreviewUrls.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`new-preview-${idx}`}
                        className="w-full h-32 object-cover rounded-xl shadow"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewPreview(idx)}
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
                    Click hoặc kéo thả ảnh mới (tối đa 30MB mỗi ảnh)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-6 pt-8 border-t border-brand-red/20">
          <button
            type="button"
            onClick={() => navigate("/admin/quan-trang")}
            className="px-8 py-3 rounded-xl font-bold text-brand-text hover:bg-brand-bg transition-colors"
          >
            Hủy
          </button>
          <Button
            type="submit"
            disabled={saving || !formData.name.trim()}
            className="px-10 py-3 bg-brand-red text-white rounded-xl font-bold shadow-pop hover:bg-brand-redDark hover:shadow-pop-hover disabled:opacity-50 flex items-center gap-3 transition-all"
          >
            {saving && <Loader2 className="animate-spin" size={22} />}
            {saving ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </div>
      </form>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl border-4 border-brand-yellow/30">
            <h3 className="text-2xl font-display font-black text-brand-redDark mb-6 text-center">
              XÁC NHẬN THAY ĐỔI
            </h3>
            <p className="text-brand-text mb-8 text-center">
              Bạn có chắc chắn muốn lưu thay đổi cho quân trang này không?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-8 py-3 rounded-xl font-bold text-brand-text hover:bg-brand-bg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={confirmSave}
                disabled={saving}
                className="px-8 py-3 bg-brand-red text-white rounded-xl font-bold shadow-pop hover:bg-brand-redDark hover:shadow-pop-hover disabled:opacity-50 flex items-center gap-3 transition-all"
              >
                {saving && <Loader2 className="animate-spin" size={20} />}
                {saving ? "Đang lưu..." : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 border-2 border-green-400/30">
            <CheckCircle size={24} className="text-white" />
            <span className="font-medium text-base">Cập nhật thành công!</span>
          </div>
        </div>
      )}
    </div>
  );
}