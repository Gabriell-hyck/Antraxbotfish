const { EmbedBuilder } = require('discord.js');
const { getAllPlayers } = require('../utils/database');
const { formatNumber } = require('../utils/helpers');

const MEDALS    = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
const PAGE_SIZE = 10;

// ── Fetch username dengan fallback ────────────────────────────
async function fetchName(client, userId) {
  try {
    const u = await client.users.fetch(userId);
    return u.username;
  } catch {
    return `User#${userId.slice(-4)}`;
  }
}

// ── Format durasi "lama main" dari lastDaily / level history ──
// Estimasi: kapan pertama kali bermain tidak disimpan, jadi
// kita pakai lastDaily sebagai proxy "masih aktif" dan level
// sebagai indikator pengalaman. Kalau ada firstSeen, pakai itu.
function estimatePlaytime(player) {
  // Hitung berapa hari sejak pertama main (approx dari level)
  // ~100 fish per level di awal → estimasi kasar
  const approxDays = Math.floor(player.level / 3) + 1;
  return approxDays;
}

function formatDays(days) {
  if (days >= 365) return `${Math.floor(days/365)}th ${Math.floor((days%365)/30)}bln`;
  if (days >= 30)  return `${Math.floor(days/30)}bln ${days%30}hr`;
  return `${days} hari`;
}

// ── Builder per kategori ───────────────────────────────────────
async function buildBoard(client, players, category) {
  let sorted, title, color, desc;

  if (category === 'level') {
    sorted = [...players].sort((a,b) => b.level - a.level || b.xp - a.xp).slice(0, PAGE_SIZE);
    title  = '⭐  Top Level';
    color  = '#f1c40f';

    const lines = await Promise.all(sorted.map(async (p, i) => {
      const name = await fetchName(client, p.userId);
      const bar  = buildMiniBar(p.level, 700);
      return `${MEDALS[i]}  **${name}**\n> ${bar}  \`Lv ${p.level}\`  •  \`${formatNumber(p.xp)} XP\``;
    }));
    desc = lines.join('\n');

  } else if (category === 'coins') {
    sorted = [...players].sort((a,b) => b.coins - a.coins).slice(0, PAGE_SIZE);
    title  = '💰  Top Koin';
    color  = '#f39c12';

    const lines = await Promise.all(sorted.map(async (p, i) => {
      const name = await fetchName(client, p.userId);
      return `${MEDALS[i]}  **${name}**\n> \`💰 ${formatNumber(p.coins)} 🪙\`  •  \`Lv ${p.level}\``;
    }));
    desc = lines.join('\n');

  } else if (category === 'fish') {
    sorted = [...players].sort((a,b) => (b.totalFishCaught||0) - (a.totalFishCaught||0)).slice(0, PAGE_SIZE);
    title  = '🐟  Top Tangkapan';
    color  = '#00c9ff';

    const lines = await Promise.all(sorted.map(async (p, i) => {
      const name  = await fetchName(client, p.userId);
      const inv   = (p.inventory || []).reduce((s,f) => s + f.count, 0);
      return `${MEDALS[i]}  **${name}**\n> \`🎣 ${formatNumber(p.totalFishCaught||0)} tangkapan\`  •  \`🎒 ${formatNumber(inv)} di tas\``;
    }));
    desc = lines.join('\n');

  } else if (category === 'veteran') {
    // Sort by level (proxy lama main) + totalFishCaught sebagai tiebreaker
    sorted = [...players].sort((a,b) => {
      const scoreA = (a.level * 100) + (a.totalFishCaught || 0);
      const scoreB = (b.level * 100) + (b.totalFishCaught || 0);
      return scoreB - scoreA;
    }).slice(0, PAGE_SIZE);
    title  = '🏅  Top Veteran';
    color  = '#8e44ad';

    const lines = await Promise.all(sorted.map(async (p, i) => {
      const name = await fetchName(client, p.userId);
      const days = estimatePlaytime(p);
      const hasDaily = p.lastDaily ? '✅' : '—';
      return `${MEDALS[i]}  **${name}**\n> \`⏳ ~${formatDays(days)}\`  •  \`Lv ${p.level}\`  •  \`🎣 ${formatNumber(p.totalFishCaught||0)}\`  ${hasDaily}`;
    }));
    desc = lines.join('\n');
  }

  return { title, color, desc };
}

// ── Mini progress bar ──────────────────────────────────────────
function buildMiniBar(value, max, len = 8) {
  const filled = Math.min(len, Math.round((value / max) * len));
  return '▰'.repeat(filled) + '▱'.repeat(len - filled);
}

