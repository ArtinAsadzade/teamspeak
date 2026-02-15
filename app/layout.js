import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import localFont from "next/font/local";

const persianSans = localFont({
  src: "../public/fonts/2yekan.ttf",
  display: "swap",
  variable: "--font-persian",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alleh.example.com";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ALLEH TeamSpeak | سرور تیم اسپیک ایرانی",
    template: "%s | ALLEH TeamSpeak",
  },
  description: "سرور TeamSpeak ایرانی ALLEH برای گیمرها، کلن‌ها و RP. آدرس تیم اسپیک، آموزش ورود، FAQ و مقالات تخصصی برای join teamspeak server.",
  keywords: [
    "سرور تیم اسپیک برای ورود",
    "آدرس تیم اسپیک",
    "بهترین سرور تیم اسپیک ایرانی",
    "join teamspeak server",
    "public teamspeak server",
    "teamspeak iran",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ALLEH TeamSpeak | سرور تیم اسپیک ایرانی",
    description: "بهترین نقطه شروع برای پیدا کردن و ورود به سرور TeamSpeak ایرانی: آدرس، راهنمای اتصال، رفع مشکل و مقالات کاربردی.",
    url: "/",
    siteName: "ALLEH TeamSpeak",
    locale: "fa_IR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ALLEH TeamSpeak" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALLEH TeamSpeak | Join TeamSpeak Server",
    description: "راهنمای کامل ورود به سرور TeamSpeak ایرانی + مقالات تخصصی برای گیمینگ و RP.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={persianSans.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-40 right-[-20%] h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-sky-500 opacity-30 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-500 to-emerald-500 opacity-30 blur-3xl" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-black/95">
          <header className="w-full border-b border-white/5 bg-black/40 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg shadow-[0_0_25px_rgba(56,189,248,0.9)]">
                  <Image alt="Alleh TeamSpeak Logo" width={40} height={40} src="/alleh.png" className="rounded-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">TeamSpeak Server</span>
                  <span className="text-lg font-bold tracking-[0.2em] text-slate-50">ALLEH</span>
                </div>
              </div>

              <nav className="hidden items-center gap-4 text-sm text-slate-300 md:flex">
                <Link href="/#hero" className="hover:text-white">
                  خانه
                </Link>
                <Link href="/#join" className="hover:text-white">
                  آموزش ورود
                </Link>
                <Link href="/articles" className="hover:text-white">
                  مقالات
                </Link>
                <Link href="/#faq" className="hover:text-white">
                  سوالات متداول
                </Link>
              </nav>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
