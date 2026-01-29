const axios = require('axios');

// Helper function to send a message
const send = (sock, jid, text, quoted) => sock.sendMessage(jid, { text }, { quoted });

// --- Search Commands (20+) ---

// 1. Google Search
bluebot({
  cmd: "google",
  alias: ["g"],
  desc: "Search Google for information",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  const query = args.join(' ');
  if (!query) return send(sock, m.key.remoteJid, "❌ Please provide a search query.", m);
  
  try {
    await sock.sendMessage(m.key.remoteJid, { react: { text: '🔍', key: m.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/search/google?apikey=gifted&q=${encodeURIComponent(query)}`);
    const results = response.data.result;
    let text = `🔍 *Google Search Results for:* ${query}\n\n`;
    results.slice(0, 5).forEach((res, i) => {
        text += `${i+1}. *${res.title}*\n🔗 ${res.link}\n📝 ${res.snippet}\n\n`;
    });
    send(sock, m.key.remoteJid, text, m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Google search failed.", m);
  }
});

// 2. YouTube Search
bluebot({
  cmd: "yts",
  desc: "Search YouTube for videos",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  const query = args.join(' ');
  if (!query) return send(sock, m.key.remoteJid, "❌ Please provide a search query.", m);
  
  try {
    await sock.sendMessage(m.key.remoteJid, { react: { text: '🎥', key: m.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/search/yts?apikey=gifted&q=${encodeURIComponent(query)}`);
    const results = response.data.result;
    let text = `🎥 *YouTube Search Results for:* ${query}\n\n`;
    results.slice(0, 5).forEach((res, i) => {
        text += `${i+1}. *${res.title}*\n🔗 ${res.url}\n⏱️ Duration: ${res.timestamp}\n👁️ Views: ${res.views}\n\n`;
    });
    send(sock, m.key.remoteJid, text, m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ YouTube search failed.", m);
  }
});

// 3. Wikipedia Search
bluebot({
  cmd: "wiki",
  desc: "Search Wikipedia for an article",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📚 *Wikipedia Search*\n\nThis command is under development.", m);
});

// 4. Image Search
bluebot({
  cmd: "image",
  alias: ["img"],
  desc: "Search for an image",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🖼️ *Image Search*\n\nThis command is under development.", m);
});

// 5. Weather
bluebot({
  cmd: "weather",
  desc: "Get weather information for a city",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🌤️ *Weather*\n\nThis command is under development.", m);
});

// 6. Dictionary
bluebot({
  cmd: "define",
  desc: "Get the definition of a word",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📖 *Dictionary*\n\nThis command is under development.", m);
});

// 7. Horoscope
bluebot({
  cmd: "horoscope",
  desc: "Get your daily horoscope",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🔮 *Horoscope*\n\nThis command is under development.", m);
});

// 8. Lyrics
bluebot({
  cmd: "lyrics",
  desc: "Search for song lyrics",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🎤 *Lyrics Search*\n\nThis command is under development.", m);
});

// 9. Movie Info
bluebot({
  cmd: "movie",
  desc: "Get information about a movie",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🎬 *Movie Info*\n\nThis command is under development.", m);
});

// 10. Anime Info
bluebot({
  cmd: "anime",
  desc: "Get information about an anime",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🌸 *Anime Info*\n\nThis command is under development.", m);
});

// 11. Manga Info
bluebot({
  cmd: "manga",
  desc: "Get information about a manga",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📖 *Manga Info*\n\nThis command is under development.", m);
});

// 12. Stock Price
bluebot({
  cmd: "stock",
  desc: "Get current stock price",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📈 *Stock Price*\n\nThis command is under development.", m);
});

// 13. Currency Converter
bluebot({
  cmd: "currency",
  desc: "Convert currency",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💱 *Currency Converter*\n\nThis command is under development.", m);
});

// 14. Timezone
bluebot({
  cmd: "timezone",
  desc: "Get current time in a timezone",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "⏰ *Timezone*\n\nThis command is under development.", m);
});

// 15. IP Lookup
bluebot({
  cmd: "iplookup",
  desc: "Lookup information about an IP address",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🌐 *IP Lookup*\n\nThis command is under development.", m);
});

// 16. Whois
bluebot({
  cmd: "whois",
  desc: "Get domain registration information",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💻 *Whois*\n\nThis command is under development.", m);
});

// 17. QR Code Reader
bluebot({
  cmd: "qrreader",
  desc: "Read a QR code from a quoted image",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🔳 *QR Reader*\n\nThis command is under development.", m);
});

// 18. Barcode Reader
bluebot({
  cmd: "barcode",
  desc: "Read a barcode from a quoted image",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📊 *Barcode Reader*\n\nThis command is under development.", m);
});

// 19. Recipe Search
bluebot({
  cmd: "recipesearch",
  desc: "Search for cooking recipes",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🍳 *Recipe Search*\n\nThis command is under development.", m);
});

// 20. News
bluebot({
  cmd: "news",
  desc: "Get the latest news headlines",
  fromMe: false,
  category: "search",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📰 *News*\n\nThis command is under development.", m);
});
