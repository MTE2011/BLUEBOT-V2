// Helper function to send a message
const send = (sock, jid, text, quoted) => sock.sendMessage(jid, { text }, { quoted });

// Helper to get target JID from message
const getTargetJid = (m) => m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || m.message?.extendedTextMessage?.contextInfo?.participant;

// --- Group Commands (20+) ---

// 1. Promote
bluebot({
  cmd: "promote",
  desc: "Promote a user to admin",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const target = getTargetJid(m);
  if (!target) return send(sock, m.key.remoteJid, "❌ Mention a user.", m);
  
  try {
    await sock.groupParticipantsUpdate(m.key.remoteJid, [target], "promote");
    send(sock, m.key.remoteJid, `✅ @${target.split('@')[0]} promoted.`, { mentions: [target] });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to promote. Am I admin?", m);
  }
});

// 2. Demote
bluebot({
  cmd: "demote",
  desc: "Demote an admin to user",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const target = getTargetJid(m);
  if (!target) return send(sock, m.key.remoteJid, "❌ Mention a user.", m);
  
  try {
    await sock.groupParticipantsUpdate(m.key.remoteJid, [target], "demote");
    send(sock, m.key.remoteJid, `✅ @${target.split('@')[0]} demoted.`, { mentions: [target] });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to demote. Am I admin?", m);
  }
});

// 3. Kick
bluebot({
  cmd: "kick",
  desc: "Remove a user from group",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const target = getTargetJid(m);
  if (!target) return send(sock, m.key.remoteJid, "❌ Mention a user.", m);
  
  try {
    await sock.groupParticipantsUpdate(m.key.remoteJid, [target], "remove");
    send(sock, m.key.remoteJid, `✅ @${target.split('@')[0]} removed.`, { mentions: [target] });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to kick. Am I admin?", m);
  }
});

// 4. TagAll
bluebot({
  cmd: "tagall",
  desc: "Tag all group members",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const metadata = await sock.groupMetadata(m.key.remoteJid);
  const mentions = metadata.participants.map(p => p.id);
  const message = args.join(' ') || "Attention everyone!";
  
  let tagText = `📢 *TAG ALL*\n\n📝 *Message:* ${message}\n\n`;
  metadata.participants.forEach((p, i) => {
    tagText += `@${p.id.split('@')[0]}\n`;
  });
  
  sock.sendMessage(m.key.remoteJid, { text: tagText, mentions });
});

// 5. Group Settings (Mute)
bluebot({
  cmd: "mute",
  desc: "Mute the group (only admins can send)",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    await sock.groupSettingUpdate(m.key.remoteJid, 'announcement');
    send(sock, m.key.remoteJid, "🔇 Group has been muted. Only admins can send messages.", m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to mute group. Am I admin?", m);
  }
});

// 6. Group Settings (Unmute)
bluebot({
  cmd: "unmute",
  desc: "Unmute the group (everyone can send)",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    await sock.groupSettingUpdate(m.key.remoteJid, 'not_announcement');
    send(sock, m.key.remoteJid, "🔊 Group has been unmuted. Everyone can send messages.", m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to unmute group. Am I admin?", m);
  }
});

// 7. Group Settings (Lock/Unlock Info)
bluebot({
  cmd: "lockinfo",
  desc: "Lock group info editing to admins only",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    await sock.groupSettingUpdate(m.key.remoteJid, 'locked');
    send(sock, m.key.remoteJid, "🔒 Group info editing is now restricted to admins.", m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to lock info. Am I admin?", m);
  }
});

// 8. Group Settings (Unlock Info)
bluebot({
  cmd: "unlockinfo",
  desc: "Unlock group info editing for all members",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    await sock.groupSettingUpdate(m.key.remoteJid, 'unlocked');
    send(sock, m.key.remoteJid, "🔓 Group info editing is now open to all members.", m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to unlock info. Am I admin?", m);
  }
});

// 9. Group Settings (Open/Close Group)
bluebot({
  cmd: "open",
  desc: "Open the group (everyone can join)",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    await sock.groupSettingUpdate(m.key.remoteJid, 'not_announcement');
    send(sock, m.key.remoteJid, "🔓 Group is now open. Everyone can send messages.", m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to open group. Am I admin?", m);
  }
});

// 10. Group Settings (Close Group)
bluebot({
  cmd: "close",
  desc: "Close the group (only admins can send)",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    await sock.groupSettingUpdate(m.key.remoteJid, 'announcement');
    send(sock, m.key.remoteJid, "🔒 Group is now closed. Only admins can send messages.", m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to close group. Am I admin?", m);
  }
});

