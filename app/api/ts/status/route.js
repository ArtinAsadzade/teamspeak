import { TeamSpeak } from "ts3-nodejs-library";

export async function GET() {
  try {
    const ts3 = await TeamSpeak.connect({
      host: "85.133.205.109",
      queryport: 10011,
      serverport: 9987,
      username: "serveradmin",
      password: "Ccyj5Bpm",
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
