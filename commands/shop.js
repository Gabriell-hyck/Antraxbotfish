const { EmbedBuilder } = require('discord.js');
const { getPlayer } = require('../utils/database');
const { RODS, BAITS, AREAS } = require('../utils/fishData');
const { formatNumber } = require('../utils/helpers');

// ─────────────────────────────────────────────────────────────
// Helper: potong string agar tidak melebihi batas field Discord
// ─────────────────────────────────────────────────────────────
function safeField(text, limit = 1024) {
  if (text.length <= limit) return text;
  return text.slice(0, limit - 6) + '\n…';
}

// ─────────────────────────────────────────────────────────────
// Helper: pecah array item menjadi beberapa halaman field
// maxCharsPerField default 900 (batas aman, bukan 1024)
// ─────────────────────────────────────────────────────────────
function splitIntoFields(entries, fieldTitle, maxCharsPerField = 900) {
  const fields = [];
  let current = '';
  let pageNum = 1;

  for (const entry of entries) {
    if (current.length + entry.length > maxCharsPerField) {
      fields.push({ name: `${fieldTitle} (${pageNum})`, value: current || '—', inline: false });
      current = '';
      pageNum++;
    }
    current += entry;
  }

  if (current) {
    const title = pageNum === 1 ? fieldTitle : `${fieldTitle} (${pageNum})`;
    fields.push({ name: title, value: current, inline: false });
  }

  return fields;
}

// ─────────────────────────────────────────────────────────────
// SUB‑COMMAND: &shop rod
// ─────────────────────────────────────────────────────────────
function buildRodEmbed(player) {
  const entries = Object.entries(RODS).map(([name, data]) => {
    const isActive = player.activeRod === name;
    const tag      = isActive ? ' `✅ AKTIF`' : '';
    const price    = data.price === 0 ? '`GRATIS`' : `\`${formatNumber(data.price)} 🪙\``;
    return `${data.emoji} **${name}**${tag}\n┣ Harga : ${price}\n┣ Luck  : \`+${data.luckBonus}\`\n┗ ${data.description}\n\n`;
  });

  const embed = new EmbedBuilder()
    .setColor('#3498db')
    .setTitle('🎣  ∆NTRAX  —  Toko Joran (Rod)')
    .setDescription(
      `> 💰 Koin kamu: **${formatNumber(player.coins)} 🪙**\n` +
      `> Gunakan \`&buy <nama joran>\` untuk membeli\n` +
      `> Total: **${Object.keys(RODS).length} Tier Joran**`
    )
    .setFooter({ text: '∆NTRAX Fishing Universe • &shop bait | &shop island' })
    .setTimestamp();

  const rodFields = splitIntoFields(entries, '🎣  Joran tersedia');
  embed.addFields(rodFields);

  return embed;
}

// ─────────────────────────────────────────────────────────────
// SUB‑COMMAND: &shop bait
// ─────────────────────────────────────────────────────────────
function buildBaitEmbed(player) {
  const entries = Object.entries(BAITS).map(([name, data]) => {
    const isActive = player.activeBait === name;
    const tag      = isActive ? ' `✅ AKTIF`' : '';
    return (
      `${data.emoji} **${name}**${tag}\n` +
      `┣ Harga  : \`${formatNumber(data.price)} 🪙\`\n` +
      `┣ Rarity : \`+${data.rarityBonus}\`\n` +
      (data.luckBonus   ? `┣ Luck   : \`+${data.luckBonus}\`\n` : '') +
      (data.mythicChance? `┣ +Mythic: \`+${data.mythicChance}%\`\n` : '') +
      (data.divineChance? `┣ +Divine: \`+${data.divineChance}%\`\n` : '') +
      (data.secretChance? `┣ +Secret: \`+${data.secretChance}%\`\n` : '') +
      `┗ ${data.description}\n\n`
    );
  });

  const embed = new EmbedBuilder()
    .setColor('#27ae60')
    .setTitle('🪱  ∆NTRAX  —  Toko Umpan (Bait)')
    .setDescription(
      `> 💰 Koin kamu: **${formatNumber(player.coins)} 🪙**\n` +
      `> Gunakan \`&buy <nama umpan>\` untuk membeli\n` +
      `> Total: **${Object.keys(BAITS).length} Jenis Umpan**`
    )
    .setFooter({ text: '∆NTRAX Fishing Universe • &shop rod | &shop island' })
    .setTimestamp();

  const baitFields = splitIntoFields(entries, '🪱  Umpan tersedia');
  embed.addFields(baitFields);

  return embed;
}