// ── Embed utama (semua kategori ringkas) ──────────────────────
async function buildFullLeaderboard(client, players) {
  const topLevel  = [...players].sort((a,b) => b.level - a.level || b.xp - a.xp).slice(0, 5);
  const topCoins  = [...players].sort((a,b) => b.coins - a.coins).slice(0, 5);
  const topFish   = [...players].sort((a,b) => (b.totalFishCaught||0) - (a.totalFishCaught||0)).slice(0, 5);
  const topVet    = [...players].sort((a,b) => {
    return ((b.level*100)+(b.totalFishCaught||0)) - ((a.level*100)+(a.totalFishCaught||0));
  }).slice(0, 5);

  async function fmtShort(list, key) {
    const lines = [];
    for (let i = 0; i < list.length; i++) {
      const p    = list[i];
      const name = await fetchName(client, p.userId);
      let val;
      if (key === 'level')  val = `Lv **${p.level}**`;
      if (key === 'coins')  val = `\`${formatNumber(p.coins)} 🪙\``;
      if (key === 'fish')   val = `\`${formatNumber(p.totalFishCaught||0)} 🎣\``;
      if (key === 'vet')    val = `Lv **${p.level}** • \`${formatNumber(p.totalFishCaught||0)} 🎣\``;
      lines.push(`${MEDALS[i]} **${name}** — ${val}`);
    }
    return lines.join('\n') || '`Belum ada data`';
  }

  const [lvlBoard, coinBoard, fishBoard, vetBoard] = await Promise.all([
    fmtShort(topLevel, 'level'),
    fmtShort(topCoins, 'coins'),
    fmtShort(topFish,  'fish'),
    fmtShort(topVet,   'vet'),
  ]);

  const embed = new EmbedBuilder()
    .setColor('#f1c40f')
    .setTitle('🏆  ∆NTRAX  —  Hall of Fame')
    .setDescription(
      `\`\`\`ansi\n\u001b[1;33m  ∆NTRAX FISHING UNIVERSE — PAPAN PERINGKAT\u001b[0m\n\`\`\`` +
      `> 👥 Total pemain: **${players.length}**\n` +
      `> 📋 Gunakan \`&lb <kategori>\` untuk detail\n` +
      `> Kategori: \`level\` \`coins\` \`fish\` \`veteran\``
    )
    .addFields(
      {
        name: '⭐  Top Level',
        value: lvlBoard,
        inline: true,
      },
      {
        name: '💰  Top Koin',
        value: coinBoard,
        inline: true,
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true,
      },
      {
        name: '🐟  Top Tangkapan Ikan',
        value: fishBoard,
        inline: true,
      },
      {
        name: '🏅  Top Veteran',
        value: vetBoard,
        inline: true,
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true,
      },
      {
        name: '📋  Detail per Kategori',
        value:
          '`&lb level`  — Top 10 pemain level tertinggi\n' +
          '`&lb coins`  — Top 10 pemain terkaya\n' +
          '`&lb fish`   — Top 10 pemain terbanyak menangkap ikan\n' +
          '`&lb veteran`— Top 10 pemain paling lama/berpengalaman',
        inline: false,
      },
    )
    .setFooter({ text: '∆NTRAX Fishing Universe • Update tiap request' })
    .setTimestamp();

  return embed;
}

// ══════════════════════════════════════════════════════════════
// EXPORT
// ══════════════════════════════════════════════════════════════
module.exports = {
  name: 'leaderboard',
  aliases: ['lb','top','rank'],
  description: 'Papan peringkat pemain terbaik',
  cooldown: 5,

  async execute(message, args, client) {
    try {
      const all     = getAllPlayers();
      const players = Object.values(all);

      if (!players.length) {
        return message.reply({ content: '📭 Belum ada pemain yang terdaftar!' });
      }

      const sub = (args[0] || '').toLowerCase();

      // ── Detail per kategori ──────────────────────────────
      if (['level','coins','fish','veteran','vet'].includes(sub)) {
        const cat = sub === 'vet' ? 'veteran' : sub;

        const loading = await message.reply({ content: '⏳ Memuat leaderboard...' });

        const { title, color, desc } = await buildBoard(client, players, cat);

        const catEmoji = {
          level:   '⭐',
          coins:   '💰',
          fish:    '🐟',
          veteran: '🏅',
        };

        const catDesc = {
          level:   'Diurutkan berdasarkan **level tertinggi**, tiebreaker XP.',
          coins:   'Diurutkan berdasarkan **koin terbanyak**.',
          fish:    'Diurutkan berdasarkan **total ikan yang pernah ditangkap**.',
          veteran: 'Diurutkan berdasarkan **estimasi waktu bermain** (level × pengalaman).',
        };

        const embed = new EmbedBuilder()
          .setColor(color)
          .setTitle(`${catEmoji[cat]}  ∆NTRAX  —  ${title}`)
          .setDescription(
            `> ${catDesc[cat]}\n` +
            `> 👥 Total pemain: **${players.length}**\n\n` +
            desc
          )
          .setFooter({ text: '∆NTRAX Fishing Universe • &lb untuk semua kategori' })
          .setTimestamp();

        return loading.edit({ content: null, embeds: [embed] });
      }

      // ── Tampilan utama (semua kategori ringkas) ──────────
      const loading = await message.reply({ content: '⏳ Memuat leaderboard...' });
      const embed   = await buildFullLeaderboard(client, players);
      return loading.edit({ content: null, embeds: [embed] });

    } catch (error) {
      console.error('[Error] Command leaderboard:', error);
      message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' });
    }
  },
};
