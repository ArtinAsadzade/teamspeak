import { analyzePulse } from "@/lib/pulse/analyzePulse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const summaries = {
  WARM: "هفته‌ی اخیر گرمای خوبی داشته؛ گفت‌وگوها فعال بوده و حال‌وهوای رابطه بیشتر مثبت به نظر می‌رسد.",
  CALM: "رابطه در این هفته آرام و متعادل بوده و روند کلی، باثبات دیده می‌شود.",
  UNSTABLE: "در روزهای اخیر نشانه‌هایی از نوسان دیده می‌شود؛ شاید یک گفت‌وگوی آرام بتواند فضا را سبک‌تر کند.",
  LOW_ACTIVITY: "این هفته تعامل‌ها کم بوده؛ شاید یک پیام کوتاه یا مرور یک خاطره شروع خوبی برای نزدیک‌تر شدن باشد.",
};

export async function GET() {
  const state = await analyzePulse();

  return Response.json(
    {
      state,
      summary: summaries[state],
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
