const fs = require('fs');
const path = require('path');

// Configuration for BLUEBOT-V2
module.exports = {
    // 1. Bot Name
    BOT_NAME: process.env.BOT_NAME || 'BLUEBOT-V2',
    
    // 2. Owner Information
    OWNER_NUMBER: process.env.OWNER_NUMBER || '27744332007',
    OWNER_NAME: process.env.OWNER_NAME || 'mudau_t',
    
    // 3. Command Prefix
    PREFIX: process.env.PREFIX || '.',
    
    // 4. Work Type (public/private)
    WORK_TYPE: process.env.WORK_TYPE || 'public',
    
    // 5. Always Online Status
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE === 'true' || true,
    
    // 6. Auto Read Messages
    AUTO_READ: process.env.AUTO_READ === 'true' || false,
    
    // 7. Auto Status View
    AUTO_STATUS_VIEW: process.env.AUTO_STATUS_VIEW === 'true' || true,
    
    // 8. Auto Status Like
    AUTO_STATUS_LIKE: process.env.AUTO_STATUS_LIKE === 'true' || false,
    
    // 9. Status Emoji
    STATUS_EMOJI: process.env.STATUS_EMOJI || '💙',
    
    // 10. Anti-Delete
    ANTI_DELETE: process.env.ANTI_DELETE || 'on',
    
    // 11. Anti-Edit
    ANTI_EDIT: process.env.ANTI_EDIT || 'on',
    
    // 12. Reject Calls
    REJECT_CALLS: process.env.REJECT_CALLS === 'true' || false,
    
    // 13. Welcome Message Toggle
    WELCOME_MSG: process.env.WELCOME_MSG === 'true' || true,
    
    // 14. Moderator Numbers (comma separated)
    MODS: process.env.MODS ? process.env.MODS.split(',') : [],
    
    // 15. Session ID (for future cloud deployment)
    SESSION_ID: process.env.SESSION_ID || '',
    
    // 16. Language
    LANG: process.env.LANG || 'EN',
    
    // 17. Timezone
    TIMEZONE: process.env.TIMEZONE || 'Africa/Johannesburg',
    
    // 18. Sticker Pack Name
    STICKER_PACK: process.env.STICKER_PACK || 'BLUEBOT-V2',
    
    // 19. Sticker Author
    STICKER_AUTHOR: process.env.STICKER_AUTHOR || 'mudau_t'
};
