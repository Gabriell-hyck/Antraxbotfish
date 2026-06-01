const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { RODS, BAITS } = require('../utils/fishData');
const { errorEmbed, formatNumber } = require('../utils/helpers');

// ── In-memory trade sessions ───────────────────────────────────
// Map key: initiatorId  →  trade session object
const activeTrades = new Map();

// Cooldown tracker: userId → timestamp last trade selesai/batal
const tradeCooldowns = new Map();

const TRADE_TIMEOUT   = 60000;  // 60 detik untuk accept
const TRADE_COOLDOWN  = 60000;  // 1 menit cooldown setelah trade

// ══════════════════════════════════════════════════════════════
// HELPER: parse offer string
// Format: "2 Salmon, 1000 koin, Iron Rod, Worm"
// Mengembalikan: { fish: [{name, count}], coins: 0, rods: [], baits: [] }
// ══════════════════════════════════════════════════════════════
function parseOffer(offerStr, player) {
  const result = { fish: [], coins: 0, rods: [], baits: [] };
  const errors = [];

  const parts = offerStr.split(',').map(s => s.trim()).filter(Boolean);

  for (const part of parts) {
    // Cek apakah koin: "1000 koin" / "1000 coin" / "koin 1000"
    const koinMatch = part.match(/^(\d+)\s*(koin|coin|🪙)$/i)
                   || part.match(/^(koin|coin|🪙)\s*(\d+)$/i);
    if (koinMatch) {
      result.coins += parseInt(koinMatch[1] || koinMatch[2]);
      continue;
    }

    // Cek format "angka nama" misal "2 Salmon"
    const countMatch = part.match(/^(\d+)\s+(.+)$/);
    const count = countMatch ? parseInt(countMatch[1]) : 1;
    const name  = countMatch ? countMatch[2].trim() : part.trim();

    // Cek apakah rod
    const rodKey = Object.keys(RODS).find(r => r.toLowerCase() === name.toLowerCase());
    if (rodKey) {
      result.rods.push(rodKey);
      continue;
    }

    // Cek apakah bait
    const baitKey = Object.keys(BAITS).find(b => b.toLowerCase() === name.toLowerCase());
    if (baitKey) {
      result.baits.push(baitKey);
      continue;
    }

    // Cek apakah ikan di inventory
    const fishItem = player.inventory.find(f => f.name.toLowerCase() === name.toLowerCase());
    if (fishItem) {
      result.fish.push({ id: fishItem.id, name: fishItem.name, count, emoji: fishItem.emoji, price: fishItem.price, rarity: fishItem.rarity });
      continue;
    }

    errors.push(name);
  }

  return { result, errors };
}

// ══════════════════════════════════════════════════════════════
// HELPER: validasi apakah player punya semua offer
// ══════════════════════════════════════════════════════════════
function validateOffer(offer, player) {
  const issues = [];

  if (offer.coins > 0 && player.coins < offer.coins) {
    issues.push(`Koin tidak cukup (punya: ${formatNumber(player.coins)}, butuh: ${formatNumber(offer.coins)})`);
  }

  for (const f of offer.fish) {
    const inv = player.inventory.find(i => i.id === f.id);
    if (!inv || inv.count < f.count) {
      issues.push(`Ikan **${f.name}** tidak cukup (punya: ${inv?.count || 0}, butuh: ${f.count})`);
    }
    if (inv?.oneTime) {
      issues.push(`**${f.name}** adalah ikan sekali tangkap dan tidak bisa diperdagangkan!`);
    }
  }

  for (const rod of offer.rods) {
    if (player.activeRod !== rod) {
      issues.push(`Rod **${rod}** tidak kamu miliki/gunakan saat ini`);
    }
  }

  for (const bait of offer.baits) {
    if (player.activeBait !== bait) {
      issues.push(`Bait **${bait}** tidak kamu miliki/gunakan saat ini`);
    }
  }

  return issues;
}

