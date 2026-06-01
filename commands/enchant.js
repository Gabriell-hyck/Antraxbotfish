const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { ENCHANTMENTS } = require('../utils/fishData');
const { errorEmbed, formatNumber } = require('../utils/helpers');

// Split enchantment list jadi beberapa halaman per 5 item
function buildEnchantPages(enchantments) {
  const entries = Object.entries(enchantments);
  const pages = [];
  for (let i = 0; i < entries.length; i += 5) {
    const chunk = entries.slice(i, i + 5);
    let text = '';
    for (const [name, data] of chunk) {
      text += `${data.emoji} **${name}**  •  Tier ${data.tier}\n`;
      text += `┣ Harga : \`${formatNumber(data.price)} 🪙\`\n`;
      text += `┣ Luck  : \`+${data.luckBonus}\`\n`;
      text += `┗ ${data.description}\n\n`;
    }
    const startTier = entries[i]?.[1]?.tier ?? '?';
    const endIdx = i + Math.min(4, entries.length - i - 1);
    const endTier = entries[endIdx]?.[1]?.tier ?? '?';
    if (!text.trim()) continue; // FIX: skip empty pages
    pages.push({ name: `📜 Enchantment Tier ${startTier}–${endTier}`, value: text.trim() });
  }
  return pages;
}

module.exports = {
  name: 'enchant',
  aliases: ['ench'],
  description: 'Lihat atau beli enchantment untuk rod aktif (1 enchant per rod)',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      const player = getPlayer(message.author.id);

      if (!args[0]) {
        const activeEnchant = player.activeEnchant;
        const activeDisplay = activeEnchant
          ? `${ENCHANTMENTS[activeEnchant]?.emoji || '✨'} **${activeEnchant}**  —  \`+${ENCHANTMENTS[activeEnchant]?.luckBonus || 0} Luck\`  •  Tier ${ENCHANTMENTS[activeEnchant]?.tier}`
          : '`Belum ada`';

        const fields = buildEnchantPages(ENCHANTMENTS);

        const embed = new EmbedBuilder()
          .setColor('#9b59b6')
          .setTitle('✨  ∆NTRAX  —  Toko Enchantment')
          .setDescription(
            `> 💰 Koin kamu: **${formatNumber(player.coins)} 🪙**\n` +
            `> \`&enchant <nama>\` — pasang enchant\n` +
            `> \`&disenchant\` — lepas enchant aktif\n` +
            `> ⚠️ Hanya **1 enchant aktif** per rod — harus \`&disenchant\` dulu sebelum ganti`
          )
          .addFields(
            { name: '⚡ Enchant Aktif', value: activeDisplay, inline: false },
            ...fields
          )
          .setFooter({ text: `∆NTRAX Fishing Universe • Total ${Object.keys(ENCHANTMENTS).length} enchantment tersedia` })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      const enchName = args.join(' ');
      const found = Object.keys(ENCHANTMENTS).find(e => e.toLowerCase() === enchName.toLowerCase());
      if (!found) return message.reply({ embeds: [errorEmbed(`Enchantment **${enchName}** tidak ditemukan!\nGunakan \`&enchant\` untuk daftar.`)] });

      if (player.activeEnchant) {
        return message.reply({ embeds: [errorEmbed(
          `Rod kamu sudah memiliki enchant aktif: **${player.activeEnchant}**!\n\nHapus dulu dengan \`&disenchant\` sebelum memasang yang baru.`
        )] });
      }

      const data = ENCHANTMENTS[found];
      if (player.coins < data.price)
        return message.reply({ embeds: [errorEmbed(`Koin tidak cukup!\nDibutuhkan : \`${formatNumber(data.price)} 🪙\`\nKoinmu     : \`${formatNumber(player.coins)} 🪙\``)] });

      player.coins -= data.price;
      player.activeEnchant = found;
      if (player.enchantments) delete player.enchantments;
      savePlayer(player);

      const embed = new EmbedBuilder()
        .setColor('#9b59b6')
        .setTitle(`${data.emoji}  Enchant Terpasang!`)
        .setDescription(
          `\`\`\`ml\nEnchant : ${found}\nTier    : ${data.tier}\nLuck    : +${data.luckBonus}\nBayar   : ${formatNumber(data.price)} koin\nSisa    : ${formatNumber(player.coins)} koin\n\`\`\`\n> Gunakan \`&disenchant\` untuk melepas enchant ini.`
        )
        .setFooter({ text: '∆NTRAX Fishing Universe' });

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command enchant:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
