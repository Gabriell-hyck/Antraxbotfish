const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { RODS, BAITS } = require('../utils/fishData');
const { errorEmbed, formatNumber } = require('../utils/helpers');

module.exports = {
  name: 'buy',
  aliases: ['beli'],
  description: 'Beli rod atau bait',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      if (!args[0]) {
        return message.reply({ embeds: [errorEmbed('Penggunaan: &buy <nama rod/bait>\nContoh: &buy Iron Rod  |  &buy Worm')] });
      }

      const player   = getPlayer(message.author.id);
      const itemName = args.join(' ');

      const rod = Object.keys(RODS).find(r => r.toLowerCase() === itemName.toLowerCase());
      if (rod) {
        if (rod === 'Wooden Rod')     return message.reply({ embeds: [errorEmbed('Wooden Rod sudah kamu miliki secara gratis!')] });
        if (player.activeRod === rod) return message.reply({ embeds: [errorEmbed(`Kamu sudah memakai **${rod}**!`)] });

        const data = RODS[rod];
        if (player.coins < data.price)
          return message.reply({ embeds: [errorEmbed(`Koin tidak cukup!\nDibutuhkan : \`${formatNumber(data.price)} 🪙\`\nKoinmu     : \`${formatNumber(player.coins)} 🪙\``)] });

        player.coins    -= data.price;
        player.activeRod = rod;
        savePlayer(player);

        const embed = new EmbedBuilder()
          .setColor('#2ed573')
          .setTitle(`${data.emoji}  Rod Baru Terpasang!`)
          .setDescription(`\`\`\`ml\nRod     : ${rod}\nLuck    : +${data.luckBonus}\nDikurangi: ${formatNumber(data.price)} koin\nSisa    : ${formatNumber(player.coins)} koin\n\`\`\``)
          .setFooter({ text: '∆NTRAX Fishing Universe' });
        return message.reply({ embeds: [embed] });
      }

      const bait = Object.keys(BAITS).find(b => b.toLowerCase() === itemName.toLowerCase());
      if (bait) {
        const data = BAITS[bait];
        if (player.coins < data.price)
          return message.reply({ embeds: [errorEmbed(`Koin tidak cukup!\nDibutuhkan : \`${formatNumber(data.price)} 🪙\`\nKoinmu     : \`${formatNumber(player.coins)} 🪙\``)] });

        player.coins     -= data.price;
        player.activeBait = bait;
        savePlayer(player);

        const embed = new EmbedBuilder()
          .setColor('#2ed573')
          .setTitle(`${data.emoji}  Bait Aktif Diganti!`)
          .setDescription(`\`\`\`ml\nBait    : ${bait}\nRarity  : +${data.rarityBonus}\nDikurangi: ${formatNumber(data.price)} koin\nSisa    : ${formatNumber(player.coins)} koin\n\`\`\``)
          .setFooter({ text: '∆NTRAX Fishing Universe' });
        return message.reply({ embeds: [embed] });
      }

      return message.reply({ embeds: [errorEmbed(`Item **${itemName}** tidak ditemukan!\nGunakan \`&shop\` untuk daftar item.`)] });
    } catch (error) {
      console.error('[Error] Command buy:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
