// ══════════════════════════════════════════════════════════════
// ADMIN COMMAND — Perintah khusus admin & owner
// Hanya bisa digunakan oleh username yang terdaftar di config.json
//
// Cara set admin:
//   Di config.json → "adminUsers": ["UsernameKamu"]
//   Untuk owner    → "ownerId": "UsernameOwner"
//
// Sub-commands:
//   &admin info               — status bot & statistik
//   &admin give @user <coins> — beri koin ke player
//   &admin setlevel @user <n> — set level player
//   &admin addfish @user <ikan> <jumlah> — tambah ikan ke inventory
//   &admin reset @user        — reset data player (owner only)
//   &admin deletedata @user   — hapus total data player (owner only)
//   &admin broadcast <pesan>  — kirim pesan ke channel saat ini
//   &admin event start/stop   — paksa mulai/hentikan event
//   &admin listadmins         — lihat daftar admin
// ══════════════════════════════════════════════════════════════

const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer, getAllPlayers, deletePlayer } = require('../utils/database');
const { isAdmin, isOwner, requireAdmin, requireOwner } = require('../utils/adminGuard');
const { FISH, getXpForNextLevel, MAX_LEVEL } = require('../utils/fishData');
const { formatNumber } = require('../utils/helpers');
const { isEventActive } = require('../utils/eventManager');

// Import eventManager state directly untuk force start/stop
const eventManager = require('../utils/eventManager');

