const fs = require('fs');
const path = require('path');
const config = require('../config');

const commands = new Map();

// Load all commands from the commands directory
function loadCommands() {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        try {
            const category = require(path.join(commandsPath, file));
            Object.keys(category).forEach(cmdName => {
                commands.set(cmdName.toLowerCase(), {
                    execute: category[cmdName],
                    category: file.replace('.js', '')
                });
            });
        } catch (error) {
            console.error(`Error loading command file ${file}:`, error);
        }
    }
    console.log(`✓ Loaded ${commands.size} commands from ${commandFiles.length} files.`);
}

async function handleCommand(sock, msg, logger) {
    const messageType = Object.keys(msg.message)[0];
    const messageContent = msg.message[messageType];
    
    let text = '';
    if (messageType === 'conversation') {
        text = messageContent;
    } else if (messageType === 'extendedTextMessage') {
        text = messageContent.text;
    } else if (messageType === 'imageMessage' || messageType === 'videoMessage') {
        text = messageContent.caption || '';
    }

    if (!text || !text.startsWith(config.PREFIX)) return;

    const args = text.slice(config.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = commands.get(commandName);

    if (!command) return;

    const sender = msg.key.remoteJid;
    const isGroup = sender.endsWith('@g.us');
    const senderNumber = (msg.key.participant || sender).replace('@s.whatsapp.net', '');
    const isOwner = senderNumber === config.OWNER_NUMBER || config.MODS.includes(senderNumber);

    // Permission checks
    if (command.category === 'owner' && !isOwner) {
        return await sock.sendMessage(sender, { text: '❌ This command is for the bot owner only.' });
    }

    if (command.category === 'group' && !isGroup) {
        return await sock.sendMessage(sender, { text: '❌ This command can only be used in groups.' });
    }

    try {
        await command.execute(sock, msg, args, config);
    } catch (error) {
        logger.error(`Error executing command ${commandName}:`, error);
        await sock.sendMessage(sender, { text: `❌ Error: ${error.message}` });
    }
}

module.exports = { loadCommands, handleCommand, commands };
