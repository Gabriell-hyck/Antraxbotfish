const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { ENCHANTMENTS } = require('../utils/fishData');
const { errorEmbed, formatNumber } = require('../utils/helpers');

module.exports = {
  name: 'disenchant',
  aliases: ['disench', 'removeenchant'],
  description: 'Hapus enchant aktif dari rod kamu',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      const player = getPlayer(message.author.id);

      if (!player.activeEnchant) {
        return message.reply({ embeds: [errorEmbed('Rod kamu tidak memiliki enchant aktif!\nGunakan `&enchant` untuk memasang enchant.')] });
      }

      const removed = player.activeEnchant;
      const enchData = ENCHANTMENTS[removed];
      player.activeEnchant = null;
      savePlayer(player);

      const embed = new EmbedBuilder()
        .setColor('#e74c3c')
        .setTitle(`🗑️  Enchant Dilepas!`)
        .setDescription(
          `\`\`\`ml\nEnchant  : ${removed}\nLuck     : -${enchData?.luckBonus || 0}\nStatus   : Enchant dihapus dari rod\n\`\`\`\n> Rod kamu sekarang kosong dari enchant.\n> Gunakan \`&enchant <nama>\` untuk memasang enchant baru.`
        )
        .setFooter({ text: '∆NTRAX Fishing Universe' });

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command disenchant:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