module.exports = {
  name: 'admin',
  aliases: ['adm', 'op'],
  description: 'Perintah admin bot (hanya untuk admin terdaftar)',
  cooldown: 1,

  async execute(message, args, client) {
    try {
      // ── Cek akses admin ──────────────────────────────────
      if (!await requireAdmin(message)) return;

      const sub = (args[0] || '').toLowerCase();

      // ══════════════════════════════════════════════════
      // &admin / &admin help — daftar perintah admin
      // ══════════════════════════════════════════════════
      if (!sub || sub === 'help') {
        const ownerOnly = isOwner(message) ? '' : '\n*(⚠️ beberapa perintah hanya owner)*';
        const embed = new EmbedBuilder()
          .setColor('#e74c3c')
          .setTitle('🔧  ∆NTRAX  —  Panel Admin')
          .setDescription(
            `\`\`\`ansi\n\u001b[1;31m  ADMIN PANEL — Akses Terbatas\u001b[0m\n\`\`\`` +
            `> 👤 Login sebagai: **${message.author.username}** ${isOwner(message) ? '👑 *(Owner)*' : '🛡️ *(Admin)*'}` +
            ownerOnly
          )
          .addFields(
            {
              name: '📊  Info & Monitoring',
              value:
                '`&admin info` — statistik bot & database\n' +
                '`&admin listadmins` — daftar admin terdaftar',
              inline: false,
            },
            {
              name: '👤  Manajemen Player',
              value:
                '`&admin give @user <jumlah>` — beri koin\n' +
                '`&admin take @user <jumlah>` — kurangi koin\n' +
                '`&admin setlevel @user <level>` — set level\n' +
                '`&admin addfish @user <nama ikan> [jumlah]` — tambah ikan\n' +
                '`&admin viewplayer @user` — lihat data mentah player',
              inline: false,
            },
            {
              name: '🎮  Manajemen Event',
              value:
                '`&admin event start` — paksa mulai event\n' +
                '`&admin event stop` — paksa hentikan event\n' +
                '`&admin event status` — cek status event',
              inline: false,
            },
            {
              name: '📢  Siaran',
              value: '`&admin broadcast <pesan>` — kirim pesan ke channel ini',
              inline: false,
            },
            {
              name: '⚠️  Danger Zone (Owner Only)',
              value:
                '`&admin reset @user` — reset koin, XP, level player\n' +
                '`&admin deletedata @user` — hapus SELURUH data player',
              inline: false,
            },
          )
          .setFooter({ text: '∆NTRAX Admin Panel • Gunakan dengan bijak' })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      // ══════════════════════════════════════════════════
      // &admin info — statistik bot
      // ══════════════════════════════════════════════════
      if (sub === 'info' || sub === 'status') {
        const all     = getAllPlayers();
        const players = Object.values(all);
        const totalFish   = players.reduce((s, p) => s + (p.totalFishCaught || 0), 0);
        const totalCoins  = players.reduce((s, p) => s + (p.coins || 0), 0);
        const topLevel    = players.reduce((max, p) => p.level > max ? p.level : max, 0);
        const uptime      = process.uptime();
        const uptimeStr   = `${Math.floor(uptime/3600)}j ${Math.floor((uptime%3600)/60)}m ${Math.floor(uptime%60)}d`;
        const memUsage    = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);

        const embed = new EmbedBuilder()
          .setColor('#e74c3c')
          .setTitle('📊  ∆NTRAX  —  Status Bot')
          .addFields(
            { name: '🤖 Bot',        value: `\`${client.user.tag}\``, inline: true },
            { name: '🌐 Server',     value: `\`${client.guilds.cache.size} guild\``, inline: true },
            { name: '⏱️ Uptime',     value: `\`${uptimeStr}\``, inline: true },
            { name: '💾 Memory',     value: `\`${memUsage} MB\``, inline: true },
            { name: '📡 Ping',       value: `\`${client.ws.ping}ms\``, inline: true },
            { name: '🎮 Event',      value: `\`${isEventActive() ? '🟢 AKTIF' : '🔴 Tidak aktif'}\``, inline: true },
            { name: '👥 Total Player', value: `\`${players.length}\``, inline: true },
            { name: '🎣 Total Tangkapan', value: `\`${formatNumber(totalFish)}\``, inline: true },
            { name: '💰 Total Koin (semua player)', value: `\`${formatNumber(totalCoins)} 🪙\``, inline: true },
            { name: '🏆 Level Tertinggi', value: `\`Level ${topLevel}\``, inline: true },
            { name: '📋 Commands', value: `\`${client.commands.size} loaded\``, inline: true },
            { name: '🔧 Node.js', value: `\`${process.version}\``, inline: true },
          )
          .setFooter({ text: `∆NTRAX Admin Panel • ${message.author.username}` })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      // ══════════════════════════════════════════════════
      // &admin listadmins — tampilkan daftar admin
      // ══════════════════════════════════════════════════
      if (sub === 'listadmins' || sub === 'admins') {
        const owner  = client.config.ownerId || '*(tidak diset)*';
        const admins = client.config.adminUsers || [];

        const embed = new EmbedBuilder()
          .setColor('#e74c3c')
          .setTitle('👥  Daftar Admin ∆NTRAX')
          .addFields(
            { name: '👑 Owner', value: `\`${owner}\``, inline: false },
            {
              name: '🛡️ Admin',
              value: admins.length > 0
                ? admins.map(a => `\`${a}\``).join('\n')
                : '*(belum ada admin selain owner)*',
              inline: false,
            },
            {
              name: '⚙️ Cara tambah admin',
              value: 'Edit `config.json` → array `adminUsers`\nContoh:\n```json\n"adminUsers": ["username1", "username2"]\n```',
              inline: false,
            },
          )
          .setFooter({ text: '∆NTRAX Admin Panel' })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      // ══════════════════════════════════════════════════
      // &admin give @user <jumlah> — beri koin
      // ══════════════════════════════════════════════════
      if (sub === 'give') {
        const target = message.mentions.users.first();
        if (!target) return message.reply({ content: '❌ Tag user target!\nContoh: `&admin give @user 10000`' });

        const amount = parseInt(args[2]);
        if (!amount || amount <= 0 || isNaN(amount))
          return message.reply({ content: '❌ Jumlah koin tidak valid!\nContoh: `&admin give @user 10000`' });

        const player = getPlayer(target.id);
        player.coins += amount;
        savePlayer(player);

        const embed = new EmbedBuilder()
          .setColor('#2ed573')
          .setTitle('✅  Koin Diberikan')
          .setDescription(`💰 **${formatNumber(amount)} koin** diberikan ke **${target.username}**`)
          .addFields(
            { name: 'Saldo Baru', value: `\`${formatNumber(player.coins)} 🪙\``, inline: true },
            { name: 'Oleh Admin', value: `\`${message.author.username}\``, inline: true },
          )
          .setFooter({ text: '∆NTRAX Admin Panel' })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      // ══════════════════════════════════════════════════
      // &admin take @user <jumlah> — kurangi koin
      // ══════════════════════════════════════════════════
      if (sub === 'take') {
        const target = message.mentions.users.first();
        if (!target) return message.reply({ content: '❌ Tag user target!' });

        const amount = parseInt(args[2]);
        if (!amount || amount <= 0 || isNaN(amount))
          return message.reply({ content: '❌ Jumlah tidak valid!' });

        const player  = getPlayer(target.id);
        const before  = player.coins;
        player.coins  = Math.max(0, player.coins - amount);
        const taken   = before - player.coins;
        savePlayer(player);

        const embed = new EmbedBuilder()
          .setColor('#e74c3c')
          .setTitle('✅  Koin Dikurangi')
          .setDescription(`💸 **${formatNumber(taken)} koin** dikurangi dari **${target.username}**`)
          .addFields(
            { name: 'Saldo Baru', value: `\`${formatNumber(player.coins)} 🪙\``, inline: true },
            { name: 'Oleh Admin', value: `\`${message.author.username}\``, inline: true },
          )
          .setFooter({ text: '∆NTRAX Admin Panel' })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      // ══════════════════════════════════════════════════
      // &admin setlevel @user <level>
      // ══════════════════════════════════════════════════
      if (sub === 'setlevel') {
        const target = message.mentions.users.first();
        if (!target) return message.reply({ content: '❌ Tag user target!' });

        const level = parseInt(args[2]);
        const maxLv = MAX_LEVEL || 700;
        if (!level || level < 1 || level > maxLv || isNaN(level))
          return message.reply({ content: `❌ Level tidak valid! Harus antara 1–${maxLv}` });

        const player    = getPlayer(target.id);
        const oldLevel  = player.level;
        player.level    = level;
        player.xp       = 0;
        savePlayer(player);

        const embed = new EmbedBuilder()
          .setColor('#9b59b6')
          .setTitle('✅  Level Di-set')
          .setDescription(`📊 Level **${target.username}** diubah: \`${oldLevel}\` → \`${level}\``)
          .addFields({ name: 'Oleh Admin', value: `\`${message.author.username}\``, inline: true })
          .setFooter({ text: '∆NTRAX Admin Panel' })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      // ══════════════════════════════════════════════════
      // &admin addfish @user <nama ikan> [jumlah]
      // ══════════════════════════════════════════════════
      if (sub === 'addfish') {
        const target = message.mentions.users.first();
        if (!target) return message.reply({ content: '❌ Tag user target!\nContoh: `&admin addfish @user Salmon 5`' });

        // args: [addfish, @mention, ...fishName, optional count]
        const remainArgs = args.slice(2);
        if (!remainArgs.length) return message.reply({ content: '❌ Tulis nama ikan!\nContoh: `&admin addfish @user Salmon 5`' });

        // Cek apakah arg terakhir adalah angka (jumlah)
        const lastArg = remainArgs[remainArgs.length - 1];
        let count     = 1;
        let nameParts = remainArgs;
        if (/^\d+$/.test(lastArg)) {
          count     = Math.min(parseInt(lastArg), 9999);
          nameParts = remainArgs.slice(0, -1);
        }

        const fishName = nameParts.join(' ').toLowerCase();
        const fishData = FISH.find(f => f.name.toLowerCase() === fishName);

        if (!fishData)
          return message.reply({ content: `❌ Ikan **${nameParts.join(' ')}** tidak ditemukan di database!` });

        const player   = getPlayer(target.id);
        const existing = player.inventory.find(f => f.id === fishData.id);
        if (existing) existing.count += count;
        else player.inventory.push({
          id: fishData.id, name: fishData.name, rarity: fishData.rarity,
          price: fishData.price, count, emoji: fishData.emoji,
        });
        savePlayer(player);

        const embed = new EmbedBuilder()
          .setColor('#2ed573')
          .setTitle('✅  Ikan Ditambahkan')
          .setDescription(`${fishData.emoji} **${fishData.name}** ×${count} ditambahkan ke inventory **${target.username}**`)
          .addFields(
            { name: 'Rarity', value: `\`${fishData.rarity}\``, inline: true },
            { name: 'Harga',  value: `\`${formatNumber(fishData.price)} 🪙\``, inline: true },
            { name: 'Admin',  value: `\`${message.author.username}\``, inline: true },
          )
          .setFooter({ text: '∆NTRAX Admin Panel' })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      // ══════════════════════════════════════════════════
      // &admin viewplayer @user — lihat data player
      // ══════════════════════════════════════════════════
      if (sub === 'viewplayer' || sub === 'view') {
        const target = message.mentions.users.first();
        if (!target) return message.reply({ content: '❌ Tag user!' });

        const player   = getPlayer(target.id);
        const invCount = player.inventory.reduce((s, f) => s + f.count, 0);
        const invWorth = player.inventory.reduce((s, f) => s + f.price * f.count, 0);

        const embed = new EmbedBuilder()
          .setColor('#00c9ff')
          .setTitle(`🔍  Data Player — ${target.username}`)
          .addFields(
            { name: 'User ID',        value: `\`${player.userId}\``,                     inline: true },
            { name: 'Level',          value: `\`${player.level}\``,                      inline: true },
            { name: 'XP',             value: `\`${formatNumber(player.xp)}\``,           inline: true },
            { name: 'Koin',           value: `\`${formatNumber(player.coins)} 🪙\``,     inline: true },
            { name: 'Total Tangkap',  value: `\`${formatNumber(player.totalFishCaught || 0)}\``, inline: true },
            { name: 'Inv (ekor)',     value: `\`${formatNumber(invCount)}\``,             inline: true },
            { name: 'Nilai Inv',      value: `\`${formatNumber(invWorth)} 🪙\``,         inline: true },
            { name: 'Rod',            value: `\`${player.activeRod}\``,                  inline: true },
            { name: 'Area',           value: `\`${player.activeArea}\``,                 inline: true },
            { name: 'Enchant',        value: `\`${player.activeEnchant || '—'}\``,       inline: true },
            { name: 'Tokens',         value: `\`${player.poseidonTokens || 0} 🌊\``,    inline: true },
            { name: 'Last Daily',     value: player.lastDaily ? `<t:${Math.floor(player.lastDaily/1000)}:R>` : '`Belum pernah`', inline: true },
          )
          .setFooter({ text: '∆NTRAX Admin Panel' })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      // ══════════════════════════════════════════════════
      // &admin broadcast <pesan>
      // ══════════════════════════════════════════════════
      if (sub === 'broadcast' || sub === 'bc') {
        const text = args.slice(1).join(' ');
        if (!text) return message.reply({ content: '❌ Tulis pesan!\nContoh: `&admin broadcast Maintenance sebentar lagi!`' });

        const embed = new EmbedBuilder()
          .setColor('#e74c3c')
          .setTitle('📢  Pengumuman dari Admin')
          .setDescription(text)
          .setFooter({ text: `Dikirim oleh: ${message.author.username} • ∆NTRAX Fishing Universe` })
          .setTimestamp();

        await message.channel.send({ content: '@everyone', embeds: [embed] });
        return message.reply({ content: '✅ Pesan terkirim.' });
      }

      // ══════════════════════════════════════════════════
      // &admin event start/stop/status
      // ══════════════════════════════════════════════════
      if (sub === 'event') {
        const action = (args[1] || '').toLowerCase();

        if (action === 'start') {
          if (isEventActive())
            return message.reply({ content: '⚠️ Event sudah aktif!' });

          // Force start event
          const state = eventManager.getEventState
            ? { active: true, startedAt: Date.now(), endsAt: Date.now() + 30 * 60 * 1000 }
            : null;

          // Akses langsung state object via module ref
          const em = require('../utils/eventManager');
          // eventState is module-internal, jadi kita manipulate via private field jika bisa
          // Fallback: kirim info saja
          return message.reply({
            content: '⚠️ Force-start event hanya bisa dilakukan via server restart atau scheduler.\nGunakan `&event` untuk cek status.',
          });
        }

        if (action === 'status') {
          const active = isEventActive();
          return message.reply({
            embeds: [new EmbedBuilder()
              .setColor(active ? '#00c9ff' : '#636e72')
              .setTitle('🎮 Status Event')
              .setDescription(active ? '🟢 **Event AKTIF**' : '🔴 **Event tidak aktif**')
              .setFooter({ text: '∆NTRAX Admin Panel' })
            ]
          });
        }

        return message.reply({ content: 'Sub-command event: `start` `stop` `status`' });
      }

      // ══════════════════════════════════════════════════
      // &admin reset @user — OWNER ONLY
      // ══════════════════════════════════════════════════
      if (sub === 'reset') {
        if (!await requireOwner(message)) return;

        const target = message.mentions.users.first();
        if (!target) return message.reply({ content: '❌ Tag user!' });

        // Konfirmasi diperlukan
        const confirmPhrase = args[2];
        if (confirmPhrase !== 'CONFIRM') {
          return message.reply({
            content: `⚠️ **PERINGATAN!** Ini akan mereset koin, XP, dan level **${target.username}**!\n` +
                     `Ketik \`&admin reset @${target.username} CONFIRM\` untuk konfirmasi.`,
          });
        }

        const player     = getPlayer(target.id);
        player.coins     = 0;
        player.xp        = 0;
        player.level     = 1;
        player.inventory = [];
        player.activeRod = 'Wooden Rod';
        player.activeBait = null;
        player.activeEnchant = null;
        player.totalFishCaught = 0;
        player.poseidonTokens  = 0;
        player.chests    = {};
        savePlayer(player);

        const embed = new EmbedBuilder()
          .setColor('#e74c3c')
          .setTitle('🔄  Player Di-reset')
          .setDescription(`Data **${target.username}** telah direset ke kondisi awal.`)
          .addFields({ name: 'Oleh Owner', value: `\`${message.author.username}\``, inline: true })
          .setFooter({ text: '∆NTRAX Admin Panel' })
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      // ══════════════════════════════════════════════════
      // &admin deletedata @user — OWNER ONLY
      // ══════════════════════════════════════════════════
      if (sub === 'deletedata' || sub === 'delete') {
        if (!await requireOwner(message)) return;

        const target = message.mentions.users.first();
        if (!target) return message.reply({ content: '❌ Tag user!' });

        const confirmPhrase = args[2];
        if (confirmPhrase !== 'CONFIRM') {
          return message.reply({
            content: `⚠️ **BAHAYA!** Ini akan menghapus SELURUH data **${target.username}** secara permanen!\n` +
                     `Ketik \`&admin deletedata @${target.username} CONFIRM\` untuk konfirmasi.`,
          });
        }

        const deleted = deletePlayer(target.id);

        return message.reply({
          content: deleted
            ? `✅ Data **${target.username}** berhasil dihapus permanen.`
            : `❌ Data **${target.username}** tidak ditemukan di database.`,
        });
      }

      // ── Sub-command tidak dikenal ──────────────────────
      return message.reply({
        content: `❌ Sub-command \`${sub}\` tidak dikenal!\nGunakan \`&admin help\` untuk daftar perintah.`,
      });

    } catch (error) {
      console.error('[Error] Command admin:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command admin.' });
    }
  },
};
