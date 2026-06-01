const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { errorEmbed, formatNumber } = require('../utils/helpers');

// ══════════════════════════════════════════════════════════════
// KONFIGURASI UPGRADE AKUARIUM
// Setiap tier menambah +10 slot kapasitas
// ══════════════════════════════════════════════════════════════
const AQUARIUM_UPGRADES = [
  { tier: 1, capacity: 20,  price: 0,           levelReq: 1,   label: 'Akuarium Dasar' },
  { tier: 2, capacity: 30,  price: 50000,        levelReq: 10,  label: 'Akuarium Kecil' },
  { tier: 3, capacity: 40,  price: 200000,       levelReq: 25,  label: 'Akuarium Sedang' },
  { tier: 4, capacity: 50,  price: 750000,       levelReq: 50,  label: 'Akuarium Besar' },
  { tier: 5, capacity: 65,  price: 2500000,      levelReq: 100, label: 'Akuarium Raksasa' },
  { tier: 6, capacity: 80,  price: 8000000,      levelReq: 200, label: 'Akuarium Legendaris' },
  { tier: 7, capacity: 100, price: 25000000,     levelReq: 350, label: 'Akuarium Mitik' },
  { tier: 8, capacity: 130, price: 100000000,    levelReq: 500, label: 'Akuarium Ilahi' },
  { tier: 9, capacity: 170, price: 500000000,    levelReq: 650, label: 'Akuarium Surgawi' },
];

const MAX_TIER = AQUARIUM_UPGRADES.length;

// ══════════════════════════════════════════════════════════════
// RARITY CONFIG
// ══════════════════════════════════════════════════════════════
const RARITY_STYLE = {
  Common:    { icon: '▫️',  color: '#7f8c8d' },
  Rare:      { icon: '🔷',  color: '#2980b9' },
  Epic:      { icon: '🔮',  color: '#8e44ad' },
  Exotic:    { icon: '🌿',  color: '#00b894' },
  Legendary: { icon: '🌟',  color: '#e67e22' },
  Mythic:    { icon: '💠',  color: '#e84393' },
  Divine:    { icon: '🌸',  color: '#f8c8ff' },
  Secret:    { icon: '〽️', color: '#ffffff' },
};

// ══════════════════════════════════════════════════════════════
// HELPER: ambil/init data akuarium dari player
// ══════════════════════════════════════════════════════════════
function getAquarium(player) {
  if (!player.aquarium) {
    player.aquarium = {
      tier: 1,
      fish: [],   // [{ id, name, rarity, price, emoji, addedAt }]
    };
  }
  return player.aquarium;
}

function getCapacity(tier) {
  return (AQUARIUM_UPGRADES.find(u => u.tier === tier) || AQUARIUM_UPGRADES[0]).capacity;
}

function getUpgradeInfo(tier) {
  return AQUARIUM_UPGRADES.find(u => u.tier === tier) || null;
}

