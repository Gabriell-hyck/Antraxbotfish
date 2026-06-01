const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer, getPlayerQuest, savePlayerQuest } = require('../utils/database');
const { getXpForNextLevel } = require('../utils/fishData');
const { errorEmbed, formatNumber } = require('../utils/helpers');

module.exports = {
  name: 'claimquest',
  aliases: ['claim','klaim'],
  description: 'Klaim reward quest selesai',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      const player = getPlayer(message.author.id);
      const qd     = getPlayerQuest(message.author.id);

      const ready = qd.quests.filter(q => q.progress >= q.target && !q.claimed);
      if (ready.length === 0)
        return message.reply({ embeds: [errorEmbed('Tidak ada quest yang bisa diklaim!\nSelesaikan quest dengan &quest.')] });

      let totalCoins = 0, totalXp = 0, names = [];
      for (const q of ready) {
        q.claimed = true;
        totalCoins += q.reward.coins;
        totalXp    += q.reward.xp;
        names.push(q.desc);
      }

      player.coins += totalCoins;
      player.xp    += totalXp;
      let leveledUp = false;
      while (player.xp >= getXpForNextLevel(player.level)) {
        player.xp -= getXpForNextLevel(player.level);
        player.level++;
        leveledUp = true;
      }
      savePlayer(player);
      savePlayerQuest(qd);

      const listText = names.map(n => `✅ ${n}`).join('\n');

      const embed = new EmbedBuilder()
        .setColor('#2ed573')
        .setTitle('🎁  Quest Reward Diterima!')
        .setDescription(`${listText}`)
        .addFields(
          { name: '💰 Koin',    value: `\`+${formatNumber(totalCoins)} 🪙\``,  inline: true },
          { name: '⭐ XP',      value: `\`+${totalXp}\``,                      inline: true },
          { name: '💳 Saldo',  value: `\`${formatNumber(player.coins)} 🪙\``,  inline: true },
        )
        .setFooter({ text: '∆NTRAX Fishing Universe' })
        .setTimestamp();

      if (leveledUp) embed.addFields({ name: '🎉 LEVEL UP!', value: `\`\`\`fix\nSelamat! Level ${player.level}!\n\`\`\`` });

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command claimquest:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
