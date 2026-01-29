
// Menu Command for BLUEBOT-V2

const menuCommand = {
    menu: async (sock, msg, args, config) => {
        const { commands } = require('../utils/handler');
        
        let menuText = `🤖 *${config.BOT_NAME} MENU*\n\n`;
        menuText += `👤 *Owner:* ${config.OWNER_NAME}\n`;
        menuText += `⌨️ *Prefix:* ${config.PREFIX}\n`;
        menuText += `📊 *Total Commands:* ${commands.size}\n\n`;

        const categories = {};
        commands.forEach((cmd, name) => {
            if (!categories[cmd.category]) categories[cmd.category] = [];
            categories[cmd.category].push(name);
        });

        for (const category in categories) {
            menuText += `🔹 *${category.toUpperCase()}*\n`;
            menuText += `\`\`\`${categories[category].join(', ')}\`\`\`\n\n`;
        }

        menuText += `_Powered by BLUEBOT-V2_`;
        
        await sock.sendMessage(msg.key.remoteJid, { text: menuText });
    }
};

module.exports = menuCommand;