// 11. Group Link
bluebot({
  cmd: "link",
  desc: "Get the group invite link",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    const code = await sock.groupInviteCode(m.key.remoteJid);
    send(sock, m.key.remoteJid, `🔗 *Group Link:*\nhttps://chat.whatsapp.com/${code}`, m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to get link. Am I admin?", m);
  }
});

// 12. Group Subject
bluebot({
  cmd: "subject",
  desc: "Change the group subject",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const newSubject = args.join(' ');
  if (!newSubject) return send(sock, m.key.remoteJid, "❌ Provide a new subject.", m);
  
  try {
    await sock.groupUpdateSubject(m.key.remoteJid, newSubject);
    send(sock, m.key.remoteJid, `✅ Group subject changed to: *${newSubject}*`, m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to change subject. Am I admin?", m);
  }
});

// 13. Group Description
bluebot({
  cmd: "desc",
  desc: "Change the group description",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const newDesc = args.join(' ');
  if (!newDesc) return send(sock, m.key.remoteJid, "❌ Provide a new description.", m);
  
  try {
    await sock.groupUpdateDescription(m.key.remoteJid, newDesc);
    send(sock, m.key.remoteJid, `✅ Group description changed to: *${newDesc}*`, m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to change description. Am I admin?", m);
  }
});

// 14. Group Profile Picture
bluebot({
  cmd: "gcpp",
  desc: "Change the group profile picture",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🖼️ *Group PP*\n\nReply to an image with `.gcpp` to change the group profile picture. This command is under development.", m);
});

// 15. Group Add
bluebot({
  cmd: "add",
  desc: "Add a user to the group",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  const target = args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null;
  if (!target) return send(sock, m.key.remoteJid, "❌ Provide a number to add.", m);
  
  try {
    await sock.groupParticipantsUpdate(m.key.remoteJid, [target], "add");
    send(sock, m.key.remoteJid, `✅ User added.`, m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to add user. Am I admin?", m);
  }
});

// 16. Group Revoke Link
bluebot({
  cmd: "revoke",
  desc: "Revoke the group invite link",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    await sock.groupRevokeInvite(m.key.remoteJid);
    send(sock, m.key.remoteJid, "✅ Group invite link revoked.", m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to revoke link. Am I admin?", m);
  }
});

// 17. Group Info
bluebot({
  cmd: "ginfo",
  desc: "Get group information",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    const metadata = await sock.groupMetadata(m.key.remoteJid);
    let info = `*Group Info:*\n\n`;
    info += `*Name:* ${metadata.subject}\n`;
    info += `*ID:* ${metadata.id}\n`;
    info += `*Owner:* @${metadata.owner.split('@')[0]}\n`;
    info += `*Members:* ${metadata.participants.length}\n`;
    info += `*Description:*\n${metadata.desc}\n`;
    
    send(sock, m.key.remoteJid, info, { mentions: [metadata.owner] });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to get group info.", m);
  }
});

// 18. Group List
bluebot({
  cmd: "glist",
  desc: "List all groups the bot is in",
  fromMe: true,
  category: "group",
}, async (sock, m, config, args) => {
  try {
    const groups = await sock.groupFetchAllParticipating();
    let list = `*Groups I am in:*\n\n`;
    for (const jid in groups) {
      list += `*Name:* ${groups[jid].subject}\n`;
      list += `*ID:* ${jid}\n`;
      list += `*Members:* ${groups[jid].participants.length}\n\n`;
    }
    send(sock, m.key.remoteJid, list, m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to list groups.", m);
  }
});

// 19. Group Leave
bluebot({
  cmd: "leave",
  desc: "Make the bot leave the group",
  fromMe: true,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return send(sock, m.key.remoteJid, "❌ Group only.", m);
  try {
    await sock.groupLeave(m.key.remoteJid);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to leave group.", m);
  }
});

// 20. Group Delete
bluebot({
  cmd: "delete",
  desc: "Delete a message (reply to it)",
  fromMe: false,
  category: "group",
}, async (sock, m, config, args) => {
  if (!m.message?.extendedTextMessage?.contextInfo?.quotedMessage) return send(sock, m.key.remoteJid, "❌ Reply to the message you want to delete.", m);
  
  try {
    const quoted = m.message.extendedTextMessage.contextInfo;
    await sock.sendMessage(m.key.remoteJid, { delete: { remoteJid: m.key.remoteJid, fromMe: false, id: quoted.stanzaId, participant: quoted.participant } });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Failed to delete message. Am I admin?", m);
  }
});
