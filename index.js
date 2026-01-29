const fs = require('fs');
const path = require('path');
const pino = require('pino');
const readline = require('readline');

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

// Start the bot
startBot().catch(err => {
    logger.error('Failed to start bot:', err);
    rl.close();
    process.exit(1);
});