// ══════════════════════════════════════════════════════════════
// HELPER: build embed utama akuarium
// ══════════════════════════════════════════════════════════════
function buildAquariumEmbed(player, target) {
  const aq       = getAquarium(player);
  const capacity = getCapacity(aq.tier);
  const used     = aq.fish.length;
  const tierInfo = getUpgradeInfo(aq.tier);

  // Grouping by rarity
  const RARITY_ORDER = ['Secret','Divine','Mythic','Legendary','Exotic','Epic','Rare','Common'];
  const groups = {};
  for (const f of aq.fish) {
    const r = f.rarity || 'Common';
    if (!groups[r]) groups[r] = [];
    groups[r].push(f);
  }

  // Bar kapasitas
  const barLen   = 20;
  const filled   = Math.round((used / capacity) * barLen);
  const capBar   = '▰'.repeat(filled) + '▱'.repeat(barLen - filled);
  const capColor = used >= capacity ? '#e74c3c' : used >= capacity * 0.8 ? '#f39c12' : '#2ed573';

  const embed = new EmbedBuilder()
    .setColor(capColor)
    .setTitle(`🐠  Akuarium  —  ${target.username}`)
    .setThumbnail(target.displayAvatarURL({ dynamic: true }))
    .setDescription(
      `> 🏷️ **${tierInfo.label}**  •  Tier ${aq.tier}/${MAX_TIER}\n` +
      `> \`${capBar}\`  \`${used}/${capacity} slot\`\n` +
      (used === 0 ? '\n```\nAkuarium masih kosong...\nGunakan &aquarium add <nama ikan>\n```' : '')
    );

  if (used > 0) {
    const fields = [];
    for (const rarity of RARITY_ORDER) {
      if (!groups[rarity]) continue;
      const style = RARITY_STYLE[rarity] || RARITY_STYLE['Common'];
      const lines = groups[rarity].map(f => `${f.emoji} **${f.name}**`).join('  •  ');
      fields.push({
        name: `${style.icon}  ${rarity}  (${groups[rarity].length})`,
        value: lines.length > 1024 ? lines.slice(0, 1020) + '…' : lines,
        inline: false,
      });
    }
    // Discord max 25 fields
    fields.slice(0, 22).forEach(f => embed.addFields(f));
  }

  // Info upgrade berikutnya
  const nextUpgrade = getUpgradeInfo(aq.tier + 1);
  if (nextUpgrade) {
    embed.addFields({
      name: '⬆️  Upgrade Berikutnya',
      value:
        `**${nextUpgrade.label}** — Tier ${nextUpgrade.tier}\n` +
        `┣ Kapasitas : \`${nextUpgrade.capacity} slot\`\n` +
        `┣ Harga     : \`${formatNumber(nextUpgrade.price)} 🪙\`\n` +
        `┗ Level req : \`Lv ${nextUpgrade.levelReq}\`\n` +
        `> Ketik \`&aquarium upgrade\` untuk upgrade`,
      inline: false,
    });
  } else {
    embed.addFields({ name: '👑  MAX TIER', value: '`Akuarium kamu sudah mencapai tier tertinggi!`', inline: false });
  }

  embed
    .addFields({
      name: '📋  Perintah',
      value:
        '`&aquarium add <nama ikan>` — masukkan ikan ke akuarium\n' +
        '`&aquarium remove <nama ikan>` — ambil ikan balik ke inventory\n' +
        '`&aquarium upgrade` — upgrade kapasitas akuarium',
      inline: false,
    })
    .setFooter({ text: '∆NTRAX Fishing Universe • Ikan di akuarium tidak bisa dijual' })
    .setTimestamp();

  return embed;
}

