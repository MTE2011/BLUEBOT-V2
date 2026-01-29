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
const config = require('./config');
const { loadCommands, handleCommand } = require('./utils/handler');
const { sendWelcomeMessage } = require('./utils/permissions');

let sock;
let welcomeMessageSent = false;

async function startBlueBot(phoneNumber, logger) {
    try {
        // Load commands first
        loadCommands();

        const authDir = path.join(__dirname, 'auth_info_baileys');
        if (!fs.existsSync(authDir)) {
            fs.mkdirSync(authDir, { recursive: true });
        }

        const { state, saveCreds } = await useMultiFileAuthState(authDir);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        
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
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                if (shouldReconnect) {
                    await startBlueBot(phoneNumber, logger);
                } else {
                    process.exit(1);
                }
            } else if (connection === 'open') {
                console.log('\n✓ BLUEBOT-V2 CONNECTED SUCCESSFULLY!\n');
                if (!welcomeMessageSent && config.WELCOME_MSG) {
                    await sendWelcomeMessage(sock, config);
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
            for (const msg of messages) {
                if (!msg.message || msg.key.fromMe) continue;
                await handleCommand(sock, msg, logger);
            }
        });

    } catch (error) {
        logger.error('Error starting bot:', error);
        throw error;
    }
}

module.exports = { startBlueBot };
