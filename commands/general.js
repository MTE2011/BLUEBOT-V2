// General Utility Commands for BLUEBOT-V2

const generalCommands = {
    // 1. Ping
    ping: async (sock, msg, args, config) => {
        const start = Date.now();
        await sock.sendMessage(msg.key.remoteJid, { text: "🏓 Pinging..." });
        const end = Date.now();
        await sock.sendMessage(msg.key.remoteJid, { text: `🏓 Pong! Latency: ${end - start}ms` });
    },
    // 2. Help
    help: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `🆘 Use ${config.PREFIX}menu to see all commands.` });
    },
    // 3. Info
    info: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `🤖 Bot: ${config.BOT_NAME}\nOwner: ${config.OWNER_NAME}\nPrefix: ${config.PREFIX}` });
    },
    // 4. Uptime
    uptime: async (sock, msg, args, config) => {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        await sock.sendMessage(msg.key.remoteJid, { text: `⏱️ Uptime: ${hours}h ${minutes}m` });
    },
    // 5. Runtime
    runtime: async (sock, msg, args, config) => {
        await generalCommands.uptime(sock, msg, args, config);
    },
    // 6. Speed
    speed: async (sock, msg, args, config) => {
        await generalCommands.ping(sock, msg, args, config);
    },
    // 7. Owner
    owner: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `👤 Owner: ${config.OWNER_NAME}\nNumber: ${config.OWNER_NUMBER}` });
    },
    // 8. Script
    script: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📜 Script: https://github.com/MTE2011/BLUEBOT-V2" });
    },
    // 9. Repo
    repo: async (sock, msg, args, config) => {
        await generalCommands.script(sock, msg, args, config);
    },
    // 10. Support
    support: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🆘 Support: https://whatsapp.com/channel/0029VaghjWRHVvTh35lfZ817" });
    },
    // 11. Donate
    donate: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "💰 Support the developer: +27 74 433 2007" });
    },
    // 12. BotInfo
    botinfo: async (sock, msg, args, config) => {
        await generalCommands.info(sock, msg, args, config);
    },
    // 13. System
    system: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `💻 OS: ${process.platform}\nNode: ${process.version}\nMemory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB` });
    },
    // 14. CPU
    cpu: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `⚙️ CPU: ${require('os').cpus()[0].model}` });
    },
    // 15. RAM
    ram: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `💾 RAM: ${Math.round(require('os').totalmem() / 1024 / 1024 / 1024)}GB` });
    },
    // 16. Time
    time: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `🕒 Time: ${new Date().toLocaleTimeString()}` });
    },
    // 17. Date
    date: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `📅 Date: ${new Date().toLocaleDateString()}` });
    },
    // 18. Weather
    weather: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🌤️ Weather feature coming soon." });
    },
    // 19. News
    news: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📰 News feature coming soon." });
    },
    // 20. Wiki
    wiki: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📚 Wiki feature coming soon." });
    },
    // 21. Translate
    tr: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🌐 Translation feature coming soon." });
    },
    // 22. Calc
    calc: async (sock, msg, args, config) => {
        try {
            const res = eval(args.join(' '));
            await sock.sendMessage(msg.key.remoteJid, { text: `🔢 Result: ${res}` });
        } catch {
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Invalid expression." });
        }
    },
    // 23. Quote
    quote: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "💭 Quote feature coming soon." });
    },
    // 24. Fact
    fact: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🧠 Fact feature coming soon." });
    },
    // 25. Joke
    joke: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "😂 Joke feature coming soon." });
    },
    // 26. Define
    define: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📖 Definition feature coming soon." });
    },
    // 27. Search
    search: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🔍 Search feature coming soon." });
    },
    // 28. Lyrics
    lyrics: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🎵 Lyrics feature coming soon." });
    },
    // 29. Reminder
    remind: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "⏰ Reminder feature coming soon." });
    },
    // 30. Timer
    timer: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "⏱️ Timer feature coming soon." });
    }
};

module.exports = generalCommands;
