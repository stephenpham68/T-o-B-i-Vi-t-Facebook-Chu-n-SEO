"use client";

import React, { useState } from "react";
import {
  Globe,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  CheckCircle2,
  Image as ImageIcon,
  Smartphone,
  Monitor,
  Pin,
  Sparkles,
} from "lucide-react";
import { GenerationResult } from "@/types";

interface FacebookPreviewProps {
  data: GenerationResult;
  brandName?: string;
}

export default function FacebookPreview({ data, brandName }: FacebookPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("mobile");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1240);

  const displayName = brandName?.trim() || "Chuyên Gia Đồ Gỗ & Nội Thất";

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  // Split lines to detect the "Hook" fold
  const lines = data.fullContent.split("\n");
  const initialLines = lines.slice(0, 3).join("\n");
  const hasMoreLines = lines.length > 3;

  return (
    <div className="bg-slate-100 rounded-2xl border border-slate-200/80 p-4 sm:p-5">
      {/* Top Preview Controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Mô phỏng hiển thị Facebook Feed thực tế
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
          <button
            onClick={() => setViewMode("mobile")}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              viewMode === "mobile"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Di động</span>
          </button>
          <button
            onClick={() => setViewMode("desktop")}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              viewMode === "desktop"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Máy tính</span>
          </button>
        </div>
      </div>

      {/* Main Post Card Container */}
      <div
        className={`mx-auto transition-all duration-300 ${
          viewMode === "mobile" ? "max-w-md" : "max-w-2xl"
        }`}
      >
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 overflow-hidden font-sans">
          {/* Post Header */}
          <div className="p-3.5 pb-2.5 flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-300 flex items-center justify-center text-white font-bold text-sm shadow-xs border border-white">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-white">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[13px] font-bold text-slate-900 hover:underline cursor-pointer leading-none">
                    {displayName}
                  </h4>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                  <span>Vừa xong</span>
                  <span>·</span>
                  <Globe className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            </div>

            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Post Content with "Xem thêm" Cutoff simulation */}
          <div className="px-3.5 py-2 text-[13.5px] text-slate-800 leading-relaxed whitespace-pre-line select-text">
            {isExpanded || !hasMoreLines ? (
              <span>{data.fullContent}</span>
            ) : (
              <span>
                {initialLines}
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="font-semibold text-slate-500 hover:text-blue-600 ml-1 inline-block cursor-pointer"
                >
                  ... Xem thêm
                </button>
              </span>
            )}

            {isExpanded && hasMoreLines && (
              <div className="mt-1">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  Thu gọn
                </button>
              </div>
            )}
          </div>

          {/* Post Media Mockup */}
          {data.mediaSuggestion && (
            <div className="mt-2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white text-center relative overflow-hidden group">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 max-w-sm mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-blue-200 border border-white/15">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{data.mediaSuggestion.type}</span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/20 shadow-lg">
                  <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block mb-1">
                    Gợi ý chữ in đè lên ảnh (Text Overlay)
                  </span>
                  <p className="font-extrabold text-base sm:text-lg text-white leading-tight drop-shadow-sm">
                    &ldquo;{data.mediaSuggestion.imageTextOverlay}&rdquo;
                  </p>
                </div>

                <p className="text-[11px] text-slate-300 italic line-clamp-2 px-2">
                  💡 Ý tưởng visual: {data.mediaSuggestion.idea}
                </p>
              </div>
            </div>
          )}

          {/* Post Reaction Bar */}
          <div className="px-3.5 py-2.5 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1 items-center">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] shadow-xs">
                  👍
                </span>
                <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px] shadow-xs">
                  ❤️
                </span>
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] shadow-xs">
                  😮
                </span>
              </div>
              <span className="font-medium text-[11px]">
                {likeCount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span>384 bình luận</span>
              <span>·</span>
              <span>126 lượt chia sẻ</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-2 py-1 flex items-center justify-between text-xs font-semibold text-slate-600">
            <button
              onClick={handleLike}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors hover:bg-slate-100 ${
                isLiked ? "text-blue-600" : ""
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-blue-600" : ""}`} />
              <span>{isLiked ? "Đã thích" : "Thích"}</span>
            </button>

            <button className="flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Bình luận</span>
            </button>

            <button className="flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Chia sẻ</span>
            </button>
          </div>

          {/* First Comment Pinned Section */}
          {data.firstCommentPrompt && (
            <div className="p-3 bg-slate-50/90 border-t border-slate-200/80">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 mb-1.5">
                <Pin className="w-3.5 h-3.5 fill-amber-600" />
                <span>Bình luận ghim đầu tiên (Chiến thuật chống bóp reach FB):</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed shadow-xs">
                {data.firstCommentPrompt}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
