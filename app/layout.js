// app/layout.js
import "./globals.css";
export const metadata = {
  title: "ALLEH TeamSpeak | سرور تیم‌اسپیک گیمینگ",
  description: "سرور تیم‌اسپیک ALLEH مخصوص گیمرها با پینگ پایین، پایداری بالا و فضای دوستانه. همین حالا به سرور وصل شو و با تیمت هماهنگ شو.",
  openGraph: {
    title: "ALLEH TeamSpeak | سرور تیم‌اسپیک گیمینگ",
    description: "به سرور تیم‌اسپیک ALLEH وصل شو؛ جای مخصوص گیمرها برای هماهنگی، رِید و کانتر!",
    url: "https://alleh.example.com",
    siteName: "ALLEH TeamSpeak",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {/* پس‌زمینه نئون گیمینگ */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-40 right-[-20%] h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-sky-500 opacity-30 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-500 to-emerald-500 opacity-30 blur-3xl" />
        </div>

        {/* لایه اصلی */}
        <div className="relative z-10 flex min-h-screen flex-col bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-black/95">
          <header className="w-full border-b border-white/5 bg-black/40 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 via-sky-500 to-emerald-400 shadow-[0_0_25px_rgba(56,189,248,0.9)]" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">TeamSpeak Server</span>
                  <span className="text-lg font-bold tracking-[0.2em] text-slate-50">ALLEH</span>
                </div>
              </div>

              <nav className="hidden items-center gap-4 text-sm text-slate-300 md:flex">
                <a href="#hero" className="hover:text-white">
                  خانه
                </a>
                <a href="#stats" className="hover:text-white">
                  وضعیت سرور
                </a>
                <a href="#features" className="hover:text-white">
                  قابلیت‌ها
                </a>
                <a href="#join" className="hover:text-white">
                  اتصال
                </a>
              </nav>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
