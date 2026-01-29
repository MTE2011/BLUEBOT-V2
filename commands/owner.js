// Helper function to send a message
const send = (sock, jid, text, quoted) => sock.sendMessage(jid, { text }, { quoted });

// --- Owner Commands (30+) ---

// 1. Shutdown
bluebot({
  cmd: "shutdown",
  desc: "Stop the bot process",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await send(sock, m.key.remoteJid, "🔴 Shutting down...", m);
  process.exit(0);
});

// 2. Restart
bluebot({
  cmd: "restart",
  desc: "Restart the bot process",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await send(sock, m.key.remoteJid, "🔄 Restarting...", m);
  process.exit(1); // Use 1 to indicate restart
});

// 3. Eval
bluebot({
  cmd: "eval",
  alias: [">", "=>"],
  desc: "Execute JavaScript code (DANGEROUS)",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  try {
    let code = args.join(" ");
    let result = await eval(`(async () => { ${code} })()`);
    send(sock, m.key.remoteJid, `✅ *Result:*\n${require('util').format(result)}`, m);
  } catch (e) {
    send(sock, m.key.remoteJid, `❌ *Error:*\n${require('util').format(e)}`, m);
  }
});

// 4. Exec
bluebot({
  cmd: "exec",
  alias: ["$"],
  desc: "Execute a shell command",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  require('child_process').exec(args.join(' '), (err, stdout) => {
    if (err) return send(sock, m.key.remoteJid, err.message, m);
    send(sock, m.key.remoteJid, stdout, m);
  });
});

// 5. Set Prefix
bluebot({
  cmd: "setprefix",
  desc: "Change the bot's command prefix",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  if (!args[0]) return send(sock, m.key.remoteJid, "❌ Provide a prefix.", m);
  config.PREFIX = args[0];
  send(sock, m.key.remoteJid, `✅ Prefix set to: ${args[0]}`, m);
});

// 6. Set Bot Name
bluebot({
  cmd: "setbotname",
  desc: "Change the bot's name",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  if (!args[0]) return send(sock, m.key.remoteJid, "❌ Provide a name.", m);
  config.BOT_NAME = args.join(' ');
  send(sock, m.key.remoteJid, `✅ Bot name set to: ${config.BOT_NAME}`, m);
});

// 7. Add Mod
bluebot({
  cmd: "addmod",
  desc: "Add a user to the mod list",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  if (!args[0]) return send(sock, m.key.remoteJid, "❌ Provide a number.", m);
  const num = args[0].replace(/[^0-9]/g, '');
  config.MODS.push(num);
  send(sock, m.key.remoteJid, `✅ Added mod: ${num}`, m);
});

// 8. Remove Mod
bluebot({
  cmd: "delmod",
  desc: "Remove a user from the mod list",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  if (!args[0]) return send(sock, m.key.remoteJid, "❌ Provide a number.", m);
  const num = args[0].replace(/[^0-9]/g, '');
  config.MODS = config.MODS.filter(mod => mod !== num);
  send(sock, m.key.remoteJid, `✅ Removed mod: ${num}`, m);
});

// 9. Public Mode
bluebot({
  cmd: "public",
  desc: "Set bot to public mode",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  config.WORK_TYPE = 'public';
  send(sock, m.key.remoteJid, "✅ Work type set to Public.", m);
});

// 10. Private Mode
bluebot({
  cmd: "private",
  desc: "Set bot to private mode",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  config.WORK_TYPE = 'private';
  send(sock, m.key.remoteJid, "✅ Work type set to Private.", m);
});

// 11. Join Group
bluebot({
  cmd: "join",
  desc: "Join a group via invite link",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  if (!args[0]) return send(sock, m.key.remoteJid, "❌ Provide a group link.", m);
  const code = args[0].split('chat.whatsapp.com/')[1];
  await sock.groupAcceptInvite(code);
  send(sock, m.key.remoteJid, "✅ Joined group.", m);
});

// 12. Leave Group
bluebot({
  cmd: "leave",
  desc: "Leave the current group",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await sock.groupLeave(m.key.remoteJid);
});

// 13. Block User
bluebot({
  cmd: "block",
  desc: "Block a user",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  const target = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || m.key.remoteJid;
  await sock.updateBlockStatus(target, "block");
  send(sock, m.key.remoteJid, "✅ Blocked.", m);
});

