"use client";

import { useState } from "react";

export default function ClientUI({ serverInfo }) {
  const [copied, setCopied] = useState(false);

  const handleConnectClick = () => {
    window.location.href = `ts3server://${serverInfo.ip}`;
  };

  const handleCopyIP = async () => {
    await navigator.clipboard.writeText(serverInfo.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        onClick={handleConnectClick}
        className="group relative inline-flex items-center justify-center rounded-xl border border-fuchsia-400/60 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(244,114,182,0.75)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(56,189,248,0.9)]"
      >
        <span className="relative z-10">اتصال به سرور تیم‌اسپیک</span>
      </button>

      <button
        type="button"
        onClick={handleCopyIP}
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-100 backdrop-blur transition hover:border-sky-400/60 hover:bg-sky-500/10"
      >
        <span className="font-mono text-[11px] sm:text-xs">{serverInfo.ip}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
        <span>{copied ? "کپی شد ✅" : "کپی IP"}</span>
      </button>

      <div className="flex flex-wrap gap-3 text-[11px] text-slate-400 sm:text-xs mt-2">
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">پینگ تقریبی: {serverInfo.ping}ms</span>
        <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1">
          اسلات: {serverInfo.onlineUsers} / {serverInfo.maxSlots}
        </span>
        <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1">TeamSpeak 3</span>
      </div>
    </div>
  );
}
