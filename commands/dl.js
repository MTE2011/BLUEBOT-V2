const axios = require('axios');

// Helper function to send a message
const send = (sock, jid, text, quoted) => sock.sendMessage(jid, { text }, { quoted });

// --- Download Commands (20+) ---

// 1. YouTube Video
bluebot({
  cmd: "ytv",
  desc: "Download YouTube Video",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  const url = args[0];
  if (!url) return send(sock, m.key.remoteJid, "❌ Provide a YouTube URL.", m);
  
  try {
    await sock.sendMessage(m.key.remoteJid, { react: { text: '🎥', key: m.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/download/ytdl?apikey=gifted&url=${encodeURIComponent(url)}`);
    const data = response.data.result;
    await sock.sendMessage(m.key.remoteJid, { video: { url: data.video_url }, caption: `🎥 *${data.title}*` }, { quoted: m });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Download failed.", m);
  }
});

// 2. YouTube Audio
bluebot({
  cmd: "yta",
  desc: "Download YouTube Audio",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  const url = args[0];
  if (!url) return send(sock, m.key.remoteJid, "❌ Provide a YouTube URL.", m);
  
  try {
    await sock.sendMessage(m.key.remoteJid, { react: { text: '🎵', key: m.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/download/ytdl?apikey=gifted&url=${encodeURIComponent(url)}`);
    const data = response.data.result;
    await sock.sendMessage(m.key.remoteJid, { audio: { url: data.audio_url }, mimetype: 'audio/mp4' }, { quoted: m });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Download failed.", m);
  }
});

// 3. TikTok Video (No Watermark)
bluebot({
  cmd: "tiktok",
  alias: ["tt"],
  desc: "Download TikTok Video (No Watermark)",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  const url = args[0];
  if (!url) return send(sock, m.key.remoteJid, "❌ Provide a TikTok URL.", m);
  
  try {
    await sock.sendMessage(m.key.remoteJid, { react: { text: '📱', key: m.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/download/tiktok?apikey=gifted&url=${encodeURIComponent(url)}`);
    const data = response.data.result;
    await sock.sendMessage(m.key.remoteJid, { video: { url: data.no_watermark }, caption: `📱 *TikTok*` }, { quoted: m });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Download failed.", m);
  }
});

// 4. Instagram Post
bluebot({
  cmd: "ig",
  desc: "Download Instagram Post (Photo/Video)",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📸 *Instagram Downloader*\n\nThis command is under development.", m);
});

// 5. Facebook Video
bluebot({
  cmd: "fb",
  desc: "Download Facebook Video",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "👥 *Facebook Downloader*\n\nThis command is under development.", m);
});

// 6. Twitter/X Video
bluebot({
  cmd: "twitter",
  alias: ["x"],
  desc: "Download Twitter/X Video",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🐦 *Twitter Downloader*\n\nThis command is under development.", m);
});

// 7. Spotify Downloader
bluebot({
  cmd: "spotify",
  desc: "Download Spotify Track",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🎧 *Spotify Downloader*\n\nThis command is under development.", m);
});

// 8. Mediafire Downloader
bluebot({
  cmd: "mediafire",
  desc: "Download file from Mediafire link",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💾 *Mediafire Downloader*\n\nThis command is under development.", m);
});

// 9. Soundcloud Downloader
bluebot({
  cmd: "soundcloud",
  desc: "Download audio from Soundcloud link",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "☁️ *Soundcloud Downloader*\n\nThis command is under development.", m);
});

// 10. Sticker Maker (Image to Sticker)
bluebot({
  cmd: "sticker",
  alias: ["s"],
  desc: "Convert image/video to sticker",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🖼️ *Sticker Maker*\n\nReply to an image or video with `.s` to convert it to a sticker. This command is under development.", m);
});

// 11. Sticker Maker (Text to Sticker)
bluebot({
  cmd: "ttp",
  desc: "Convert text to sticker",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💬 *Text to Sticker*\n\nUse: `.ttp Your Text Here`. This command is under development.", m);
});

// 12. Sticker Maker (Animated Text to Sticker)
bluebot({
  cmd: "attp",
  desc: "Convert text to animated sticker",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "✨ *Animated Text to Sticker*\n\nUse: `.attp Your Text Here`. This command is under development.", m);
});

// 13. Image Editor (Blur)
bluebot({
  cmd: "blur",
  desc: "Blur a quoted image",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🎨 *Image Editor*\n\nReply to an image with `.blur` to apply a blur effect. This command is under development.", m);
});

// 14. Image Editor (Grayscale)
bluebot({
  cmd: "grayscale",
  desc: "Convert a quoted image to grayscale",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🎨 *Image Editor*\n\nReply to an image with `.grayscale` to convert it. This command is under development.", m);
});

// 15. Image Editor (Invert)
bluebot({
  cmd: "invert",
  desc: "Invert colors of a quoted image",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🎨 *Image Editor*\n\nReply to an image with `.invert` to invert colors. This command is under development.", m);
});

// 16. Audio Editor (Slow)
bluebot({
  cmd: "slow",
  desc: "Slow down a quoted audio/video",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🔊 *Audio Editor*\n\nReply to an audio/video with `.slow` to slow it down. This command is under development.", m);
});

// 17. Audio Editor (Fast)
bluebot({
  cmd: "fast",
  desc: "Speed up a quoted audio/video",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🔊 *Audio Editor*\n\nReply to an audio/video with `.fast` to speed it up. This command is under development.", m);
});

// 18. Audio Editor (Reverse)
bluebot({
  cmd: "reverse",
  desc: "Reverse a quoted audio/video",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🔊 *Audio Editor*\n\nReply to an audio/video with `.reverse` to reverse it. This command is under development.", m);
});

// 19. URL Shortener
bluebot({
  cmd: "shorten",
  desc: "Shorten a long URL",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🔗 *URL Shortener*\n\nUse: `.shorten <url>`. This command is under development.", m);
});

// 20. QR Code Generator
bluebot({
  cmd: "qr",
  desc: "Generate a QR code from text",
  fromMe: false,
  category: "download",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🔳 *QR Code Generator*\n\nUse: `.qr <text>`. This command is under development.", m);
});
