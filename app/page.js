export const dynamic = "force-dynamic";

import ClientUI from "./components/ClientUI";

const features = [
  {
    title: "پینگ پایین و پایدار",
    description: "اتصال بهینه برای سرورهای ایران و اروپا؛ بدون لَگ و اعصاب‌خردی وسط رِید.",
  },
  {
    title: "کانال‌های اختصاصی تیم",
    description: "برای هر تیم می‌تونیم کانال‌های جدا با سطح دسترسی سفارشی ست کنیم.",
  },
  {
    title: "موزیک بات و فانی",
    description: "موزیک بات برای موزیک، چیل و لابی قبل از بازی.",
  },
  {
    title: "آنلاین ۲۴/۷",
    description: "سرور همیشه روشن؛ چه شب چه نصفه‌شب برای رنک‌آپ و تورنومنت.",
  },
  {
    title: "مدیریت ضد ترول",
    description: "ادمین‌های فعال، بن‌لیست منظم و قوانین مشخص برای جلوگیری از ترول.",
  },
  {
    title: "محیط دوستانه گیمرها",
    description: "جَو رفیق‌محور؛ از CS و Valorant تا MMO و RP.",
  },
];

async function getServerInfo() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/ts/status`, {
      cache: "no-store",
    });

    return await res.json();
  } catch (e) {
    console.error("TS Fetch Error:", e);
    return { status: "offline" };
  }
}

export default async function HomePage() {
  const serverInfo = await getServerInfo();
  const isOnline = serverInfo.status === "online";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-10 md:px-8 md:py-14 lg:py-20">
      {/* HERO */}

      <section id="hero" className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-sky-300/90 shadow-[0_0_30px_rgba(56,189,248,0.35)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.9)]" />
            <span>سرور اختصاصی TeamSpeak برای گیمرها</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block text-sm font-light text-slate-300">خوش اومدی به</span>
            <span className="mt-2 inline-block bg-gradient-to-r from-fuchsia-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              ALLEH TeamSpeak
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            اینجا جای گیمرهایی‌ـه که دوست دارن هماهنگ، تمیز و بدون لَگ بازی کنن. از کانتر و ولورانت تا MMO و RP؛ سرور تیم‌اسپیک{" "}
            <span className="font-semibold text-sky-300">ALLEH</span> خونه‌ی اسکادران و تیمت می‌تونه باشه.
          </p>

          <ClientUI serverInfo={serverInfo} />
        </div>

        {/* کارت وضعیت سرور */}
        <div className="mt-8 flex-1 md:mt-0 md:max-w-sm">
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/70 via-slate-950/90 to-black/95 p-6 shadow-[0_0_40px_rgba(15,23,42,0.8)] backdrop-blur">
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">وضعیت سرور</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">{isOnline ? "آنلاین" : "آفلاین"}</p>
                </div>

                <span
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-[11px] ${
                    isOnline ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOnline ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" : "bg-rose-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]"
                    }`}
                  />
                  {isOnline ? "Server Online" : "Server Offline"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
                <StatItem label="کاربران آنلاین" value={`${serverInfo.onlineUsers ?? 0} نفر`} />
                <StatItem label="اسلات کل" value={serverInfo.maxSlots ?? "-"} />
                <StatItem label="پینگ تقریبی" value={`${serverInfo.ping ?? "-"} ms`} />
                <StatItem label="IP سرور" value={serverInfo.ip} mono />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS + FEATURES */}
      <section id="stats" className="space-y-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">وضعیت سرور و امکانات</h2>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">یه نگاه کلی به سرور ALLEH؛ قبل از این‌که جوین بدی، بدون کجا داری وارد می‌شی.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <GlowCard>
            <p className="text-xs text-slate-400">نوع سرور</p>
            <p className="mt-1 text-base font-semibold text-slate-50">TeamSpeak 3 اختصاصی</p>
            <p className="mt-3 text-[11px] text-slate-400">مناسب برای اسکادران‌های کوچک تا کامیونیتی‌های بزرگ گیمرها.</p>
          </GlowCard>

          <GlowCard>
            <p className="text-xs text-slate-400">مناسب برای</p>
            <p className="mt-1 text-base font-semibold text-slate-50">CS2, Valorant, MMO, RP</p>
            <p className="mt-3 text-[11px] text-slate-400">هر بازی که نیاز به تایمینگ و هماهنگی لحظه‌ای داره، اینجا جاشه.</p>
          </GlowCard>

          <GlowCard>
            <p className="text-xs text-slate-400">مدیریت و ساپورت</p>
            <p className="mt-1 text-base font-semibold text-slate-50">مدیریت فعال و پاسخ‌گو</p>
            <p className="mt-3 text-[11px] text-slate-400">درخواست کانال خصوصی، رول، تگ یا هرچیز دیگه داشتی، فقط کافیه به ادمین‌ها تیکت بدی.</p>
          </GlowCard>
        </div>

        <section id="features" className="space-y-6">
          <h3 className="text-lg font-semibold text-white sm:text-xl">چرا ALLEH؟ چه فرقی داره؟</h3>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 shadow-[0_0_24px_rgba(15,23,42,0.9)] backdrop-blur"
              >
                <div className="pointer-events-none absolute -right-10 -top-16 h-32 w-32 rounded-full bg-[conic-gradient(at_top,_#f97316,_#e879f9,_#38bdf8,_#22c55e,_#f97316)] opacity-20 blur-2xl" />
                <div className="relative">
                  <p className="text-[13px] font-semibold text-sky-200">{item.title}</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* JOIN */}
      <section
        id="join"
        className="mt-4 rounded-3xl border border-sky-500/40 bg-gradient-to-r from-sky-500/10 via-fuchsia-500/10 to-emerald-500/10 p-6 shadow-[0_0_40px_rgba(56,189,248,0.6)] backdrop-blur"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-white sm:text-xl">آماده‌ای جوین بدی؟</h3>
            <p className="mt-2 text-xs text-slate-200 sm:text-sm">
              TeamSpeak رو نصب کن، روی دکمه زیر کلیک کن و مستقیم وارد سرور <span className="font-semibold text-sky-300">ALLEH</span> شو. اگه با دوستات
              اسکادران داری، براشون کانال اختصاصی هم می‌سازیم.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-white/10 pt-6 text-center text-[11px] text-slate-500 sm:text-xs">
        <div className="mx-auto mb-3 h-px max-w-xs bg-gradient-to-r from-fuchsia-500/60 via-sky-500/60 to-emerald-400/60" />
        <p>
          ALLEH TeamSpeak Server — ساخته شده با عشق توسط{" "}
          <a href="https://artinasadzade.ir" target="_blank" className="font-semibold text-sky-300">
            Artin Asadzade
          </a>
        </p>
      </footer>
    </main>
  );
}

function StatItem({ label, value, mono = false }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 shadow-[0_0_18px_rgba(15,23,42,0.85)]">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className={`mt-1 text-xs font-semibold text-slate-50 ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

function GlowCard({ children }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_0_26px_rgba(15,23,42,0.9)] backdrop-blur">
      <div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full bg-[conic-gradient(at_top,_#f97316,_#e879f9,_#38bdf8,_#22c55e,_#f97316)] opacity-20 blur-2xl" />
      <div className="relative">{children}</div>
    </div>
  );
}
