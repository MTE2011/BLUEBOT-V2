// Helper function to send a message
const send = (sock, jid, text, quoted) => sock.sendMessage(jid, { text }, { quoted });

// --- General Commands (20+) ---

// 1. Ping
bluebot({
  cmd: "ping",
  desc: "Check bot latency",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  const start = Date.now();
  await sock.sendMessage(m.key.remoteJid, { text: "🏓 Pinging..." });
  const end = Date.now();
  send(sock, m.key.remoteJid, `🏓 Pong! Latency: ${end - start}ms`, m);
});

// 2. Uptime
bluebot({
  cmd: "uptime",
  desc: "Check bot runtime",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  send(sock, m.key.remoteJid, `⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s`, m);
});

// 3. Owner
bluebot({
  cmd: "owner",
  desc: "Get owner info",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, `👤 *Owner:* ${config.OWNER_NAME}\n🆔 *Number:* ${config.OWNER_NUMBER}`, m);
});

// 4. Menu
bluebot({
  cmd: "menu",
  desc: "Show all commands",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  const { commands } = require('../utils/handler');
  
  let menuText = `🤖 *${config.BOT_NAME} MENU*\n\n`;
  menuText += `👤 *Owner:* ${config.OWNER_NAME}\n`;
  menuText += `⌨️ *Prefix:* ${config.PREFIX}\n`;
  menuText += `📊 *Total Commands:* ${commands.length}\n\n`;

  const categories = {};
  commands.forEach(cmd => {
    if (!categories[cmd.category]) categories[cmd.category] = [];
    categories[cmd.category].push(cmd.cmd);
  });

  for (const category in categories) {
    menuText += `🔹 *${category.toUpperCase()}*\n`;
    menuText += `\`\`\`${categories[category].join(', ')}\`\`\`\n\n`;
  }

  menuText += `_Powered by BLUEBOT-V2_`;
  
  send(sock, m.key.remoteJid, menuText, m);
});

// 5. Profile Picture
bluebot({
  cmd: "pp",
  desc: "Get a user's profile picture",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🖼️ *Profile Picture*\n\nMention a user or reply to a message to get their profile picture. This command is under development.", m);
});

// 6. Status
bluebot({
  cmd: "status",
  desc: "Get bot status and memory usage",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  const os = require('os');
  const used = process.memoryUsage();
  const total = os.totalmem();
  const free = os.freemem();
  
  let statusText = `💻 *Bot Status*\n\n`;
  statusText += `*Platform:* ${os.platform()}\n`;
  statusText += `*CPU:* ${os.cpus().length} cores\n`;
  statusText += `*RAM:* ${(total / 1024 / 1024 / 1024).toFixed(2)} GB\n`;
  statusText += `*Free RAM:* ${(free / 1024 / 1024 / 1024).toFixed(2)} GB\n`;
  statusText += `*Memory Usage:*\n`;
  statusText += `  - RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB\n`;
  statusText += `  - Heap Total: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB\n`;
  statusText += `  - Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB\n`;
  
  send(sock, m.key.remoteJid, statusText, m);
});

// 7. Info
bluebot({
  cmd: "info",
  desc: "Get bot and owner information",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  let infoText = `🤖 *${config.BOT_NAME} Information*\n\n`;
  infoText += `*Version:* V2.0\n`;
  infoText += `*Author:* ${config.OWNER_NAME}\n`;
  infoText += `*GitHub:* https://github.com/MTE2011/BLUEBOT-V2\n\n`;
  infoText += `*Description:*\nThis is a multi-functional WhatsApp bot built on Baileys, featuring a modular command handler and role-based permissions.`;
  
  send(sock, m.key.remoteJid, infoText, m);
});

// 8. Help
bluebot({
  cmd: "help",
  desc: "Show the menu (alias for .menu)",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  const menuCommand = require('./menu');
  menuCommand.execute(sock, m, config, args);
});

// 9. Rules
bluebot({
  cmd: "rules",
  desc: "Display group rules",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📜 *Group Rules*\n\n1. Be respectful.\n2. No spamming.\n3. Follow all WhatsApp terms of service.", m);
});

// 10. Report
bluebot({
  cmd: "report",
  desc: "Report a bug or issue to the owner",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  const issue = args.join(' ');
  if (!issue) return send(sock, m.key.remoteJid, "❌ Please describe the issue you want to report.", m);
  
  const ownerJid = config.OWNER_NUMBER + '@s.whatsapp.net';
  const reportText = `🚨 *NEW REPORT*\n\n*From:* @${m.key.remoteJid.split('@')[0]}\n*Issue:* ${issue}`;
  
  await sock.sendMessage(ownerJid, { text: reportText, mentions: [m.key.remoteJid] });
  send(sock, m.key.remoteJid, "✅ Your report has been sent to the owner.", m);
});

// 11. Donate
bluebot({
  cmd: "donate",
  desc: "Get donation information",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💖 *Support BLUEBOT-V2*\n\nDonations help keep the bot running!\n\n*PayPal:* [Link]\n*Crypto:* [Address]", m);
});

// 12. Terms
bluebot({
  cmd: "terms",
  desc: "Display bot terms of service",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📄 *Terms of Service*\n\n1. Do not use the bot for illegal activities.\n2. Bot usage is at your own risk.\n3. The owner reserves the right to block users.", m);
});

// 13. Source
bluebot({
  cmd: "source",
  desc: "Get the bot's source code link",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💻 *Source Code*\n\nFind the source code here:\nhttps://github.com/MTE2011/BLUEBOT-V2", m);
});

// 14. Sticker Info
bluebot({
  cmd: "sinfo",
  desc: "Get info about a quoted sticker",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🏷️ *Sticker Info*\n\nReply to a sticker with this command to get its metadata. This command is under development.", m);
});

// 15. Read More
bluebot({
  cmd: "readmore",
  desc: "Send a message with a 'Read More' break",
  fromMe: false,
  category: "general",
}, async (sock, m, config, args) => {
  const text = args.join(' ');
  if (!text) return send(sock, m.key.remoteJid, "❌ Provide text for the read more message.", m);
  
  const [part1, part2] = text.split('|');
  const message = `${part1}\n\n${String.fromCharCode(8206).repeat(4000)}\n${part2 || ''}`;
  send(sock, m.key.remoteJid, message, m);
});

// 16. Block
bluebot({
  cmd: "block",
  desc: "Block a user",
  fromMe: true,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🚫 *Block*\n\nThis command is under development.", m);
});

// 17. Unblock
bluebot({
  cmd: "unblock",
  desc: "Unblock a user",
  fromMe: true,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "✅ *Unblock*\n\nThis command is under development.", m);
});

// 18. Set Prefix
bluebot({
  cmd: "setprefix",
  desc: "Change the bot's command prefix",
  fromMe: true,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "⌨️ *Set Prefix*\n\nThis command is under development. You can change the prefix in `config.js` for now.", m);
});

// 19. Set Name
bluebot({
  cmd: "setname",
  desc: "Change the bot's name",
  fromMe: true,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🤖 *Set Name*\n\nThis command is under development. You can change the name in `config.js` for now.", m);
});

// 20. Broadcast
bluebot({
  cmd: "broadcast",
  desc: "Send a message to all groups the bot is in",
  fromMe: true,
  category: "general",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📣 *Broadcast*\n\nThis command is under development.", m);
});