// ─────────────────────────────────────────────────────────────
// SUB‑COMMAND: &shop island
// ─────────────────────────────────────────────────────────────
function buildIslandEmbed(player) {
  const entries = Object.entries(AREAS).map(([name, data]) => {
    const isActive = player.activeArea === name;
    const tag      = isActive ? ' `✅ AKTIF`' : '';
    const lock     = player.level >= data.unlockLevel ? '🔓' : `🔒 Lv ${data.unlockLevel}`;
    return (
      `${data.emoji} **${name}**${tag}\n` +
      `┣ Buka   : ${lock}\n` +
      `┗ ${data.desc}\n\n`
    );
  });

  const embed = new EmbedBuilder()
    .setColor('#8e44ad')
    .setTitle('🏝️  ∆NTRAX  —  Daftar Pulau / Area')
    .setDescription(
      `> 🎚️ Level kamu: **${player.level}**\n` +
      `> Gunakan \`&area <nama pulau>\` untuk pindah area\n` +
      `> Total: **${Object.keys(AREAS).length} Area Tersedia**`
    )
    .setFooter({ text: '∆NTRAX Fishing Universe • &shop rod | &shop bait' })
    .setTimestamp();

  const islandFields = splitIntoFields(entries, '🏝️  Area tersedia');
  embed.addFields(islandFields);

  return embed;
}

// ─────────────────────────────────────────────────────────────
// SUB‑COMMAND: &shop (tanpa argumen) — menu bantuan
// ─────────────────────────────────────────────────────────────
function buildHelpEmbed(player) {
  return new EmbedBuilder()
    .setColor('#f39c12')
    .setTitle('🏪  ∆NTRAX  —  Toko Pancing')
    .setDescription(
      `> 💰 Koin kamu: **${formatNumber(player.coins)} 🪙**\n\n` +
      `Pilih kategori toko di bawah ini:`
    )
    .addFields(
      {
        name: '🎣  `&shop rod`',
        value: 'Lihat semua **joran** yang tersedia beserta harga & bonus luck.',
        inline: false,
      },
      {
        name: '🪱  `&shop bait`',
        value: 'Lihat semua **umpan** yang tersedia beserta harga & bonus rarity.',
        inline: false,
      },
      {
        name: '🏝️  `&shop island`',
        value: 'Lihat semua **pulau / area** mancing beserta syarat level buka.',
        inline: false,
      },
      {
        name: '💡  Tips',
        value:
          '• Gunakan `&buy <nama>` untuk membeli item\n' +
          '• Gunakan `&area <nama>` untuk pindah area\n' +
          '• Gunakan `&enchant` untuk melihat daftar enchantment',
        inline: false,
      }
    )
    .setFooter({ text: '∆NTRAX Fishing Universe' })
    .setTimestamp();
}

// ─────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────
module.exports = {
  name: 'shop',
  aliases: ['toko', 'store'],
  description: 'Lihat toko joran, umpan, dan pulau',
  usage: '&shop [rod | bait | island]',
  cooldown: 3,

  async execute(message, args, client) {
    try {

      const player = getPlayer(message.author.id);
      const sub    = (args[0] || '').toLowerCase();

      let embed;

      switch (sub) {
        case 'rod':
        case 'joran':
          embed = buildRodEmbed(player);
          break;

        case 'bait':
        case 'umpan':
          embed = buildBaitEmbed(player);
          break;

        case 'island':
        case 'pulau':
        case 'area':
          embed = buildIslandEmbed(player);
          break;

        default:
          embed = buildHelpEmbed(player);
          break;
      }

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command shop:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
