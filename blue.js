const { 
    default: makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

// Import command handlers
const groupCommands = require('./group.js');
const ownerCommands = require('./owner.js');
const generalCommands = require('./general.js');
const { checkPermissions, isGroupAdmin, sendWelcomeMessage } = require('./utils/permissions.js');

// Bot configuration
const config = {
    botName: 'BLUEBOT-V2',
    ownerNumber: '27744332007', // mudau_t
    ownerName: 'mudau_t',
    prefix: '.',
    mods: [] // Add moderator numbers here
};

let sock;
let welcomeMessageSent = false;

async function startBlueBot(phoneNumber, logger) {
    try {
        // Create auth directory
        const authDir = path.join(__dirname, 'auth_info_baileys');
        if (!fs.existsSync(authDir)) {
            fs.mkdirSync(authDir, { recursive: true });
        }

        // Load auth state
        const { state, saveCreds } = await useMultiFileAuthState(authDir);
        
        // Get latest Baileys version
        const { version, isLatest } = await fetchLatestBaileysVersion();
        logger.info(`Using Baileys version: ${version.join('.')}, Latest: ${isLatest}`);

        // Create socket connection
        sock = makeWASocket({
            version,
            logger,
            printQRInTerminal: false, // Disable QR code
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, logger)
            },
            browser: Browsers.ubuntu('Chrome'),
            generateHighQualityLinkPreview: true,
            syncFullHistory: false,
            markOnlineOnConnect: true
        });

        // Save credentials on update
        sock.ev.on('creds.update', saveCreds);

        // Connection update handler
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                logger.info('Connection closed. Reconnecting:', shouldReconnect);

                if (shouldReconnect) {
                    logger.info('Attempting to reconnect...');
                    await startBlueBot(phoneNumber, logger);
                } else {
                    logger.error('Logged out. Please delete auth_info_baileys folder and restart.');
                    process.exit(1);
                }
            } else if (connection === 'open') {
                console.log('\n╔════════════════════════════════════════════════════════════╗');
                console.log('║            ✓ BLUEBOT-V2 CONNECTED SUCCESSFULLY!            ║');
                console.log('╚════════════════════════════════════════════════════════════╝\n');
                logger.info('Bot is now online and ready to receive commands!');
                
                // Send welcome message to owner
                if (!welcomeMessageSent) {
                    await sendWelcomeMessage(sock, config);
                    welcomeMessageSent = true;
                }
            } else if (connection === 'connecting') {
                logger.info('Connecting to WhatsApp...');
            }
        });

        // Request pairing code if not already paired
        if (!sock.authState.creds.registered) {
            logger.info('Requesting pairing code for:', phoneNumber);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            
            setTimeout(async () => {
                try {
                    const code = await sock.requestPairingCode(phoneNumber);
                    console.log(`\n🔐 YOUR PAIRING CODE: ${code}\n`);
                    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                    console.log('📲 Enter this code in WhatsApp:');
                    console.log('   1. Open WhatsApp on your phone');
                    console.log('   2. Go to Settings > Linked Devices');
                    console.log('   3. Tap "Link a Device"');
                    console.log('   4. Enter the pairing code above');
                    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
                    logger.info('Pairing code sent successfully');
                } catch (error) {
                    logger.error('Failed to get pairing code:', error);
                }
            }, 3000);
        }

        // Message handler
        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type !== 'notify') return;

            for (const msg of messages) {
                if (!msg.message) continue;
                if (msg.key.fromMe) continue;

                try {
                    await handleMessage(sock, msg, logger, config);
                } catch (error) {
                    logger.error('Error handling message:', error);
                }
            }
        });

        // Group update handler
        sock.ev.on('group-participants.update', async (update) => {
            logger.info('Group participant update:', update);
            // Handle welcome/leave messages here if needed
        });

    } catch (error) {
        logger.error('Error starting bot:', error);
        throw error;
    }
}

// Message handler function
async function handleMessage(sock, msg, logger, config) {
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

    if (!text) return;

    // Check if message starts with prefix
    if (!text.startsWith(config.prefix)) return;

    // Parse command and arguments
    const args = text.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Get sender info
    const sender = msg.key.remoteJid;
    const isGroup = sender.endsWith('@g.us');
    const senderNumber = msg.key.participant || sender;

    logger.info(`Command received: ${command} from ${senderNumber}`);

    // Check permissions
    const permissions = await checkPermissions(sock, msg, config);

    // Route command to appropriate handler
    try {
        // Check if command exists in any category
        if (generalCommands[command]) {
            await generalCommands[command](sock, msg, args, config);
        } else if (groupCommands[command]) {
            if (!isGroup) {
                await sock.sendMessage(sender, { text: '❌ This command can only be used in groups.' });
                return;
            }
            if (!permissions.isAdmin && !permissions.isOwner) {
                await sock.sendMessage(sender, { text: '❌ You must be a group admin to use this command.' });
                return;
            }
            await groupCommands[command](sock, msg, args, config);
        } else if (ownerCommands[command]) {
            if (!permissions.isOwner) {
                await sock.sendMessage(sender, { text: '❌ You are not the owner.' });
                return;
            }
            await ownerCommands[command](sock, msg, args, config);
        } else {
            // Command not found
            await sock.sendMessage(sender, { 
                text: `❌ Unknown command: ${command}\n\nType ${config.prefix}menu to see all available commands.` 
            });
        }
    } catch (error) {
        logger.error(`Error executing command ${command}:`, error);
        await sock.sendMessage(sender, { 
            text: `❌ An error occurred while executing the command.\n\nError: ${error.message}` 
        });
    }
}

module.exports = { startBlueBot };
