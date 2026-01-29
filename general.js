// General commands - Available to everyone

const generalCommands = {
    // 1. Ping command
    ping: async (sock, msg, args, config) => {
        const start = Date.now();
        await sock.sendMessage(msg.key.remoteJid, { text: '🏓 Pinging...' });
        const latency = Date.now() - start;
        await sock.sendMessage(msg.key.remoteJid, { 
            text: `🏓 *Pong!*\n\n⏱️ Response Time: ${latency}ms\n✅ Bot is online and responsive!` 
        });
    },

    // 2. Menu command
    menu: async (sock, msg, args, config) => {
        const menuText = `
╔════════════════════════════════════════════════════════════╗
║                    BLUEBOT-V2 MENU                         ║
╚════════════════════════════════════════════════════════════╝

🤖 *Bot:* ${config.botName}
⚡ *Prefix:* ${config.prefix}
📊 *Version:* 2.0.0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌟 *GENERAL COMMANDS* (30)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${config.prefix}ping - Check bot response time
${config.prefix}menu - Show this menu
${config.prefix}help - Get help information
${config.prefix}info - Bot information
${config.prefix}joke - Get a random joke
${config.prefix}quote - Get an inspirational quote
${config.prefix}weather - Check weather
${config.prefix}wiki - Search Wikipedia
${config.prefix}translate - Translate text
${config.prefix}remind - Set a reminder
${config.prefix}timer - Set a timer
${config.prefix}fact - Random fact
${config.prefix}roll - Roll a dice
${config.prefix}flip - Flip a coin
${config.prefix}avatar - Get user avatar
${config.prefix}say - Make bot say something
${config.prefix}meme - Get a random meme
${config.prefix}define - Define a word
${config.prefix}covid - COVID-19 statistics
${config.prefix}news - Latest news
${config.prefix}time - Current time
${config.prefix}date - Current date
${config.prefix}calc - Calculator
${config.prefix}search - Search the web
${config.prefix}lyrics - Get song lyrics
${config.prefix}fortune - Fortune cookie
${config.prefix}encourage - Get encouragement
${config.prefix}status - Bot status
${config.prefix}botinfo - Detailed bot info
${config.prefix}commands - List all commands

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 *GROUP COMMANDS* (20) - Admin Only
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${config.prefix}promote - Promote to admin
${config.prefix}demote - Demote from admin
${config.prefix}kick - Remove member
${config.prefix}add - Add member
${config.prefix}tagall - Tag all members
${config.prefix}mute - Mute group
${config.prefix}unmute - Unmute group
${config.prefix}setname - Set group name
${config.prefix}setdesc - Set group description
${config.prefix}antilink - Toggle anti-link
${config.prefix}welcome - Set welcome message
${config.prefix}leave - Leave message
${config.prefix}link - Get group link
${config.prefix}revokelink - Revoke group link
${config.prefix}groupinfo - Group information
${config.prefix}invite - Invite via link
${config.prefix}poll - Create a poll
${config.prefix}rules - Set group rules
${config.prefix}adminlist - List all admins
${config.prefix}remove - Remove member

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔐 *OWNER COMMANDS* (30) - Owner Only
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${config.prefix}shutdown - Shutdown bot
${config.prefix}restart - Restart bot
${config.prefix}eval - Execute code
${config.prefix}exec - Execute shell command
${config.prefix}broadcast - Broadcast message
${config.prefix}update - Update bot
${config.prefix}setstatus - Set bot status
${config.prefix}ban - Ban user
${config.prefix}unban - Unban user
${config.prefix}getlogs - Get bot logs
${config.prefix}addowner - Add owner/mod
${config.prefix}removeowner - Remove owner/mod
${config.prefix}backup - Backup data
${config.prefix}restore - Restore data
${config.prefix}deploy - Deploy updates
${config.prefix}getstats - Bot statistics
${config.prefix}forceleave - Force leave group
${config.prefix}clearqueue - Clear command queue
${config.prefix}reload - Reload commands
${config.prefix}getchats - Get all chats
${config.prefix}deletechat - Delete chat
${config.prefix}getconfig - Get configuration
${config.prefix}setconfig - Set configuration
${config.prefix}getdb - Get database info
${config.prefix}cleardb - Clear database
${config.prefix}stopspam - Stop spam detection
${config.prefix}setprefix - Change prefix
${config.prefix}getusers - Get user list
${config.prefix}notify - Send notification

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Type ${config.prefix}help <command> for detailed info
📱 Total Commands: 81

© 2025 BLUEBOT-V2 | Made with ❤️
`;
        await sock.sendMessage(msg.key.remoteJid, { text: menuText });
    },

    // 3. Help command
    help: async (sock, msg, args, config) => {
        const helpText = `
🆘 *BLUEBOT-V2 HELP*

*Usage:* ${config.prefix}help [command]

*Examples:*
• ${config.prefix}help - Show this help
• ${config.prefix}help ping - Info about ping command
• ${config.prefix}help promote - Info about promote command

*Quick Links:*
• ${config.prefix}menu - View all commands
• ${config.prefix}botinfo - Bot information
• ${config.prefix}commands - Command list

*Support:*
Developer: ${config.ownerName}
Contact: +${config.ownerNumber}
`;
        await sock.sendMessage(msg.key.remoteJid, { text: helpText });
    },

    // 4. Info command
    info: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { 
            text: `ℹ️ *BLUEBOT-V2 INFO*\n\n🤖 Bot: ${config.botName}\n👤 Owner: ${config.ownerName}\n📱 Contact: +${config.ownerNumber}\n⚡ Prefix: ${config.prefix}\n📊 Version: 2.0.0\n✅ Status: Online` 
        });
    },

    // 5. Joke command
    joke: async (sock, msg, args, config) => {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the scarecrow win an award? He was outstanding in his field!",
            "Why don't eggs tell jokes? They'd crack each other up!",
            "What do you call a fake noodle? An impasta!",
            "Why did the bicycle fall over? It was two tired!"
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        await sock.sendMessage(msg.key.remoteJid, { text: `😂 *Random Joke*\n\n${joke}` });
    },

    // 6. Quote command
    quote: async (sock, msg, args, config) => {
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Innovation distinguishes between a leader and a follower. - Steve Jobs",
            "Life is what happens when you're busy making other plans. - John Lennon",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        await sock.sendMessage(msg.key.remoteJid, { text: `💭 *Inspirational Quote*\n\n${quote}` });
    },

    // 7-30: Additional commands (simplified implementations)
    weather: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🌤️ Weather feature coming soon!' });
    },

    wiki: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '📚 Wikipedia search coming soon!' });
    },

    translate: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🌐 Translation feature coming soon!' });
    },

    remind: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '⏰ Reminder feature coming soon!' });
    },

    timer: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '⏱️ Timer feature coming soon!' });
    },

    fact: async (sock, msg, args, config) => {
        const facts = [
            "Honey never spoils. Archaeologists have found 3000-year-old honey in Egyptian tombs that was still edible!",
            "A group of flamingos is called a 'flamboyance'.",
            "Bananas are berries, but strawberries aren't!",
            "The shortest war in history lasted 38 minutes.",
            "Octopuses have three hearts!"
        ];
        const fact = facts[Math.floor(Math.random() * facts.length)];
        await sock.sendMessage(msg.key.remoteJid, { text: `🧠 *Random Fact*\n\n${fact}` });
    },

    roll: async (sock, msg, args, config) => {
        const roll = Math.floor(Math.random() * 6) + 1;
        await sock.sendMessage(msg.key.remoteJid, { text: `🎲 You rolled a *${roll}*!` });
    },

    flip: async (sock, msg, args, config) => {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        await sock.sendMessage(msg.key.remoteJid, { text: `🪙 Coin flip result: *${result}*!` });
    },

    avatar: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '👤 Avatar feature coming soon!' });
    },

    say: async (sock, msg, args, config) => {
        const text = args.join(' ');
        if (!text) {
            await sock.sendMessage(msg.key.remoteJid, { text: '❌ Please provide text to say!' });
            return;
        }
        await sock.sendMessage(msg.key.remoteJid, { text: text });
    },

    meme: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '😂 Meme feature coming soon!' });
    },

    define: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '📖 Dictionary feature coming soon!' });
    },

    covid: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🦠 COVID-19 stats feature coming soon!' });
    },

    news: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '📰 News feature coming soon!' });
    },

    time: async (sock, msg, args, config) => {
        const time = new Date().toLocaleTimeString();
        await sock.sendMessage(msg.key.remoteJid, { text: `🕐 Current time: *${time}*` });
    },

    date: async (sock, msg, args, config) => {
        const date = new Date().toLocaleDateString();
        await sock.sendMessage(msg.key.remoteJid, { text: `📅 Current date: *${date}*` });
    },

    calc: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🔢 Calculator feature coming soon!' });
    },

    search: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🔍 Search feature coming soon!' });
    },

    lyrics: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: '🎵 Lyrics feature coming soon!' });
    },

    fortune: async (sock, msg, args, config) => {
        const fortunes = [
            "Good things come to those who wait.",
            "Your hard work will pay off soon.",
            "A pleasant surprise is waiting for you.",
            "You will make new friends today.",
            "Success is in your future!"
        ];
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        await sock.sendMessage(msg.key.remoteJid, { text: `🥠 *Fortune Cookie*\n\n${fortune}` });
    },

    encourage: async (sock, msg, args, config) => {
        const encouragements = [
            "You're doing great! Keep it up! 💪",
            "Believe in yourself! You've got this! 🌟",
            "Every day is a new opportunity! ✨",
            "You're stronger than you think! 💪",
            "Keep pushing forward! Success is near! 🚀"
        ];
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        await sock.sendMessage(msg.key.remoteJid, { text: encouragement });
    },

    status: async (sock, msg, args, config) => {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        await sock.sendMessage(msg.key.remoteJid, { 
            text: `📊 *Bot Status*\n\n✅ Online\n⏱️ Uptime: ${hours}h ${minutes}m\n💾 Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB` 
        });
    },

    botinfo: async (sock, msg, args, config) => {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const infoText = `
📱 *BLUEBOT-V2 DETAILED INFO*

🤖 *Bot Name:* ${config.botName}
👤 *Owner:* ${config.ownerName}
📞 *Contact:* +${config.ownerNumber}
⚡ *Prefix:* ${config.prefix}
📊 *Version:* 2.0.0

⏱️ *Uptime:* ${hours}h ${minutes}m
💾 *Memory:* ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB
🔧 *Platform:* Node.js ${process.version}
✅ *Status:* Fully Operational

📋 *Commands:* 81 total
   • 30 General Commands
   • 20 Group Commands
   • 30 Owner Commands
   • 1 Menu Command

🌟 *Features:*
✓ Pairing code authentication
✓ Role-based permissions
✓ Auto-reconnect
✓ Modular command system
✓ Group management
✓ Error handling

© 2025 BLUEBOT-V2 | Powered by Baileys
`;
        await sock.sendMessage(msg.key.remoteJid, { text: infoText });
    },

    commands: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { 
            text: `📋 *Total Commands: 81*\n\n🌟 General: 30\n👥 Group: 20\n🔐 Owner: 30\n📱 Menu: 1\n\nType ${config.prefix}menu for full list!` 
        });
    }
};

module.exports = generalCommands;
