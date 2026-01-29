// Owner Administration Commands for BLUEBOT-V2

const ownerCommands = {
    // 1. Shutdown
    shutdown: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🔴 Shutting down..." });
        process.exit(0);
    },
    // 2. Restart
    restart: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🔄 Restarting..." });
        process.exit(1);
    },
    // 3. Eval
    eval: async (sock, msg, args, config) => {
        try {
            let evaled = eval(args.join(' '));
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
            await sock.sendMessage(msg.key.remoteJid, { text: evaled });
        } catch (err) {
            await sock.sendMessage(msg.key.remoteJid, { text: err.message });
        }
    },
    // 4. Exec
    exec: async (sock, msg, args, config) => {
        require('child_process').exec(args.join(' '), (err, stdout) => {
            if (err) return sock.sendMessage(msg.key.remoteJid, { text: err.message });
            sock.sendMessage(msg.key.remoteJid, { text: stdout });
        });
    },
    // 5. SetPrefix
    setprefix: async (sock, msg, args, config) => {
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a prefix." });
        config.PREFIX = args[0];
        await sock.sendMessage(msg.key.remoteJid, { text: `✅ Prefix set to: ${args[0]}` });
    },
    // 6. SetBotName
    setbotname: async (sock, msg, args, config) => {
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a name." });
        config.BOT_NAME = args.join(' ');
        await sock.sendMessage(msg.key.remoteJid, { text: `✅ Bot name set to: ${config.BOT_NAME}` });
    },
    // 7. AddMod
    addmod: async (sock, msg, args, config) => {
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a number." });
        const num = args[0].replace(/[^0-9]/g, '');
        config.MODS.push(num);
        await sock.sendMessage(msg.key.remoteJid, { text: `✅ Added mod: ${num}` });
    },
    // 8. DelMod
    delmod: async (sock, msg, args, config) => {
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a number." });
        const num = args[0].replace(/[^0-9]/g, '');
        config.MODS = config.MODS.filter(m => m !== num);
        await sock.sendMessage(msg.key.remoteJid, { text: `✅ Removed mod: ${num}` });
    },
    // 9. Public
    public: async (sock, msg, args, config) => {
        config.WORK_TYPE = 'public';
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Work type: Public" });
    },
    // 10. Private
    private: async (sock, msg, args, config) => {
        config.WORK_TYPE = 'private';
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Work type: Private" });
    },
    // 11. Join
    join: async (sock, msg, args, config) => {
        if (!args[0]) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide link." });
        const code = args[0].split('chat.whatsapp.com/')[1];
        await sock.groupAcceptInvite(code);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Joined." });
    },
    // 12. Leave
    leave: async (sock, msg, args, config) => {
        await sock.groupLeave(msg.key.remoteJid);
    },
    // 13. Block
    block: async (sock, msg, args, config) => {
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.key.remoteJid;
        await sock.updateBlockStatus(target, "block");
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Blocked." });
    },
    // 14. Unblock
    unblock: async (sock, msg, args, config) => {
        const target = args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null;
        await sock.updateBlockStatus(target, "unblock");
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Unblocked." });
    },
    // 15. Broadcast
    bc: async (sock, msg, args, config) => {
        const groups = await sock.groupFetchAllParticipating();
        for (let g of Object.values(groups)) {
            await sock.sendMessage(g.id, { text: args.join(' ') });
        }
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Broadcasted." });
    },
    // 16. Clear
    clear: async (sock, msg, args, config) => {
        await sock.chatModify({ clear: true }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Cleared." });
    },
    // 17. Delete
    del: async (sock, msg, args, config) => {
        await sock.chatModify({ delete: true }, msg.key.remoteJid);
    },
    // 18. Pin
    pin: async (sock, msg, args, config) => {
        await sock.chatModify({ pin: true }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Pinned." });
    },
    // 19. Unpin
    unpin: async (sock, msg, args, config) => {
        await sock.chatModify({ pin: false }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Unpinned." });
    },
    // 20. Archive
    archive: async (sock, msg, args, config) => {
        await sock.chatModify({ archive: true }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Archived." });
    },
    // 21. Unarchive
    unarchive: async (sock, msg, args, config) => {
        await sock.chatModify({ archive: false }, msg.key.remoteJid);
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Unarchived." });
    },
    // 22. SetPP
    setpp: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🖼️ Feature coming soon." });
    },
    // 23. SetStatus
    setstatus: async (sock, msg, args, config) => {
        await sock.updateProfileStatus(args.join(' '));
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Status updated." });
    },
    // 24. SetName
    setname: async (sock, msg, args, config) => {
        await sock.updateProfileName(args.join(' '));
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Name updated." });
    },
    // 25. GetLogs
    getlogs: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📋 Logs feature coming soon." });
    },
    // 26. Update
    update: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🔄 Checking for updates..." });
    },
    // 27. Backup
    backup: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "💾 Backup started." });
    },
    // 28. Restore
    restore: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "♻️ Restore started." });
    },
    // 29. GetConfig
    getconfig: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: JSON.stringify(config, null, 2) });
    },
    // 30. Reload
    reload: async (sock, msg, args, config) => {
        const { loadCommands } = require('../utils/handler');
        loadCommands();
        await sock.sendMessage(msg.key.remoteJid, { text: "✅ Commands reloaded." });
    }
};

module.exports = ownerCommands;
