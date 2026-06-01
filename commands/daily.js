const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { getXpForNextLevel } = require('../utils/fishData');
const { errorEmbed, formatNumber, formatTime, buildXpBar } = require('../utils/helpers');

module.exports = {
  name: 'daily',
  description: 'Ambil reward harian',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      const player = getPlayer(message.author.id);
      const now    = Date.now();

      if (player.lastDaily && now - player.lastDaily < 86400000) {
        const left = 86400000 - (now - player.lastDaily);
        const embed = new EmbedBuilder()
          .setColor('#e74c3c')
          .setTitle('⏳  Daily Reward — Belum Tersedia')
          .setDescription(`\`\`\`\nKamu sudah klaim hari ini.\nTersedia lagi dalam: ${formatTime(left)}\n\`\`\``)
          .setFooter({ text: '∆NTRAX Fishing Universe' });
        return message.reply({ embeds: [embed] });
      }

      const coinReward = 500 + (player.level * 50);
      const xpReward   = 100 + (player.level * 20);

      player.coins    += coinReward;
      player.lastDaily = now;
      player.xp       += xpReward;

      let leveledUp = false;
      while (player.xp >= getXpForNextLevel(player.level)) {
        player.xp -= getXpForNextLevel(player.level);
        player.level++;
        leveledUp = true;
      }
      savePlayer(player);

      const xpBar = buildXpBar(player.xp, getXpForNextLevel(player.level));

      const embed = new EmbedBuilder()
        .setColor('#f1c40f')
        .setTitle('🎁  Daily Reward Diklaim!')
        .setDescription(`Selamat datang kembali, **${message.author.username}**! 🌅`)
        .addFields(
          { name: '💰 Koin',      value: `\`+${formatNumber(coinReward)} 🪙\``,  inline: true },
          { name: '⭐ XP',        value: `\`+${xpReward}\``,                     inline: true },
          { name: '\u200B',      value: '\u200B',                                 inline: true },
          { name: '💳 Saldo',    value: `\`${formatNumber(player.coins)} 🪙\``,  inline: true },
          { name: '📊 Level',    value: `\`${player.level}\``,                   inline: true },
          { name: '\u200B',      value: '\u200B',                                 inline: true },
          { name: `📈 XP Progress  Level ${player.level}`, value: xpBar,         inline: false },
        )
        .setFooter({ text: '∆NTRAX • Kembali lagi besok!' })
        .setTimestamp();

      if (leveledUp) {
        embed.addFields({ name: '🎉  LEVEL UP!', value: `\`\`\`fix\nSelamat! Kamu sekarang Level ${player.level}!\n\`\`\`` });
      }

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command daily:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
