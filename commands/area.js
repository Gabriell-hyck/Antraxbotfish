const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { AREAS, FISH } = require('../utils/fishData');
const { errorEmbed, formatNumber, DIVIDER_THIN } = require('../utils/helpers');

module.exports = {
  name: 'area',
  description: 'Lihat atau ganti area memancing',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      const player = getPlayer(message.author.id);

      if (!args[0]) {
        let areaDesc = '';
        for (const [name, data] of Object.entries(AREAS)) {
          const unlocked = player.level >= data.unlockLevel;
          const active   = player.activeArea === name;
          const statusTag = active ? ' `📍 DISINI`' : unlocked ? ' `🔓`' : ` \`🔒 Lv ${data.unlockLevel}\``;
          const fishCount = FISH.filter(f => f.areas.includes(name)).length;
          areaDesc += `${data.emoji} **${name}**${statusTag}\n┣ ${data.desc}\n┗ \`${fishCount} jenis ikan tersedia\`\n\n`;
        }

        const embed = new EmbedBuilder()
          .setColor('#1abc9c')
          .setTitle('🗺️  ∆NTRAX  —  Peta Area')
          .setDescription(`> 📍 Area aktif: ${AREAS[player.activeArea]?.emoji} **${player.activeArea}**\n> Level kamu: **${player.level}**\n> Gunakan \`&area <nama>\` untuk pindah\n\n${areaDesc}`)
          .setFooter({ text: '∆NTRAX Fishing Universe' })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      const areaName = args.join(' ');
      const found = Object.keys(AREAS).find(a => a.toLowerCase() === areaName.toLowerCase());
      if (!found) return message.reply({ embeds: [errorEmbed(`Area **${areaName}** tidak ditemukan!\nGunakan \`&area\` untuk daftar.`)] });

      const data = AREAS[found];
      if (player.level < data.unlockLevel)
        return message.reply({ embeds: [errorEmbed(`Butuh **Level ${data.unlockLevel}** untuk masuk **${found}**!\nLevel kamu: **${player.level}**`)] });
      if (player.activeArea === found)
        return message.reply({ embeds: [errorEmbed(`Kamu sudah berada di **${found}**!`)] });

      player.activeArea = found;
      savePlayer(player);

      const preview = FISH.filter(f => f.areas.includes(found)).slice(0, 8).map(f => `${f.emoji} ${f.name}`).join('  •  ');

      const embed = new EmbedBuilder()
        .setColor('#1abc9c')
        .setTitle(`${data.emoji}  Selamat Datang di ${found}!`)
        .setDescription(`\`\`\`\n${data.desc}\n\`\`\`\n**🐟 Ikan yang bisa ditemukan:**\n${preview}`)
        .setFooter({ text: '∆NTRAX • &fish untuk mulai memancing!' })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command area:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
