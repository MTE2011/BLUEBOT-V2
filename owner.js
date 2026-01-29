// Owner commands - Only for bot owner and mods

const ownerCommands = {
    // 1. Shutdown command
    shutdown: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🔴 Shutting down bot... Goodbye!' });
        setTimeout(() => {
            process.exit(0);
        }, 2000);
    },

    // 2. Restart command
    restart: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🔄 Restarting bot... Please wait!' });
        setTimeout(() => {
            process.exit(1); // Exit with error code to trigger restart if using process manager
        }, 2000);
    },

    // 3. Eval command (execute JavaScript code)
    eval: async (sock, msg, args, config) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please provide code to evaluate!' });
            return;
        }

        const code = args.join(' ');
        
        try {
            let result = eval(code);
            if (typeof result === 'object') {
                result = JSON.stringify(result, null, 2);
            }
            await sock.sendMessage(msg.key.remoteJid, { text: `✅ *Eval Result:*\n\n\`\`\`${result}\`\`\`` });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ *Eval Error:*\n\n${error.message}` });
        }
    },

    // 4. Exec command (execute shell command)
    exec: async (sock, msg, args, config) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please provide a command to execute!' });
            return;
        }

        const { exec } = require('child_process');
        const command = args.join(' ');
        
        exec(command, async (error, stdout, stderr) => {
            if (error) {
                await sock.sendMessage(msg.key.remoteJid, { text: `❌ *Exec Error:*\n\n${error.message}` });
                return;
            }
            
            const output = stdout || stderr || 'Command executed successfully (no output)';
            await sock.sendMessage(msg.key.remoteJid, { text: `✅ *Exec Output:*\n\n\`\`\`${output}\`\`\`` });
        });
    },

    // 5. Broadcast command
    broadcast: async (sock, msg, args, config) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please provide a message to broadcast!' });
            return;
        }

        const broadcastMsg = args.join(' ');
        await sock.sendMessage(msg.key.remoteJid, { text: '📢 Broadcasting message to all groups...' });
        
        try {
            const chats = await sock.groupFetchAllParticipating();
            const groups = Object.values(chats).filter(chat => chat.id.endsWith('@g.us'));
            
            let successCount = 0;
            for (const group of groups) {
                try {
                    await sock.sendMessage(group.id, { 
                        text: `📢 *BROADCAST MESSAGE*\n\n${broadcastMsg}\n\n_From: ${config.botName}_` 
                    });
                    successCount++;
                } catch (error) {
                    console.error(`Failed to send to ${group.subject}:`, error);
                }
            }
            
            await sock.sendMessage(msg.key.remoteJid, { 
                text: `✅ Broadcast complete!\n\nSent to ${successCount}/${groups.length} groups.` 
            });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ Broadcast failed: ${error.message}` });
        }
    },

    // 6. Update command
    update: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🔄 Update feature coming soon!' });
    },

    // 7. Set status command
    setstatus: async (sock, msg, args, config) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please provide a status message!' });
            return;
        }

        const status = args.join(' ');
        
        try {
            await sock.updateProfileStatus(status);
            await sock.sendMessage(msg.key.remoteJid, { text: `✅ Status updated to: *${status}*` });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ Failed to update status: ${error.message}` });
        }
    },

    // 8. Ban command
    ban: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🚫 Ban feature coming soon!' });
    },

    // 9. Unban command
    unban: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '✅ Unban feature coming soon!' });
    },

    // 10. Get logs command
    getlogs: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '📋 Logs feature coming soon!' });
    },

    // 11. Add owner/mod command
    addowner: async (sock, msg, args, config) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please provide a phone number!' });
            return;
        }

        const number = args[0].replace(/[^0-9]/g, '');
        
        if (config.mods.includes(number)) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ This user is already a moderator!' });
            return;
        }

        config.mods.push(number);
        await sock.sendMessage(msg.key.remoteJid, { text: `✅ Successfully added +${number} as a moderator!` });
    },

    // 12. Remove owner/mod command
    removeowner: async (sock, msg, args, config) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please provide a phone number!' });
            return;
        }

        const number = args[0].replace(/[^0-9]/g, '');
        const index = config.mods.indexOf(number);
        
        if (index === -1) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ This user is not a moderator!' });
            return;
        }

        config.mods.splice(index, 1);
        await sock.sendMessage(msg.key.remoteJid, { text: `✅ Successfully removed +${number} from moderators!` });
    },

    // 13. Backup command
    backup: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '💾 Backup feature coming soon!' });
    },

    // 14. Restore command
    restore: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '♻️ Restore feature coming soon!' });
    },

    // 15. Deploy command
    deploy: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🚀 Deploy feature coming soon!' });
    },

    // 16. Get stats command
    getstats: async (sock, msg, args, config) => {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        try {
            const chats = await sock.groupFetchAllParticipating();
            const groups = Object.values(chats).filter(chat => chat.id.endsWith('@g.us'));
            
            const statsText = `
📊 *BOT STATISTICS*

⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s
💾 *Memory Usage:* ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB
📈 *Total Memory:* ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB
🔧 *Platform:* ${process.platform}
📦 *Node Version:* ${process.version}

👥 *Groups:* ${groups.length}
👤 *Owner:* ${config.ownerName}
📱 *Owner Number:* +${config.ownerNumber}
⚡ *Prefix:* ${config.prefix}
🎯 *Bot Name:* ${config.botName}

✅ *Status:* Fully Operational
`;
            await sock.sendMessage(msg.key.remoteJid, { text: statsText });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ Failed to get stats: ${error.message}` });
        }
    },

    // 17. Force leave command
    forceleave: async (sock, msg, args, config) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please provide a group JID!' });
            return;
        }

        const groupId = args[0];
        
        try {
            await sock.groupLeave(groupId);
            await sock.sendMessage(msg.key.remoteJid, { text: `✅ Successfully left the group!` });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ Failed to leave group: ${error.message}` });
        }
    },

    // 18. Clear queue command
    clearqueue: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🗑️ Queue cleared!' });
    },

    // 19. Reload command
    reload: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🔄 Reloading commands...' });
        
        try {
            delete require.cache[require.resolve('./general.js')];
            delete require.cache[require.resolve('./group.js')];
            delete require.cache[require.resolve('./owner.js')];
            
            await sock.sendMessage(msg.key.remoteJid, { text: '✅ Commands reloaded successfully!' });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ Failed to reload: ${error.message}` });
        }
    },

    // 20. Get chats command
    getchats: async (sock, msg, args, config) => {
        try {
            const chats = await sock.groupFetchAllParticipating();
            const groups = Object.values(chats).filter(chat => chat.id.endsWith('@g.us'));
            
            let chatList = '💬 *ALL GROUPS*\n\n';
            groups.forEach((group, index) => {
                chatList += `${index + 1}. ${group.subject}\n   ID: ${group.id}\n\n`;
            });
            
            await sock.sendMessage(msg.key.remoteJid, { text: chatList });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ Failed to get chats: ${error.message}` });
        }
    },

    // 21. Delete chat command
    deletechat: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🗑️ Delete chat feature coming soon!' });
    },

    // 22. Get config command
    getconfig: async (sock, msg, args, config) => {
        const configText = `
⚙️ *BOT CONFIGURATION*

🤖 *Bot Name:* ${config.botName}
👤 *Owner:* ${config.ownerName}
📱 *Owner Number:* +${config.ownerNumber}
⚡ *Prefix:* ${config.prefix}
👥 *Moderators:* ${config.mods.length > 0 ? config.mods.map(m => '+' + m).join(', ') : 'None'}
`;
        await sock.sendMessage(msg.key.remoteJid, { text: configText });
    },

    // 23. Set config command
    setconfig: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '⚙️ Set config feature coming soon!' });
    },

    // 24. Get database command
    getdb: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '💾 Database feature coming soon!' });
    },

    // 25. Clear database command
    cleardb: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🗑️ Clear database feature coming soon!' });
    },

    // 26. Stop spam command
    stopspam: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🛑 Anti-spam feature coming soon!' });
    },

    // 27. Set prefix command
    setprefix: async (sock, msg, args, config) => {
        if (args.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please provide a new prefix!' });
            return;
        }

        const newPrefix = args[0];
        config.prefix = newPrefix;
        
        await sock.sendMessage(msg.key.remoteJid, { text: `✅ Prefix changed to: *${newPrefix}*` });
    },

    // 28. Get users command
    getusers: async (sock, msg, args, config) => {
        try {
            const chats = await sock.groupFetchAllParticipating();
            const groups = Object.values(chats).filter(chat => chat.id.endsWith('@g.us'));
            
            let totalUsers = 0;
            groups.forEach(group => {
                totalUsers += group.participants?.length || 0;
            });
            
            await sock.sendMessage(msg.key.remoteJid, { 
                text: `👥 *USER STATISTICS*\n\n📊 Total Groups: ${groups.length}\n👤 Total Users: ${totalUsers}` 
            });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ Failed to get users: ${error.message}` });
        }
    },

    // 29. Notify command
    notify: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🔔 Notification feature coming soon!' });
    },

    // 30. Block command
    block: async (sock, msg, args, config) => {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
                         msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        if (!mentioned) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please mention or reply to a user to block!' });
            return;
        }

        try {
            await sock.updateBlockStatus(mentioned, 'block');
            await sock.sendMessage(msg.key.remoteJid, { text: `✅ Successfully blocked user!` });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: `❌ Failed to block user: ${error.message}` });
        }
    }
};

module.exports = ownerCommands;
