
// Search Commands for BLUEBOT-V2

const searchCommands = {
    // 1. Google
    google: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🔍 Google search coming soon." });
    },
    // 2. Search
    search: async (sock, msg, args, config) => {
        await searchCommands.google(sock, msg, args, config);
    },
    // 3. Wiki
    wiki: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📚 Wikipedia search coming soon." });
    },
    // 4. YouTube
    yt: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🎥 YouTube search coming soon." });
    },
    // 5. Pinterest
    pinterest: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📌 Pinterest search coming soon." });
    },
    // 6. Image
    img: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🖼️ Image search coming soon." });
    },
    // 7. Weather
    weather: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🌤️ Weather info coming soon." });
    },
    // 8. News
    news: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📰 News search coming soon." });
    },
    // 9. Lyrics
    lyrics: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🎵 Lyrics search coming soon." });
    },
    // 10. Dictionary
    dict: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📖 Dictionary search coming soon." });
    },
    // 11. Define
    define: async (sock, msg, args, config) => {
        await searchCommands.dict(sock, msg, args, config);
    },
    // 12. GitHub
    github: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🐙 GitHub search coming soon." });
    },
    // 13. StackOverflow
    stack: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "💻 StackOverflow search coming soon." });
    },
    // 14. Reddit
    reddit: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🤖 Reddit search coming soon." });
    },
    // 15. Twitter
    twitter: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🐦 Twitter search coming soon." });
    },
    // 16. Instagram
    ig: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📸 Instagram search coming soon." });
    },
    // 17. TikTok
    tiktok: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🎵 TikTok search coming soon." });
    },
    // 18. IMDb
    imdb: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🎬 IMDb search coming soon." });
    },
    // 19. Spotify
    spotify: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🎧 Spotify search coming soon." });
    },
    // 20. SoundCloud
    soundcloud: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "☁️ SoundCloud search coming soon." });
    },
    // 21. Maps
    maps: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🗺️ Maps search coming soon." });
    },
    // 22. Translate
    tr: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🌐 Translation coming soon." });
    },
    // 23. Crypto
    crypto: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "💰 Crypto price search coming soon." });
    },
    // 24. Stock
    stock: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📈 Stock price search coming soon." });
    },
    // 25. Movie
    movie: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🍿 Movie search coming soon." });
    },
    // 26. Show
    show: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📺 TV Show search coming soon." });
    },
    // 27. Game
    game: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🎮 Game search coming soon." });
    },
    // 28. App
    app: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📱 App search coming soon." });
    },
    // 29. Book
    book: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "📖 Book search coming soon." });
    },
    // 30. Recipe
    recipe: async (sock, msg, args, config) => {
        await sock.sendMessage(msg.key.remoteJid, { text: "🍳 Recipe search coming soon." });
    }
};

module.exports = searchCommands;
