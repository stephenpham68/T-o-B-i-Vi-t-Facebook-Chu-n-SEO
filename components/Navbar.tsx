"use client";

import React from "react";
import { Sparkles, History, HelpCircle, Share2, CheckCheck } from "lucide-react";

interface NavbarProps {
  onOpenHistory: () => void;
  onOpenGuide: () => void;
  savedCount: number;
}

export default function Navbar({ onOpenHistory, onOpenGuide, savedCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                AutoPost <span className="text-blue-600">FB</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                SEO Facebook 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Tạo bài viết triệu tương tác, tối ưu thuật toán tìm kiếm & Newfeed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors border border-slate-200"
            title="Bí kíp SEO Facebook"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="hidden md:inline">Bí kíp SEO FB</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors border border-slate-200 relative"
          >
            <History className="w-4 h-4 text-indigo-600" />
            <span>Bài đã lưu</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-blue-600 text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Gemini 3.8 Flash AI</span>
          </div>
        </div>
      </div>
    </header>
  );
}
