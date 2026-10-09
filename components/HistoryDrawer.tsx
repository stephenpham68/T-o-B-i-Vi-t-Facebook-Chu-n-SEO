"use client";

import React, { useState } from "react";
import {
  X,
  Trash2,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ExternalLink,
  Search,
  FileText,
} from "lucide-react";
import { SavedPost } from "@/types";
import { copyToClipboard, fireCelebrationConfetti } from "@/lib/helpers";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPosts: SavedPost[];
  onLoadPost: (post: SavedPost) => void;
  onDeletePost: (id: string) => void;
  onClearAll: () => void;
}

export default function HistoryDrawer({
  isOpen,
  onClose,
  savedPosts,
  onLoadPost,
  onDeletePost,
  onClearAll,
}: HistoryDrawerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredPosts = savedPosts.filter(
    (p) =>
      p.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.selectedHeadline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fullContent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = async (id: string, content: string) => {
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopiedId(id);
      fireCelebrationConfetti();
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Kho lưu trữ bài viết ({savedPosts.length})
            </h3>
            <p className="text-xs text-slate-500">
              Các bài viết đã được lưu trên thiết bị của bạn
            </p>
          </div>

          <div className="flex items-center gap-2">
            {savedPosts.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs text-red-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                title="Xóa tất cả"
              >
                Xóa hết
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo chủ đề, tiêu đề..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 rounded-lg border-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>
        </div>

        {/* List of Posts */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredPosts.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
              <FileText className="w-10 h-10 text-slate-300" />
              <p className="text-xs">Chưa có bài viết nào được lưu hoặc không tìm thấy kết quả.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {post.query}
                  </span>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                  {post.selectedHeadline || post.fullContent.split("\n")[0]}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed whitespace-pre-line">
                  {post.fullContent}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(post.id, post.fullContent)}
                      className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1 transition-all"
                    >
                      {copiedId === post.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onLoadPost(post);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium flex items-center gap-1 transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Mở xem & sửa</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeletePost(post.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                    title="Xóa bài viết này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
