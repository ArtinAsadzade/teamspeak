import Link from "next/link";
import ClientUI from "./components/ClientUI";

export const revalidate = 120;

const features = [
  {
    title: "پینگ پایین و پایدار",
    description: "اتصال بهینه برای سرورهای ایران و اروپا؛ مناسب برای بازی‌های رقابتی و هماهنگی تیمی.",
  },
  { title: "کانال اختصاصی کلن", description: "برای هر کلن یا تیم می‌توانیم کانال خصوصی با رول‌های سفارشی بسازیم." },
  { title: "پشتیبانی RP و گیمینگ", description: "از GTA RP تا FPS رقابتی، ساختار کانال‌ها برای استفاده واقعی طراحی شده است." },
];

const faqs = [
  {
    q: "آدرس تیم اسپیک برای ورود چیست؟",
    a: "برای ورود به سرور ALLEH از آدرس ts.alleh.ir و پورت 9987 استفاده کنید. اگر لینک ts3server دریافت کردید، مستقیم با همان لینک متصل شوید.",
  },
  {
    q: "چطور به سرور TeamSpeak وصل شویم؟",
    a: "TeamSpeak Client را نصب کنید، از منوی Connections روی Connect بزنید، آدرس سرور را وارد کنید و با یک نیک‌نیم مشخص وارد شوید.",
  },
  {
    q: "آیا این سرور برای گیمینگ مناسب است؟",
    a: "بله. این سرور برای تیم‌های گیمینگ، کلن‌ها و RP ساخته شده و روی پایداری و کیفیت صدا تمرکز دارد.",
  },
  {
    q: "برای ورود باید هزینه پرداخت کنم؟",
    a: "خیر. ورود کاربران عمومی رایگان است و این صفحه صرفاً برای معرفی و راهنمای Join کردن سرور است.",
  },
  {
    q: "اگر Timeout بگیرم چه کنم؟",
    a: "ابتدا آدرس و پورت را بررسی کنید، سپس VPN را تغییر دهید یا خاموش کنید، DNS را روی 1.1.1.1 قرار دهید و دوباره تلاش کنید.",
  },
  {
    q: "قانون نام کاربری در سرور چیست؟",
    a: "از نیک‌نیم خوانا و محترمانه استفاده کنید. استفاده از اسامی توهین‌آمیز، تبلیغاتی یا گمراه‌کننده مجاز نیست.",
  },
];

async function getServerInfo() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/ts/status`, { next: { revalidate: 120 } });
    return await res.json();
  } catch {
    return { status: "offline", ip: "ts.alleh.ir", ping: "-", onlineUsers: 0, maxSlots: "64" };
  }
}

export default async function HomePage() {
  const serverInfo = await getServerInfo();
  const isOnline = serverInfo.status === "online";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "ALLEH TeamSpeak",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://alleh.example.com",
        logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://alleh.example.com"}/alleh.png`,
      },
      {
        "@type": "WebSite",
        name: "ALLEH TeamSpeak",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://alleh.example.com",
        inLanguage: ["fa", "en"],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-10 md:px-8 md:py-14 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section id="hero" className="flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">سرور TeamSpeak ایرانی برای ورود سریع، پینگ پایین و گیمینگ حرفه‌ای</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          اگر دنبال <strong>سرور تیم اسپیک برای ورود</strong> هستید، ALLEH یک <strong>public TeamSpeak server</strong> برای کاربران فارسی و انگلیسی است.
          اینجا می‌توانید برای کلن، RP و بازی‌های رقابتی، بدون شلوغی اضافی، ارتباط پایدار داشته باشید.
        </p>
        <ClientUI serverInfo={serverInfo} />
      </section>

      <section id="stats" className="grid gap-4 md:grid-cols-3">
        <GlowCard>
          <p className="text-xs text-slate-400">وضعیت سرور</p>
          <p className="mt-1 text-base font-semibold text-slate-50">{isOnline ? "آنلاین" : "آفلاین"}</p>
        </GlowCard>
        <GlowCard>
          <p className="text-xs text-slate-400">کاربران آنلاین</p>
          <p className="mt-1 text-base font-semibold text-slate-50">{serverInfo.onlineUsers ?? 0} نفر</p>
        </GlowCard>
        <GlowCard>
          <p className="text-xs text-slate-400">آدرس تیم اسپیک</p>
          <p className="mt-1 text-base font-semibold text-slate-50">{serverInfo.ip || "ts.alleh.ir:9987"}</p>
        </GlowCard>
      </section>

      <section id="features" className="space-y-4">
        <h2 className="text-2xl font-bold">چرا این سرور TeamSpeak؟</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((item) => (
            <GlowCard key={item.title}>
              <h3 className="font-semibold text-sky-200">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <section id="join" className="rounded-3xl border border-sky-500/40 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-bold text-white">How to Join | راهنمای ورود به TeamSpeak</h2>
        <ol className="mt-4 list-decimal space-y-2 pr-6 text-slate-200">
          <li>اپ TeamSpeak Client را نصب کنید (Windows / Android / iOS).</li>
          <li>از منوی Connections گزینه Connect را بزنید.</li>
          <li>
            Server Address را روی <strong>ts.alleh.ir:9987</strong> بگذارید.
          </li>
          <li>Nickname خوانا انتخاب کنید (ترجیحاً [Clan]Name).</li>
          <li>وارد لابی شده و کانال مناسب گیم، کلن یا RP خود را انتخاب کنید.</li>
        </ol>
        <p className="mt-4 text-sm text-slate-300">قوانین نیک‌نیم: محترمانه، بدون تبلیغ، بدون جعل هویت. کانال‌ها: Lobby، Gaming Squads، RP Rooms، Help Desk.</p>
        <div className="mt-5">
          <Link href="/articles" className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-sky-400">
            مشاهده مقالات آموزشی ورود به TeamSpeak
          </Link>
        </div>
      </section>

      <section id="faq" className="space-y-4">
        <h2 className="text-2xl font-bold">سوالات متداول ورود به سرور TeamSpeak</h2>
        {faqs.map((item) => (
          <article key={item.q} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
            <h3 className="font-semibold text-white">{item.q}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.a}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function GlowCard({ children }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">{children}</div>;
}
