import { Link } from "react-router-dom";
import Card, { CardContent } from "@/components/ui/Card";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-page py-10">
        <Card>
          <CardContent>
            <div className="font-semibold text-lg">Liên hệ</div>
            <ul className="mt-4 text-sm text-slate-700 space-y-2">
              <li>Email: phamgiakhoi04@gmail.com</li>
              <li>
                Facebook:{" "}
                <a
                  href="https://www.facebook.com/A509VN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-redDark hover:text-brand-yellow hover:underline transition-colors"
                >
                  facebook.com/A509VN
                </a>
              </li>
              <li>
                Twitter:{" "}
                <a
                  href="https://x.com/A509VN?s=20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-redDark hover:text-brand-yellow hover:underline transition-colors"
                >
                  x.com/A509VN
                </a>
              </li>
              <li>
                YouTube:{" "}
                <a
                  href="https://www.youtube.com/@A509VN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-redDark hover:text-brand-yellow hover:underline transition-colors"
                >
                  youtube.com/@A509VN
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="container-page pb-10 text-xs text-slate-500 text-center">
        © {new Date().getFullYear()} A509 - Dự án tái hiện lịch sử Việt Nam
      </div>
    </footer>
  );
}