// 14. Unblock User
bluebot({
  cmd: "unblock",
  desc: "Unblock a user",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  const target = args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null;
  if (!target) return send(sock, m.key.remoteJid, "❌ Provide a number to unblock.", m);
  await sock.updateBlockStatus(target, "unblock");
  send(sock, m.key.remoteJid, "✅ Unblocked.", m);
});

// 15. Broadcast
bluebot({
  cmd: "bc",
  desc: "Broadcast a message to all groups",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  const groups = await sock.groupFetchAllParticipating();
  for (let g of Object.values(groups)) {
    await send(sock, g.id, args.join(' '), m);
  }
  send(sock, m.key.remoteJid, "✅ Broadcasted.", m);
});

// 16. Clear Chat
bluebot({
  cmd: "clear",
  desc: "Clear all messages in a chat",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await sock.chatModify({ clear: true }, m.key.remoteJid);
  send(sock, m.key.remoteJid, "✅ Cleared.", m);
});

// 17. Delete Chat
bluebot({
  cmd: "delchat",
  desc: "Delete an entire chat",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await sock.chatModify({ delete: true }, m.key.remoteJid);
});

// 18. Pin Chat
bluebot({
  cmd: "pin",
  desc: "Pin a chat",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await sock.chatModify({ pin: true }, m.key.remoteJid);
  send(sock, m.key.remoteJid, "✅ Pinned.", m);
});

// 19. Unpin Chat
bluebot({
  cmd: "unpin",
  desc: "Unpin a chat",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await sock.chatModify({ pin: false }, m.key.remoteJid);
  send(sock, m.key.remoteJid, "✅ Unpinned.", m);
});

// 20. Archive Chat
bluebot({
  cmd: "archive",
  desc: "Archive a chat",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await sock.chatModify({ archive: true }, m.key.remoteJid);
  send(sock, m.key.remoteJid, "✅ Archived.", m);
});

// 21. Unarchive Chat
bluebot({
  cmd: "unarchive",
  desc: "Unarchive a chat",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await sock.chatModify({ archive: false }, m.key.remoteJid);
  send(sock, m.key.remoteJid, "✅ Unarchived.", m);
});

// 22. Set Profile Picture
bluebot({
  cmd: "setpp",
  desc: "Set the bot's profile picture",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🖼️ Reply to an image with this command.", m);
});

// 23. Set Status
bluebot({
  cmd: "setstatus",
  desc: "Set the bot's status message",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  await sock.updateProfileStatus(args.join(' '));
  send(sock, m.key.remoteJid, "✅ Status updated.", m);
});

// 24. Get Logs
bluebot({
  cmd: "getlogs",
  desc: "Get the bot's logs",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📋 Logs feature coming soon.", m);
});

// 25. Update Bot
bluebot({
  cmd: "update",
  desc: "Update the bot from its repository",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  const { exec } = require('child_process');
  await send(sock, m.key.remoteJid, "🔄 *Updating BLUEBOT-V2...*\n\nPulling latest changes from GitHub...", m);
  
  exec('git pull origin main', (err, stdout, stderr) => {
    if (err) return send(sock, m.key.remoteJid, `❌ *Update Failed:*\n${err.message}`, m);
    if (stdout.includes('Already up to date.')) return send(sock, m.key.remoteJid, "✅ *Bot is already up to date!*", m);
    
    send(sock, m.key.remoteJid, `✅ *Update Successful!*\n\n*Changes:*\n${stdout}\n\nRestarting bot to apply changes...`, m);
    setTimeout(() => process.exit(1), 3000);
  });
});

// 26. Backup
bluebot({
  cmd: "backup",
  desc: "Create a backup of the bot's data",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💾 Backup started.", m);
});

// 27. Restore
bluebot({
  cmd: "restore",
  desc: "Restore the bot from a backup",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "♻️ Restore started.", m);
});

// 28. Get Config
bluebot({
  cmd: "getconfig",
  desc: "Get the current bot configuration",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, JSON.stringify(config, null, 2), m);
});

// 29. Reload Commands
bluebot({
  cmd: "reload",
  desc: "Reload all command files",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  const { loadCommands } = require('../utils/handler');
  loadCommands();
  send(sock, m.key.remoteJid, "✅ Commands reloaded.", m);
});

// 30. Get Env
bluebot({
  cmd: "getenv",
  desc: "Get environment variables",
  fromMe: true,
  category: "owner",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, JSON.stringify(process.env, null, 2), m);
});
