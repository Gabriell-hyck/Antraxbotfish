const { EmbedBuilder } = require('discord.js');
const { getPlayer } = require('../utils/database');
const { RODS, BAITS } = require('../utils/fishData');
const { formatNumber, RARITY_STYLE } = require('../utils/helpers');

// Urutan rarity dari tertinggi ke terendah
const RARITY_ORDER = ['Secret', 'Divine', 'Mythic', 'Legendary', 'Exotic', 'Epic', 'Rare', 'Common', 'Junk'];

module.exports = {
  name: 'inventory',
  aliases: ['inv', 'bag', 'tas'],
  description: 'Lihat inventaris ikanmu',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      const player = getPlayer(message.author.id);

      if (player.inventory.length === 0) {
        return message.reply({ embeds: [
          new EmbedBuilder()
            .setColor('#2c2c54')
            .setTitle('🎒  Inventaris Kosong')
            .setDescription('```\nTas kamu masih kosong.\nGunakan &fish untuk mulai memancing!\n```')
            .setFooter({ text: '∆NTRAX Fishing Universe' })
        ]});
      }

      // Kelompokkan per rarity
      const groups = {};
      for (const f of player.inventory) {
        const r = f.rarity || 'Common';
        if (!groups[r]) groups[r] = [];
        groups[r].push(f);
      }

      const rodData  = RODS[player.activeRod] || RODS['Wooden Rod'];
      const baitData = player.activeBait ? BAITS[player.activeBait] : null;

      // Build fields — 1 field per rarity yang ada (Discord max 25 fields per embed)
      const fields = [];
      let totalCoins = 0;
      let totalFish  = 0;
      let uniqueKind = 0;

      for (const rarity of RARITY_ORDER) {
        if (!groups[rarity]) continue;
        const style = RARITY_STYLE[rarity] || RARITY_STYLE['Common'];

        let text = '';
        for (const fish of groups[rarity]) {
          const val = formatNumber(fish.price * fish.count);
          const oneTimeTag = fish.oneTime ? ' ★' : '';
          text += `${fish.emoji} \`${fish.name.padEnd(22)}${oneTimeTag}\` ×${String(fish.count).padStart(3)}  •  💰 ${val}\n`;
          totalCoins += fish.price * fish.count;
          totalFish  += fish.count;
          uniqueKind++;
        }

        // Discord field value max 1024 chars — potong kalau kelewat
        if (text.length > 1024) text = text.substring(0, 1000) + '\n*...+lainnya*';

        fields.push({
          name: `${style.icon}  ${style.label}  (${groups[rarity].length} jenis)`,
          value: text.trim(),
          inline: false,
        });
      }

      // Stats summary di akhir
      fields.push({
        name: '📊 Ringkasan',
        value: `\`${uniqueKind} jenis\`  •  \`${formatNumber(totalFish)} ekor\`  •  💰 \`${formatNumber(totalCoins)}\``,
        inline: false,
      });

      // Discord max 25 fields — kalau lebih, gabung overflow
      const safeFields = fields.slice(0, 24);
      if (fields.length > 24) {
        safeFields.push({ name: '...', value: '*Terlalu banyak jenis untuk ditampilkan semua.*', inline: false });
      }

      const embed = new EmbedBuilder()
        .setColor('#00c9ff')
        .setTitle(`🎒  Inventaris  —  ${message.author.username}`)
        .addFields(
          { name: '🎣 Rod Aktif',  value: `${rodData.emoji} ${player.activeRod}`,                              inline: true },
          { name: '🪱 Bait Aktif', value: baitData ? `${baitData.emoji} ${player.activeBait}` : '`—`',         inline: true },
          { name: '\u200B',        value: '\u200B',                                                             inline: true },
          ...safeFields,
        )
        .setFooter({ text: '∆NTRAX • &sell <rarity> untuk jual per rarity • ★ = sekali tangkap' })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command inventory:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
