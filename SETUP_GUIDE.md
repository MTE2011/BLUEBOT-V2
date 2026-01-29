# BLUEBOT-V2 Setup Guide 🚀

This guide will walk you through setting up and running BLUEBOT-V2 on your system.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

**Node.js** (version 16 or higher) is required to run the bot. You can download it from the official Node.js website at [nodejs.org](https://nodejs.org). The bot has been tested with Node.js version 18 and above, which provides optimal performance and stability.

**A package manager** such as npm (comes with Node.js) or pnpm is needed to install dependencies. While npm is included with Node.js, pnpm offers faster installation times and better disk space efficiency. You can install pnpm globally using the command `npm install -g pnpm` if you prefer to use it.

**A WhatsApp account** is essential for pairing the bot. Make sure you have access to your WhatsApp mobile app, as you'll need it to complete the pairing process using the pairing code method.

## Installation Steps

### Step 1: Download the Bot

First, you need to obtain the BLUEBOT-V2 files. If you received the bot as a ZIP file, extract it to a folder on your computer. If you're using Git, you can clone the repository to your local machine. Choose a location that's easy to access, such as your Documents folder or Desktop.

### Step 2: Open Terminal/Command Prompt

Navigate to the bot directory using your terminal or command prompt. On Windows, you can open Command Prompt or PowerShell and use the `cd` command to change directories. On macOS or Linux, open Terminal and navigate to the folder where you extracted the bot files.

For example, if you extracted the bot to your Desktop, you would use:
```bash
cd Desktop/BLUEBOT-V2
```

### Step 3: Install Dependencies

Once you're in the bot directory, you need to install all required packages. The bot uses several Node.js libraries including Baileys for WhatsApp connectivity, Pino for logging, and other utilities.

If you're using pnpm, run:
```bash
pnpm install
```

If you're using npm, run:
```bash
npm install
```

This process may take a few minutes as it downloads and installs all necessary dependencies. You'll see progress indicators showing which packages are being installed. Wait for the process to complete before proceeding to the next step.

### Step 4: Configure the Bot (Optional)

Before starting the bot, you may want to customize some settings. Open the `blue.js` file in a text editor and locate the `config` object near the top of the file. Here you can modify several important settings:

The **botName** field allows you to change the name of your bot. By default, it's set to "BLUEBOT-V2", but you can personalize it to anything you like.

The **ownerNumber** field should be set to your WhatsApp phone number in international format without the plus sign. For example, if your number is +27 74 433 2007, you would enter "27744332007".

The **ownerName** field is your display name. Change "mudau_t" to your preferred name or username.

The **prefix** field determines what character(s) users need to type before commands. The default is "." (dot), but you can change it to "!", "/", or any other character you prefer.

The **mods** array allows you to add moderator phone numbers. Moderators have the same command access as the owner. Add numbers in the same format as the owner number, separated by commas.

### Step 5: Start the Bot

Now you're ready to start the bot! You have two options for starting it:

**Option A: Using the start script** (recommended for beginners)
```bash
./start.sh
```
or on Windows:
```bash
bash start.sh
```

**Option B: Direct Node.js execution**
```bash
node index.js
```

Both methods will start the bot and display the startup interface.

## Pairing Process

Once the bot starts, you'll see a welcome screen with the BLUEBOT-V2 logo. The pairing process is straightforward and consists of the following steps:

### Step 1: Enter Your Phone Number

The bot will prompt you to enter your WhatsApp phone number. This should be entered in international format **without** the plus sign. For example:
- US number: 1234567890
- UK number: 447123456789
- South Africa: 27744332007

Type your number carefully and press Enter.

### Step 2: Wait for Pairing Code

After entering your number, the bot will display a message saying "Getting your pairing code..." and will generate an 8-digit pairing code. This code is unique to your pairing session and will be displayed prominently on the screen.

### Step 3: Enter Code in WhatsApp

Now, open WhatsApp on your mobile device and follow these steps:

1. Tap the three dots (menu) in the top right corner
2. Select **Settings** from the menu
3. Tap on **Linked Devices**
4. Tap **Link a Device**
5. Instead of scanning a QR code, tap **Link with phone number instead**
6. Enter the 8-digit pairing code shown in your terminal
7. Tap **Link** or **Continue**

WhatsApp will verify the code and establish the connection. This usually takes just a few seconds.

### Step 4: Connection Confirmation

Once the pairing is successful, you'll see a confirmation message in the terminal:

```
╔════════════════════════════════════════════════════════════╗
║            ✓ BLUEBOT-V2 CONNECTED SUCCESSFULLY!            ║
╚════════════════════════════════════════════════════════════╝
```

The bot will also send you a comprehensive welcome message on WhatsApp with all the information about your bot, including available commands, features, and usage instructions.

## First Steps After Setup

Now that your bot is running and connected, here are some recommended first steps:

### Test Basic Functionality

Send a message to your bot (or in a group where the bot is present) with the command `.ping` to verify it's responding. You should receive a response showing the bot's latency.

### Explore the Menu

Type `.menu` to see a complete list of all available commands. The menu is organized into three categories: General Commands (available to everyone), Group Commands (for group admins), and Owner Commands (for you only).

### Add the Bot to Groups

To use group management features, add the bot to your WhatsApp groups. Once added, make sure the bot is promoted to admin status so it can perform actions like promoting, demoting, kicking members, and managing group settings.

### Add Moderators (Optional)

If you want to give other people owner-level access to the bot, use the `.addowner` command followed by their phone number. For example:
```
.addowner 27123456789
```

This person will then have access to all owner commands, though you remain the primary owner.

### Customize Welcome Messages

You can modify the welcome message that gets sent to new group members by editing the `sendWelcomeMessage` function in `utils/permissions.js`. Personalize it to match your bot's personality and purpose.

## Troubleshooting

If you encounter any issues during setup or operation, here are some common problems and their solutions:

### Bot Won't Start

If the bot fails to start, first check that you have Node.js installed by running `node --version` in your terminal. If Node.js is not installed or the version is below 16, you'll need to install or update it. Also verify that all dependencies are installed by running the install command again.

### Pairing Code Not Working

If the pairing code doesn't work, ensure you entered your phone number correctly in international format without the plus sign. The code is time-sensitive and expires after a few minutes, so if it's been too long, restart the bot to get a new code. Make sure you're using the latest version of WhatsApp on your mobile device.

### Bot Disconnects Frequently

Frequent disconnections can be caused by unstable internet connection on either the bot server or your phone. The bot has auto-reconnect functionality, but if disconnections persist, check your network stability. Also ensure your phone's WhatsApp is up to date and not logged out.

### Commands Not Working

If commands aren't responding, verify that you're using the correct prefix (default is `.`). Check that you have the necessary permissions for the command you're trying to use. Owner commands only work for the owner, and group commands require admin status in groups. Review the command syntax in the menu by typing `.help commandname`.

### Permission Errors

If you're getting permission denied errors, make sure your phone number is correctly set in the config as the owner number. For group commands, verify that both you and the bot are admins in the group. The bot cannot perform admin actions if it doesn't have admin privileges.

## Keeping the Bot Running

For production use, you'll want to keep the bot running even when you close your terminal. Here are some recommended approaches:

### Using PM2 (Recommended)

PM2 is a process manager that keeps your bot running in the background and automatically restarts it if it crashes. Install PM2 globally:

```bash
npm install -g pm2
```

Start your bot with PM2:
```bash
pm2 start index.js --name bluebot
```

Useful PM2 commands:
- `pm2 status` - Check bot status
- `pm2 logs bluebot` - View bot logs
- `pm2 restart bluebot` - Restart the bot
- `pm2 stop bluebot` - Stop the bot
- `pm2 startup` - Configure PM2 to start on system boot

### Using Screen (Linux/Mac)

Screen allows you to run the bot in a detachable terminal session:

```bash
screen -S bluebot
node index.js
```

Press `Ctrl+A` then `D` to detach. Reattach with `screen -r bluebot`.

### Using nohup (Linux/Mac)

Run the bot in the background with nohup:

```bash
nohup node index.js > bot.log 2>&1 &
```

This runs the bot in the background and saves logs to `bot.log`.

## Security Best Practices

To keep your bot secure and protect your WhatsApp account, follow these important security guidelines:

**Never share your auth_info_baileys folder** with anyone. This folder contains your session credentials, and anyone with access to it can control your bot and access your WhatsApp messages. Add this folder to your `.gitignore` file if you're using version control.

**Keep your owner number private** and only add trusted individuals as moderators. Moderators have extensive control over the bot and can execute powerful commands.

**Regularly backup your authentication data** by copying the `auth_info_baileys` folder to a secure location. If you lose this data, you'll need to re-pair the bot.

**Monitor bot logs regularly** to detect any unusual activity or unauthorized access attempts. The bot logs all command executions, which helps you track usage.

**Use strong, unique pairing codes** and never reuse old codes. Each pairing session generates a new code for security.

**Keep the bot software updated** by checking for updates regularly. Security patches and bug fixes are important for maintaining a secure bot.

## Advanced Configuration

For advanced users who want to customize the bot further, here are some areas you can modify:

### Custom Commands

You can add your own commands by editing the command files (`general.js`, `group.js`, `owner.js`). Each command follows this structure:

```javascript
commandname: async (sock, msg, args, config) => {
    // Your command logic here
    await sock.sendMessage(msg.key.remoteJid, { text: 'Response' });
}
```

### Database Integration

If you want to add persistent data storage, you can integrate a database like SQLite, MongoDB, or PostgreSQL. Create a new file in the `utils` folder for database operations and import it in your command files.

### API Integrations

Many commands are marked as "coming soon" and can be implemented by integrating external APIs. For example, you could add weather data using OpenWeatherMap API, news using NewsAPI, or translation using Google Translate API.

### Custom Permissions

You can create custom permission levels by modifying the `checkPermissions` function in `utils/permissions.js`. Add new roles like "VIP users" or "Trusted members" with specific command access.

## Getting Help

If you need assistance or have questions:

**Check the README.md file** for general information about the bot and its features.

**Review the code comments** in the source files for detailed explanations of how different components work.

**Contact the developer** at +27 74 433 2007 (mudau_t) for direct support.

**Check the logs** in your terminal for error messages that can help diagnose issues.

## Conclusion

Congratulations! You've successfully set up BLUEBOT-V2. Your bot is now ready to manage your WhatsApp groups, entertain users with fun commands, and help you automate various tasks. Explore the different commands, customize the bot to your needs, and enjoy the power of WhatsApp automation!

Remember to keep your bot updated, monitor its activity, and use it responsibly. Happy botting! 🎉

---

© 2025 BLUEBOT-V2 | Made with ❤️ by mudau_t
