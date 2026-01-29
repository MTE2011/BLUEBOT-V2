const axios = require('axios');

bluebot({
  cmd: "ytv",
  desc: "Download YouTube Video",
  fromMe: false,
  category: "download",
}, async (sock, msg, args, config) => {
  const url = args[0];
  if (!url) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a YouTube URL." });
  
  try {
    await sock.sendMessage(msg.key.remoteJid, { react: { text: '🎥', key: msg.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/download/ytdl?apikey=gifted&url=${encodeURIComponent(url)}`);
    const data = response.data.result;
    await sock.sendMessage(msg.key.remoteJid, { video: { url: data.video_url }, caption: `🎥 *${data.title}*` }, { quoted: msg });
  } catch (error) {
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Download failed." });
  }
});

bluebot({
  cmd: "yta",
  desc: "Download YouTube Audio",
  fromMe: false,
  category: "download",
}, async (sock, msg, args, config) => {
  const url = args[0];
  if (!url) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a YouTube URL." });
  
  try {
    await sock.sendMessage(msg.key.remoteJid, { react: { text: '🎵', key: msg.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/download/ytdl?apikey=gifted&url=${encodeURIComponent(url)}`);
    const data = response.data.result;
    await sock.sendMessage(msg.key.remoteJid, { audio: { url: data.audio_url }, mimetype: 'audio/mp4' }, { quoted: msg });
  } catch (error) {
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Download failed." });
  }
});

bluebot({
  cmd: "tiktok",
  desc: "Download TikTok Video",
  fromMe: false,
  category: "download",
}, async (sock, msg, args, config) => {
  const url = args[0];
  if (!url) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a TikTok URL." });
  
  try {
    await sock.sendMessage(msg.key.remoteJid, { react: { text: '📱', key: msg.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/download/tiktok?apikey=gifted&url=${encodeURIComponent(url)}`);
    const data = response.data.result;
    await sock.sendMessage(msg.key.remoteJid, { video: { url: data.no_watermark }, caption: `📱 *TikTok*` }, { quoted: msg });
  } catch (error) {
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Download failed." });
  }
});
