const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { EVENT_CHESTS, rollChestReward } = require('../utils/eventData');
const { FISH, ENCHANTMENTS, getXpForNextLevel } = require('../utils/fishData');
const { errorEmbed, formatNumber, RARITY_STYLE } = require('../utils/helpers');

const MAX_LEVEL = 700;

module.exports = {
  name: 'open',
  aliases: ['openchest'],
  description: 'Buka chest event',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      const player = getPlayer(message.author.id);

      if (!args[0]) {
        const owned = player.chests ? Object.entries(player.chests).filter(([,v]) => v > 0) : [];
        if (owned.length === 0) {
          return message.reply({ embeds: [errorEmbed('Kamu tidak punya chest apapun!\nBeli chest di `&eventshop` saat event aktif.')] });
        }
        const list = owned.map(([name, count]) => `${EVENT_CHESTS[name]?.emoji || '📦'} **${name}** ×${count}`).join('\n');
        return message.reply({ embeds: [
          new EmbedBuilder()
            .setColor('#00c9ff')
            .setTitle('📦  Chest Kamu')
            .setDescription(list + '\n\nGunakan `&open <nama chest>` untuk membuka.')
            .setFooter({ text: '∆NTRAX Fishing Universe' })
        ]});
      }

      const chestName = args.join(' ');
      const chestKey  = Object.keys(EVENT_CHESTS).find(k => k.toLowerCase() === chestName.toLowerCase());

      if (!chestKey) {
        return message.reply({ embeds: [errorEmbed(`Chest **${chestName}** tidak dikenal!\nChest tersedia: ${Object.keys(EVENT_CHESTS).join(', ')}`)] });
      }

      if (!player.chests || !player.chests[chestKey] || player.chests[chestKey] <= 0) {
        return message.reply({ embeds: [errorEmbed(`Kamu tidak punya **${chestKey}**!\nBeli dulu di \`&eventshop\` saat event aktif.`)] });
      }

      // Roll reward
      const reward = rollChestReward(chestKey, FISH, ENCHANTMENTS, {});
      const chest  = EVENT_CHESTS[chestKey];

      player.chests[chestKey] -= 1;

      let rewardDesc = '';
      let rewardColor = chest.color;

      if (reward.type === 'coins') {
        player.coins += reward.value;
        rewardDesc = `💰 **${formatNumber(reward.value)} Koin**`;
      } else if (reward.type === 'xp') {
        player.xp += reward.value;
        // Level up check
        while (player.xp >= getXpForNextLevel(player.level) && player.level < MAX_LEVEL) {
          player.xp -= getXpForNextLevel(player.level);
          player.level++;
        }
        rewardDesc = `⭐ **${formatNumber(reward.value)} XP**`;
      } else if (reward.type === 'token') {
        player.poseidonTokens = (player.poseidonTokens || 0) + reward.value;
        rewardDesc = `🌊 **${reward.value} Poseidon Token**`;
      } else if (reward.type === 'bait') {
        player.activeBait = reward.name;
        rewardDesc = `🪱 **${reward.name}** (langsung dipasang)`;
      } else if (reward.type === 'fish' && reward.fish) {
        const style = RARITY_STYLE[reward.fish.rarity] || RARITY_STYLE['Common'];
        const existing = player.inventory.find(f => f.id === reward.fish.id);
        if (existing) existing.count++;
        else player.inventory.push({ id: reward.fish.id, name: reward.fish.name, rarity: reward.fish.rarity, price: reward.fish.price, count: 1, emoji: reward.fish.emoji });
        rewardDesc = `${reward.fish.emoji} **${reward.fish.name}** *(${style.label})*`;
        rewardColor = style.color;
      } else if (reward.type === 'enchant' && reward.data) {
        // Inject ke ENCHANTMENTS jika enchant event
        ENCHANTMENTS[reward.name] = ENCHANTMENTS[reward.name] || reward.data;
        if (!player.activeEnchant) {
          player.activeEnchant = reward.name;
          rewardDesc = `✨ **${reward.name}** (langsung dipasang!)`;
        } else {
          rewardDesc = `✨ **${reward.name}** (simpan — rod sudah ada enchant, gunakan \`&disenchant\` dulu)`;
        }
      } else if (reward.type === 'rod' && reward.data) {
        if (!player.ownedEventRods) player.ownedEventRods = [];
        if (!player.ownedEventRods.includes(reward.name)) player.ownedEventRods.push(reward.name);
        rewardDesc = `🎣 **${reward.name}** *(rod event langka!)*`;
        rewardColor = '#00c9ff';
      } else {
        // Fallback
        player.coins += 1000;
        rewardDesc = `💰 **1.000 Koin** (fallback)`;
      }

      savePlayer(player);

      const embed = new EmbedBuilder()
        .setColor(rewardColor)
        .setTitle(`${chest.emoji}  Membuka ${chestKey}...`)
        .setDescription(
          `\`\`\`fix\n  ✨ KAMU MENDAPATKAN:\n\`\`\`\n` +
          `> ${rewardDesc}\n\n` +
          `\`\`\`ml\nSisa chest : ${player.chests[chestKey]}x\nToken      : ${formatNumber(player.poseidonTokens || 0)}\n\`\`\``
        )
        .setFooter({ text: '∆NTRAX Fishing Universe • Keberuntungan menyertaimu!' })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command open:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
