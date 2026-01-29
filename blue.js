const { 
    default: makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const P = require('pino');
const config = require('./config');
const { loadCommands, handleCommand } = require('./utils/handler');
const { sendWelcomeMessage } = require('./utils/permissions');

let sock;
let welcomeMessageSent = false;

async function startBlueBot(phoneNumber, logger) {
    try {
        // Load commands first
        loadCommands();

        const authDir = path.join(__dirname, 'session'); // Changed from auth_info_baileys to session for simplicity
        if (!fs.existsSync(authDir)) {
            fs.mkdirSync(authDir, { recursive: true });
        }

        const { state, saveCreds } = await useMultiFileAuthState(authDir);
        const { version } = await fetchLatestBaileysVersion();
        
        sock = makeWASocket({
            version,
            logger,
            printQRInTerminal: false,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, logger)
            },
            browser: Browsers.ubuntu('Chrome'),
            generateHighQualityLinkPreview: true,
            syncFullHistory: false,
            markOnlineOnConnect: true
        });

        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;

            if (connection === 'close') {
                let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
                const shouldReconnect = reason !== DisconnectReason.loggedOut;
                
                if (shouldReconnect) {
                    await startBlueBot(phoneNumber, logger);
                } else {
                    console.log('Logged out. Please run again to get a new pairing code.');
                    process.exit(1);
                }
            } else if (connection === 'open') {
                console.log('\n✓ BLUEBOT-V2 CONNECTED SUCCESSFULLY!\n');
                if (!welcomeMessageSent && config.WELCOME_MSG) {
                    // Assuming sendWelcomeMessage is a function that sends the message to the owner
                    // This is a placeholder for the actual welcome message logic
                    // await sendWelcomeMessage(sock, config); 
                    welcomeMessageSent = true;
                }
            }
        });

        if (!sock.authState.creds.registered) {
            setTimeout(async () => {
                try {
                    const code = await sock.requestPairingCode(phoneNumber);
                    console.log(`\n🔐 YOUR PAIRING CODE: ${code}\n`);
                } catch (error) {
                    logger.error('Failed to get pairing code:', error);
                }
            }, 3000);
        }

        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type !== 'notify') return;
            for (const m of messages) {
                if (!m.message || m.key.fromMe) continue;
                
                // Set m.body for easy access in handler
                m.body = m.message.conversation || m.message.extendedTextMessage?.text || m.message.imageMessage?.caption || m.message.videoMessage?.caption || '';
                
                await handleCommand(sock, m, logger);
            }
        });

    } catch (error) {
        logger.error('Error starting bot:', error);
        throw error;
    }
}

module.exports = { startBlueBot };
