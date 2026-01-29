const { 
    default: makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers,
    delay
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const P = require('pino');
const config = require('./config');
const { loadCommands, handleCommand } = require('./utils/handler');

let sock;
let welcomeMessageSent = false;

async function startBlueBot(phoneNumber, logger) {
    try {
        // Load commands first
        loadCommands();

        const authDir = path.join(__dirname, 'session');
        if (!fs.existsSync(authDir)) {
            fs.mkdirSync(authDir, { recursive: true });
        }

        const { state, saveCreds } = await useMultiFileAuthState(authDir);
        const { version } = await fetchLatestBaileysVersion();
        
        sock = makeWASocket({
            version,
            logger: P({ level: 'silent' }),
            printQRInTerminal: false,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, P({ level: 'silent' }))
            },
            browser: ["Ubuntu", "Chrome", "20.0.04"],
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
                    const ownerJid = config.OWNER_NUMBER + "@s.whatsapp.net";
                    await sock.sendMessage(ownerJid, { 
                        text: `🤖 *BLUEBOT-V2 CONNECTED*\n\nWelcome back, *${config.OWNER_NAME}*!\nYour bot is now online and ready to use.\n\nType \`${config.PREFIX}menu\` to see all commands.` 
                    });
                    welcomeMessageSent = true;
                }
            }
        });

        if (!sock.authState.creds.registered && phoneNumber) {
            await delay(3000);
            try {
                const code = await sock.requestPairingCode(phoneNumber);
                console.log(`\n🔐 YOUR PAIRING CODE: ${code?.match(/.{1,4}/g)?.join("-") || code}\n`);
            } catch (error) {
                logger.error('Failed to get pairing code:', error);
            }
        }

        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type !== 'notify') return;
            for (const m of messages) {
                if (!m.message) continue;
                
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
