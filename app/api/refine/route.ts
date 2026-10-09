import { NextRequest, NextResponse } from "next/server";
import { generateContentWithFallback } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentContent, action, customInstruction, query } = body;

    if (!currentContent) {
      return NextResponse.json(
        { error: "Không tìm thấy nội dung bài viết cần chỉnh sửa." },
        { status: 400 }
      );
    }

    const actionInstructions: Record<string, string> = {
      add_icons: "Bổ sung các icon/emoji Facebook sinh động, bắt mắt, chuyên nghiệp vào toàn bộ bài viết: thêm icon vào tiêu đề (🔥, 💡, 😱, 💥), vào từng đầu mục và gạch đầu dòng (📌, ✅, 🛡️, 🔹, ⭐), vào phần kêu gọi hành động và thông tin liên hệ (👇, 🎁, ☎️, 💬). Tuyệt đối không để dòng nào trần trụi thiếu icon.",
      shorten: "Rút gọn bài viết ngắn gọn hơn khoảng 30-40%, cô đọng lại các ý chính nhưng BẮT BUỘC giữ nguyên đầy đủ các icon/emoji sinh động (🔥, 📌, ✅, 🛡️, 👇) và bộ hashtag chuẩn SEO.",
      add_urgency: "Thêm yếu tố giục giã, cấp bách (ưu đãi có hạn, số lượng có hạn, khuyến mãi trong tháng), kèm icon sôi nổi (🔥, ⚡, ⏳, 💥), thôi thúc khách hàng phải hành động ngay.",
      add_humor: "Tăng tính dí dỏm, hài hước, ngôn từ trẻ trung bắt trend mạng xã hội (kèm icon 🤣, 😅, 😱, 👍) nhưng vẫn giữ uy tín và tính chuyên môn.",
      warranty_focus: "Xoáy sâu vào chính sách bảo hành vàng, bảo trì trọn đời, đổi trả minh bạch và cam kết chất lượng (kèm icon 🛡️, 💎, 📜, ✅, 🏆) để người mua yên tâm 100%.",
      lengthen_detailed: "Mở rộng bài viết chi tiết hơn, thêm ví dụ thực tế và các lưu ý kỹ thuật chuyên sâu (kèm icon đầu mục rõ ràng 📌, 💡, 🔹, 🎯) để bài viết mang giá trị chuyên gia cao.",
      custom: customInstruction || "Chỉnh sửa bài viết theo yêu cầu.",
    };

    const instruction = actionInstructions[action] || actionInstructions.custom;

    const systemInstruction = `Bạn là chuyên gia Copywriting và Facebook SEO. Nhiệm vụ của bạn là nhận bài viết Facebook hiện tại và điều chỉnh theo yêu cầu của người dùng.
QUY TẮC BẮT BUỘC:
1. Luôn giữ và sử dụng đầy đủ các icon/emoji Facebook sinh động (🔥, 💡, 😱, 📌, ✅, 🛡️, 👉, 👇, 🎁, ⭐) cho tiêu đề, các gạch đầu dòng và lời kêu gọi hành động để bài viết luôn nổi bật, thu hút trên Facebook Newfeed. Tuyệt đối không xóa hoặc làm mất icon trong bài viết!
2. Giữ vững cấu trúc chuẩn SEO Facebook (Hook 3 dòng đầu, ngắt dòng thoáng, gạch đầu dòng emoji, CTA rõ ràng, Hashtag tối ưu).`;

    const prompt = `Từ khóa / Chủ đề gốc: "${query || "Bài viết Facebook"}"
Nội dung bài viết hiện tại:
${currentContent}

YÊU CẦU ĐIỀU CHỈNH:
${instruction}

Hãy trả về bài viết đã được chỉnh sửa hoàn chỉnh ở định dạng JSON.`;

    const response = await generateContentWithFallback({
      preferredModel: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fullContent: {
              type: Type.STRING,
              description: "Toàn bộ bài viết hoàn chỉnh mới sau khi chỉnh sửa",
            },
            bodyWithoutHashtags: {
              type: Type.STRING,
              description: "Thân bài viết chưa bao gồm hashtag",
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Danh sách hashtags tối ưu",
            },
            callToAction: {
              type: Type.STRING,
              description: "Lời kêu gọi hành động",
            },
            headline: {
              type: Type.STRING,
              description: "Tiêu đề/Hook chính của bài viết sau chỉnh sửa",
            },
            refineSummary: {
              type: Type.STRING,
              description: "Tóm tắt ngắn 1 câu những điểm đã cải thiện",
            },
          },
          required: ["fullContent", "bodyWithoutHashtags", "hashtags", "callToAction", "headline", "refineSummary"],
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
    console.error("Error refining Facebook content:", error);
    let userFriendlyError = "Lỗi khi điều chỉnh bài viết. Vui lòng thử lại.";
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
