# BLUEBOT-V2 🤖

A fully functional, production-ready WhatsApp bot with pairing code authentication, role-based permissions, and 80+ commands.

## 📋 Features

- ✅ **Pairing Code Authentication** - No QR codes, just enter your phone number
- ✅ **100+ Commands** - 30 general, 20 group, 30 owner commands
- ✅ **Role-Based Permissions** - Owner, moderator, and admin roles
- ✅ **Group Management** - Promote, demote, kick, mute, and more
- ✅ **Auto-Reconnect** - Automatically reconnects on disconnect
- ✅ **Modular Architecture** - Easy to extend and customize
- ✅ **Error Handling** - Comprehensive error handling and logging
- ✅ **Welcome Message** - Sends detailed welcome message to owner

## 🚀 Quick Start

### Prerequisites

- Node.js 16 or higher
- npm or pnpm package manager
- WhatsApp account

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
cd BLUEBOT-V2
pnpm install
# or
npm install
```

3. Start the bot:

```bash
node index.js
```

4. Follow the on-screen instructions:
   - Enter your WhatsApp phone number (with country code, no +)
   - Wait for the pairing code
   - Enter the code in WhatsApp: Settings > Linked Devices > Link a Device

## 📁 Project Structure

```
BLUEBOT-V2/
├── index.js           # Entry point with pairing logic
├── blue.js            # Core bot logic and message handler
├── general.js         # 30 general commands (everyone)
├── group.js           # 20 group commands (admins only)
├── owner.js           # 30 owner commands (owner only)
├── utils/
│   └── permissions.js # Permission checks and welcome message
├── auth_info_baileys/ # Authentication data (auto-generated)
├── package.json       # Dependencies
└── README.md          # This file
```

## ⚙️ Configuration

Edit the `config` object in `blue.js`:

```javascript
const config = {
    botName: 'BLUEBOT-V2',
    ownerNumber: '27744332007', // Your number (no +)
    ownerName: 'mudau_t',
    prefix: '.',
    mods: [] // Add moderator numbers here
};
```

## 📱 Commands

### General Commands (30) - Everyone

- `.ping` - Check bot response time
- `.menu` - Show all commands
- `.help` - Get help information
- `.info` - Bot information
- `.joke` - Random joke
- `.quote` - Inspirational quote
- `.fact` - Random fact
- `.roll` - Roll a dice
- `.flip` - Flip a coin
- `.time` - Current time
- `.date` - Current date
- `.status` - Bot status
- `.botinfo` - Detailed bot info
- And 17 more...

### Group Commands (20) - Admins Only

- `.promote` - Promote member to admin
- `.demote` - Demote admin to member
- `.kick` - Remove member from group
- `.add` - Add member to group
- `.tagall` - Tag all members
- `.mute` - Mute group (admins only)
- `.unmute` - Unmute group
- `.setname` - Change group name
- `.setdesc` - Change group description
- `.link` - Get group invite link
- `.revokelink` - Revoke group link
- `.groupinfo` - Group information
- `.adminlist` - List all admins
- And 7 more...

### Owner Commands (30) - Owner Only

- `.shutdown` - Shutdown bot
- `.restart` - Restart bot
- `.eval` - Execute JavaScript code
- `.exec` - Execute shell command
- `.broadcast` - Broadcast to all groups
- `.setstatus` - Set bot status
- `.addowner` - Add moderator
- `.removeowner` - Remove moderator
- `.getstats` - Bot statistics
- `.forceleave` - Leave a group
- `.reload` - Reload commands
- `.getchats` - List all groups
- `.getconfig` - View configuration
- `.setprefix` - Change command prefix
- `.getusers` - User statistics
- `.block` - Block a user
- And 14 more...

## 🔐 Permissions

### Owner
- Full access to all commands
- Can add/remove moderators
- Can execute code and shell commands
- Can broadcast messages

### Moderators
- Same commands as owner (configurable)
- Lower priority than owner
- Add numbers to `config.mods` array

### Group Admins
- Can use all group management commands
- Must be WhatsApp group admin
- Automatic permission checking

### Regular Users
- Can use all general commands
- No group or owner commands
- Full access to entertainment features

## 🛠️ Development

### Adding New Commands

1. **General Command** - Add to `general.js`:
```javascript
commandname: async (sock, msg, args, config) => {
    await sock.sendMessage(msg.key.remoteJid, { text: 'Response' });
}
```

2. **Group Command** - Add to `group.js`:
```javascript
commandname: async (sock, msg, args, config) => {
    const groupId = msg.key.remoteJid;
    // Your code here
}
```

3. **Owner Command** - Add to `owner.js`:
```javascript
commandname: async (sock, msg, args, config) => {
    // Your code here
}
```

### Extending Functionality

- Add new utilities in `utils/` folder
- Import and use in command files
- Keep commands modular and independent

## 📊 Logging

The bot uses Pino logger with pretty printing:

- Info: General information
- Error: Error messages
- Debug: Detailed debugging (if enabled)

Logs are displayed in console with timestamps and colors.

## 🔄 Auto-Reconnect

The bot automatically reconnects if:
- Connection is lost
- Network issues occur
- WhatsApp servers restart

It will NOT reconnect if:
- User logs out manually
- Authentication is revoked

## 🚨 Error Handling

- All commands have try-catch blocks
- Permission errors are handled gracefully
- User-friendly error messages
- Detailed error logging for debugging

## 📝 Notes

- Keep `auth_info_baileys` folder secure (contains session data)
- Don't share your session files
- Backup authentication data regularly
- Use `.backup` command for data backup (coming soon)

## 👨‍💻 Developer

- **Name:** mudau_t
- **Contact:** +27 74 433 2007
- **Bot:** BLUEBOT-V2
- **Version:** 2.0.0

## 📄 License

This project is for personal use. Modify and distribute as needed.

## 🆘 Support

For issues or questions:
1. Check the logs for error messages
2. Verify your configuration
3. Ensure dependencies are installed
4. Contact the developer

## 🎉 Acknowledgments

- Built with [Baileys](https://github.com/WhiskeySockets/Baileys)
- Powered by Node.js
- Made with ❤️

---

© 2025 BLUEBOT-V2 | All Rights Reserved
