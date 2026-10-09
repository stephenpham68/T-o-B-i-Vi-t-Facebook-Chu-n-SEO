import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'AutoPost FB - Viết Content Facebook Chuẩn SEO Tự Động',
  description: 'Tự động tạo bài viết Facebook chuẩn SEO, hấp dẫn, tối ưu tương tác từ từ khóa hoặc câu hỏi với đầy đủ hook, nội dung và hashtag phù hợp.',
  openGraph: {
    title: 'AutoPost FB - Viết Content Facebook Chuẩn SEO Tự Động',
    description: 'Tự động tạo bài viết Facebook chuẩn SEO, hấp dẫn, tối ưu tương tác từ từ khóa hoặc câu hỏi.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoPost FB - Viết Content Facebook Chuẩn SEO Tự Động',
    description: 'Tự động tạo bài viết Facebook chuẩn SEO, hấp dẫn, tối ưu tương tác từ từ khóa hoặc câu hỏi.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
