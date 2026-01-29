const axios = require('axios');

bluebot({
  cmd: "gpt",
  desc: "Ask GPT-4 a question",
  fromMe: false,
  category: "ai",
}, async (sock, msg, args, config) => {
  const query = args.join(' ');
  if (!query) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Please provide a question." });
  
  try {
    await sock.sendMessage(msg.key.remoteJid, { react: { text: '🤖', key: msg.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(query)}`);
    const answer = response.data.result || response.data.message;
    await sock.sendMessage(msg.key.remoteJid, { text: `🤖 *GPT-4*\n\n${answer}` }, { quoted: msg });
  } catch (error) {
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ AI service error." });
  }
});

bluebot({
  cmd: "gemini",
  desc: "Ask Gemini AI a question",
  fromMe: false,
  category: "ai",
}, async (sock, msg, args, config) => {
  const query = args.join(' ');
  if (!query) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Please provide a question." });
  
  try {
    await sock.sendMessage(msg.key.remoteJid, { react: { text: '♊', key: msg.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/ai/gemini?apikey=gifted&q=${encodeURIComponent(query)}`);
    const answer = response.data.result;
    await sock.sendMessage(msg.key.remoteJid, { text: `♊ *GEMINI*\n\n${answer}` }, { quoted: msg });
  } catch (error) {
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Gemini service error." });
  }
});

bluebot({
  cmd: "imagine",
  desc: "Generate an image from text",
  fromMe: false,
  category: "ai",
}, async (sock, msg, args, config) => {
  const prompt = args.join(' ');
  if (!prompt) return await sock.sendMessage(msg.key.remoteJid, { text: "❌ Please provide a prompt." });
  
  try {
    await sock.sendMessage(msg.key.remoteJid, { react: { text: '🎨', key: msg.key } });
    const imageUrl = `https://api.giftedtech.my.id/api/aigenerate/dalle?apikey=gifted&prompt=${encodeURIComponent(prompt)}`;
    await sock.sendMessage(msg.key.remoteJid, { image: { url: imageUrl }, caption: `🎨 *Prompt:* ${prompt}` }, { quoted: msg });
  } catch (error) {
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Image generation failed." });
  }
});
