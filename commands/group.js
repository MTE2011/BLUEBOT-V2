bluebot({
  cmd: "promote",
  desc: "Promote a user to admin",
  fromMe: false,
  category: "group",
}, async (sock, msg, args, config) => {
  if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Group only." });
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
  if (!target) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Mention a user." });
  
  try {
    await sock.groupParticipantsUpdate(msg.key.remoteJid, [target], "promote");
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ @${target.split('@')[0]} promoted.`, mentions: [target] });
  } catch (error) {
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Error. Am I admin?" });
  }
});

bluebot({
  cmd: "kick",
  desc: "Remove a user from group",
  fromMe: false,
  category: "group",
}, async (sock, msg, args, config) => {
  if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Group only." });
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
  if (!target) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Mention a user." });
  
  try {
    await sock.groupParticipantsUpdate(msg.key.remoteJid, [target], "remove");
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ @${target.split('@')[0]} removed.`, mentions: [target] });
  } catch (error) {
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Error. Am I admin?" });
  }
});

bluebot({
  cmd: "tagall",
  desc: "Tag all group members",
  fromMe: false,
  category: "group",
}, async (sock, msg, args, config) => {
  if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Group only." });
  const metadata = await sock.groupMetadata(msg.key.remoteJid);
  const mentions = metadata.participants.map(p => p.id);
  const message = args.join(' ') || "Attention!";
  
  let tagText = `📢 *TAG ALL*\n\n📝 *Message:* ${message}\n\n`;
  metadata.participants.forEach((p, i) => {
    tagText += `${i+1}. @${p.id.split('@')[0]}\n`;
  });
  
  await sock.sendMessage(msg.key.remoteJid, { text: tagText, mentions });
});
