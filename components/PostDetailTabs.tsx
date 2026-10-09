"use client";

import React, { useState, useRef } from "react";
import {
  Copy,
  Check,
  Download,
  Bookmark,
  Sparkles,
  Hash,
  MessageSquare,
  BarChart3,
  Lightbulb,
  Share2,
  RefreshCw,
  FileEdit,
  Layers,
  ArrowRight,
  TrendingUp,
  Smile,
  Loader2,
} from "lucide-react";
import { GenerationResult, SavedPost } from "@/types";
import { copyToClipboard, fireCelebrationConfetti, downloadAsTextFile } from "@/lib/helpers";

interface PostDetailTabsProps {
  data: GenerationResult;
  onUpdateContent: (updatedContent: string) => void;
  onSelectHeadline: (headline: string) => void;
  onSavePost: () => void;
  isSaved: boolean;
  onAddIcons?: () => void;
  isRefining?: boolean;
}

export default function PostDetailTabs({
  data,
  onUpdateContent,
  onSelectHeadline,
  onSavePost,
  isSaved,
  onAddIcons,
  isRefining,
}: PostDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"full" | "hooks" | "hashtags" | "media" | "seo">("full");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const popularEmojis = [
    { emoji: "🔥", title: "Hot / Giật tít" },
    { emoji: "💡", title: "Mẹo hay / Kiến thức" },
    { emoji: "📌", title: "Ghim / Lưu ý quan trọng" },
    { emoji: "✅", title: "Cam kết / Đúng chuẩn" },
    { emoji: "🛡️", title: "Bảo hành / Uy tín" },
    { emoji: "👉", title: "Chỉ dẫn / Xem ngay" },
    { emoji: "👇", title: "Comment bên dưới" },
    { emoji: "🎁", title: "Quà tặng / Ưu đãi" },
    { emoji: "⭐", title: "Chất lượng 5 sao" },
    { emoji: "💎", title: "Cao cấp" },
    { emoji: "😱", title: "Cảnh báo / Bất ngờ" },
    { emoji: "☎️", title: "Hotline / Liên hệ" },
    { emoji: "🏡", title: "Xưởng / Nhà cửa" },
    { emoji: "💥", title: "Bùng nổ" },
    { emoji: "⚡", title: "Nhanh chóng" },
    { emoji: "🎯", title: "Trúng đích" },
    { emoji: "🔹", title: "Gạch đầu dòng nhẹ" },
    { emoji: "❌", title: "Cảnh báo sai lầm" },
  ];

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onUpdateContent(data.fullContent + " " + emoji);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = data.fullContent.substring(0, start);
    const after = data.fullContent.substring(end);
    const updated = before + emoji + after;
    onUpdateContent(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 10);
  };

  const handleCopy = async (text: string, key: string, confetti = true) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedKey(key);
      if (confetti) fireCelebrationConfetti();
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleDownload = () => {
    const filename = `facebook-post-${Date.now()}.txt`;
    const fullText = `${data.fullContent}\n\n---\n[GỢI Ý FIRST COMMENT]:\n${data.firstCommentPrompt}\n\n[GỢI Ý MEDIA]:\nLoại: ${data.mediaSuggestion.type}\nText Overlay: ${data.mediaSuggestion.imageTextOverlay}\nÝ tưởng: ${data.mediaSuggestion.idea}`;
    downloadAsTextFile(filename, fullText);
  };

  // Word and character count
  const charCount = data.fullContent.length;
  const wordCount = data.fullContent.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 space-y-4">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl overflow-x-auto no-scrollbar text-xs font-semibold">
        <button
          onClick={() => setActiveTab("full")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeTab === "full"
              ? "bg-white text-blue-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>Bài viết hoàn chỉnh</span>
        </button>

        <button
          onClick={() => setActiveTab("hooks")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeTab === "hooks"
              ? "bg-white text-blue-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>3 Hook / Tiêu đề</span>
          <span className="w-2 h-2 rounded-full bg-amber-400" />
        </button>

        <button
          onClick={() => setActiveTab("hashtags")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeTab === "hashtags"
              ? "bg-white text-blue-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Hash className="w-3.5 h-3.5 text-blue-500" />
          <span>Bộ Hashtag ({data.hashtags?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab("media")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeTab === "media"
              ? "bg-white text-blue-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
          <span>First Comment & Media</span>
        </button>

        <button
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeTab === "seo"
              ? "bg-white text-blue-600 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Điểm SEO ({data.seoAnalysis?.score ?? 95}/100)</span>
        </button>
      </div>

      {/* TAB 1: FULL CONTENT & EDITOR */}
      {activeTab === "full" && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">{wordCount} từ</span>
              <span>·</span>
              <span>{charCount} ký tự</span>
              <span>·</span>
              <span className="text-emerald-600 font-medium">Độ dài tối ưu cho Newfeed</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onSavePost}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  isSaved
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-amber-500" : ""}`} />
                <span>{isSaved ? "Đã lưu" : "Lưu bài viết"}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all"
                title="Tải bài viết về máy tính"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tải .txt</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(data.fullContent, "fullContent")}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
              >
                {copiedKey === "fullContent" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép toàn bộ</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Facebook Icon & Emoji Toolbar */}
          <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mr-1">
                <Smile className="w-3.5 h-3.5 text-amber-500" />
                <span>Bấm chèn Icon:</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {popularEmojis.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertEmoji(item.emoji)}
                    title={`Chèn ${item.emoji} (${item.title})`}
                    className="w-7 h-7 flex items-center justify-center text-sm rounded-lg bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-400 hover:scale-110 active:scale-95 transition-all shadow-2xs cursor-pointer select-none"
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </div>

            {onAddIcons && (
              <button
                type="button"
                disabled={isRefining}
                onClick={onAddIcons}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                title="AI sẽ tự động chèn các icon sinh động vào tiêu đề, các gạch đầu dòng và CTA của bài viết"
              >
                {isRefining ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang thêm icon...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>✨ AI Tự Động Thêm Icon</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="relative">
            <textarea
              ref={textareaRef}
              value={data.fullContent}
              onChange={(e) => onUpdateContent(e.target.value)}
              rows={14}
              className="w-full p-4 text-sm text-slate-900 bg-slate-50/50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all leading-relaxed font-sans"
              placeholder="Nội dung bài viết Facebook..."
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>💡 Bạn có thể chỉnh sửa trực tiếp nội dung ở trên, bản mô phỏng Facebook sẽ cập nhật tức thì.</span>
          </div>
        </div>
      )}

      {/* TAB 2: 3 HOOK / HEADLINE OPTIONS */}
      {activeTab === "hooks" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Chọn tiêu đề / Hook mở đầu phù hợp nhất
            </h4>
            <p className="text-xs text-slate-500">
              3 dòng đầu quyết định 80% người xem có bấm &quot;...Xem thêm&quot; hay không. Bấm vào bất kỳ phương án nào bên dưới để đổi tiêu đề ngay vào bài viết!
            </p>
          </div>

          <div className="space-y-3">
            {data.headlineOptions?.map((hook, index) => {
              const hookTypes = [
                { label: "Gây tò mò / Khơi gợi câu hỏi", color: "text-amber-700 bg-amber-50 border-amber-200" },
                { label: "Lợi ích trực diện / Giải pháp bảo hành", color: "text-blue-700 bg-blue-50 border-blue-200" },
                { label: "Đồng cảm nỗi đau / Cảnh báo sai lầm", color: "text-rose-700 bg-rose-50 border-rose-200" },
              ];
              const type = hookTypes[index % hookTypes.length];
              const isSelected = data.selectedHeadline === hook;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20"
                      : "bg-slate-50/60 hover:bg-slate-100/70 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${type.color}`}>
                      Phương án {index + 1}: {type.label}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(hook, `hook-${index}`, false)}
                      className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      {copiedKey === `hook-${index}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600 font-medium">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 leading-snug mb-3">
                    {hook}
                  </p>

                  <button
                    type="button"
                    onClick={() => onSelectHeadline(hook)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-300 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đang được chọn cho bài viết</span>
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Áp dụng Hook này vào bài</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: HASHTAGS */}
      {activeTab === "hashtags" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-blue-600" />
                Bộ Hashtag Chuẩn SEO Facebook ({data.hashtags?.length || 0})
              </h4>
              <p className="text-xs text-slate-500">
                Phối hợp giữa Hashtag ngành hàng, vấn đề người mua và hành vi tìm kiếm.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(data.hashtags.join(" "), "allHashtags")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xs"
            >
              {copiedKey === "allHashtags" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép tất cả hashtag</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200">
            <div className="flex flex-wrap gap-2">
              {data.hashtags?.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCopy(tag, `tag-${idx}`, false)}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-xs"
                  title="Bấm để sao chép riêng hashtag này"
                >
                  <span>{tag}</span>
                  {copiedKey === `tag-${idx}` ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50/80 p-3.5 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
              Mẹo SEO Hashtag Facebook:
            </p>
            <p className="text-blue-800">
              - Nên đặt 8-15 hashtag ở cuối bài viết để không làm rối mắt người đọc.
            </p>
            <p className="text-blue-800">
              - Khi người dùng gõ tìm kiếm trên thanh search Facebook, các bài viết gắn hashtag liên quan sẽ có thứ hạng ưu tiên cao hơn.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: FIRST COMMENT & MEDIA SUGGESTIONS */}
      {activeTab === "media" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* First comment */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                Gợi ý Bình luận mồi (First Comment)
              </span>

              <button
                type="button"
                onClick={() => handleCopy(data.firstCommentPrompt, "firstComment")}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all shadow-xs"
              >
                {copiedKey === "firstComment" ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    <span>Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-amber-800 font-medium leading-relaxed bg-white/80 p-3 rounded-lg border border-amber-200">
              {data.firstCommentPrompt}
            </p>

            <p className="text-[11px] text-amber-700 italic">
              📌 Thuật toán Facebook 2026 sẽ bóp phân phối nếu bài viết chứa link dẫn ra ngoài website hoặc shopee. Hãy để link hoặc hotline ở bình luận này và ghim lên đầu!
            </p>
          </div>

          {/* Media suggestion */}
          {data.mediaSuggestion && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  Ý tưởng Media đi kèm bài viết
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {data.mediaSuggestion.type}
                </span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    Dòng chữ chèn lên ảnh (Text Overlay thu hút click):
                  </span>
                  <p className="text-sm font-bold text-blue-900 mt-0.5">
                    &ldquo;{data.mediaSuggestion.imageTextOverlay}&rdquo;
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    Ý tưởng concept hình ảnh / kịch bản video:
                  </span>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    {data.mediaSuggestion.idea}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SEO REPORT */}
      {activeTab === "seo" && data.seoAnalysis && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                Điểm chuẩn SEO Facebook
              </span>
              <div className="text-3xl font-extrabold text-emerald-600 my-1">
                {data.seoAnalysis.score}
                <span className="text-sm font-medium text-emerald-700">/100</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block">
                Tối ưu cực tốt
              </span>
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
              <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block mb-1">
                Sức hút 3 dòng đầu (Hook)
              </span>
              <p className="text-xs text-blue-950 font-medium leading-relaxed">
                {data.seoAnalysis.hookStrength}
              </p>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl">
              <span className="text-[11px] font-semibold text-indigo-800 uppercase tracking-wider block mb-1">
                Phân bổ từ khóa tìm kiếm
              </span>
              <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                {data.seoAnalysis.keywordDensity}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Mẹo triển khai tối đa tương tác cho bài viết này:
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {data.seoAnalysis.tips?.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
