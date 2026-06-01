const { EmbedBuilder } = require('discord.js');
const { getPlayerQuest, savePlayerQuest } = require('../utils/database');
const { formatNumber, formatTime, DIVIDER_THIN } = require('../utils/helpers');

async function updateQuestProgress(userId, type, amount) {
  const qd = getPlayerQuest(userId);
  let changed = false;
  for (const q of qd.quests) {
    if (!q.claimed && q.type === type && q.progress < q.target) {
      q.progress = Math.min(q.target, q.progress + amount);
      changed = true;
    }
  }
  if (changed) savePlayerQuest(qd);
}

module.exports = {
  name: 'quest',
  aliases: ['quests', 'misi'],
  description: 'Lihat quest harian',
  cooldown: 3,
  updateQuestProgress,
  async execute(message, args, client) {
    try {

      const qd      = getPlayerQuest(message.author.id);
      const now     = Date.now();
      const remaining = 86400000 - (now - qd.resetTime);

      let questLines = '';
      for (const q of qd.quests) {
        const pct     = Math.min(1, q.progress / q.target);
        const filled  = Math.round(pct * 10);
        const bar     = '▰'.repeat(filled) + '▱'.repeat(10 - filled);
        const pctNum  = Math.floor(pct * 100);
        const status  = q.claimed
          ? '`✅ SELESAI`'
          : q.progress >= q.target
            ? '`🎁 KLAIM SEKARANG!`'
            : '`⏳ Berlangsung`';

        questLines +=
          `**❯ ${q.desc}**  ${status}\n` +
          `\`${bar}\` ${pctNum}%  \`${q.progress}/${q.target}\`\n` +
          `┗ Reward: \`${formatNumber(q.reward.coins)} 🪙\`  •  \`+${q.reward.xp} XP\`\n\n`;
      }

      const done  = qd.quests.filter(q => q.claimed).length;
      const ready = qd.quests.filter(q => !q.claimed && q.progress >= q.target).length;

      const embed = new EmbedBuilder()
        .setColor('#e67e22')
        .setTitle('📋  ∆NTRAX  —  Daily Quest')
        .setDescription(
          `> 🔄 Reset dalam: **${formatTime(remaining)}**\n` +
          `> ✅ Selesai: \`${done}/3\`${ready > 0 ? `  •  🎁 Bisa diklaim: \`${ready}\`` : ''}\n\n` +
          questLines
        )
        .setFooter({ text: '∆NTRAX • &claimquest untuk klaim reward' })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command quest:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
