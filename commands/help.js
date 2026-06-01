const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['h','bantuan','cmd'],
  description: 'Daftar perintah',
  cooldown: 3,
  async execute(message, args, client) {
    try {
      const embed = new EmbedBuilder()
        .setColor('#00c9ff')
        .setTitle('🎣  ∆NTRAX  —  Fishing Universe')
        .setDescription(
          `\`\`\`ansi\n\u001b[1;36m   ∆NTRAX FISHING BOT  v2.0\u001b[0m\n   62 Ikan  •  8 Rod  •  10 Enchantment\n\`\`\``
        )
        .setThumbnail(client.user.displayAvatarURL({ size: 256 }))
        .addFields(
          {
            name: '🎣  Memancing',
            value: [
              '`&fish`  —  Mulai memancing *(CD: 5 detik)*',
              '`&area`  —  Lihat peta area',
              '`&area <nama>`  —  Pindah area',
            ].join('\n'),
            inline: false,
          },
          {
            name: '🎒  Inventaris & Jual',
            value: [
              '`&inventory`  —  Lihat isi tas',
              '`&sell all`  —  Jual semua ikan',
              '`&sell <ikan>`  —  Jual ikan tertentu',
            ].join('\n'),
            inline: false,
          },
          {
            name: '🏪  Toko',
            value: [
              '`&shop`  —  Rod & bait',
              '`&buy <nama>`  —  Beli item',
              '`&enchant`  —  Toko enchantment',
              '`&enchant <nama>`  —  Beli enchantment',
            ].join('\n'),
            inline: false,
          },
          {
            name: '👤  Profil',
            value: [
              '`&profile`  —  Profil kamu',
              '`&profile @user`  —  Profil orang lain',
              '`&leaderboard`  —  Top pemain',
            ].join('\n'),
            inline: false,
          },
          {
            name: '🐠  Akuarium',
            value: [
              '`&aquarium` — lihat akuariummu',
              '`&aquarium @user` — lihat akuarium orang lain',
              '`&aquarium add <ikan>` — masukkan ikan ke akuarium',
              '`&aquarium remove <ikan>` — ambil ikan kembali ke inventory',
              '`&aquarium upgrade` — upgrade kapasitas akuarium',
            ].join('\n'),
            inline: false,
          },
          {
            name: '🔄  Trade',
            value: [
              '`&trade @user` — mulai trade dengan pemain lain',
              '`&trade offer <item>` — submit penawaranmu',
              '`&accept` — konfirmasi trade',
              '`&canceltrade` — batalkan trade',
            ].join('\n'),
            inline: false,
          },
          {
            // FIX: field ini sebelumnya tidak punya properti 'name' — penyebab MissingPropertyError
            name: '📅  Daily & Quest',
            value: [
              '`&daily`  —  Reward harian',
              '`&quest`  —  Lihat quest',
              '`&claimquest`  —  Klaim quest selesai',
            ].join('\n'),
            inline: false,
          },
          {
            name: '🗺️  Area (unlock per level)',
            value: '🏞️ Sungai `Lv1`  ▸  🏔️ Danau `Lv5`  ▸  🌊 Laut `Lv10`  ▸  🌑 Laut Dalam `Lv20`  ▸  🌌 Samudra `Lv35`',
            inline: false,
          },
          {
            name: '⭐  Rarity Tier',
            value: '▫️ Common  ▸  🔷 Rare  ▸  🔮 Epic  ▸  🌟 Legendary  ▸  💠 Mythic',
            inline: false,
          },
          {
            name: '🎣  Rod Tier  (8 joran)',
            value: '🪵 Wooden  ▸  ⚙️ Iron  ▸  ✨ Gold  ▸  💎 Diamond  ▸  🌟 Mythic  ▸  🌑 Shadow  ▸  🌌 Cosmic  ▸  🔱 Genesis',
            inline: false,
          },
        )
        .setFooter({ text: '∆NTRAX Fishing Universe • Prefix: &' })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('[Error] Command help:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
  },
};
