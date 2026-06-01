const { errorEmbed } = require('../utils/helpers');
const { isEventActive, EVENT_CONFIG } = require('../utils/eventManager');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    try {
      // Abaikan bot
      if (message.author.bot) return;

      // FIX: Abaikan DM — beberapa command butuh message.guild (crash di DM)
      if (!message.guild) return;

      if (!message.content.startsWith(client.config.prefix)) return;

      const args        = message.content.slice(client.config.prefix.length).trim().split(/\s+/);
      const commandName = args.shift().toLowerCase();
      const command     = client.commands.get(commandName);
      if (!command) return;

      // Cooldown
      if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Map());
      const now        = Date.now();
      const timestamps = client.cooldowns.get(command.name);

      let cooldownSec = command.cooldown || 3;
      if (command.name === 'fish' && isEventActive()) {
        cooldownSec = EVENT_CONFIG.bonuses.fishCooldown;
      }
      const cooldownMs = cooldownSec * 1000;

      if (timestamps.has(message.author.id)) {
        const expiresAt = timestamps.get(message.author.id) + cooldownMs;
        if (now < expiresAt) {
          const left = ((expiresAt - now) / 1000).toFixed(1);
          const eventTag = (command.name === 'fish' && isEventActive()) ? ' *(Event: cooldown dipercepat!)*' : '';
          return message.reply({ embeds: [errorEmbed(`⏳ Tunggu **${left}** detik sebelum \`${client.config.prefix}${command.name}\` lagi.${eventTag}`)] })
            .catch(() => {});
        }
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownMs);

      await command.execute(message, args, client);

    } catch (error) {
      console.error(`[Error] messageCreate — command error:`, error);
      try {
        await message.reply({ content: '❌ Terjadi kesalahan saat menjalankan perintah ini.' });
      } catch { /* channel mungkin tidak bisa dibalas */ }
    }
  },
};
