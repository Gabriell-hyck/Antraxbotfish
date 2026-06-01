const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { isEventActive } = require('../utils/eventManager');
const { EVENT_RODS, EVENT_BAITS, EVENT_ENCHANTS, EVENT_CHESTS } = require('../utils/eventData');
const { RODS, BAITS, ENCHANTMENTS } = require('../utils/fishData');
const { errorEmbed, successEmbed, formatNumber } = require('../utils/helpers');

module.exports = {
  name: 'buyevent',
  aliases: ['buye', 'beli-event'],
  description: 'Beli item dari toko event menggunakan Poseidon Token',
  cooldown: 3,
  async execute(message, args, client) {
    try {

      if (!isEventActive()) {
        return message.reply({ embeds: [errorEmbed('Event **Poseidon\'s Blessing** tidak aktif!\nGunakan `&event` untuk cek jadwal.')] });
      }
      if (!args[0]) {
        return message.reply({ embeds: [errorEmbed('Penggunaan: `&buyevent <nama item>`\nContoh: `&buyevent Poseidon Rod`\nLihat daftar: `&eventshop`')] });
      }

      const player = getPlayer(message.author.id);
      const tokens = player.poseidonTokens || 0;
      const input  = args.join(' ');

      // Cari di semua kategori
      const rodKey    = Object.keys(EVENT_RODS).find(k => k.toLowerCase() === input.toLowerCase());
      const baitKey   = Object.keys(EVENT_BAITS).find(k => k.toLowerCase() === input.toLowerCase());
      const enchKey   = Object.keys(EVENT_ENCHANTS).find(k => k.toLowerCase() === input.toLowerCase());
      const chestKey  = Object.keys(EVENT_CHESTS).find(k => k.toLowerCase() === input.toLowerCase());

      if (!rodKey && !baitKey && !enchKey && !chestKey) {
        return message.reply({ embeds: [errorEmbed(`Item **${input}** tidak ditemukan di toko event!\nGunakan \`&eventshop\` untuk lihat daftar.`)] });
      }

      // ── Beli Rod ──────────────────────────────────────────────
      if (rodKey) {
        const rod = EVENT_RODS[rodKey];
        if (tokens < rod.tokenPrice) {
          return message.reply({ embeds: [errorEmbed(`Token tidak cukup!\nDibutuhkan : \`${rod.tokenPrice} 🌊 Token\`\nTokenmu    : \`${tokens} 🌊 Token\``)] });
        }
        // Tambah ke RODS in-memory (rod event tidak dijual di shop biasa)
        if (!player.ownedEventRods) player.ownedEventRods = [];
        if (player.ownedEventRods.includes(rodKey)) {
          return message.reply({ embeds: [errorEmbed(`Kamu sudah memiliki **${rodKey}**!`)] });
        }
        player.poseidonTokens = tokens - rod.tokenPrice;
        player.ownedEventRods.push(rodKey);
        // Inject ke global RODS agar bisa dipakai di &buy
        RODS[rodKey] = rod;
        savePlayer(player);

        return message.reply({ embeds: [
          new EmbedBuilder()
            .setColor('#00c9ff')
            .setTitle(`${rod.emoji}  ${rodKey} Dibeli!`)
            .setDescription(`\`\`\`ml\nRod     : ${rodKey}\nLuck    : +${rod.luckBonus}\nBayar   : ${rod.tokenPrice} Token\nSisa    : ${player.poseidonTokens} Token\n\`\`\`\n> Gunakan \`&buy rod ${rodKey}\` untuk equip.`)
            .setFooter({ text: '∆NTRAX Fishing Universe' })
        ]});
      }

      // ── Beli Bait ─────────────────────────────────────────────
      if (baitKey) {
        const bait = EVENT_BAITS[baitKey];
        if (tokens < bait.tokenPrice) {
          return message.reply({ embeds: [errorEmbed(`Token tidak cukup!\nDibutuhkan : \`${bait.tokenPrice} 🌊 Token\`\nTokenmu    : \`${tokens} 🌊 Token\``)] });
        }
        player.poseidonTokens = tokens - bait.tokenPrice;
        // Inject bait ke BAITS global
        BAITS[baitKey] = bait;
        player.activeBait = baitKey;
        savePlayer(player);

        return message.reply({ embeds: [
          new EmbedBuilder()
            .setColor('#00c9ff')
            .setTitle(`${bait.emoji}  ${baitKey} Dibeli & Dipasang!`)
            .setDescription(`\`\`\`ml\nBait    : ${baitKey}\nLuck    : +${bait.luckBonus}\nBayar   : ${bait.tokenPrice} Token\nSisa    : ${player.poseidonTokens} Token\n\`\`\``)
            .setFooter({ text: '∆NTRAX Fishing Universe' })
        ]});
      }

      // ── Beli Enchant ──────────────────────────────────────────
      if (enchKey) {
        const ench = EVENT_ENCHANTS[enchKey];
        if (tokens < ench.tokenPrice) {
          return message.reply({ embeds: [errorEmbed(`Token tidak cukup!\nDibutuhkan : \`${ench.tokenPrice} 🌊 Token\`\nTokenmu    : \`${tokens} 🌊 Token\``)] });
        }
        if (player.activeEnchant) {
          return message.reply({ embeds: [errorEmbed(`Rod kamu sudah punya enchant: **${player.activeEnchant}**!\nGunakan \`&disenchant\` dulu sebelum membeli enchant baru.`)] });
        }
        player.poseidonTokens = tokens - ench.tokenPrice;
        ENCHANTMENTS[enchKey] = ench;
        player.activeEnchant = enchKey;
        savePlayer(player);

        return message.reply({ embeds: [
          new EmbedBuilder()
            .setColor('#9b59b6')
            .setTitle(`${ench.emoji}  ${enchKey} Dipasang!`)
            .setDescription(`\`\`\`ml\nEnchant : ${enchKey}\nLuck    : +${ench.luckBonus}\nBayar   : ${ench.tokenPrice} Token\nSisa    : ${player.poseidonTokens} Token\n\`\`\``)
            .setFooter({ text: '∆NTRAX Fishing Universe' })
        ]});
      }

      // ── Beli Chest ────────────────────────────────────────────
      if (chestKey) {
        const chest = EVENT_CHESTS[chestKey];
        if (tokens < chest.tokenPrice) {
          return message.reply({ embeds: [errorEmbed(`Token tidak cukup!\nDibutuhkan : \`${chest.tokenPrice} 🌊 Token\`\nTokenmu    : \`${tokens} 🌊 Token\``)] });
        }
        player.poseidonTokens = tokens - chest.tokenPrice;
        if (!player.chests) player.chests = {};
        player.chests[chestKey] = (player.chests[chestKey] || 0) + 1;
        savePlayer(player);

        return message.reply({ embeds: [
          new EmbedBuilder()
            .setColor(chest.color)
            .setTitle(`${chest.emoji}  ${chestKey} Dibeli!`)
            .setDescription(`\`\`\`ml\nChest   : ${chestKey}\nJumlah  : ${player.chests[chestKey]}x\nBayar   : ${chest.tokenPrice} Token\nSisa    : ${player.poseidonTokens} Token\n\`\`\`\n> Gunakan \`&open ${chestKey}\` untuk membuka!`)
            .setFooter({ text: '∆NTRAX Fishing Universe' })
        ]});
      }
    } catch (error) {
      console.error('[Error] Command buyevent:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
    },
};
