const fs = require('fs');
const path = require('path');

// Configuration for BLUEBOT-V2
module.exports = {
    // 1. Bot Name
    BOT_NAME: process.env.BOT_NAME || 'BLUEBOT-V2', // enter bot new her 
    OWNER_NUMBER: process.env.OWNER_NUMBER || '27744332007', // enter owner number her
    OWNER_NAME: process.env.OWNER_NAME || 'mudau_t', // enter owner name here
    PREFIX: process.env.PREFIX || '.', // enter you bot prefix here
    WORK_TYPE: process.env.WORK_TYPE || 'public', // choose public if bot is must bf public and chose privete if botust be private
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE === 'true' || true, // choose true if bot must always be online code files if you want the oposit 
    AUTO_READ: process.env.AUTO_READ === 'true' || false, // chose true if bot must read all messages and chose false if bot must not read all messages 
    AUTO_STATUS_VIEW: process.env.AUTO_STATUS_VIEW === 'true' || true, // choose true if bot must view all states and choose false if bot must not 
    AUTO_STATUS_LIKE: process.env.AUTO_STATUS_LIKE === 'true' || false, // choose true if bot must like evry states and choose false if bot must not do it 
    STATUS_EMOJI: process.env.STATUS_EMOJI || '💙', // choose a imoji bot must react with
    ANTI_DELETE: process.env.ANTI_DELETE || 'on', // choose yes if bot must send all deleted messages to owner 
    ANTI_EDIT: process.env.ANTI_EDIT || 'on', // choose yes if bot must send all edited messages to owner 
    REJECT_CALLS: process.env.REJECT_CALLS === 'true' || false, // choose true if bot must reject all 📞 
    MODS: process.env.MODS ? process.env.MODS.split(',') : [], // trusted moderaters
    TIMEZONE: process.env.TIMEZONE || 'Africa/Johannesburg', // change to you current time zone 
     
    // THE REST OF THE CONFIGURATION MUST NOT BE CHANGED BESIDE AT ALL 
    // 13. Welcome Message Toggle
    WELCOME_MSG: process.env.WELCOME_MSG === 'true' || true,
    
    // 14. Moderator Numbers (comma separated)
  
    // 15. Session ID (for future cloud deployment)
    SESSION_ID: process.env.SESSION_ID || '',
    
    // 16. Language
    LANG: process.env.LANG || 'EN',
    
    // 18. Sticker Pack Name
    STICKER_PACK: process.env.STICKER_PACK || 'BLUEBOT-V2',
    
    // 19. Sticker Author
    STICKER_AUTHOR: process.env.STICKER_AUTHOR || 'mudau_t'
};
