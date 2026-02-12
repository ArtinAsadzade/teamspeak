const DAY_IN_MS = 24 * 60 * 60 * 1000;

export type PulseState = "CALM" | "WARM" | "UNSTABLE" | "LOW_ACTIVITY";

type MoodValue = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

type MoodRecord = {
  createdAt: string | Date;
  mood: MoodValue;
};

type MemoryEvent = {
  createdAt: string | Date;
  type: "MEMORY" | string;
};

type PulseInput = {
  moodRecords: MoodRecord[];
  chatMessageCount: number;
  memoryEvents: MemoryEvent[];
};

declare global {
  var __LOVEVAULT_DATA__:
    | {
        moods?: MoodRecord[];
        chatMessages?: Array<{ createdAt: string | Date }>;
        events?: MemoryEvent[];
      }
    | undefined;
}

function sevenDaysAgo() {
  return new Date(Date.now() - 7 * DAY_IN_MS);
}

function isInWindow(inputDate: string | Date, windowStart: Date) {
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);
  return !Number.isNaN(date.valueOf()) && date >= windowStart;
}

async function getMoodRecords(windowStart: Date): Promise<MoodRecord[]> {
  const source = globalThis.__LOVEVAULT_DATA__?.moods ?? [];
  return source.filter((record: MoodRecord) => isInWindow(record.createdAt, windowStart));
}

async function getChatMessageCount(windowStart: Date): Promise<number> {
  const source = globalThis.__LOVEVAULT_DATA__?.chatMessages ?? [];
  return source.filter((message: { createdAt: string | Date }) => isInWindow(message.createdAt, windowStart)).length;
}

async function getMemoryEvents(windowStart: Date): Promise<MemoryEvent[]> {
  const source = globalThis.__LOVEVAULT_DATA__?.events ?? [];
  return source.filter(
    (event: MemoryEvent) => event.type === "MEMORY" && isInWindow(event.createdAt, windowStart),
  );
}

export function calculatePulseState({
  moodRecords,
  chatMessageCount,
  memoryEvents,
}: PulseInput): PulseState {
  const totalMoodCount = moodRecords.length;
  const positiveCount = moodRecords.filter((item) => item.mood === "POSITIVE").length;
  const neutralCount = moodRecords.filter((item) => item.mood === "NEUTRAL").length;
  const negativeCount = moodRecords.filter((item) => item.mood === "NEGATIVE").length;

  const hasVeryLowActivity = chatMessageCount < 8 && memoryEvents.length === 0;
  if (hasVeryLowActivity) return "LOW_ACTIVITY";

  if (totalMoodCount > 0 && negativeCount / totalMoodCount >= 0.45) return "UNSTABLE";

  const activeChat = chatMessageCount >= 20;
  const mostlyPositive = totalMoodCount > 0 && positiveCount / totalMoodCount >= 0.55;
  if (mostlyPositive && activeChat) return "WARM";

  const mostlyNeutral = totalMoodCount > 0 && neutralCount / totalMoodCount >= 0.5;
  const stableChat = chatMessageCount >= 8;
  if (mostlyNeutral && stableChat) return "CALM";

  return totalMoodCount === 0 ? "LOW_ACTIVITY" : "CALM";
}

export async function analyzePulse(): Promise<PulseState> {
  const windowStart = sevenDaysAgo();

  const [moodRecords, chatMessageCount, memoryEvents] = await Promise.all([
    getMoodRecords(windowStart),
    getChatMessageCount(windowStart),
    getMemoryEvents(windowStart),
  ]);

  return calculatePulseState({ moodRecords, chatMessageCount, memoryEvents });
}