// ══════════════════════════════════════════════════════════════
// COMMAND EXPORT
// ══════════════════════════════════════════════════════════════
module.exports = {
  name: 'aquarium',
  aliases: ['aq', 'tank'],
  description: 'Lihat dan kelola akuarium ikanmu',
  cooldown: 3,

  async execute(message, args, client) {
    try {
    const sub = (args[0] || '').toLowerCase();

    // ── &aquarium [kosong / @mention] — tampilkan akuarium ────
    if (!sub || message.mentions.users.size > 0) {
      const target = message.mentions.users.first() || message.author;
      const player = getPlayer(target.id);
      getAquarium(player); // init jika belum ada
      savePlayer(player);
      return message.reply({ embeds: [buildAquariumEmbed(player, target)] });
    }

    // ── &aquarium add <nama ikan> ─────────────────────────────
    if (sub === 'add' || sub === 'masuk' || sub === 'simpan') {
      if (!args[1]) {
        return message.reply({ embeds: [errorEmbed('Format: `&aquarium add <nama ikan>`\nContoh: `&aquarium add Salmon`')] });
      }

      const player   = getPlayer(message.author.id);
      const aq       = getAquarium(player);
      const capacity = getCapacity(aq.tier);

      if (aq.fish.length >= capacity) {
        return message.reply({ embeds: [errorEmbed(
          `Akuarium penuh! (${aq.fish.length}/${capacity} slot)\n` +
          `Upgrade dengan \`&aquarium upgrade\` atau ambil ikan dulu dengan \`&aquarium remove <nama>\`.`
        )] });
      }

      const fishName = args.slice(1).join(' ').toLowerCase();
      const invFish  = player.inventory.find(f => f.name.toLowerCase() === fishName);

      if (!invFish) {
        return message.reply({ embeds: [errorEmbed(`Ikan **${args.slice(1).join(' ')}** tidak ada di inventarismu!\nCek dengan \`&inventory\`.`)] });
      }

      // Cek apakah ikan ini sudah ada di akuarium (cukup 1 per jenis)
      const alreadyIn = aq.fish.find(f => f.id === invFish.id);
      if (alreadyIn) {
        return message.reply({ embeds: [errorEmbed(`**${invFish.name}** sudah ada di akuarium!\nSetiap jenis ikan hanya bisa disimpan 1 ekor di akuarium.`)] });
      }

      // Kurangi 1 dari inventory
      invFish.count -= 1;
      if (invFish.count <= 0) player.inventory = player.inventory.filter(f => f.id !== invFish.id);

      // Masukkan ke akuarium
      aq.fish.push({
        id:      invFish.id,
        name:    invFish.name,
        rarity:  invFish.rarity,
        price:   invFish.price,
        emoji:   invFish.emoji,
        addedAt: Date.now(),
      });

      savePlayer(player);

      const style = RARITY_STYLE[invFish.rarity] || RARITY_STYLE['Common'];
      return message.reply({ embeds: [
        new EmbedBuilder()
          .setColor(style.color)
          .setTitle(`${invFish.emoji}  Masuk ke Akuarium!`)
          .setDescription(
            `\`\`\`ml\nIkan    : ${invFish.name}\nRarity  : ${invFish.rarity}\nSlot    : ${aq.fish.length}/${getCapacity(aq.tier)}\n\`\`\`\n` +
            `> Gunakan \`&aquarium remove ${invFish.name}\` untuk mengambilnya kembali.`
          )
          .setFooter({ text: '∆NTRAX Fishing Universe' })
      ]});
    }

    // ── &aquarium remove <nama ikan> ──────────────────────────
    if (sub === 'remove' || sub === 'ambil' || sub === 'keluar') {
      if (!args[1]) {
        return message.reply({ embeds: [errorEmbed('Format: `&aquarium remove <nama ikan>`\nContoh: `&aquarium remove Salmon`')] });
      }

      const player  = getPlayer(message.author.id);
      const aq      = getAquarium(player);
      const fishName = args.slice(1).join(' ').toLowerCase();
      const idx      = aq.fish.findIndex(f => f.name.toLowerCase() === fishName);

      if (idx === -1) {
        return message.reply({ embeds: [errorEmbed(`**${args.slice(1).join(' ')}** tidak ada di akuariummu!\nCek dengan \`&aquarium\`.`)] });
      }

      const fish = aq.fish[idx];
      aq.fish.splice(idx, 1);

      // Kembalikan ke inventory
      const existing = player.inventory.find(i => i.id === fish.id);
      if (existing) existing.count += 1;
      else player.inventory.push({ id: fish.id, name: fish.name, rarity: fish.rarity, price: fish.price, count: 1, emoji: fish.emoji });

      savePlayer(player);

      const style = RARITY_STYLE[fish.rarity] || RARITY_STYLE['Common'];
      return message.reply({ embeds: [
        new EmbedBuilder()
          .setColor(style.color)
          .setTitle(`${fish.emoji}  Ikan Diambil dari Akuarium`)
          .setDescription(
            `\`\`\`ml\nIkan    : ${fish.name}\nRarity  : ${fish.rarity}\nStatus  : Kembali ke inventory\n\`\`\`\n` +
            `> Cek inventarismu dengan \`&inventory\`.`
          )
          .setFooter({ text: '∆NTRAX Fishing Universe' })
      ]});
    }

    // ── &aquarium upgrade ─────────────────────────────────────
    if (sub === 'upgrade' || sub === 'up') {
      const player   = getPlayer(message.author.id);
      const aq       = getAquarium(player);
      const nextTier = aq.tier + 1;
      const next     = getUpgradeInfo(nextTier);

      if (!next) {
        return message.reply({ embeds: [errorEmbed('Akuariummu sudah **MAX TIER**! Tidak ada upgrade lagi.')] });
      }

      if (player.level < next.levelReq) {
        return message.reply({ embeds: [errorEmbed(
          `Level tidak cukup untuk upgrade!\n` +
          `Dibutuhkan : \`Level ${next.levelReq}\`\n` +
          `Level kamu : \`Level ${player.level}\``
        )] });
      }

      if (player.coins < next.price) {
        return message.reply({ embeds: [errorEmbed(
          `Koin tidak cukup!\n` +
          `Dibutuhkan : \`${formatNumber(next.price)} 🪙\`\n` +
          `Koinmu     : \`${formatNumber(player.coins)} 🪙\``
        )] });
      }

      // Konfirmasi upgrade
      const currInfo = getUpgradeInfo(aq.tier);
      const confirmEmbed = new EmbedBuilder()
        .setColor('#f39c12')
        .setTitle('⬆️  Konfirmasi Upgrade Akuarium')
        .setDescription(
          `\`\`\`ml\n` +
          `Sekarang  : ${currInfo.label} (${getCapacity(aq.tier)} slot)\n` +
          `Upgrade   : ${next.label} (${next.capacity} slot)\n` +
          `Harga     : ${formatNumber(next.price)} koin\n` +
          `Sisa      : ${formatNumber(player.coins - next.price)} koin\n` +
          `\`\`\`\n` +
          `> Ketik \`&aquarium upgrade confirm\` untuk lanjut.`
        )
        .setFooter({ text: '∆NTRAX Fishing Universe' });

      return message.reply({ embeds: [confirmEmbed] });
    }

    // ── &aquarium upgrade confirm ─────────────────────────────
    if (sub === 'upgrade' && args[1]?.toLowerCase() === 'confirm' ||
        sub === 'upgradeconfirm' || sub === 'up' && args[1]?.toLowerCase() === 'confirm') {
      // Ditangani di bawah lewat re-check — sebenarnya kita butuh tangkap args[1]
    }

    if ((sub === 'upgrade' || sub === 'up') && (args[1] || '').toLowerCase() === 'confirm') {
      const player   = getPlayer(message.author.id);
      const aq       = getAquarium(player);
      const nextTier = aq.tier + 1;
      const next     = getUpgradeInfo(nextTier);

      if (!next) return message.reply({ embeds: [errorEmbed('Akuariummu sudah MAX TIER!')] });
      if (player.level < next.levelReq) return message.reply({ embeds: [errorEmbed(`Butuh Level ${next.levelReq}!`)] });
      if (player.coins < next.price)    return message.reply({ embeds: [errorEmbed(`Koin tidak cukup! Butuh ${formatNumber(next.price)} 🪙`)] });

      player.coins -= next.price;
      aq.tier       = nextTier;
      savePlayer(player);

      return message.reply({ embeds: [
        new EmbedBuilder()
          .setColor('#2ed573')
          .setTitle('🎉  Akuarium Di-upgrade!')
          .setDescription(
            `\`\`\`fix\n` +
            `${next.label} — Tier ${nextTier}\n` +
            `Kapasitas : ${next.capacity} slot\n` +
            `Dikurangi : ${formatNumber(next.price)} koin\n` +
            `Sisa      : ${formatNumber(player.coins)} koin\n` +
            `\`\`\``
          )
          .setFooter({ text: '∆NTRAX Fishing Universe' })
          .setTimestamp()
      ]});
    }

    // ── Fallback: sub tidak dikenal ───────────────────────────
    return message.reply({ embeds: [errorEmbed(
      'Sub-perintah tidak dikenal!\n\n' +
      '`&aquarium` — lihat akuarium\n' +
      '`&aquarium @user` — lihat akuarium orang lain\n' +
      '`&aquarium add <ikan>` — masukkan ikan\n' +
      '`&aquarium remove <ikan>` — ambil ikan kembali\n' +
      '`&aquarium upgrade` — upgrade kapasitas\n' +
      '`&aquarium upgrade confirm` — konfirmasi upgrade'
    )] });
    } catch (error) {
      console.error('[Error] Command aquarium:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
  },
};