// ══════════════════════════════════════════════════════════════
// HELPER: format offer untuk display di embed
// ══════════════════════════════════════════════════════════════
function formatOffer(offer) {
  const lines = [];
  if (offer.coins > 0) lines.push(`💰 \`${formatNumber(offer.coins)} Koin\``);
  for (const f of offer.fish)  lines.push(`${f.emoji} **${f.name}** ×${f.count} *(${f.rarity})*`);
  for (const r of offer.rods)  lines.push(`🎣 **${r}** *(Rod)*`);
  for (const b of offer.baits) lines.push(`🪱 **${b}** *(Bait)*`);
  return lines.length > 0 ? lines.join('\n') : '`—`';
}

// ══════════════════════════════════════════════════════════════
// HELPER: eksekusi transfer item antara dua player
// ══════════════════════════════════════════════════════════════
function executeTransfer(from, to, offer) {
  // Transfer koin
  from.coins -= offer.coins;
  to.coins   += offer.coins;

  // Transfer ikan
  for (const f of offer.fish) {
    const fromInv = from.inventory.find(i => i.id === f.id);
    if (fromInv) {
      fromInv.count -= f.count;
      if (fromInv.count <= 0) from.inventory = from.inventory.filter(i => i.id !== f.id);
    }
    const toInv = to.inventory.find(i => i.id === f.id);
    if (toInv) toInv.count += f.count;
    else to.inventory.push({ id: f.id, name: f.name, rarity: f.rarity, price: f.price, count: f.count, emoji: f.emoji });
  }

  // Transfer rod (swap aktif rod)
  for (const rod of offer.rods) {
    const oldToRod = to.activeRod;
    to.activeRod   = rod;
    from.activeRod = oldToRod;
  }

  // Transfer bait (swap aktif bait)
  for (const bait of offer.baits) {
    const oldToBait = to.activeBait;
    to.activeBait   = bait;
    from.activeBait = oldToBait;
  }
}

// ══════════════════════════════════════════════════════════════
// HELPER: build trade embed
// ══════════════════════════════════════════════════════════════
function buildTradeEmbed(session, status = 'pending') {
  const colorMap = {
    pending:   '#f39c12',
    waiting:   '#00c9ff',
    cancelled: '#e74c3c',
    done:      '#2ed573',
  };

  const statusText = {
    pending:   '⏳ Menunggu penawaran dari **' + session.targetName + '**...',
    waiting:   '✅ Kedua penawaran sudah masuk!\nKetik `&accept` untuk konfirmasi, atau `&canceltrade` untuk batal.',
    cancelled: '❌ Trade dibatalkan.',
    done:      '✅ Trade berhasil!',
  };

  const embed = new EmbedBuilder()
    .setColor(colorMap[status])
    .setTitle('🔄  ∆NTRAX  —  Trade')
    .setDescription(statusText[status])
    .addFields(
      {
        name: `📤 Penawaran ${session.initiatorName}`,
        value: session.initiatorOffer ? formatOffer(session.initiatorOffer) : '`Belum diisi`',
        inline: true,
      },
      {
        name: `📥 Penawaran ${session.targetName}`,
        value: session.targetOffer ? formatOffer(session.targetOffer) : '`Belum diisi`',
        inline: true,
      },
    )
    .setFooter({ text: '∆NTRAX Fishing Universe • Trade timeout 60 detik' })
    .setTimestamp();

  if (status === 'pending' || status === 'waiting') {
    embed.addFields({
      name: '📋 Cara Trade',
      value:
        `**${session.targetName}**, balas dengan:\n` +
        `\`&trade offer <item>\`\n` +
        `Contoh: \`&trade offer 2 Salmon, 500 koin, Iron Rod\`\n\n` +
        `Setelah kedua pihak submit offer → ketik \`&accept\` untuk setuju.`,
      inline: false,
    });
  }

  return embed;
}

