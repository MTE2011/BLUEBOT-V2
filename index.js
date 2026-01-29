const fs = require('fs');
const path = require('path');
const pino = require('pino');
const readline = require('readline');

// Check if blue.js exists
if (!fs.existsSync(path.join(__dirname, 'blue.js'))) {
    console.error('❌ ERROR: blue.js is missing from the root directory!');
    console.error('The bot cannot start without blue.js. Please ensure it exists.');
    process.exit(1);
}

// Logger setup
const logger = pino({ 
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
        }
    }
});

// Create readline interface for console input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for input
function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Main startup function
async function startBot() {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                    BLUEBOT-V2 STARTUP                      ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
    logger.info('Starting BLUEBOT-V2...');
    logger.info('Checking required files...');
    
    // Verify blue.js exists (already checked above, but log it)
    logger.info('✓ index.js found');
    logger.info('✓ blue.js found');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('           WHATSAPP PAIRING CODE AUTHENTICATION');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Get phone number from user
    const phoneNumber = await question('📱 Enter your WhatsApp phone number (with country code, no +): ');
    
    if (!phoneNumber || phoneNumber.trim() === '') {
        logger.error('No phone number provided. Exiting...');
        rl.close();
        process.exit(1);
    }
    
    console.log('\n⏳ Getting your pairing code...\n');
    
    // Close readline interface
    rl.close();
    
    // Import and start the bot with the phone number
    const { startBlueBot } = require('./blue.js');
    await startBlueBot(phoneNumber.trim(), logger);
}

// Handle process termination
process.on('SIGINT', () => {
    logger.info('Bot shutting down...');
    rl.close();
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start the bot
startBot().catch(err => {
    logger.error('Failed to start bot:', err);
    rl.close();
    process.exit(1);
});
