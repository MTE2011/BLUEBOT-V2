// WhatsApp Specific Commands for BLUEBOT-V2

const whatsappCommands = {
    // 1. Status
    status: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `📊 Bot Status: Online\nPrefix: ${config.PREFIX}\nWork Type: ${config.WORK_TYPE}` });
    },
    // 2. MyJid
    myjid: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `🆔 Your JID: ${msg.key.participant || msg.key.remoteJid}` });
    },
    // 3. GroupJid
    groupjid: async (sock, msg, args, config) => {
        if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ This is not a group." });
        await sock.sendMessage(msg.key.remoteJid, { text: `🆔 Group JID: ${msg.key.remoteJid}` });
    },
    // 4. Block (Owner)
    block: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
        if (!target) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Mention someone to block." });
        await sock.updateBlockStatus(target, "block");
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Blocked." });
    },
    // 5. Unblock (Owner)
    unblock: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        const target = args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null;
        if (!target) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a number to unblock." });
        await sock.updateBlockStatus(target, "unblock");
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Unblocked." });
    },
    // 6. SetPP (Owner)
    setpp: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.sendMessage(msg.key.remoteJid, { text: "🖼️ Profile picture update feature coming soon!" });
    },
    // 7. SetStatus (Owner)
    setstatus: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a status." });
        await sock.updateProfileStatus(args.join(' '));
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Status updated." });
    },
    // 8. SetName (Owner)
    setname: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a name." });
        await sock.updateProfileName(args.join(' '));
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Name updated." });
    },
    // 9. GetBio
    getbio: async (sock, msg, args, config) => {
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.key.remoteJid;
        const bio = await sock.fetchStatus(target);
        await sock.sendMessage(msg.key.remoteJid, { text: `📝 Bio: ${bio.status || 'No bio'}` });
    },
    // 10. GetPP
    getpp: async (sock, msg, args, config) => {
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.key.remoteJid;
        const ppUrl = await sock.profilePictureUrl(target, 'image');
        await sock.sendMessage(msg.key.remoteJid, { image: { url: ppUrl }, caption: "🖼️ Profile Picture" });
    },
    // 11. Archive (Owner)
    archive: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.chatModify({ archive: true }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Archived." });
    },
    // 12. Unarchive (Owner)
    unarchive: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.chatModify({ archive: false }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Unarchived." });
    },
    // 13. Pin (Owner)
    pin: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.chatModify({ pin: true }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Pinned." });
    },
    // 14. Unpin (Owner)
    unpin: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.chatModify({ pin: false }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Unpinned." });
    },
    // 15. Mute (Owner)
    mutechat: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, msg.key.remoteJid); // 8 hours
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Chat muted for 8 hours." });
    },
    // 16. Unmute (Owner)
    unmutechat: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.chatModify({ mute: null }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Chat unmuted." });
    },
    // 17. Delete (Owner)
    deletechat: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.chatModify({ delete: true }, msg.key.remoteJid);
    },
    // 18. Clear (Owner)
    clearchat: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.chatModify({ clear: true }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Chat cleared." });
    },
    // 19. Read (Owner)
    readall: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Marked all as read." });
    },
    // 20. Privacy (Owner)
    privacy: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🔒 Privacy settings management coming soon!" });
    },
    // 21. ListGroups
    listgroups: async (sock, msg, args, config) => {
        const groups = await sock.groupFetchAllParticipating();
        let list = "👥 *Groups List:*\n\n";
        Object.values(groups).forEach((g, i) => list += `${i+1}. ${g.subject}\n`);
        await sock.sendMessage(msg.key.remoteJid, { text: list });
    },
    // 22. GroupInfo
    groupinfo: async (sock, msg, args, config) => {
        if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Not a group." });
        const meta = await sock.groupMetadata(msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: `👥 *Group Info:*\nName: ${meta.subject}\nMembers: ${meta.participants.length}\nOwner: ${meta.owner}` });
    },
    // 23. InviteLink
    invitelink: async (sock, msg, args, config) => {
        if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Not a group." });
        const code = await sock.groupInviteCode(msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: `🔗 Link: https://chat.whatsapp.com/${code}` });
    },
    // 24. RevokeLink
    revokelink: async (sock, msg, args, config) => {
        if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Not a group." });
        await sock.groupRevokeInvite(msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Link revoked." });
    },
    // 25. Leave (Owner)
    leave: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Not a group." });
        await sock.groupLeave(msg.key.remoteJid);
    },
    // 26. Join (Owner)
    join: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a link." });
        const code = args[0].split('chat.whatsapp.com/')[1];
        await sock.groupAcceptInvite(code);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Joined." });
    },
    // 27. Broadcast (Owner)
    bc: async (sock, msg, args, config) => {
        const senderNumber = (msg.key.participant || msg.key.remoteJid).replace('@s.whatsapp.net', '');
        if (senderNumber !== config.OWNER_NUMBER) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." });
        const groups = await sock.groupFetchAllParticipating();
        for (let g of Object.values(groups)) {
            await sock.sendMessage(g.id, { text: `📢 *Broadcast:*\n\n${args.join(' ')}` });
        }
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Broadcasted." });
    },
    // 28. Forward (Owner)
    forward: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "⏩ Forwarding feature coming soon!" });
    },
    // 29. TagAll (Admin)
    tagall: async (sock, msg, args, config) => {
        if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Not a group." });
        const meta = await sock.groupMetadata(msg.key.remoteJid);
        const mentions = meta.participants.map(p => p.id);
        await sock.sendMessage(msg.key.remoteJid, { text: `📢 *Tag All:*\n\n${args.join(' ')}`, mentions });
    },
    // 30. Hidetag (Admin)
    hidetag: async (sock, msg, args, config) => {
        if (!msg.key.remoteJid.endsWith('@g.us')) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Not a group." });
        const meta = await sock.groupMetadata(msg.key.remoteJid);
        const mentions = meta.participants.map(p => p.id);
        await sock.sendMessage(msg.key.remoteJid, { text: args.join(' '), mentions });
    }
};

module.exports = whatsappCommands;
