const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { errorEmbed, formatNumber, RARITY_STYLE } = require('../utils/helpers');
const { updateQuestProgress } = require('./quest');

const RARITY_ORDER = { Secret: 0, Divine: 1, Mythic: 2, Legendary: 3, Exotic: 4, Epic: 5, Rare: 6, Common: 7, Junk: 8 };

module.exports = {
  name: 'sell',
  description: 'Jual ikan dari inventaris',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      const player = getPlayer(message.author.id);
      if (!args[0]) return message.reply({ embeds: [errorEmbed(
        'Penggunaan:\n' +
        '`&sell all` — jual semua\n' +
        '`&sell <rarity>` — jual semua ikan rarity tertentu\n' +
        '`&sell <nama ikan>` — jual ikan spesifik\n\n' +
        'Rarity: `common` `rare` `epic` `exotic` `legendary` `mythic` `divine`'
      )] });
      if (player.inventory.length === 0) return message.reply({ embeds: [errorEmbed('Inventarismu kosong!')] });

      let sold = [], totalCoins = 0, totalCount = 0;
      const input = args.join(' ').toLowerCase();

      const VALID_RARITIES = ['common', 'rare', 'epic', 'exotic', 'legendary', 'mythic', 'divine', 'secret', 'junk'];

      if (input === 'all') {
        // Jual semua
        for (const f of player.inventory) {
          const val = f.price * f.count;
          sold.push({ ...f, total: val });
          totalCoins += val;
          totalCount += f.count;
        }
        player.inventory = [];

      } else if (VALID_RARITIES.includes(input)) {
        // Jual semua ikan rarity tertentu
        const targetRarity = input.charAt(0).toUpperCase() + input.slice(1);
        const keep = [], remove = [];
        for (const f of player.inventory) {
          if (f.rarity === targetRarity) {
            const val = f.price * f.count;
            sold.push({ ...f, total: val });
            totalCoins += val;
            totalCount += f.count;
            remove.push(f);
          } else {
            keep.push(f);
          }
        }
        if (sold.length === 0)
          return message.reply({ embeds: [errorEmbed(`Tidak ada ikan **${targetRarity}** di inventarismu!`)] });
        player.inventory = keep;

      } else {
        // Jual by nama ikan
        const idx = player.inventory.findIndex(f => f.name.toLowerCase().includes(input));
        if (idx === -1)
          return message.reply({ embeds: [errorEmbed(`Ikan **${args.join(' ')}** tidak ada di inventaris!`)] });
        const f   = player.inventory[idx];
        const val = f.price * f.count;
        sold.push({ ...f, total: val });
        totalCoins += val;
        totalCount += f.count;
        player.inventory.splice(idx, 1);
      }

      player.coins += totalCoins;
      savePlayer(player);
      await updateQuestProgress(message.author.id, 'sell', totalCount);

      // Sort by rarity order
      sold.sort((a, b) => (RARITY_ORDER[a.rarity] ?? 9) - (RARITY_ORDER[b.rarity] ?? 9));

      // Build display list dengan label rarity
      let listText = sold.map(f => {
        const style = RARITY_STYLE[f.rarity] || RARITY_STYLE['Common'];
        const rarityLabel = `[${f.rarity}]`;
        return `${f.emoji} **${f.name}** ${rarityLabel} ×${f.count}  →  \`${formatNumber(f.total)} 🪙\``;
      }).join('\n');

      if (listText.length > 1800) listText = listText.substring(0, 1800) + '\n*...dan lainnya*';

      // Embed color berdasarkan rarity tertinggi yang dijual
      const topRarity = sold[0]?.rarity || 'Common';
      const topStyle  = RARITY_STYLE[topRarity] || RARITY_STYLE['Common'];

      const embed = new EmbedBuilder()
        .setColor(topStyle.color || '#2ed573')
        .setTitle('💰  Transaksi Berhasil!')
        .setDescription(listText)
        .addFields(
          { name: '📦 Terjual',       value: `\`${formatNumber(totalCount)} ekor\``, inline: true },
          { name: '💵 Pendapatan',    value: `\`${formatNumber(totalCoins)} 🪙\``,   inline: true },
          { name: '💳 Saldo Koinmu',  value: `\`${formatNumber(player.coins)} 🪙\``, inline: true },
        )
        .setFooter({ text: '∆NTRAX Fishing Universe' })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command sell:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
