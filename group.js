// Group commands - Only for group admins

const groupCommands = {
    // 1. Promote command
    promote: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        // Get mentioned user or quoted message
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
                         msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        if (!mentioned) {
            await sock.sendMessage(groupId, { text: '❌ Please mention or reply to a user to promote!' });
            return;
        }

        try {
            await sock.groupParticipantsUpdate(groupId, [mentioned], 'promote');
            await sock.sendMessage(groupId, { text: `✅ Successfully promoted user to admin!` });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to promote user: ${error.message}` });
        }
    },

    // 2. Demote command
    demote: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
                         msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        if (!mentioned) {
            await sock.sendMessage(groupId, { text: '❌ Please mention or reply to a user to demote!' });
            return;
        }

        try {
            await sock.groupParticipantsUpdate(groupId, [mentioned], 'demote');
            await sock.sendMessage(groupId, { text: `✅ Successfully demoted user from admin!` });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to demote user: ${error.message}` });
        }
    },

    // 3. Kick command
    kick: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
                         msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        if (!mentioned) {
            await sock.sendMessage(groupId, { text: '❌ Please mention or reply to a user to kick!' });
            return;
        }

        try {
            await sock.groupParticipantsUpdate(groupId, [mentioned], 'remove');
            await sock.sendMessage(groupId, { text: `✅ Successfully removed user from group!` });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to remove user: ${error.message}` });
        }
    },

    // 4. Add command
    add: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        if (args.length === 0) {
            await sock.sendMessage(groupId, { text: '❌ Please provide a phone number to add!' });
            return;
        }

        const number = args[0].replace(/[^0-9]/g, '');
        const userId = `${number}@s.whatsapp.net`;

        try {
            await sock.groupParticipantsUpdate(groupId, [userId], 'add');
            await sock.sendMessage(groupId, { text: `✅ Successfully added user to group!` });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to add user: ${error.message}` });
        }
    },

    // 5. Tag all command
    tagall: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        try {
            const groupMetadata = await sock.groupMetadata(groupId);
            const participants = groupMetadata.participants.map(p => p.id);
            
            const message = args.join(' ') || 'Attention everyone!';
            
            await sock.sendMessage(groupId, { 
                text: `📢 *Group Announcement*\n\n${message}`,
                mentions: participants
            });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to tag all: ${error.message}` });
        }
    },

    // 6. Mute command
    mute: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        try {
            await sock.groupSettingUpdate(groupId, 'announcement');
            await sock.sendMessage(groupId, { text: '🔇 Group has been muted! Only admins can send messages.' });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to mute group: ${error.message}` });
        }
    },

    // 7. Unmute command
    unmute: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        try {
            await sock.groupSettingUpdate(groupId, 'not_announcement');
            await sock.sendMessage(groupId, { text: '🔊 Group has been unmuted! Everyone can send messages.' });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to unmute group: ${error.message}` });
        }
    },

    // 8. Set name command
    setname: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        if (args.length === 0) {
            await sock.sendMessage(groupId, { text: '❌ Please provide a new group name!' });
            return;
        }

        const newName = args.join(' ');
        
        try {
            await sock.groupUpdateSubject(groupId, newName);
            await sock.sendMessage(groupId, { text: `✅ Group name changed to: *${newName}*` });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to change group name: ${error.message}` });
        }
    },

    // 9. Set description command
    setdesc: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        if (args.length === 0) {
            await sock.sendMessage(groupId, { text: '❌ Please provide a new group description!' });
            return;
        }

        const newDesc = args.join(' ');
        
        try {
            await sock.groupUpdateDescription(groupId, newDesc);
            await sock.sendMessage(groupId, { text: `✅ Group description updated!` });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to update description: ${error.message}` });
        }
    },

    // 10. Anti-link command
    antilink: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🔗 Anti-link feature coming soon!' });
    },

    // 11. Welcome message command
    welcome: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '👋 Welcome message feature coming soon!' });
    },

    // 12. Leave message command
    leave: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '👋 Leave message feature coming soon!' });
    },

    // 13. Get group link
    link: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        try {
            const inviteCode = await sock.groupInviteCode(groupId);
            const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
            await sock.sendMessage(groupId, { text: `🔗 *Group Invite Link*\n\n${inviteLink}` });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to get group link: ${error.message}` });
        }
    },

    // 14. Revoke group link
    revokelink: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        try {
            await sock.groupRevokeInvite(groupId);
            await sock.sendMessage(groupId, { text: '✅ Group invite link has been revoked! Old links are no longer valid.' });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to revoke link: ${error.message}` });
        }
    },

    // 15. Group info
    groupinfo: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        try {
            const groupMetadata = await sock.groupMetadata(groupId);
            const infoText = `
📱 *GROUP INFORMATION*

👥 *Name:* ${groupMetadata.subject}
📝 *Description:* ${groupMetadata.desc || 'No description'}
👤 *Owner:* ${groupMetadata.owner ? '@' + groupMetadata.owner.split('@')[0] : 'Unknown'}
📊 *Members:* ${groupMetadata.participants.length}
👨‍💼 *Admins:* ${groupMetadata.participants.filter(p => p.admin).length}
📅 *Created:* ${new Date(groupMetadata.creation * 1000).toLocaleDateString()}
🔒 *Restricted:* ${groupMetadata.restrict ? 'Yes' : 'No'}
📢 *Announce:* ${groupMetadata.announce ? 'Yes' : 'No'}
`;
            await sock.sendMessage(groupId, { text: infoText });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to get group info: ${error.message}` });
        }
    },

    // 16. Invite command
    invite: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '📨 Invite feature coming soon!' });
    },

    // 17. Poll command
    poll: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '📊 Poll feature coming soon!' });
    },

    // 18. Rules command
    rules: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '📜 Rules feature coming soon!' });
    },

    // 19. Admin list
    adminlist: async (sock, msg, args, config) => {
        const groupId = msg.key.remoteJid;
        
        try {
            const groupMetadata = await sock.groupMetadata(groupId);
            const admins = groupMetadata.participants.filter(p => p.admin);
            
            let adminText = '👨‍💼 *GROUP ADMINS*\n\n';
            admins.forEach((admin, index) => {
                const number = admin.id.split('@')[0];
                const role = admin.admin === 'superadmin' ? '👑 Owner' : '⭐ Admin';
                adminText += `${index + 1}. ${role}: @${number}\n`;
            });
            
            await sock.sendMessage(groupId, { 
                text: adminText,
                mentions: admins.map(a => a.id)
            });
        } catch (error) {
            await sock.sendMessage(groupId, { text: `❌ Failed to get admin list: ${error.message}` });
        }
    },

    // 20. Remove command (alias for kick)
    remove: async (sock, msg, args, config) => {
        await groupCommands.kick(sock, msg, args, config);
    }
};

module.exports = groupCommands;
