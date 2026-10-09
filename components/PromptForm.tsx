"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Store,
  Phone,
  Target,
  FileText,
  Lightbulb,
  Check,
  Zap,
} from "lucide-react";
import { GenerationParams } from "@/types";

interface PromptFormProps {
  onGenerate: (params: GenerationParams) => void;
  isLoading: boolean;
}

export default function PromptForm({ onGenerate, isLoading }: PromptFormProps) {
  const [query, setQuery] = useState("");
  const [brandOrShop, setBrandOrShop] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [postStyle, setPostStyle] = useState("qa_expert");
  const [tone, setTone] = useState("friendly");
  const [targetAudience, setTargetAudience] = useState("all");
  const [contentLength, setContentLength] = useState("medium");
  const [customNotes, setCustomNotes] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const sampleQueries = [
    {
      title: "🛡️ Đồ gỗ bảo hành tốt",
      text: "Nên mua đồ gỗ ở đâu để đảm bảo chính sách bảo hành tốt nhất?",
      style: "qa_expert",
    },
    {
      title: "❌ 5 sai lầm bàn ăn gỗ",
      text: "5 sai lầm tai hại khi chọn mua bàn ăn gỗ tự nhiên cho gia đình",
      style: "pas",
    },
    {
      title: "🛋️ Sofa gỗ sồi chung cư",
      text: "Bí quyết chọn bộ sofa gỗ sồi đẹp hiện đại cho phòng khách chung cư nhỏ",
      style: "aida",
    },
    {
      title: "🪵 Phân biệt gỗ xưởng mộc",
      text: "Kinh nghiệm phân biệt gỗ thật gỗ pha tạp khi đi mua nội thất xưởng mộc",
      style: "storytelling",
    },
  ];

  const styleOptions = [
    {
      id: "qa_expert",
      title: "Hỏi đáp Chuyên Gia",
      desc: "Giải đáp thắc mắc tận tâm, tạo niềm tin & uy tín cao nhất",
      badge: "Khuyên dùng",
    },
    {
      id: "pas",
      title: "Mô hình PAS",
      desc: "Nêu nỗi đau (sợ bảo hành miệng) -> Xoáy sâu -> Giải pháp vàng",
      badge: "Tỷ lệ chốt cao",
    },
    {
      id: "aida",
      title: "Mô hình AIDA",
      desc: "Gây chú ý cực mạnh -> Tạo hứng thú -> Thôi thúc hành động",
      badge: "Viral feed",
    },
    {
      id: "storytelling",
      title: "Kể chuyện thực tế",
      desc: "Tâm sự trải nghiệm khách hàng, chạm cảm xúc, dễ chia sẻ",
      badge: "Tự nhiên",
    },
    {
      id: "direct_sales",
      title: "Bán hàng & Cam kết",
      desc: "Nêu rõ chính sách bảo hành, ưu đãi và cam kết xưởng mộc",
      badge: "Chuyển đổi",
    },
    {
      id: "curiosity_trend",
      title: "Tò mò & Bắt Trend",
      desc: "Giật tít bất ngờ, kích thích dừng ngón tay bấm Xem Thêm",
      badge: "Tương tác cao",
    },
  ];

  const toneOptions = [
    { id: "friendly", label: "😊 Thân thiện, gần gũi" },
    { id: "expert", label: "👔 Chuyên gia uy tín" },
    { id: "humorous", label: "🤣 Hài hước, duyên dáng" },
    { id: "luxury", label: "✨ Sang trọng, cao cấp" },
    { id: "urgent", label: "🔥 Giục giã, cấp bách" },
  ];

  const audienceOptions = [
    { id: "all", label: "Tất cả khách hàng" },
    { id: "homeowners", label: "Gia chủ hoàn thiện nhà mới" },
    { id: "families", label: "Gia đình có con nhỏ" },
    { id: "youth", label: "Người trẻ hiện đại" },
    { id: "investors", label: "Dân kinh doanh / văn phòng" },
  ];

  const lengthOptions = [
    { id: "short", label: "Ngắn (150-250 từ)" },
    { id: "medium", label: "Vừa vặn (300-450 từ) ⭐" },
    { id: "long", label: "Sâu sắc (500-750 từ)" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    onGenerate({
      query: query.trim(),
      brandOrShop: brandOrShop.trim(),
      contactInfo: contactInfo.trim(),
      postStyle,
      tone,
      targetAudience,
      contentLength,
      customNotes: customNotes.trim(),
    });
  };

  const handleApplySample = (sample: { text: string; style: string }) => {
    setQuery(sample.text);
    setPostStyle(sample.style);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base">
              Nhập từ khóa hoặc câu hỏi của bạn
            </h2>
            <p className="text-xs text-slate-500">
              AI sẽ phân tích ý định tìm kiếm và tạo bài viết chuẩn SEO Facebook
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap hidden sm:inline-flex items-center gap-1 shadow-2xs">
          <span>✨ Tự động kèm Icon & Hashtag</span>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Query Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Chủ đề, từ khóa hoặc câu hỏi cần viết bài <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ví dụ: Nên mua đồ gỗ ở đâu để đảm bảo chính sách bảo hành tốt nhất?"
              rows={3}
              className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/70 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none resize-none placeholder:text-slate-400 font-medium"
              required
            />
          </div>
        </div>

        {/* Quick Sample Suggestions */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Gợi ý mẫu câu hỏi nhanh (bấm để thử ngay):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplySample(sample)}
                className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all ${
                  query === sample.text
                    ? "bg-blue-50 border-blue-400 text-blue-700 font-medium shadow-xs"
                    : "bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                {sample.text}
              </button>
            ))}
          </div>
        </div>

        {/* Post Styles Grid */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Phong cách bài viết Facebook
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {styleOptions.map((st) => {
              const isSelected = postStyle === st.id;
              return (
                <button
                  type="button"
                  key={st.id}
                  onClick={() => setPostStyle(st.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
                      : "bg-white hover:bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? "text-blue-900" : "text-slate-800"
                      }`}
                    >
                      {st.title}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {st.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {st.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Giọng điệu (Tone of Voice)
          </label>
          <div className="flex flex-wrap gap-2">
            {toneOptions.map((t) => {
              const isSelected = tone === t.id;
              return (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 py-1.5 hover:text-blue-600 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              Tùy chỉnh nâng cao (Tên shop, Thông tin liên hệ, Khách hàng mục tiêu, Độ dài)
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3.5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Store className="w-3.5 h-3.5 text-slate-400" />
                    Tên thương hiệu / Cửa hàng (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={brandOrShop}
                    onChange={(e) => setBrandOrShop(e.target.value)}
                    placeholder="VD: Xưởng Gỗ Mộc Gia Bảo"
                    className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Thông tin liên hệ / Địa chỉ / Hotline (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="VD: Hotline 0987.xxx.xxx - Xưởng tại Đồng Kỵ"
                    className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-slate-400" />
                    Đối tượng người đọc
                  </label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {audienceOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    Độ dài bài viết
                  </label>
                  <select
                    value={contentLength}
                    onChange={(e) => setContentLength(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {lengthOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Yêu cầu / Cam kết bổ sung riêng (nếu có)
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="VD: Nhấn mạnh bảo hành mối mọt trọn đời, miễn phí vận chuyển 50km..."
                  className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang phân tích SEO & sáng tạo bài viết Facebook...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white" />
                <span>Tạo Bài Viết Chuẩn SEO Facebook Ngay</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
