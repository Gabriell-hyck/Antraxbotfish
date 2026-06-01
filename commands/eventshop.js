const { EmbedBuilder } = require('discord.js');
const { getPlayer } = require('../utils/database');
const { isEventActive } = require('../utils/eventManager');
const { EVENT_RODS, EVENT_BAITS, EVENT_ENCHANTS, EVENT_CHESTS } = require('../utils/eventData');
const { errorEmbed, formatNumber } = require('../utils/helpers');

module.exports = {
  name: 'eventshop',
  aliases: ['evshop', 'eshop'],
  description: 'Toko event Poseidon\'s Blessing (hanya saat event aktif)',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      if (!isEventActive()) {
        return message.reply({ embeds: [errorEmbed(
          'Event **Poseidon\'s Blessing** tidak sedang aktif!\n\n' +
          'Event berlangsung setiap **Sabtu jam 22:00 WITA** selama 30 menit.\n' +
          'Gunakan `&event` untuk cek waktu event berikutnya.'
        )] });
      }

      const player = getPlayer(message.author.id);
      const tokens = player.poseidonTokens || 0;

      // ── Rod ──────────────────────────────────────────────────
      let rodText = '';
      for (const [name, d] of Object.entries(EVENT_RODS)) {
        rodText += `${d.emoji} **${name}**\n`;
        rodText += `┣ Harga  : \`${d.tokenPrice} 🌊 Token\`\n`;
        rodText += `┣ Luck   : \`+${d.luckBonus}\`\n`;
        rodText += `┗ ${d.description}\n\n`;
      }

      // ── Bait ─────────────────────────────────────────────────
      let baitText = '';
      for (const [name, d] of Object.entries(EVENT_BAITS)) {
        baitText += `${d.emoji} **${name}**\n`;
        baitText += `┣ Harga  : \`${d.tokenPrice} 🌊 Token\`\n`;
        baitText += `┣ Luck   : \`+${d.luckBonus}\` | +Mythic: \`${d.mythicChance}%\` | +EventFish: \`${d.eventFishBonus}%\`\n`;
        baitText += `┗ ${d.description}\n\n`;
      }

      // ── Enchant ──────────────────────────────────────────────
      let enchText = '';
      for (const [name, d] of Object.entries(EVENT_ENCHANTS)) {
        enchText += `${d.emoji} **${name}**\n`;
        enchText += `┣ Harga  : \`${d.tokenPrice} 🌊 Token\`\n`;
        enchText += `┣ Luck   : \`+${d.luckBonus}\`\n`;
        enchText += `┗ ${d.description}\n\n`;
      }

      // ── Chest ────────────────────────────────────────────────
      let chestText = '';
      for (const [name, d] of Object.entries(EVENT_CHESTS)) {
        chestText += `${d.emoji} **${name}**\n`;
        chestText += `┣ Harga  : \`${d.tokenPrice} 🌊 Token\`\n`;
        chestText += `┗ ${d.description}\n\n`;
      }

      const embed = new EmbedBuilder()
        .setColor('#00c9ff')
        .setTitle('🌊  ∆NTRAX  —  Toko Event Poseidon')
        .setDescription(
          `> 🌊 Token kamu: **${formatNumber(tokens)} Token**\n` +
          `> Gunakan \`&buyevent <nama item>\` untuk membeli\n` +
          `> Gunakan \`&open <nama chest>\` untuk membuka chest`
        )
        .addFields(
          { name: '🎣 Rod Event', value: rodText.trim() || '—', inline: false },
          { name: '🪱 Bait Event', value: baitText.trim() || '—', inline: false },
          { name: '✨ Enchant Event', value: enchText.trim() || '—', inline: false },
          { name: '📦 Chest', value: chestText.trim() || '—', inline: false },
        )
        .setFooter({ text: '∆NTRAX Fishing Universe • Token didapat dari memancing saat event' })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command eventshop:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
