import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      query,
      brandOrShop = "",
      contactInfo = "",
      postStyle = "qa_expert",
      tone = "friendly",
      targetAudience = "all",
      contentLength = "medium",
      customNotes = "",
    } = body;

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Vui lòng nhập từ khóa hoặc câu hỏi cần viết content." },
        { status: 400 }
      );
    }

    const styleDescriptions: Record<string, string> = {
      qa_expert: "Hỏi đáp Chuyên Gia: Đóng vai chuyên gia trong ngành giải đáp chi tiết, tận tâm câu hỏi của người dùng, phân tích sâu và đưa ra lời khuyên khách quan đáng tin cậy.",
      pas: "Mô hình PAS (Problem - Agitate - Solve): Nêu bật nỗi đau/lo lắng (sợ mua phải gỗ đểu, bảo hành miệng), xoáy sâu hậu quả, sau đó đưa ra giải pháp bảo hành uy tín, tận tâm.",
      aida: "Mô hình AIDA (Attention - Interest - Desire - Action): Thu hút sự chú ý ngay dòng đầu, tạo hứng thú với các kiến thức độc lạ, khơi gợi khao khát sở hữu sản phẩm chuẩn và kêu gọi hành động.",
      storytelling: "Kể chuyện trải nghiệm thực tế: Kể lại câu chuyện thật của một khách hàng hoặc trải nghiệm đi chọn đồ, từ lúc băn khoăn đến khi tìm được nơi ưng ý.",
      direct_sales: "Bán hàng & Cam kết dịch vụ: Trực diện vào chính sách bảo hành vàng, khuyến mãi, cam kết xưởng mộc, chất lượng gỗ thật và ưu đãi.",
      curiosity_trend: "Tò mò & Bắt Trend: Giật tít kích thích trí tò mò, mở đầu bất ngờ, giọng điệu cuốn hút khiến người đọc phải dừng ngón tay lướt feed.",
    };

    const toneDescriptions: Record<string, string> = {
      friendly: "Thân thiện, gần gũi, xưng hô anh/chị/các bác, như một người bạn am hiểu tâm sự.",
      expert: "Chuyên nghiệp, uy tín, đĩnh đạc, logic và có kiến thức sâu về kỹ thuật/tiêu chuẩn.",
      humorous: "Hài hước, duyên dáng, dí dỏm, dùng từ ngữ trend tự nhiên nhưng vẫn giữ uy tín.",
      luxury: "Sang trọng, tinh tế, cao cấp, hướng đến sự đẳng cấp và giá trị bền vững.",
      urgent: "Kêu gọi cấp bách, sôi nổi, tạo cảm giác khan hiếm và quyền lợi đặc biệt không nên bỏ lỡ.",
    };

    const audienceDescriptions: Record<string, string> = {
      all: "Đại chúng, phù hợp mọi đối tượng quan tâm",
      homeowners: "Chủ nhà mới xây/mua chung cư, đang hoàn thiện nội thất tổ ấm",
      families: "Các gia đình trẻ, quan tâm độ bền, an toàn cho trẻ nhỏ và ngân sách hợp lý",
      youth: "Người trẻ, thích phong cách hiện đại, tối giản, tiện dụng",
      investors: "Dân kinh doanh, văn phòng, mua sắm cần hóa đơn, uy tín lâu năm",
    };

    const lengthGuide: Record<string, string> = {
      short: "Ngắn gọn, súc tích (khoảng 150 - 250 từ), tập trung ý chính, dễ đọc nhanh trên di động.",
      medium: "Vừa phải (khoảng 300 - 450 từ), độ dài vàng cho Facebook post nhiều tương tác.",
      long: "Chi tiết, sâu sắc (khoảng 500 - 750 từ), phân tích kỹ từng tiêu chí, phù hợp bài viết giá trị cao.",
    };

    const systemInstruction = `Bạn là chuyên gia Copywriter và Facebook SEO hàng đầu Việt Nam, chuyên sáng tạo những bài viết Facebook triệu reach, tối ưu thuật toán hiển thị (Graph Search & Facebook Feed Algorithm 2026).

QUY TẮC BẮT BUỘC VỀ ICON / EMOJI FACEBOOK:
1. BÀI VIẾT FACEBOOK BẮT BUỘC PHẢI CÓ ĐẦY ĐỦ ICON/EMOJI ĐỂ HÚT MẮT VÀ CHUẨN ĐỊNH DẠNG:
   - TIÊU ĐỀ CHÍNH & MỌI PHƯƠNG ÁN HOOK: Bắt buộc mở đầu bằng 1-2 icon bắt mắt (Ví dụ: 🔥, 💡, 😱, 💥, 📌, 🚨, ⚠️, 🎯). Tuyệt đối không để tiêu đề trơn chữ.
   - DÒNG MỞ ĐẦU / CÂU HỎI TƯƠNG TÁC: Dùng icon chỉ dẫn hoặc cảm xúc (Ví dụ: 👉, 🤔, ❓, ⚡, 😭).
   - TỪNG ĐẦU MỤC & GẠCH ĐẦU DÒNG: Mỗi tiêu chí, giải pháp, lưu ý BẮT BUỘC phải có icon nổi bật ở đầu dòng (Ví dụ: 📌 1., 🛡️ 2., ✅ 3., 💡 4., 🔹, ⭐, 🎯). Tuyệt đối không dùng số trần trụi hay dấu chấm đen thô không icon.
   - LỜI KHUYÊN & LỜI KÊU GỌI HÀNH ĐỘNG (CTA): Phải có icon thu hút (Ví dụ: 🎁 LỜI KHUYÊN, 👇 Bác nào cần..., 💬 COMMENT ngay, ☎️ HOTLINE, 📦 MIỄN PHÍ).
   - CAM KẾT / BẢO HÀNH: Dùng icon bảo chứng (Ví dụ: 🛡️, 💎, 📜, 🏆, ✅).

2. BỐ CỤC THÂN BÀI (BODY):
   - Tuyệt đối không viết thành một đoạn văn dài đặc chữ. Cần ngắt dòng thoáng, xuống dòng đôi.
   - 3 dòng đầu (The Hook) PHẢI chứa từ khóa chính tự nhiên, giật tít thu hút để kích thích người lướt dừng ngón tay và bấm "...Xem thêm".
   - Nội dung giải đáp trúng tim đen câu hỏi/tử khóa, cung cấp thông tin thực chất (ví dụ tiêu chí bảo hành: xưởng trực tiếp, hợp đồng giấy tờ rõ ràng, bảo hành mối mọt nứt nẻ, hỗ trợ bảo trì tại nhà, uy tín).

3. BỘ HASHTAG CHUẨN SEO FACEBOOK:
   - 8 đến 15 hashtag chọn lọc, bao gồm hashtag ngành chính, hashtag từ khóa tìm kiếm và hashtag thương hiệu.

4. FIRST COMMENT (BÌNH LUẬN MỒI GỢI Ý):
   - Kèm icon 💬, 👇, 🌐, chèn link hoặc thông tin liên hệ chi tiết ở First Comment ghim để bài viết chính không bị bóp reach.

5. GỢI Ý MEDIA (HÌNH ẢNH/REELS):
   - Ý tưởng ảnh hoặc video kèm bài viết để tăng tỷ lệ click và giữ chân người xem.`;

    const prompt = `Yêu cầu viết bài Facebook chuẩn SEO cho:
Từ khóa / Câu hỏi của người dùng: "${query}"
${brandOrShop ? `Tên thương hiệu / Cửa hàng: "${brandOrShop}"` : "Nếu chưa có thương hiệu cụ thể, hãy viết bài mang tính chia sẻ chuyên gia kinh nghiệm uy tín."}
${contactInfo ? `Thông tin liên hệ bổ sung: "${contactInfo}"` : ""}
Phong cách bài viết: ${styleDescriptions[postStyle] || postStyle}
Giọng văn: ${toneDescriptions[tone] || tone}
Đối tượng mục tiêu: ${audienceDescriptions[targetAudience] || targetAudience}
Độ dài mong muốn: ${lengthGuide[contentLength] || contentLength}
${customNotes ? `Ghi chú / Yêu cầu đặc biệt của người dùng: "${customNotes}"` : ""}

Hãy tạo bài viết hoàn chỉnh, cuốn hút, chuẩn SEO Facebook và trả về định dạng JSON theo đúng schema.`;

    const response = await generateContentWithFallback({
      preferredModel: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headlineOptions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 phương án tiêu đề / câu hook mở đầu khác nhau, MỖI PHƯƠNG ÁN BẮT BUỘC BẮT ĐẦU BẰNG ICON/EMOJI NỔI BẬT (ví dụ: 🔥, 💡, 😱, 💥, 📌, 🚨)",
            },
            selectedHeadline: {
              type: Type.STRING,
              description: "Tiêu đề chính được chọn cho bài viết",
            },
            fullContent: {
              type: Type.STRING,
              description: "Toàn bộ nội dung bài viết hoàn chỉnh sẵn sàng đăng ngay (bao gồm cả hook, thân bài, emoji, CTA và bộ hashtag ở cuối)",
            },
            bodyWithoutHashtags: {
              type: Type.STRING,
              description: "Nội dung bài viết chưa bao gồm hashtag",
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Danh sách 8-15 hashtags chuẩn SEO Facebook có dấu thăng (#)",
            },
            callToAction: {
              type: Type.STRING,
              description: "Lời kêu gọi hành động ở cuối bài",
            },
            firstCommentPrompt: {
              type: Type.STRING,
              description: "Gợi ý bình luận mồi ghim đầu (First Comment) để kích thích tương tác và tránh bóp reach nếu có link",
            },
            mediaSuggestion: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, description: "Loại media phù hợp: Ảnh đơn, Album 4 ảnh, Video ngắn Reels" },
                idea: { type: Type.STRING, description: "Mô tả chi tiết concept ảnh/video nên chụp hoặc quay" },
                imageTextOverlay: { type: Type.STRING, description: "Dòng chữ nổi bật in đè lên ảnh đại diện để hút click" },
              },
              required: ["type", "idea", "imageTextOverlay"],
            },
            seoAnalysis: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.NUMBER, description: "Điểm chuẩn SEO trên thang 100" },
                hookStrength: { type: Type.STRING, description: "Đánh giá sức hút của 3 dòng đầu trước nút Xem thêm" },
                keywordDensity: { type: Type.STRING, description: "Đánh giá sự phân bổ từ khóa tìm kiếm trên Facebook" },
                engagementPotential: { type: Type.STRING, description: "Đánh giá khả năng kéo comment và share" },
                tips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "2-3 mẹo nhỏ giúp tối ưu hiệu quả khi đăng bài này (thời điểm vàng đăng bài, cách seeding...)",
                },
              },
              required: ["score", "hookStrength", "keywordDensity", "engagementPotential", "tips"],
            },
          },
          required: [
            "headlineOptions",
            "selectedHeadline",
            "fullContent",
            "bodyWithoutHashtags",
            "hashtags",
            "callToAction",
            "firstCommentPrompt",
            "mediaSuggestion",
            "seoAnalysis",
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Không nhận được phản hồi từ AI");
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error generating Facebook content:", error);
    let userFriendlyError = "Đã xảy ra lỗi khi tạo bài viết Facebook. Vui lòng thử lại.";
    const rawMsg = error?.message || "";
    if (rawMsg.includes("503") || rawMsg.includes("high demand") || rawMsg.includes("UNAVAILABLE")) {
      userFriendlyError = "Hệ thống AI đang chịu tải cao tạm thời. Vui lòng bấm 'Thử lại ngay' sau vài giây.";
    } else if (rawMsg.includes("429") || rawMsg.includes("RESOURCE_EXHAUSTED")) {
      userFriendlyError = "Đã đạt giới hạn yêu cầu tạm thời. Vui lòng đợi vài giây rồi bấm thử lại.";
    } else if (rawMsg) {
      try {
        const parsed = JSON.parse(rawMsg);
        if (parsed?.error?.message) {
          userFriendlyError = parsed.error.message;
        }
      } catch {
        userFriendlyError = rawMsg;
      }
    }

    return NextResponse.json(
      { error: userFriendlyError },
      { status: 500 }
    );
  }
}
