// Helper function to send a message
const send = (sock, jid, text, quoted) => sock.sendMessage(jid, { text }, { quoted });

// --- WhatsApp Commands (20+) ---

// 1. Get User JID
bluebot({
  cmd: "jid",
  desc: "Get the JID of the user or quoted message",
  fromMe: false,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  const target = m.message?.extendedTextMessage?.contextInfo?.participant || m.key.remoteJid;
  send(sock, m.key.remoteJid, `🆔 *JID:* ${target}`, m);
});

// 2. Get Group JID
bluebot({
  cmd: "gjid",
  desc: "Get the JID of the current group",
  fromMe: false,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  send(sock, m.key.remoteJid, `🆔 *Group JID:* ${m.key.remoteJid}`, m);
});

// 3. Get Group Members
bluebot({
  cmd: "members",
  desc: "List all group members",
  fromMe: false,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const metadata = await sock.groupMetadata(m.key.remoteJid);
  let list = `👥 *Group Members (${metadata.participants.length}):*\n\n`;
  metadata.participants.forEach((p, i) => {
    list += `${i+1}. @${p.id.split('@')[0]}\n`;
  });
  send(sock, m.key.remoteJid, list, { mentions: metadata.participants.map(p => p.id) });
});

// 4. Get Group Admins
bluebot({
  cmd: "admins",
  desc: "List all group admins",
  fromMe: false,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const metadata = await sock.groupMetadata(m.key.remoteJid);
  const admins = metadata.participants.filter(p => p.admin !== null);
  let list = `👑 *Group Admins (${admins.length}):*\n\n`;
  admins.forEach((p, i) => {
    list += `${i+1}. @${p.id.split('@')[0]}\n`;
  });
  send(sock, m.key.remoteJid, list, { mentions: admins.map(p => p.id) });
});

// 5. Get Group Owner
bluebot({
  cmd: "gowner",
  desc: "Get the group owner",
  fromMe: false,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const metadata = await sock.groupMetadata(m.key.remoteJid);
  const owner = metadata.owner;
  send(sock, m.key.remoteJid, `👑 *Group Owner:* @${owner.split('@')[0]}`, { mentions: [owner] });
});

// 6. Get Profile Picture
bluebot({
  cmd: "getpp",
  desc: "Get a user's profile picture",
  fromMe: false,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🖼️ *Get PP*\n\nThis command is under development.", m);
});

// 7. Get Status
bluebot({
  cmd: "getstatus",
  desc: "Get a user's status message",
  fromMe: false,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💬 *Get Status*\n\nThis command is under development.", m);
});

// 8. Get Blocked List
bluebot({
  cmd: "blocked",
  desc: "List all blocked contacts",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🚫 *Blocked List*\n\nThis command is under development.", m);
});

// 9. Get Broadcast List
bluebot({
  cmd: "bclist",
  desc: "List all broadcast lists",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📣 *Broadcast Lists*\n\nThis command is under development.", m);
});

// 10. Get Contact Info
bluebot({
  cmd: "contact",
  desc: "Get contact information for a user",
  fromMe: false,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📞 *Contact Info*\n\nThis command is under development.", m);
});

// 11. Read Message
bluebot({
  cmd: "read",
  desc: "Mark a message as read",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "✅ *Read Message*\n\nThis command is under development.", m);
});

// 12. Unread Message
bluebot({
  cmd: "unread",
  desc: "Mark a message as unread",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "✉️ *Unread Message*\n\nThis command is under development.", m);
});

// 13. Star Message
bluebot({
  cmd: "star",
  desc: "Star a message (reply to it)",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "⭐ *Star Message*\n\nThis command is under development.", m);
});

// 14. Unstar Message
bluebot({
  cmd: "unstar",
  desc: "Unstar a message (reply to it)",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "❌ *Unstar Message*\n\nThis command is under development.", m);
});

// 15. Get Starred Messages
bluebot({
  cmd: "starred",
  desc: "List all starred messages",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "⭐ *Starred Messages*\n\nThis command is under development.", m);
});

// 16. Get Chat History
bluebot({
  cmd: "history",
  desc: "Get chat history",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📜 *Chat History*\n\nThis command is under development.", m);
});

// 17. Get Status Updates
bluebot({
  cmd: "getstatusupdates",
  desc: "Get recent status updates",
  fromMe: false,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "👀 *Status Updates*\n\nThis command is under development.", m);
});

// 18. Send Status Update
bluebot({
  cmd: "sendstatus",
  desc: "Send a text status update",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📝 *Send Status*\n\nThis command is under development.", m);
});

// 19. Send Location
bluebot({
  cmd: "sendloc",
  desc: "Send a location message",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📍 *Send Location*\n\nThis command is under development.", m);
});

// 20. Send Contact
bluebot({
  cmd: "sendcontact",
  desc: "Send a contact card",
  fromMe: true,
  category: "whatsapp",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📞 *Send Contact*\n\nThis command is under development.", m);
});
