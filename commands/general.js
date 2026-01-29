bluebot({
  cmd: "ping",
  desc: "Check bot latency",
  fromMe: false,
  category: "general",
}, async (sock, msg, args, config) => {
  const start = Date.now();
  await sock.sendMessage(msg.key.remoteJid, { text: "🏓 Pinging..." });
  const end = Date.now();
  await sock.sendMessage(msg.key.remoteJid, { text: `🏓 Pong! Latency: ${end - start}ms` });
});

bluebot({
  cmd: "uptime",
  desc: "Check bot runtime",
  fromMe: false,
  category: "general",
}, async (sock, msg, args, config) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  await sock.sendMessage(msg.key.remoteJid, { text: `⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s` });
});

bluebot({
  cmd: "owner",
  desc: "Get owner info",
  fromMe: false,
  category: "general",
}, async (sock, msg, args, config) => {
  await sock.sendMessage(msg.key.remoteJid, { text: `👤 *Owner:* ${config.OWNER_NAME}\n🆔 *Number:* ${config.OWNER_NUMBER}` });
});
