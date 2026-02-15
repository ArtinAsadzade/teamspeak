export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { TeamSpeak } from "ts3-nodejs-library";

export async function GET() {
  try {
    const ts3 = await TeamSpeak.connect({
      host: "212.80.8.176",
      queryport: 7117,
      serverport: 7117,
      username: "serveradmin",
      password: "6arNoNubWm0D",
      nickname: "ALLEH STATUS",
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
