import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CommandPalette from "../components/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "0_Log - 몰입의 순간, 견고한 코드.",
  description: "성능의 한계를 뛰어넘는 시스템 아키텍처, 그리고 개발자들의 치열한 고민의 흔적. 더 나은 소프트웨어를 고민하는 모든 빌더(Builder)들을 위해 기록합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
