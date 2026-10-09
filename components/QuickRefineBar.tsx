"use client";

import React, { useState } from "react";
import {
  Wand2,
  Minimize2,
  ShieldCheck,
  Smile,
  Flame,
  FileSpreadsheet,
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";

interface QuickRefineBarProps {
  onRefine: (action: string, customInstruction?: string) => Promise<void>;
  isRefining: boolean;
}

export default function QuickRefineBar({ onRefine, isRefining }: QuickRefineBarProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customText, setCustomText] = useState("");

  const quickActions = [
    {
      id: "add_icons",
      label: "✨ Thêm Icon sinh động",
      tooltip: "Tự động chèn các icon/emoji Facebook bắt mắt vào tiêu đề và các gạch đầu dòng",
    },
    {
      id: "warranty_focus",
      label: "🛡️ Nhấn mạnh bảo hành & cam kết",
      tooltip: "Xoáy sâu chính sách bảo hành, cam kết gỗ thật, bảo trì trọn đời",
    },
    {
      id: "shorten",
      label: "⚡ Rút ngắn súc tích",
      tooltip: "Cô đọng 30-40% các ý chính, dễ lướt nhanh",
    },
    {
      id: "add_urgency",
      label: "🔥 Thêm ưu đãi & giục giã",
      tooltip: "Tạo cảm giác khan hiếm, ưu đãi tháng này, quà tặng kèm",
    },
    {
      id: "add_humor",
      label: "🤣 Thêm dí dỏm & bắt trend",
      tooltip: "Ngôn từ tươi vui, tự nhiên, gần gũi",
    },
    {
      id: "lengthen_detailed",
      label: "📚 Mở rộng phân tích kỹ hơn",
      tooltip: "Thêm lưu ý kỹ thuật chuyên sâu và kinh nghiệm chọn thợ",
    },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim() || isRefining) return;
    onRefine("custom", customText.trim());
    setCustomText("");
    setShowCustomInput(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-sky-50/80 rounded-2xl border border-blue-200/80 p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
            <Wand2 className="w-3.5 h-3.5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Tinh chỉnh bài viết tức thì bằng 1 chạm
          </h4>
        </div>

        {isRefining && (
          <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold bg-white px-2.5 py-1 rounded-full border border-blue-200 shadow-xs">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>AI đang tinh chỉnh bài viết...</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {quickActions.map((act) => (
          <button
            key={act.id}
            type="button"
            disabled={isRefining}
            onClick={() => onRefine(act.id)}
            title={act.tooltip}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-200/90 hover:border-blue-600 shadow-xs transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-95"
          >
            {act.label}
          </button>
        ))}

        <button
          type="button"
          disabled={isRefining}
          onClick={() => setShowCustomInput(!showCustomInput)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl border shadow-xs transition-all ${
            showCustomInput
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
          }`}
        >
          ✍️ Yêu cầu sửa riêng...
        </button>
      </div>

      {showCustomInput && (
        <form onSubmit={handleCustomSubmit} className="mt-3 flex gap-2 animate-in fade-in duration-200">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="VD: Thêm lời khuyên nên đến tận xưởng xem mộc thô trước khi sơn..."
            className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
            autoFocus
          />
          <button
            type="submit"
            disabled={isRefining || !customText.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gửi</span>
          </button>
        </form>
      )}
    </div>
  );
}
