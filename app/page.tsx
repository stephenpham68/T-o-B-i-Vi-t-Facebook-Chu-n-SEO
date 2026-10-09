"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PromptForm from "@/components/PromptForm";
import FacebookPreview from "@/components/FacebookPreview";
import PostDetailTabs from "@/components/PostDetailTabs";
import QuickRefineBar from "@/components/QuickRefineBar";
import HistoryDrawer from "@/components/HistoryDrawer";
import SeoGuidelinesModal from "@/components/SeoGuidelinesModal";
import { GenerationResult, GenerationParams, SavedPost } from "@/types";
import { Sparkles, AlertCircle, ArrowDown, CheckCircle2, TrendingUp, ShieldCheck, Hash } from "lucide-react";
import { fireCelebrationConfetti } from "@/lib/helpers";

// Default initial high quality sample based exactly on user's query
const INITIAL_DEMO_RESULT: GenerationResult = {
  headlineOptions: [
    "🔥 [CẢNH BÁO] 90% Người Mua Đồ Gỗ Mắc Bẫy 'Bảo Hành Bằng Miệng' – Đâu Mới Là Nơi Uy Tín?",
    "💡 Nên Mua Đồ Gỗ Ở Đâu Để Đảm Bảo Chính Sách Bảo Hành Tốt Nhất? 4 Tiêu Chí Vàng Cần Biết!",
    "😱 Bỏ Ra Mấy Chục Triệu Mua Đồ Gỗ Xong Bị Nứt Nẻ Không Ai Bảo Hành? Xem Ngay Để Tránh Bị Hớ!",
  ],
  selectedHeadline:
    "💡 Nên Mua Đồ Gỗ Ở Đâu Để Đảm Bảo Chính Sách Bảo Hành Tốt Nhất? 4 Tiêu Chí Vàng Cần Biết!",
  fullContent: `💡 NÊN MUA ĐỒ GỖ Ở ĐÂU ĐỂ ĐẢM BẢO CHÍNH SÁCH BẢO HÀNH TỐT NHẤT? 4 TIÊU CHÍ VÀNG CẦN BIẾT!

Bỏ ra cả vài chục triệu, thậm chí hàng trăm triệu để sắm sửa nội thất gỗ cho tổ ấm, nhưng điều khiến các bác lo lắng nhất là gì?
👉 "Lúc mua thì hứa hẹn đủ điều, đến khi gỗ cong vênh, mối mọt, nứt nẻ thì gọi cháy máy không thấy ai đến sửa!"

Nếu các bác đang băn khoăn tìm một địa chỉ mua đồ gỗ có chính sách bảo hành rõ ràng, uy tín dài hạn, hãy nhớ ngay 4 tiêu chí cốt lõi này trước khi xuống tiền nhé:

📌 1. Ưu tiên mua trực tiếp tại XƯỞNG SẢN XUẤT có pháp nhân rõ ràng
• Không qua trung gian thương mại: Khi có vấn đề phát sinh, chính thợ của xưởng sẽ đến xử lý trực tiếp thay vì đùn đẩy trách nhiệm.
• Được kiểm tra mộc thô trước khi phun sơn: Tránh tuyệt đối tình trạng pha tạp gỗ rác bên trong.

📌 2. Chính sách bảo hành phải thể hiện bằng HỢP ĐỒNG / PHIẾU BẢO HÀNH CÓ DẤU ĐỎ
• Đừng bao giờ tin vào "bảo hành miệng"!
• Hãy xem kỹ điều khoản: Bảo hành chất gỗ (mối mọt, nứt tách) tối thiểu bao nhiêu năm? Bảo trì trọn đời hay chỉ hỗ trợ vài tháng đầu?

📌 3. Cam kết thời gian xử lý sự cố (SLA) tại nhà
• Đơn vị chuyên nghiệp luôn cam kết: Có mặt hỗ trợ trong vòng 24h - 48h khi khách hàng báo lỗi sản phẩm.

📌 4. Xem đánh giá thực tế từ khách hàng cũ (Feedback có video/hình ảnh bàn giao)
• Đơn vị nào làm ăn tử tế sẽ không ngần ngại quay lại những công trình thực tế và công khai phản hồi của khách hàng.

---
🎁 LỜI KHUYÊN DÀNH CHO CÁC BÁC:
Đồ gỗ là tài sản dùng cả chục năm, đừng vì rẻ hơn vài triệu mà chọn nơi không có cam kết bảo hành minh bạch. 

👇 Bác nào đang chuẩn bị sắm nội thất phòng khách, phòng ngủ hoặc bàn ăn, cứ COMMENT dưới bài viết hoặc INBOX em gửi ngay:
✅ Bộ checklist kiểm tra gỗ chuẩn không pha tạp
✅ Bảng giá xưởng trực tiếp & Chính sách bảo hành vàng 5 năm - Bảo trì trọn đời!

#dogonoithat #kinhnghiemmuadogo #chinhsachbaohanh #noithatgotunhien #muadogoodau #xuonggotructiep #noithatdep #noithatphongkhach #dogomynghe #baohanhnoithat`,
  bodyWithoutHashtags: `💡 NÊN MUA ĐỒ GỖ Ở ĐÂU ĐỂ ĐẢM BẢO CHÍNH SÁCH BẢO HÀNH TỐT NHẤT? 4 TIÊU CHÍ VÀNG CẦN BIẾT!

Bỏ ra cả vài chục triệu, thậm chí hàng trăm triệu để sắm sửa nội thất gỗ cho tổ ấm, nhưng điều khiến các bác lo lắng nhất là gì?
👉 "Lúc mua thì hứa hẹn đủ điều, đến khi gỗ cong vênh, mối mọt, nứt nẻ thì gọi cháy máy không thấy ai đến sửa!"

Nếu các bác đang băn khoăn tìm một địa chỉ mua đồ gỗ có chính sách bảo hành rõ ràng, uy tín dài hạn, hãy nhớ ngay 4 tiêu chí cốt lõi này trước khi xuống tiền nhé:

📌 1. Ưu tiên mua trực tiếp tại XƯỞNG SẢN XUẤT có pháp nhân rõ ràng
• Không qua trung gian thương mại: Khi có vấn đề phát sinh, chính thợ của xưởng sẽ đến xử lý trực tiếp thay vì đùn đẩy trách nhiệm.
• Được kiểm tra mộc thô trước khi phun sơn: Tránh tuyệt đối tình trạng pha tạp gỗ rác bên trong.

📌 2. Chính sách bảo hành phải thể hiện bằng HỢP ĐỒNG / PHIẾU BẢO HÀNH CÓ DẤU ĐỎ
• Đừng bao giờ tin vào "bảo hành miệng"!
• Hãy xem kỹ điều khoản: Bảo hành chất gỗ (mối mọt, nứt tách) tối thiểu bao nhiêu năm? Bảo trì trọn đời hay chỉ hỗ trợ vài tháng đầu?

📌 3. Cam kết thời gian xử lý sự cố (SLA) tại nhà
• Đơn vị chuyên nghiệp luôn cam kết: Có mặt hỗ trợ trong vòng 24h - 48h khi khách hàng báo lỗi sản phẩm.

📌 4. Xem đánh giá thực tế từ khách hàng cũ (Feedback có video/hình ảnh bàn giao)
• Đơn vị nào làm ăn tử tế sẽ không ngần ngại quay lại những công trình thực tế và công khai phản hồi của khách hàng.

---
🎁 LỜI KHUYÊN DÀNH CHO CÁC BÁC:
Đồ gỗ là tài sản dùng cả chục năm, đừng vì rẻ hơn vài triệu mà chọn nơi không có cam kết bảo hành minh bạch. 

👇 Bác nào đang chuẩn bị sắm nội thất phòng khách, phòng ngủ hoặc bàn ăn, cứ COMMENT dưới bài viết hoặc INBOX em gửi ngay:
✅ Bộ checklist kiểm tra gỗ chuẩn không pha tạp
✅ Bảng giá xưởng trực tiếp & Chính sách bảo hành vàng 5 năm - Bảo trì trọn đời!`,
  hashtags: [
    "#dogonoithat",
    "#kinhnghiemmuadogo",
    "#chinhsachbaohanh",
    "#noithatgotunhien",
    "#muadogoodau",
    "#xuonggotructiep",
    "#noithatdep",
    "#noithatphongkhach",
    "#dogomynghe",
    "#baohanhnoithat",
  ],
  callToAction:
    "Bác nào đang chuẩn bị sắm nội thất cứ COMMENT dưới bài viết hoặc INBOX em gửi ngay bộ checklist kiểm tra gỗ và chính sách bảo hành 5 năm nhé!",
  firstCommentPrompt:
    "💬 [GHIM ĐẦU]: Cảm ơn các bác đã quan tâm! Để xem chi tiết mẫu hợp đồng bảo hành 5 năm và ghé thăm trực tiếp xưởng mộc, các bác bấm xem tại: https://xuongmocuytin.vn hoặc nhắn Zalo Hotline 0988.xxx.xxx để em hỗ trợ tư vấn miễn phí 24/7 nhé ạ! 👇",
  mediaSuggestion: {
    type: "Album 4 ảnh",
    idea: "Ảnh 1 là ảnh bàn giao phòng khách gỗ tự nhiên lộng lẫy có gắn chữ Text Overlay nổi bật; Ảnh 2 là ảnh hợp đồng bảo hành dấu đỏ; Ảnh 3 là cảnh thợ đang kiểm tra mộc thô tại xưởng; Ảnh 4 là feedback hài lòng của gia chủ.",
    imageTextOverlay: "MUA ĐỒ GỖ Ở ĐÂU ĐƯỢC BẢO HÀNH TỐT NHẤT? 4 LƯU Ý TRÁNH TIỀN MẤT TẬT MANG",
  },
  seoAnalysis: {
    score: 98,
    hookStrength: "Xuất sắc - 3 dòng đầu đánh trúng nỗi đau 'bảo hành miệng', thôi thúc bấm Xem thêm ngay lập tức.",
    keywordDensity: "Tối ưu - Từ khóa 'mua đồ gỗ ở đâu', 'chính sách bảo hành' xuất hiện tự nhiên trong tiêu đề, thân bài và thẻ hashtag.",
    engagementPotential: "Rất cao - Kêu gọi comment tặng checklist kích thích hàng trăm tương tác tự nhiên.",
    tips: [
      "Nên đăng bài vào khung giờ vàng 11h30 - 13h00 hoặc 20h00 - 21h30 để tối đa lượt tiếp cận gia chủ.",
      "Hãy trả lời tất cả các bình luận trong 60 phút đầu tiên để thuật toán Facebook đẩy bài viết lên Newfeed bạn bè của họ.",
      "Ghim First Comment ngay sau khi đăng bài để không bị Facebook giảm phân phối do chèn link ngoài.",
    ],
  },
};

