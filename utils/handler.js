const fs = require('fs');
const path = require('path');
const config = require('../config');

const commands = [];

/**
 * Register a new command
 * @param {Object} info Command information
 * @param {Function} func Command execution function
 */
function bluebot(info, func) {
    const command = {
        cmd: info.cmd,
        alias: info.alias || [],
        desc: info.desc || '',
        fromMe: info.fromMe || false, // Default to false as requested
        category: info.category || info.Catigory || 'general',
        execute: func
    };
    commands.push(command);
}

// Load all commands from the commands directory
function loadCommands() {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Clear existing commands to avoid duplicates on reload
    commands.length = 0;

    // Make bluebot globally available for command files
    global.bluebot = bluebot;

    for (const file of commandFiles) {
        try {
            // Clear cache to allow reloading
            delete require.cache[require.resolve(path.join(commandsPath, file))];
            require(path.join(commandsPath, file));
        } catch (error) {
            console.error(`Error loading command file ${file}:`, error);
        }
    }
    console.log(`✓ Loaded ${commands.length} commands from ${commandFiles.length} files.`);
}

async function handleCommand(conn, m, logger) {
    const text = m.body || '';
    
    if (!text || !text.startsWith(config.PREFIX)) return;

    const args = text.slice(config.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = commands.find(c => c.cmd === commandName || c.alias.includes(commandName));

    if (!command) return;

    const sender = m.key.remoteJid;
    const isGroup = sender.endsWith('@g.us');
    const senderNumber = (m.key.participant || sender).replace('@s.whatsapp.net', '');
    const isOwner = senderNumber === config.OWNER_NUMBER || config.MODS.includes(senderNumber);

    // Permission checks
    if (command.fromMe && !isOwner) {
        return await conn.sendMessage(sender, { text: '❌ This command is for the bot owner only.' });
    }

    try {
        // Pass the necessary context to the command function
        await command.execute(conn, m, config, args);
    } catch (error) {
        logger.error(`Error executing command ${commandName}:`, error);
        await conn.sendMessage(sender, { text: `❌ Error: ${error.message}` });
    }
}

module.exports = { loadCommands, handleCommand, commands };
