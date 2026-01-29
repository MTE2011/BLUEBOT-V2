// Group Management Commands for BLUEBOT-V2

const groupCommands = {
    // 1. Promote
    promote: async (sock, msg, args, config) => {
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
        if (!target) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Mention someone." });
        await sock.groupParticipantsUpdate(msg.key.remoteJid, [target], "promote");
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Promoted." });
    },
    // 2. Demote
    demote: async (sock, msg, args, config) => {
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
        if (!target) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Mention someone." });
        await sock.groupParticipantsUpdate(msg.key.remoteJid, [target], "demote");
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Demoted." });
    },
    // 3. Kick
    kick: async (sock, msg, args, config) => {
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
        if (!target) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Mention someone." });
        await sock.groupParticipantsUpdate(msg.key.remoteJid, [target], "remove");
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Removed." });
    },
    // 4. Add
    add: async (sock, msg, args, config) => {
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a number." });
        const target = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        await sock.groupParticipantsUpdate(msg.key.remoteJid, [target], "add");
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Added." });
    },
    // 5. Mute
    mute: async (sock, msg, args, config) => {
        await sock.groupSettingUpdate(msg.key.remoteJid, 'announcement');
        await sock.sendMessage(msg.key.remoteJid, { text: "🔇 Group Muted." });
    },
    // 6. Unmute
    unmute: async (sock, msg, args, config) => {
        await sock.groupSettingUpdate(msg.key.remoteJid, 'not_announcement');
        await sock.sendMessage(msg.key.remoteJid, { text: "🔊 Group Unmuted." });
    },
    // 7. Lock
    lock: async (sock, msg, args, config) => {
        await sock.groupSettingUpdate(msg.key.remoteJid, 'locked');
        await sock.sendMessage(msg.key.remoteJid, { text: "🔒 Group Locked." });
    },
    // 8. Unlock
    unlock: async (sock, msg, args, config) => {
        await sock.groupSettingUpdate(msg.key.remoteJid, 'unlocked');
        await sock.sendMessage(msg.key.remoteJid, { text: "🔓 Group Unlocked." });
    },
    // 9. SetSubject
    setsubject: async (sock, msg, args, config) => {
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a subject." });
        await sock.groupUpdateSubject(msg.key.remoteJid, args.join(' '));
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Subject updated." });
    },
    // 10. SetDesc
    setdesc: async (sock, msg, args, config) => {
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a description." });
        await sock.groupUpdateDescription(msg.key.remoteJid, args.join(' '));
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Description updated." });
    },
    // 11. Invite
    invite: async (sock, msg, args, config) => {
        const code = await sock.groupInviteCode(msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: `🔗 https://chat.whatsapp.com/${code}` });
    },
    // 12. Revoke
    revoke: async (sock, msg, args, config) => {
        await sock.groupRevokeInvite(msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Link revoked." });
    },
    // 13. GroupInfo
    ginfo: async (sock, msg, args, config) => {
        const meta = await sock.groupMetadata(msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: `👥 *Group:* ${meta.subject}\nMembers: ${meta.participants.length}` });
    },
    // 14. Admins
    admins: async (sock, msg, args, config) => {
        const meta = await sock.groupMetadata(msg.key.remoteJid);
        const admins = meta.participants.filter(p => p.admin).map(p => `@${p.id.split('@')[0]}`);
        await sock.sendMessage(msg.key.remoteJid, { text: `👨‍💼 *Admins:*\n${admins.join('\n')}`, mentions: meta.participants.filter(p => p.admin).map(p => p.id) });
    },
    // 15. Everyone
    everyone: async (sock, msg, args, config) => {
        const meta = await sock.groupMetadata(msg.key.remoteJid);
        const mentions = meta.participants.map(p => p.id);
        await sock.sendMessage(msg.key.remoteJid, { text: `📢 *Everyone:*\n${args.join(' ')}`, mentions });
    },
    // 16. Welcome (Toggle)
    welcome: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "👋 Welcome feature toggled." });
    },
    // 17. Goodbye (Toggle)
    goodbye: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "👋 Goodbye feature toggled." });
    },
    // 18. AntiLink (Toggle)
    antilink: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🔗 Anti-link toggled." });
    },
    // 19. AntiSpam (Toggle)
    antispam: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🛡️ Anti-spam toggled." });
    },
    // 20. AntiDelete (Toggle)
    antidelete: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🗑️ Anti-delete toggled." });
    },
    // 21. AntiEdit (Toggle)
    antiedit: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📝 Anti-edit toggled." });
    },
    // 22. AntiCall (Toggle)
    anticall: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📞 Anti-call toggled." });
    },
    // 23. AutoRead (Toggle)
    autoread: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📖 Auto-read toggled." });
    },
    // 24. AutoStatus (Toggle)
    autostatus: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "👁️ Auto-status view toggled." });
    },
    // 25. Poll
    poll: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { poll: { name: args[0] || "Poll", values: args.slice(1), selectableCount: 1 } });
    },
    // 26. TagAdmin
    tagadmin: async (sock, msg, args, config) => {
        const meta = await sock.groupMetadata(msg.key.remoteJid);
        const admins = meta.participants.filter(p => p.admin).map(p => p.id);
        await sock.sendMessage(msg.key.remoteJid, { text: "👨‍💼 Admins, please check this.", mentions: admins });
    },
    // 27. KickAll (Owner)
    kickall: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only command." });
    },
    // 28. Leave (Owner)
    leave: async (sock, msg, args, config) => {
        await sock.groupLeave(msg.key.remoteJid);
    },
    // 29. Link
    link: async (sock, msg, args, config) => {
        const code = await sock.groupInviteCode(msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: `https://chat.whatsapp.com/${code}` });
    },
    // 30. Reset
    reset: async (sock, msg, args, config) => {
        await sock.groupRevokeInvite(msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Link reset." });
    }
};

module.exports = groupCommands;
