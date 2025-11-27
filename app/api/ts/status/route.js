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

    const onlineClients = await ts3.clientList({ clientType: 0 });

    await ts3.quit();

    return Response.json({
      onlineUsers: onlineClients.length,
      maxSlots: info.virtualserver_maxclients,
      status: "online",
      ip: "alleh.ir",
      ping: info.virtualserver_total_ping,
      name: info.virtualserver_name,
      uptime: info.virtualserver_uptime,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ status: "offline" }, { status: 500 });
  }
}
