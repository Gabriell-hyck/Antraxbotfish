const { EmbedBuilder } = require('discord.js');
const { getPlayer } = require('../utils/database');
const { RODS, BAITS, ENCHANTMENTS, AREAS, getXpForNextLevel, MAX_LEVEL } = require('../utils/fishData');
const { formatNumber, buildXpBar, DIVIDER, RARITY_STYLE } = require('../utils/helpers');

module.exports = {
  name: 'profile',
  aliases: ['p', 'profil'],
  description: 'Lihat profil pemancing',
  cooldown: 3,
  async execute(message, args, client) {
    try {

    const target   = message.mentions.users.first() || message.author;
    const player   = getPlayer(target.id);

    const isMaxLevel = player.level >= MAX_LEVEL;
    const xpNeeded  = getXpForNextLevel(player.level);
    const xpBar     = isMaxLevel ? '▰▰▰▰▰▰▰▰▰▰▰▰  **MAX**' : buildXpBar(player.xp, xpNeeded);
    const rodData   = RODS[player.activeRod]  || RODS['Wooden Rod'];
    const baitData  = player.activeBait ? BAITS[player.activeBait] : null;
    const areaData  = AREAS[player.activeArea] || AREAS['Sungai'];
    const totalFish = player.inventory.reduce((s, f) => s + f.count, 0);
    const totalWorth = player.inventory.reduce((s, f) => s + f.price * f.count, 0);

    // Enchantment total luck
    const activeEnchant = player.activeEnchant;
    let enchLuck = 0;
    if (activeEnchant && ENCHANTMENTS[activeEnchant]) enchLuck = ENCHANTMENTS[activeEnchant].luckBonus;
    const enchList = activeEnchant && ENCHANTMENTS[activeEnchant]
      ? `${ENCHANTMENTS[activeEnchant].emoji} ${activeEnchant}  \`+${ENCHANTMENTS[activeEnchant].luckBonus} Luck\``
      : '`Belum ada enchantment`';

    const totalLuck = (rodData.luckBonus || 0) + (baitData?.rarityBonus || 0) + enchLuck + Math.floor((player.level-1)*0.5);

    const embed = new EmbedBuilder()
      .setColor('#00c9ff')
      .setAuthor({ name: `${target.username}  •  ∆NTRAX Fishing`, iconURL: target.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 256 }))
      .setDescription(
        `\`\`\`ansi\n\u001b[1;36m[ PEMANCING ] ${target.username}\u001b[0m\n\`\`\`` +
        `${DIVIDER}`
      )
      .addFields(
        {
          name: '📊  Level & Pengalaman',
          value: isMaxLevel
            ? `**Level ${player.level}** 👑 MAX\n${xpBar}`
            : `**Level ${player.level}**\n${xpBar}\n\`${formatNumber(player.xp)} / ${formatNumber(xpNeeded)} XP\``,
          inline: false,
        },
        { name: '💰  Koin',        value: `\`\`\`\n${formatNumber(player.coins)} 🪙\n\`\`\``, inline: true },
        { name: '🐟  Total Ikan',  value: `\`\`\`\n${formatNumber(totalFish)} ekor\n\`\`\``, inline: true },
        { name: '💹  Nilai Inv.',  value: `\`\`\`\n${formatNumber(totalWorth)} 🪙\n\`\`\``, inline: true },
        { name: '🗺️  Area',        value: `${areaData.emoji} **${player.activeArea}**\n\`${areaData.desc}\``, inline: true },
        { name: '🎣  Rod',         value: `${rodData.emoji} **${player.activeRod}**\n\`+${rodData.luckBonus} Luck\``, inline: true },
        { name: '🪱  Bait',        value: baitData ? `${baitData.emoji} **${player.activeBait}**\n\`+${baitData.rarityBonus} Rarity\`` : '`—`', inline: true },
        { name: `⚡  Total Luck  \`${totalLuck}\``, value: enchList, inline: false },
      )
      .setFooter({ text: '∆NTRAX Fishing Universe • &inventory untuk detail' })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  
    } catch (error) {
      console.error('[Error] Command profile:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' }).catch(() => {});
    }
  },
};
