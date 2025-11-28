export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { TeamSpeak } from "ts3-nodejs-library";

export async function GET() {
  try {
    const ts3 = await TeamSpeak.connect({
      host: "ts29.ir",
      queryport: 11353,
      serverport: 11352,
      username: "serveradmin",
      password: "agYYVW60rQhpJ3mH6i1au2V28c4BR97Y",
      nickname: "WebStatusBot",
    });

    const info = await ts3.serverInfo();

    await ts3.quit();

    return Response.json({
      onlineUsers: info.virtualserverClientsonline,
      maxSlots: info.virtualserverMaxclients,
      status: "online",
      ip: "alleh.ir",
      ping: info.virtualserverTotalPing,
      name: info.virtualserverName,
      uptime: info.virtualserverUptime,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ status: "offline" }, { status: 500 });
  }
}
