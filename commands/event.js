const { EmbedBuilder } = require('discord.js');
const { getPlayer } = require('../utils/database');
const { isEventActive, getTimeRemaining, getNextEventTime, formatDuration, EVENT_CONFIG } = require('../utils/eventManager');
const { EVENT_FISH } = require('../utils/eventData');
const { formatNumber } = require('../utils/helpers');

module.exports = {
  name: 'event',
  aliases: ['ev'],
  description: 'Cek status Poseidon\'s Blessing event',
  cooldown: 3,
  async execute(message, args, client) {
    try {

    const player = getPlayer(message.author.id);
    const active = isEventActive();

    if (active) {
      const remaining = getTimeRemaining();
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);

      const fishList = EVENT_FISH.map(f =>
        `${f.emoji} **${f.name}** — ${f.rarity} — 💰 ${formatNumber(f.price)} — 🌊 +${f.tokenReward} token`
      ).join('\n');

      const embed = new EmbedBuilder()
        .setColor('#00c9ff')
        .setTitle('🌊  ━━ POSEIDON\'S BLESSING ━━  🌊')
        .setDescription('```fix\n  EVENT SEDANG BERLANGSUNG!\n```')
        .addFields(
          {
            name: '⏳ Sisa Waktu',
            value: `\`\`\`\n  ${mins} menit ${secs} detik\n\`\`\``,
            inline: false,
          },
          {
            name: '✨ Bonus Aktif',
            value: '```ml\n' +
              `  Luck     : x${EVENT_CONFIG.bonuses.luckMultiplier}\n` +
              `  XP       : x${EVENT_CONFIG.bonuses.xpMultiplier}\n` +
              `  Coin     : x${EVENT_CONFIG.bonuses.coinMultiplier}\n` +
              `  Cooldown : ${EVENT_CONFIG.bonuses.fishCooldown} detik\n` +
              '```',
            inline: false,
          },
          {
            name: '🐟 Ikan Event Eksklusif',
            value: fishList,
            inline: false,
          },
          {
            name: '🌊 Poseidon Token Kamu',
            value: `\`${formatNumber(player.poseidonTokens || 0)} Token\``,
            inline: true,
          },
          {
            name: '📋 Command',
            value: '`&eventshop` — Buka toko event\n`&buyevent <item>` — Beli item\n`&open <chest>` — Buka chest',
            inline: false,
          },
        )
        .setFooter({ text: '∆NTRAX Fishing Universe • Event Mingguan — Setiap Sabtu 22:00 WITA' })
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    }

    // Event tidak aktif
    const nextEvent = getNextEventTime();
    let nextStr = 'Sabtu depan jam 22:00 WITA';
    if (nextEvent) {
      const diff = nextEvent.getTime() - Date.now();
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      nextStr = d > 0 ? `${d} hari ${h} jam ${m} menit` : `${h} jam ${m} menit`;
    }

    const fishList = EVENT_FISH.map(f =>
      `${f.emoji} **${f.name}** *(${f.rarity})* — 🌊 +${f.tokenReward} token`
    ).join('\n');

    const embed = new EmbedBuilder()
      .setColor('#2c3e50')
      .setTitle('🌙  Poseidon\'s Blessing')
      .setDescription('```\n  Event tidak sedang berlangsung.\n```')
      .addFields(
        {
          name: '⏰ Event Berikutnya',
          value: `\`\`\`\n  ${nextStr} lagi\n  Setiap Sabtu jam 22:00 WITA\n  Durasi: 30 menit\n\`\`\``,
          inline: false,
        },
        {
          name: '✨ Bonus saat Event',
          value: '```ml\n' +
            `  Luck     : x${EVENT_CONFIG.bonuses.luckMultiplier}\n` +
            `  XP       : x${EVENT_CONFIG.bonuses.xpMultiplier}\n` +
            `  Coin     : x${EVENT_CONFIG.bonuses.coinMultiplier}\n` +
            `  Cooldown : ${EVENT_CONFIG.bonuses.fishCooldown} detik\n` +
            '```',
          inline: false,
        },
        {
          name: '🐟 Ikan Eksklusif Event',
          value: fishList,
          inline: false,
        },
        {
          name: '🌊 Poseidon Token Kamu',
          value: `\`${formatNumber(player.poseidonTokens || 0)} Token\``,
          inline: true,
        },
      )
      .setFooter({ text: '∆NTRAX Fishing Universe • Hadir tiap Sabtu malam!' })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  
    } catch (error) {
      console.error('[Error] Command event:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' }).catch(() => {});
    }
  },
};