const STORAGE_KEY = "autopost_fb_saved_posts_v1";

export default function Home() {
  const [generatedData, setGeneratedData] = useState<GenerationResult>(INITIAL_DEMO_RESULT);
  const [lastParams, setLastParams] = useState<GenerationParams | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const saveToLocalStorage = (posts: SavedPost[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      setSavedPosts(posts);
    } catch (e) {
      console.error("Failed to save posts", e);
    }
  };

  const isCurrentPostSaved = savedPosts.some(
    (p) => p.fullContent === generatedData.fullContent
  );

  const handleGenerate = async (params: GenerationParams) => {
    setIsLoading(true);
    setError(null);
    setLastParams(params);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Không thể tạo bài viết.");
      }

      setGeneratedData(data);
      fireCelebrationConfetti();
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi tạo bài viết.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (action: string, customInstruction?: string) => {
    if (!generatedData) return;
    setIsRefining(true);
    setError(null);

    try {
      const response = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentContent: generatedData.fullContent,
          action,
          customInstruction,
          query: lastParams?.query || "Đồ gỗ bảo hành tốt",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Không thể tinh chỉnh bài viết.");
      }

      setGeneratedData((prev) => ({
        ...prev,
        fullContent: data.fullContent,
        bodyWithoutHashtags: data.bodyWithoutHashtags,
        hashtags: data.hashtags || prev.hashtags,
        callToAction: data.callToAction || prev.callToAction,
        selectedHeadline: data.headline || prev.selectedHeadline,
      }));

      fireCelebrationConfetti();
    } catch (err: any) {
      setError(err.message || "Lỗi khi tinh chỉnh bài viết.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleUpdateContent = (updatedContent: string) => {
    setGeneratedData((prev) => ({
      ...prev,
      fullContent: updatedContent,
    }));
  };

  const handleSelectHeadline = (headline: string) => {
    // Replace the first line of fullContent with the new headline
    const lines = generatedData.fullContent.split("\n");
    lines[0] = headline;
    const newContent = lines.join("\n");

    setGeneratedData((prev) => ({
      ...prev,
      selectedHeadline: headline,
      fullContent: newContent,
    }));
    fireCelebrationConfetti();
  };

  const handleSavePost = () => {
    if (isCurrentPostSaved) return;

    const newPost: SavedPost = {
      id: "post_" + Date.now(),
      createdAt: Date.now(),
      query: lastParams?.query || "Bài viết Facebook",
      brandOrShop: lastParams?.brandOrShop || "",
      selectedHeadline: generatedData.selectedHeadline,
      fullContent: generatedData.fullContent,
      hashtags: generatedData.hashtags,
      postStyle: lastParams?.postStyle || "qa_expert",
    };

    const updated = [newPost, ...savedPosts];
    saveToLocalStorage(updated);
    fireCelebrationConfetti();
  };

  const handleDeletePost = (id: string) => {
    const updated = savedPosts.filter((p) => p.id !== id);
    saveToLocalStorage(updated);
  };

  const handleClearAllSaved = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách bài viết đã lưu?")) {
      saveToLocalStorage([]);
    }
  };

  const handleLoadPost = (post: SavedPost) => {
    setGeneratedData({
      ...INITIAL_DEMO_RESULT,
      selectedHeadline: post.selectedHeadline,
      fullContent: post.fullContent,
      hashtags: post.hashtags || [],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-100 text-slate-900 font-sans antialiased pb-16">
      {/* Navbar */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        savedCount={savedPosts.length}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Copywriting & Facebook Search SEO 2026</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Tạo Bài Viết Facebook <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Chuẩn SEO & Kéo Tương Tác</span> Tự Động
          </h2>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
            Chỉ cần nhập từ khóa hoặc câu hỏi của khách hàng, AI sẽ tự động phân tích ý định tìm kiếm, tạo 3 dòng đầu cuốn hút (Hook), bố cục thoáng dễ đọc, kèm lời kêu gọi hành động, bộ hashtag tối ưu và bình luận mồi chống bóp reach.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Hook 3 dòng trước nút &quot;Xem thêm&quot;
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
              <Hash className="w-4 h-4 text-blue-500" />
              Hashtag tìm kiếm chuẩn ngành
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              Gợi ý First Comment ghim link
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <span className="font-bold">Thông báo: </span>
                <span>{error}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {lastParams && (
                <button
                  type="button"
                  onClick={() => handleGenerate(lastParams)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Thử lại ngay
                </button>
              )}
              <button
                type="button"
                onClick={() => setError(null)}
                className="px-2.5 py-1.5 text-slate-600 hover:text-slate-900 font-medium rounded-lg transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Input Form & Quick Refine */}
          <div className="lg:col-span-5 space-y-5">
            <PromptForm onGenerate={handleGenerate} isLoading={isLoading} />

            {/* Quick Refine Toolbar */}
            {generatedData && (
              <QuickRefineBar onRefine={handleRefine} isRefining={isRefining} />
            )}
          </div>

          {/* Right Column: Live Facebook Preview & Post Detail Tabs */}
          <div className="lg:col-span-7 space-y-5">
            {/* Post Detail Tabs (Editor, Hooks, Hashtags, Media, SEO Score) */}
            <PostDetailTabs
              data={generatedData}
              onUpdateContent={handleUpdateContent}
              onSelectHeadline={handleSelectHeadline}
              onSavePost={handleSavePost}
              isSaved={isCurrentPostSaved}
              onAddIcons={() => handleRefine("add_icons")}
              isRefining={isRefining}
            />

            {/* Realistic Facebook Feed Mockup */}
            <FacebookPreview
              data={generatedData}
              brandName={lastParams?.brandOrShop}
            />
          </div>
        </div>
      </main>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedPosts={savedPosts}
        onLoadPost={handleLoadPost}
        onDeletePost={handleDeletePost}
        onClearAll={handleClearAllSaved}
      />

      {/* SEO Guidelines Modal */}
      <SeoGuidelinesModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
