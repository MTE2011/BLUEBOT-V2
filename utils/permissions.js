// Permission checking utilities

async function checkPermissions(sock, msg, config) {
    const sender = msg.key.remoteJid;
    const senderNumber = (msg.key.participant || sender).replace('@s.whatsapp.net', '');
    const isGroup = sender.endsWith('@g.us');

    // Check if sender is owner
    const isOwner = senderNumber === config.ownerNumber || config.mods.includes(senderNumber);

    // Check if sender is group admin
    let isAdmin = false;
    if (isGroup) {
        try {
            const groupMetadata = await sock.groupMetadata(sender);
            const participant = groupMetadata.participants.find(p => p.id === msg.key.participant);
            isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
        } catch (error) {
            console.error('Error checking admin status:', error);
        }
    }

    return {
        isOwner,
        isAdmin,
        isMod: config.mods.includes(senderNumber),
        isGroup,
        sender,
        senderNumber
    };
}

async function isGroupAdmin(sock, groupId, userId) {
    try {
        const groupMetadata = await sock.groupMetadata(groupId);
        const participant = groupMetadata.participants.find(p => p.id === userId);
        return participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

async function sendWelcomeMessage(sock, config) {
    try {
        const ownerJid = `${config.ownerNumber}@s.whatsapp.net`;
        
        const welcomeText = `
╔════════════════════════════════════════════════════════════╗
║                   WELCOME TO BLUEBOT-V2!                   ║
╚════════════════════════════════════════════════════════════╝

🎉 *Congratulations, ${config.ownerName}!*

Your BLUEBOT-V2 has been successfully paired and is now online! 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *BOT INFORMATION*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 *Bot Name:* ${config.botName}
👤 *Owner:* ${config.ownerName}
📱 *Owner Number:* +${config.ownerNumber}
⚡ *Prefix:* ${config.prefix}
📊 *Version:* 2.0.0
🔧 *Status:* Fully Operational

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *FEATURES & CAPABILITIES*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ *100+ Commands Available*
   • 30 General Commands (for everyone)
   • 20 Group Commands (for group admins)
   • 30 Owner Commands (for you only)
   • 1 Menu Command (categorized list)

✅ *Advanced Permission System*
   • Owner-only commands
   • Moderator support
   • Group admin verification
   • Role-based access control

✅ *Group Management*
   • Promote/demote members
   • Kick/add participants
   • Mute/unmute groups
   • Welcome/leave messages
   • Anti-link protection
   • Tag all members
   • And much more!

✅ *Stability Features*
   • Auto-reconnect on disconnect
   • Error handling & logging
   • Crash prevention
   • Modular command system

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *QUICK START GUIDE*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ Type *${config.prefix}menu* to see all available commands
2️⃣ Type *${config.prefix}help* for detailed command information
3️⃣ Type *${config.prefix}botinfo* to view bot statistics
4️⃣ Type *${config.prefix}ping* to check bot response time

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔐 *OWNER COMMANDS PREVIEW*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• ${config.prefix}shutdown - Shut down the bot
• ${config.prefix}restart - Restart the bot
• ${config.prefix}broadcast - Send message to all groups
• ${config.prefix}ban - Ban a user from using the bot
• ${config.prefix}eval - Execute JavaScript code
• ${config.prefix}getstats - View bot statistics
• ${config.prefix}backup - Backup bot data
• And 23+ more owner commands!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 *GROUP COMMANDS PREVIEW*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• ${config.prefix}promote - Promote member to admin
• ${config.prefix}demote - Demote admin to member
• ${config.prefix}kick - Remove member from group
• ${config.prefix}add - Add member to group
• ${config.prefix}tagall - Tag all group members
• ${config.prefix}antilink - Enable/disable anti-link
• ${config.prefix}welcome - Set welcome message
• And 13+ more group commands!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌟 *GENERAL COMMANDS PREVIEW*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• ${config.prefix}ping - Check bot response time
• ${config.prefix}joke - Get a random joke
• ${config.prefix}quote - Get an inspirational quote
• ${config.prefix}weather - Check weather information
• ${config.prefix}wiki - Search Wikipedia
• ${config.prefix}translate - Translate text
• ${config.prefix}meme - Get a random meme
• And 23+ more general commands!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 *TIPS & BEST PRACTICES*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Keep your bot number secure
✓ Add trusted moderators using ${config.prefix}addowner
✓ Regularly backup your bot data
✓ Monitor logs for any issues
✓ Update the bot regularly for new features
✓ Use ${config.prefix}getstats to monitor performance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 *SUPPORT & DEVELOPMENT*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍💻 *Developer:* ${config.ownerName}
📱 *Contact:* +${config.ownerNumber}
🔧 *Bot Type:* Modular WhatsApp Bot
⚙️ *Framework:* Baileys (WhatsApp Web API)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎊 *Thank you for using BLUEBOT-V2!* 🎊

Your bot is now ready to manage your WhatsApp groups and provide
amazing features to your users. Enjoy the power of automation! 💪

Type *${config.prefix}menu* to get started! 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

© 2025 BLUEBOT-V2 | Powered by Baileys | Made with ❤️
`;

        await sock.sendMessage(ownerJid, { text: welcomeText });
        console.log('✓ Welcome message sent to owner successfully!');
    } catch (error) {
        console.error('Error sending welcome message:', error);
    }
}

module.exports = {
    checkPermissions,
    isGroupAdmin,
    sendWelcomeMessage
};
