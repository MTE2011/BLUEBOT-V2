// Fun Commands for BLUEBOT-V2

const funCommands = {
    // 1. Joke
    joke: async (sock, msg, args, config) => {
        const jokes = ["Why don't scientists trust atoms? Because they make up everything!", "I told my wife she was drawing her eyebrows too high. She looked surprised.", "What do you call a fake noodle? An impasta!"];
        await sock.sendMessage(msg.key.remoteJid, { text: jokes[Math.floor(Math.random() * jokes.length)] });
    },
    // 2. Fact
    fact: async (sock, msg, args, config) => {
        const facts = ["Honey never spoils.", "A group of flamingos is called a 'flamboyance'.", "Octopuses have three hearts."];
        await sock.sendMessage(msg.key.remoteJid, { text: facts[Math.floor(Math.random() * facts.length)] });
    },
    // 3. Roll
    roll: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `🎲 You rolled a ${Math.floor(Math.random() * 6) + 1}!` });
    },
    // 4. Flip
    flip: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: `🪙 Result: ${Math.random() < 0.5 ? 'Heads' : 'Tails'}` });
    },
    // 5. Meme (Placeholder)
    meme: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🖼️ Meme feature coming soon!" });
    },
    // 6. Quote
    quote: async (sock, msg, args, config) => {
        const quotes = ["Be yourself; everyone else is already taken.", "So many books, so little time.", "A room without books is like a body without a soul."];
        await sock.sendMessage(msg.key.remoteJid, { text: quotes[Math.floor(Math.random() * quotes.length)] });
    },
    // 7. Ship
    ship: async (sock, msg, args, config) => {
        const love = Math.floor(Math.random() * 101);
        await sock.sendMessage(msg.key.remoteJid, { text: `❤️ Love Meter: ${love}%` });
    },
    // 8. Gay
    gay: async (sock, msg, args, config) => {
        const percent = Math.floor(Math.random() * 101);
        await sock.sendMessage(msg.key.remoteJid, { text: `🌈 Gay Meter: ${percent}%` });
    },
    // 9. Simp
    simp: async (sock, msg, args, config) => {
        const percent = Math.floor(Math.random() * 101);
        await sock.sendMessage(msg.key.remoteJid, { text: `🥺 Simp Meter: ${percent}%` });
    },
    // 10. Rate
    rate: async (sock, msg, args, config) => {
        const rating = Math.floor(Math.random() * 11);
        await sock.sendMessage(msg.key.remoteJid, { text: `⭐ I rate this ${rating}/10` });
    },
    // 11. Hack
    hack: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "💻 Hacking in progress... 10%... 50%... 100%... Access Denied! Just kidding." });
    },
    // 12. Kill
    kill: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🗡️ Target eliminated." });
    },
    // 13. Slap
    slap: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "👋 *SLAP!* That must have hurt." });
    },
    // 14. Kiss
    kiss: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "💋 *Mwah!*" });
    },
    // 15. Hug
    hug: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🫂 Sending a virtual hug!" });
    },
    // 16. Punch
    punch: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "👊 *POW!*" });
    },
    // 17. Roast
    roast: async (sock, msg, args, config) => {
        const roasts = ["You're the reason the gene pool needs a lifeguard.", "I'd agree with you but then we'd both be wrong.", "Your face makes onions cry."];
        await sock.sendMessage(msg.key.remoteJid, { text: roasts[Math.floor(Math.random() * roasts.length)] });
    },
    // 18. Compliment
    compliment: async (sock, msg, args, config) => {
        const compliments = ["You're a smart cookie.", "You have a great sense of humor.", "You're more helpful than you realize."];
        await sock.sendMessage(msg.key.remoteJid, { text: compliments[Math.floor(Math.random() * compliments.length)] });
    },
    // 19. Advice
    advice: async (sock, msg, args, config) => {
        const advice = ["Always be yourself.", "Don't count the days, make the days count.", "The best way to predict the future is to create it."];
        await sock.sendMessage(msg.key.remoteJid, { text: advice[Math.floor(Math.random() * advice.length)] });
    },
    // 20. Fortune
    fortune: async (sock, msg, args, config) => {
        const fortunes = ["A beautiful, smart, and loving person will be coming into your life.", "A fresh start will put you on your way.", "A golden egg of opportunity falls into your lap this month."];
        await sock.sendMessage(msg.key.remoteJid, { text: `🥠 Fortune: ${fortunes[Math.floor(Math.random() * fortunes.length)]}` });
    },
    // 21. 8ball
    eightball: async (sock, msg, args, config) => {
        const responses = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
        await sock.sendMessage(msg.key.remoteJid, { text: `🎱 8-Ball: ${responses[Math.floor(Math.random() * responses.length)]}` });
    },
    // 22. Dare
    dare: async (sock, msg, args, config) => {
        const dares = ["Do 20 pushups.", "Sing a song.", "Dance for 1 minute."];
        await sock.sendMessage(msg.key.remoteJid, { text: `🔥 Dare: ${dares[Math.floor(Math.random() * dares.length)]}` });
    },
    // 23. Truth
    truth: async (sock, msg, args, config) => {
        const truths = ["What is your biggest fear?", "What is your most embarrassing moment?", "Who is your crush?"];
        await sock.sendMessage(msg.key.remoteJid, { text: `🧐 Truth: ${truths[Math.floor(Math.random() * truths.length)]}` });
    },
    // 24. Pick
    pick: async (sock, msg, args, config) => {
        if (args.length < 2) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Please provide at least two options." });
        await sock.sendMessage(msg.key.remoteJid, { text: `🤔 I pick: ${args[Math.floor(Math.random() * args.length)]}` });
    },
    // 25. Character
    character: async (sock, msg, args, config) => {
        const traits = ["Kind", "Mean", "Funny", "Boring", "Smart", "Stupid"];
        await sock.sendMessage(msg.key.remoteJid, { text: `👤 Your character trait is: ${traits[Math.floor(Math.random() * traits.length)]}` });
    },
    // 26. IQ
    iq: async (sock, msg, args, config) => {
        const iq = Math.floor(Math.random() * 201);
        await sock.sendMessage(msg.key.remoteJid, { text: `🧠 Your IQ is: ${iq}` });
    },
    // 27. Beauty
    beauty: async (sock, msg, args, config) => {
        const percent = Math.floor(Math.random() * 101);
        await sock.sendMessage(msg.key.remoteJid, { text: `✨ Beauty Meter: ${percent}%` });
    },
    // 28. Cool
    cool: async (sock, msg, args, config) => {
        const percent = Math.floor(Math.random() * 101);
        await sock.sendMessage(msg.key.remoteJid, { text: `😎 Cool Meter: ${percent}%` });
    },
    // 29. Angry
    angry: async (sock, msg, args, config) => {
        const percent = Math.floor(Math.random() * 101);
        await sock.sendMessage(msg.key.remoteJid, { text: `😡 Angry Meter: ${percent}%` });
    },
    // 30. Sad
    sad: async (sock, msg, args, config) => {
        const percent = Math.floor(Math.random() * 101);
        await sock.sendMessage(msg.key.remoteJid, { text: `😢 Sad Meter: ${percent}%` });
    }
};

module.exports = funCommands;