// ══════════════════════════════════════════════════════════════
// COMMAND EXPORT
// ══════════════════════════════════════════════════════════════
module.exports = {
  name: 'trade',
  aliases: ['tr'],
  description: 'Trade ikan, koin, dan item dengan pemain lain',
  cooldown: 3,

  async execute(message, args, client) {
    try {
    const userId = message.author.id;

    // ── Sub-command: &trade offer <items> ────────────────────
    if (args[0]?.toLowerCase() === 'offer') {
      const session = [...activeTrades.values()].find(
        s => s.targetId === userId && s.status === 'pending'
      );

      if (!session) {
        return message.reply({ embeds: [errorEmbed('Tidak ada trade aktif untukmu!\nMinta seseorang memulai trade dengan `&trade @kamu`.')] });
      }

      if (session.targetOffer) {
        return message.reply({ embeds: [errorEmbed('Kamu sudah submit penawaran! Ketik `&accept` untuk lanjut atau `&canceltrade` untuk batal.')] });
      }

      const offerStr = args.slice(1).join(' ');
      if (!offerStr) {
        return message.reply({ embeds: [errorEmbed(
          'Format: `&trade offer <item>`\n' +
          'Contoh: `&trade offer 2 Salmon, 500 koin`\n' +
          'Gunakan koma (`,`) sebagai pemisah item.'
        )] });
      }

      const player = getPlayer(userId);
      const { result: offer, errors } = parseOffer(offerStr, player);

      if (errors.length > 0) {
        return message.reply({ embeds: [errorEmbed(`Item tidak dikenal: **${errors.join(', ')}**\nCek nama ikan di \`&inventory\`, rod di \`&shop rod\`, bait di \`&shop bait\`.`)] });
      }

      const issues = validateOffer(offer, player);
      if (issues.length > 0) {
        return message.reply({ embeds: [errorEmbed(issues.join('\n'))] });
      }

      session.targetOffer = offer;
      session.status = 'waiting';

      const embed = buildTradeEmbed(session, 'waiting');
      if (session.tradeMessage) await session.tradeMessage.edit({ embeds: [embed] }).catch(() => {});
      return message.reply({ embeds: [new EmbedBuilder().setColor('#2ed573').setTitle('✅ Penawaran Diterima!').setDescription(`Penawaran kamu sudah masuk.\nSekarang ketik \`&accept\` untuk konfirmasi trade, atau \`&canceltrade\` untuk batal.`).setFooter({ text: '∆NTRAX Fishing Universe' })] });
    }

    // ── Sub-command: &trade cancel / &canceltrade ─────────────
    if (args[0]?.toLowerCase() === 'cancel') {
      return handleCancel(message, userId);
    }

    // ── Mulai trade baru: &trade @user ────────────────────────
    const target = message.mentions.users.first();
    if (!target) {
      return message.reply({ embeds: [errorEmbed(
        'Penggunaan:\n' +
        '`&trade @user` — mulai trade dengan seseorang\n' +
        '`&trade offer <item>` — submit penawaranmu\n' +
        '`&accept` — konfirmasi trade\n' +
        '`&canceltrade` — batalkan trade\n\n' +
        '**Contoh offer:** `2 Salmon, 1000 koin, Iron Rod, Worm`'
      )] });
    }

    if (target.id === userId) {
      return message.reply({ embeds: [errorEmbed('Kamu tidak bisa trade dengan dirimu sendiri!')] });
    }
    if (target.bot) {
      return message.reply({ embeds: [errorEmbed('Kamu tidak bisa trade dengan bot!')] });
    }

    // Cek cooldown
    const lastTrade = tradeCooldowns.get(userId);
    if (lastTrade && Date.now() - lastTrade < TRADE_COOLDOWN) {
      const sisa = Math.ceil((TRADE_COOLDOWN - (Date.now() - lastTrade)) / 1000);
      return message.reply({ embeds: [errorEmbed(`Trade cooldown! Tunggu **${sisa} detik** lagi.`)] });
    }

    // Cek apakah sudah ada trade aktif
    if (activeTrades.has(userId)) {
      return message.reply({ embeds: [errorEmbed('Kamu sudah punya trade aktif! Selesaikan atau ketik `&canceltrade` dulu.')] });
    }
    const targetHasTrade = [...activeTrades.values()].some(
      s => s.targetId === target.id || s.initiatorId === target.id
    );
    if (targetHasTrade) {
      return message.reply({ embeds: [errorEmbed(`**${target.username}** sedang dalam trade lain!`)] });
    }

    // Buat session trade
    const session = {
      initiatorId:   userId,
      initiatorName: message.author.username,
      targetId:      target.id,
      targetName:    target.username,
      initiatorOffer: null,
      targetOffer:    null,
      initiatorAccepted: false,
      targetAccepted:    false,
      status: 'pending',
      tradeMessage: null,
      channelId: message.channel.id,
    };

    // Initiator langsung parse offer dari args jika ada setelah @mention
    // misal: &trade @user 2 Salmon, 500 koin
    const offerAfterMention = args.slice(1).join(' ').trim();
    if (offerAfterMention) {
      const player = getPlayer(userId);
      const { result: offer, errors } = parseOffer(offerAfterMention, player);
      if (errors.length > 0) {
        return message.reply({ embeds: [errorEmbed(`Item tidak dikenal: **${errors.join(', ')}**`)] });
      }
      const issues = validateOffer(offer, player);
      if (issues.length > 0) {
        return message.reply({ embeds: [errorEmbed(issues.join('\n'))] });
      }
      session.initiatorOffer = offer;
    }

    activeTrades.set(userId, session);

    const embed = buildTradeEmbed(session, 'pending');
    const tradeMsg = await message.reply({ content: `<@${target.id}> kamu diajak trade oleh **${message.author.username}**!`, embeds: [embed] });
    session.tradeMessage = tradeMsg;

    // Auto-cancel setelah timeout
    setTimeout(async () => {
      if (activeTrades.has(userId) && activeTrades.get(userId).status !== 'done') {
        activeTrades.delete(userId);
        tradeCooldowns.set(userId, Date.now());
        tradeCooldowns.set(target.id, Date.now());
        try {
          const cancelEmbed = buildTradeEmbed(session, 'cancelled');
          cancelEmbed.setDescription('❌ Trade otomatis dibatalkan karena timeout (60 detik).');
          if (tradeMsg) await tradeMsg.edit({ content: null, embeds: [cancelEmbed] });
        } catch {}
      }
    }, TRADE_TIMEOUT);
    } catch (error) {
      console.error('[Error] Command trade:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
  },
};

// ══════════════════════════════════════════════════════════════
// &accept command
// ══════════════════════════════════════════════════════════════
module.exports.accept = {
  name: 'accept',
  aliases: ['acc', 'setuju'],
  description: 'Konfirmasi trade yang sedang berlangsung',
  cooldown: 2,
  async execute(message, args, client) {
    const userId = message.author.id;

    // Cari session yang melibatkan user ini
    let session = activeTrades.get(userId); // initiator?
    let isInitiator = true;
    if (!session) {
      session = [...activeTrades.values()].find(s => s.targetId === userId);
      isInitiator = false;
    }

    if (!session) {
      return message.reply({ embeds: [errorEmbed('Tidak ada trade aktif untukmu!')] });
    }

    if (session.status !== 'waiting') {
      return message.reply({ embeds: [errorEmbed('Kedua pihak harus submit offer dulu sebelum accept!\nGunakan `&trade offer <item>` untuk submit.`')] });
    }

    // Tandai accept
    if (isInitiator) session.initiatorAccepted = true;
    else             session.targetAccepted    = true;

    await message.reply({ embeds: [new EmbedBuilder().setColor('#2ed573').setTitle('✅ Konfirmasi Diterima').setDescription(`Kamu setuju dengan trade ini.\n${!session.initiatorAccepted || !session.targetAccepted ? 'Menunggu konfirmasi pihak lain...' : ''}`).setFooter({ text: '∆NTRAX Fishing Universe' })] });

    // Kalau keduanya sudah accept → eksekusi
    if (session.initiatorAccepted && session.targetAccepted) {
      const initiator = getPlayer(session.initiatorId);
      const target    = getPlayer(session.targetId);

      // Validasi ulang (pastikan tidak ada yang berubah saat menunggu)
      // FIX: guard against null offers before validating
      if (!session.initiatorOffer || !session.targetOffer) {
        activeTrades.delete(session.initiatorId);
        return message.reply({ embeds: [errorEmbed('Trade gagal! Salah satu pihak belum submit penawaran.')] });
      }
      const issInit   = validateOffer(session.initiatorOffer, initiator);
      const issTgt    = validateOffer(session.targetOffer,    target);

      if (issInit.length > 0 || issTgt.length > 0) {
        activeTrades.delete(session.initiatorId);
        tradeCooldowns.set(session.initiatorId, Date.now());
        tradeCooldowns.set(session.targetId, Date.now());

        const allIssues = [...issInit.map(i => `[${session.initiatorName}] ${i}`), ...issTgt.map(i => `[${session.targetName}] ${i}`)];
        return message.reply({ embeds: [errorEmbed(`Trade gagal! Item sudah tidak valid:\n${allIssues.join('\n')}`)] });
      }

      // Eksekusi transfer dua arah
      executeTransfer(initiator, target, session.initiatorOffer);
      executeTransfer(target, initiator, session.targetOffer);

      savePlayer(initiator);
      savePlayer(target);

      session.status = 'done';
      activeTrades.delete(session.initiatorId);
      tradeCooldowns.set(session.initiatorId, Date.now());
      tradeCooldowns.set(session.targetId, Date.now());

      const doneEmbed = buildTradeEmbed(session, 'done');
      if (session.tradeMessage) { try { await session.tradeMessage.edit({ content: null, embeds: [doneEmbed] }); } catch {} }

      message.channel.send({ embeds: [
        new EmbedBuilder()
          .setColor('#2ed573')
          .setTitle('🎉  Trade Berhasil!')
          .setDescription(
            `**${session.initiatorName}** dan **${session.targetName}** telah berhasil trade!\n\n` +
            `📤 **${session.initiatorName}** memberikan:\n${formatOffer(session.initiatorOffer)}\n\n` +
            `📥 **${session.targetName}** memberikan:\n${formatOffer(session.targetOffer)}`
          )
          .setFooter({ text: '∆NTRAX Fishing Universe • Cooldown 1 menit' })
          .setTimestamp()
      ]});
    }
  },
};

// ══════════════════════════════════════════════════════════════
// &canceltrade command
// ══════════════════════════════════════════════════════════════
module.exports.cancel = {
  name: 'canceltrade',
  aliases: ['cancelt', 'bataltrade'],
  description: 'Batalkan trade yang sedang berlangsung',
  cooldown: 2,
  async execute(message, args, client) {
    await handleCancel(message, message.author.id);
  },
};

async function handleCancel(message, userId) {
  let session = activeTrades.get(userId);
  let isInitiator = true;
  if (!session) {
    session = [...activeTrades.values()].find(s => s.targetId === userId);
    isInitiator = false;
  }

  if (!session) {
    return message.reply({ embeds: [errorEmbed('Tidak ada trade aktif yang bisa dibatalkan!')] });
  }

  activeTrades.delete(session.initiatorId);
  tradeCooldowns.set(session.initiatorId, Date.now());
  tradeCooldowns.set(session.targetId, Date.now());
  session.status = 'cancelled';

  try {
    const cancelEmbed = buildTradeEmbed(session, 'cancelled');
    cancelEmbed.setDescription(`❌ Trade dibatalkan oleh **${message.author.username}**.`);
    await session.tradeMessage.edit({ content: null, embeds: [cancelEmbed] });
  } catch {}

  return message.reply({ embeds: [new EmbedBuilder().setColor('#e74c3c').setTitle('❌ Trade Dibatalkan').setDescription('Trade telah dibatalkan.').setFooter({ text: '∆NTRAX Fishing Universe' })] });
}

// Export helper untuk dipakai di luar jika perlu
module.exports.activeTrades   = activeTrades;
module.exports.tradeCooldowns = tradeCooldowns;
