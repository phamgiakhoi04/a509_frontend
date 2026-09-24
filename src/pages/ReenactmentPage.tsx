import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminApi } from "@/api/adminApi";
import LegacySidebar from "@/components/layout/LegacySidebar";

const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function ReenactmentPage() {
  const [countries, setCountries] = useState<any[]>([]);
  useEffect(() => { adminApi.getAllCountries().then((data) => setCountries(data || [])).catch(() => setCountries([])); }, []);

  return <div className="bg-white px-5 py-6 font-sans text-[#333]"><div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_290px]"><main>
    <div className="mb-7 bg-[#f1f1f1] px-3 py-2 text-[16px]">Hoạt động&nbsp; / &nbsp;Phục dựng trang phục</div>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{countries.map((country) => {
      const slug = slugify(country.countryName || "");
      return <Link key={country.id || slug} to={`/hoat-dong/phuc-dung/${slug}`} className="group bg-[#f1f1f1] p-4 text-center"><div className="mb-3 flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">{country.flagImageUrl ? <img src={country.flagImageUrl} alt={country.countryName} className="h-full w-full object-cover" /> : <span className="text-6xl text-[#ddd]">▧</span>}</div><h2 className="font-sans text-[21px] font-bold text-black group-hover:text-[#b51f24]">{country.countryName}</h2></Link>;
    })}</div>
    {!countries.length && <p className="py-16 text-center text-[#777]">Chưa có quốc gia phục dựng trong cơ sở dữ liệu.</p>}
  </main><LegacySidebar /></div></div>;
}
