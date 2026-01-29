// Helper function to send a message
const send = (sock, jid, text, quoted) => sock.sendMessage(jid, { text }, { quoted });

// --- Fun Commands (20+) ---

// 1. Truth or Dare
bluebot({
  cmd: "truth",
  desc: "Get a random truth question",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  const truths = ["What is your most embarrassing moment?", "What is the biggest lie you've ever told?", "What is your secret crush?", "What is your biggest fear?", "What is the most illegal thing you've ever done?", "What is your biggest regret?", "What is the most childish thing you still do?", "What is the most expensive thing you have stolen?"];
  const truth = truths[Math.floor(Math.random() * truths.length)];
  send(sock, m.key.remoteJid, `❓ *TRUTH*\n\n${truth}`, m);
});

bluebot({
  cmd: "dare",
  desc: "Get a random dare challenge",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  const dares = ["Send the last photo in your gallery.", "Sing a song in a funny voice.", "Text your crush 'I love you'.", "Do 10 push-ups.", "Post 'I love the bot owner' as your status.", "Change your profile picture to a potato for 1 hour.", "Send a voice note of you screaming.", "Send a picture of your feet."];
  const dare = dares[Math.floor(Math.random() * dares.length)];
  send(sock, m.key.remoteJid, `🔥 *DARE*\n\n${dare}`, m);
});

// 2. Eight Ball
bluebot({
  cmd: "8ball",
  desc: "Ask the magic 8-ball a question",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  const responses = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
  const response = responses[Math.floor(Math.random() * responses.length)];
  send(sock, m.key.remoteJid, `🎱 *8-BALL*\n\n*Question:* ${args.join(' ')}\n*Answer:* ${response}`, m);
});

// 3. Rate
bluebot({
  cmd: "rate",
  desc: "Rate something out of 10",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  const thing = args.join(' ') || "you";
  const rating = Math.floor(Math.random() * 10) + 1;
  send(sock, m.key.remoteJid, `💯 I rate *${thing}* a solid ${rating}/10!`, m);
});

// 4. Ship
bluebot({
  cmd: "ship",
  desc: "Calculate the compatibility between two people",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  const compatibility = Math.floor(Math.random() * 100) + 1;
  const person1 = args[0] || "Person A";
  const person2 = args[1] || "Person B";
  
  let result = `💖 *SHIP METER*\n\n*${person1}* and *${person2}* are ${compatibility}% compatible!`;
  if (compatibility > 80) result += "\n\n🔥 A match made in heaven!";
  else if (compatibility > 50) result += "\n\n👍 Could work out!";
  else result += "\n\n💔 Maybe just friends.";
  
  send(sock, m.key.remoteJid, result, m);
});

// 5. Dice Roll
bluebot({
  cmd: "roll",
  desc: "Roll a dice (1-6)",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  const roll = Math.floor(Math.random() * 6) + 1;
  send(sock, m.key.remoteJid, `🎲 You rolled a *${roll}*!`, m);
});

// 6. Coin Flip
bluebot({
  cmd: "flip",
  desc: "Flip a coin (Heads or Tails)",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  const flip = Math.random() > 0.5 ? "Heads" : "Tails";
  send(sock, m.key.remoteJid, `🪙 The coin landed on *${flip}*!`, m);
});

// 7. Random Number
bluebot({
  cmd: "rand",
  desc: "Generate a random number (1-100)",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  const rand = Math.floor(Math.random() * 100) + 1;
  send(sock, m.key.remoteJid, `🔢 Your random number is *${rand}*!`, m);
});

// 8. Slap
bluebot({
  cmd: "slap",
  desc: "Slap a user",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "👋 *Slap*\n\nThis command is under development.", m);
});

// 9. Hug
bluebot({
  cmd: "hug",
  desc: "Hug a user",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🤗 *Hug*\n\nThis command is under development.", m);
});

// 10. Kiss
bluebot({
  cmd: "kiss",
  desc: "Kiss a user",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "😘 *Kiss*\n\nThis command is under development.", m);
});

// 11. Meme Generator
bluebot({
  cmd: "meme",
  desc: "Generate a random meme",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "😂 *Meme Generator*\n\nThis command is under development.", m);
});

// 12. Quote
bluebot({
  cmd: "quote",
  desc: "Get a random inspirational quote",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "✨ *Quote*\n\nThis command is under development.", m);
});

// 13. Would You Rather
bluebot({
  cmd: "wyr",
  desc: "Get a 'Would You Rather' question",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🤔 *Would You Rather*\n\nThis command is under development.", m);
});

// 14. Never Have I Ever
bluebot({
  cmd: "nhie",
  desc: "Get a 'Never Have I Ever' question",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🤫 *Never Have I Ever*\n\nThis command is under development.", m);
});

// 15. Guess The Word
bluebot({
  cmd: "guessthis",
  desc: "Start a 'Guess The Word' game",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🎮 *Guess The Word*\n\nThis command is under development.", m);
});

// 16. Trivia
bluebot({
  cmd: "trivia",
  desc: "Start a trivia game",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🧠 *Trivia*\n\nThis command is under development.", m);
});

// 17. RPS (Rock Paper Scissors)
bluebot({
  cmd: "rps",
  desc: "Play Rock Paper Scissors",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "✂️ *RPS*\n\nUse: `.rps rock|paper|scissors`. This command is under development.", m);
});

// 18. Love Calculator
bluebot({
  cmd: "love",
  desc: "Calculate love percentage between two names",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "❤️ *Love Calculator*\n\nThis command is under development.", m);
});

// 19. Fact or Fiction
bluebot({
  cmd: "fof",
  desc: "Start a Fact or Fiction game",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🧐 *Fact or Fiction*\n\nThis command is under development.", m);
});

// 20. Fortune
bluebot({
  cmd: "fortune",
  desc: "Get your daily fortune",
  fromMe: false,
  category: "fun",
}, async (sock, m, config, args) => {
  send(sock, m.key.remoteJid, "🔮 *Fortune*\n\nThis command is under development.", m);
});
