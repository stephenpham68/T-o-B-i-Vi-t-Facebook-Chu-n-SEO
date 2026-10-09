"use client";

import React from "react";
import { X, CheckCircle, AlertTriangle, Lightbulb, Zap, TrendingUp, Search } from "lucide-react";

interface SeoGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SeoGuidelinesModal({ isOpen, onClose }: SeoGuidelinesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Bí Kíp Viết Content Facebook Chuẩn SEO 2026
            </h3>
            <p className="text-xs text-slate-500">
              Cách thuật toán Newfeed & Facebook Search chấm điểm bài viết của bạn
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-700 max-h-[70vh] overflow-y-auto pr-1">
          {/* Rule 1 */}
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1.5">
            <h4 className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
              Quy tắc 3 Dòng Đầu Vàng (The Hook & Fold)
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Facebook sẽ tự động cắt ngắn bài viết sau khoảng 3-4 dòng đầu tiên bằng nút &quot;...Xem thêm&quot;. 3 dòng này <strong>bắt buộc phải chứa từ khóa chính</strong> (như &ldquo;đồ gỗ bảo hành tốt&rdquo;, &ldquo;sofa gỗ phòng khách&rdquo;) và giật tít đánh trúng nỗi đau hoặc trí tò mò để người dùng dừng lướt và bấm mở rộng bài viết.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5">
            <h4 className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
              Tránh Bóp Reach: Không để link ngoài ở bài viết chính
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Thuật toán Facebook muốn giữ chân người dùng trong ứng dụng. Nếu bài viết của bạn có link dẫn ra Shopee, Website, hoặc Zalo, Facebook sẽ giảm 50-70% lượt hiển thị tự nhiên. <strong>Giải pháp chuẩn:</strong> Hãy để link ở <em>Bình luận đầu tiên (First Comment)</em> và ghim lên đầu!
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-1.5">
            <h4 className="font-bold text-indigo-900 text-xs flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
              Hashtag Chuẩn SEO Facebook (8 - 15 tags)
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Facebook Search hoạt động dựa vào từ khóa trong văn bản và Hashtag. Cần kết hợp:
              <br />• <strong>Hashtag ngành lớn:</strong> #noithatdogo #dogomynghe
              <br />• <strong>Hashtag từ khóa nhu cầu:</strong> #kinhnghiemmuadogo #chinhsachbaohanh
              <br />• <strong>Hashtag thương hiệu / xưởng:</strong> #tenxuoongcuaban #xuongsanxuat
            </p>
          </div>

          {/* Rule 4 */}
          <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1.5">
            <h4 className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">4</span>
              Hình Ảnh Kèm Text Overlay (Chữ trên ảnh)
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Người lướt Newfeed nhìn thấy hình ảnh trước khi đọc chữ. Một bức ảnh có dòng chữ lớn nổi bật giải đáp thắc mắc (VD: <em>&ldquo;NÊN MUA ĐỒ GỖ Ở ĐÂU ĐƯỢC BẢO HÀNH TỐT NHẤT?&rdquo;</em>) sẽ kéo tỷ lệ click tăng gấp 3 lần so với chỉ đăng ảnh trơn.
            </p>
          </div>

          {/* Rule 5 */}
          <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-100 space-y-1.5">
            <h4 className="font-bold text-purple-900 text-xs flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">5</span>
              Call To Action (CTA) Kéo Comment
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Thuật toán coi mỗi bình luận là một điểm trọng số phân phối rất cao. Ở cuối bài, luôn đặt một câu hỏi mở hoặc tặng tài liệu/bảng giá miễn phí để khuyến khích độc giả comment thảo luận.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
          >
            Đã hiểu & Bắt đầu viết
          </button>
        </div>
      </div>
    </div>
  );
}
