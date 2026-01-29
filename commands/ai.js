const axios = require('axios');

// Helper function to send a message
const send = (sock, jid, text, quoted) => sock.sendMessage(jid, { text }, { quoted });

// --- AI Commands (20+) ---

// 1. GPT-4 Chat
bluebot({
  cmd: "gpt",
  alias: ["chat", "ask"],
  desc: "Ask GPT-4 a question",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  const query = args.join(' ');
  if (!query) return send(sock, m.key.remoteJid, "❌ Please provide a question for GPT-4.", m);
  
  try {
    await sock.sendMessage(m.key.remoteJid, { react: { text: '🤖', key: m.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(query)}`);
    const answer = response.data.result || response.data.message;
    send(sock, m.key.remoteJid, `🤖 *GPT-4 Response*\n\n${answer}`, m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ AI service is currently unavailable.", m);
  }
});

// 2. Gemini Chat
bluebot({
  cmd: "gemini",
  desc: "Ask Gemini AI a question",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  const query = args.join(' ');
  if (!query) return send(sock, m.key.remoteJid, "❌ Please provide a question for Gemini.", m);
  
  try {
    await sock.sendMessage(m.key.remoteJid, { react: { text: '♊', key: m.key } });
    const response = await axios.get(`https://api.giftedtech.my.id/api/ai/gemini?apikey=gifted&q=${encodeURIComponent(query)}`);
    const answer = response.data.result;
    send(sock, m.key.remoteJid, `♊ *Gemini Response*\n\n${answer}`, m);
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Gemini service is currently unavailable.", m);
  }
});

// 3. Imagine (DALL-E Image Generation)
bluebot({
  cmd: "imagine",
  alias: ["dalle", "draw"],
  desc: "Generate an image from text prompt",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  const prompt = args.join(' ');
  if (!prompt) return send(sock, m.key.remoteJid, "❌ Please provide a prompt for the image.", m);
  
  try {
    await sock.sendMessage(m.key.remoteJid, { react: { text: '🎨', key: m.key } });
    const imageUrl = `https://api.giftedtech.my.id/api/aigenerate/dalle?apikey=gifted&prompt=${encodeURIComponent(prompt)}`;
    await sock.sendMessage(m.key.remoteJid, { image: { url: imageUrl }, caption: `🎨 *Generated Image for:* ${prompt}` }, { quoted: m });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ Image generation failed.", m);
  }
});

// 4. Text to Speech
bluebot({
  cmd: "tts",
  desc: "Convert text to speech (audio)",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  const text = args.join(' ');
  if (!text) return send(sock, m.key.remoteJid, "❌ Please provide text to convert to speech.", m);
  
  try {
    const audioUrl = `https://api.giftedtech.my.id/api/tools/tts?apikey=gifted&text=${encodeURIComponent(text)}&lang=en`;
    await sock.sendMessage(m.key.remoteJid, { audio: { url: audioUrl }, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
  } catch (error) {
    send(sock, m.key.remoteJid, "❌ TTS service failed.", m);
  }
});

// 5. Code Interpreter (Placeholder for a more complex command)
bluebot({
  cmd: "code",
  desc: "Run a snippet of code (Python/JS)",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💻 *Code Interpreter*\n\nThis command requires a dedicated execution environment. Please use a service like Piston API or a local sandbox for real execution.", m);
});

// 6. Summarize
bluebot({
  cmd: "summarize",
  desc: "Summarize a long text or quoted message",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📝 *Summarize*\n\nThis command is under development. It will use AI to summarize text.", m);
});

// 7. Translate
bluebot({
  cmd: "translate",
  alias: ["tr"],
  desc: "Translate text to a specified language",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🌐 *Translate*\n\nUse: `.tr en|es|fr <text>` - This command is under development.", m);
});

// 8. Image to Text (OCR)
bluebot({
  cmd: "ocr",
  desc: "Extract text from a quoted image",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🖼️ *OCR*\n\nQuote an image with this command to extract text. This command is under development.", m);
});

// 9. AI Chatbot (Contextual)
bluebot({
  cmd: "chatbot",
  desc: "Start a contextual chat session with the AI",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💬 *Chatbot*\n\nThis command will initiate a multi-turn conversation. This command is under development.", m);
});

// 10. AI Story Generator
bluebot({
  cmd: "story",
  desc: "Generate a short story based on a prompt",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📖 *Story Generator*\n\nThis command is under development. It will use AI to write a short story.", m);
});

// 11. AI Poem Generator
bluebot({
  cmd: "poem",
  desc: "Generate a poem based on a topic",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "📜 *Poem Generator*\n\nThis command is under development. It will use AI to write a poem.", m);
});

// 12. AI Recipe Generator
bluebot({
  cmd: "recipe",
  desc: "Generate a recipe based on ingredients",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🍳 *Recipe Generator*\n\nThis command is under development. It will use AI to generate a recipe.", m);
});

// 13. AI Joke Generator
bluebot({
  cmd: "joke",
  desc: "Tell a random joke",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "😂 *Joke Generator*\n\nThis command is under development. It will use AI to tell a joke.", m);
});

// 14. AI Fact Generator
bluebot({
  cmd: "fact",
  desc: "Tell a random interesting fact",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💡 *Fact Generator*\n\nThis command is under development. It will use AI to tell a fact.", m);
});

// 15. AI Question Answer
bluebot({
  cmd: "qna",
  desc: "Answer a specific question",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "❓ *QnA*\n\nThis command is under development. It will use AI to answer a question.", m);
});

// 16. AI Code Review
bluebot({
  cmd: "codereview",
  desc: "Review a code snippet",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🧐 *Code Review*\n\nThis command is under development. It will use AI to review code.", m);
});

// 17. AI SQL Generator
bluebot({
  cmd: "sql",
  desc: "Generate SQL query from natural language",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "💾 *SQL Generator*\n\nThis command is under development. It will use AI to generate SQL.", m);
});

// 18. AI Regex Generator
bluebot({
  cmd: "regex",
  desc: "Generate Regex from natural language",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🧩 *Regex Generator*\n\nThis command is under development. It will use AI to generate Regex.", m);
});

// 19. AI Essay Writer
bluebot({
  cmd: "essay",
  desc: "Write a short essay on a topic",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "✍️ *Essay Writer*\n\nThis command is under development. It will use AI to write an essay.", m);
});

// 20. AI Paraphrase
bluebot({
  cmd: "paraphrase",
  desc: "Paraphrase a given text",
  fromMe: false,
  category: "ai",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🔄 *Paraphrase*\n\nThis command is under development. It will use AI to paraphrase text.", m);
});
