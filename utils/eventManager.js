// ═══════════════════════════════════════════════════════════════
// EVENT MANAGER — Poseidon's Blessing Weekly Event
// ═══════════════════════════════════════════════════════════════
const { EmbedBuilder } = require('discord.js');

// ── Konfigurasi event ──────────────────────────────────────────
const EVENT_CONFIG = {
  name: "Poseidon's Blessing",
  emoji: '🌊',
  dayOfWeek: 6,        // 6 = Sabtu (0=Minggu, 1=Senin, ..., 6=Sabtu)
  hour: 22,            // 22:00 WITA (UTC+8 → UTC 14:00)
  hourUTC: 14,
  timezone: 'WITA',    // Waktu Indonesia Tengah — Bontang, Kalimantan Timur
  tzOffset: 8,         // UTC+8
  durationMs: 30 * 60 * 1000,  // 30 menit
  bonuses: {
    luckMultiplier: 40,
    xpMultiplier: 2,
    coinMultiplier: 2,
    fishCooldown: 2,   // detik
  },
  color: '#00c9ff',
  colorEnd: '#2c3e50',
  announceChannelId: process.env.EVENT_CHANNEL_ID || process.env.FISHING_ANNOUNCEMENT_CHANNEL || null,
};

// ── State event (in-memory) ────────────────────────────────────
let eventState = {
  active: false,
  startedAt: null,
  endsAt: null,
};

function isEventActive() {
  if (!eventState.active) return false;
  if (Date.now() > eventState.endsAt) {
    eventState.active = false;
    return false;
  }
  return true;
}

function getEventState() {
  return eventState;
}

function getTimeRemaining() {
  if (!isEventActive()) return 0;
  return Math.max(0, eventState.endsAt - Date.now());
}

function getNextEventTime() {
  const now = new Date();
  // Konversi ke WITA (UTC+8) — Bontang, Kalimantan Timur
  const wib = new Date(now.getTime() + 8 * 3600 * 1000);
  const day  = wib.getUTCDay();
  const hour = wib.getUTCHours();
  const min  = wib.getUTCMinutes();

  // Hitung berapa hari sampai Sabtu jam 22:00 WITA
  let daysUntil = (EVENT_CONFIG.dayOfWeek - day + 7) % 7;
  if (daysUntil === 0 && (hour > 22 || (hour === 22 && min >= 30))) {
    daysUntil = 7; // event minggu ini sudah lewat
  }
  if (daysUntil === 0 && hour === 22 && min < 30) {
    return null; // event sedang berlangsung
  }

  const next = new Date(wib);
  next.setUTCHours(22, 0, 0, 0);
  next.setUTCDate(next.getUTCDate() + daysUntil);
  // Kembalikan ke UTC
  return new Date(next.getTime() - 8 * 3600 * 1000);
}

function formatDuration(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

// ── Kirim announcement ─────────────────────────────────────────
async function sendAnnouncement(client, type) {
  try {
    const channelId = EVENT_CONFIG.announceChannelId || '1234567890';
    const channel = client.channels.cache.get(channelId);
    if (!channel) return;

    let embed;
    if (type === 'start') {
      embed = new EmbedBuilder()
        .setColor(EVENT_CONFIG.color)
        .setTitle('🌊  ━━ POSEIDON\'S BLESSING TELAH DIMULAI! ━━')
        .setDescription(
          '```fix\n' +
          '  ✨ Luck      x40\n' +
          '  ✨ XP        x2\n' +
          '  ✨ Coin      x2\n' +
          '  ✨ Cooldown  2 Detik\n' +
          '```\n' +
          '> ⏳ **Durasi: 30 Menit**\n' +
          '> 🐟 Ikan eksklusif event kini tersedia!\n' +
          '> 🌊 Dapatkan **Poseidon Token** dari setiap tangkapan!\n' +
          '> `&event` — cek status event\n' +
          '> `&eventshop` — buka toko event'
        )
        .setFooter({ text: '∆NTRAX Fishing Universe • Event Mingguan' })
        .setTimestamp();
    } else {
      embed = new EmbedBuilder()
        .setColor(EVENT_CONFIG.colorEnd)
        .setTitle('🌙  Poseidon\'s Blessing Telah Berakhir')
        .setDescription(
          '```\nSemua bonus event telah dinonaktifkan.\nIkan event tidak lagi tersedia.\n\nTerima kasih sudah berpartisipasi!\n```\n> Poseidon Token yang kamu kumpulkan tetap tersimpan.\n> Event berikutnya: **Sabtu depan jam 22:00 WITA**'
        )
        .setFooter({ text: '∆NTRAX Fishing Universe • Sampai jumpa minggu depan!' })
        .setTimestamp();
    }

    await channel.send({ content: type === 'start' ? '@everyone' : null, embeds: [embed] });
  } catch (e) {
    console.error('[EventManager] Announcement error:', e.message);
  }
}

// ── Scheduler utama ────────────────────────────────────────────
function startEventScheduler(client) {
  console.log('[EventManager] Scheduler started — checking every 30s');

  // Cek setiap 30 detik
  setInterval(async () => {
    const now = new Date();
    const wib = new Date(now.getTime() + 8 * 3600 * 1000); // WITA UTC+8
    const day  = wib.getUTCDay();
    const hour = wib.getUTCHours();
    const min  = wib.getUTCMinutes();

    const shouldBeActive = (
      day === EVENT_CONFIG.dayOfWeek &&
      hour === EVENT_CONFIG.hour &&
      min < 30
    );

    if (shouldBeActive && !eventState.active) {
      // Mulai event
      eventState.active   = true;
      eventState.startedAt = Date.now();
      eventState.endsAt   = Date.now() + EVENT_CONFIG.durationMs;
      console.log('[EventManager] Poseidon\'s Blessing STARTED');
      await sendAnnouncement(client, 'start');

      // Auto-end setelah 30 menit
      setTimeout(async () => {
        eventState.active = false;
        console.log('[EventManager] Poseidon\'s Blessing ENDED');
        await sendAnnouncement(client, 'end');
      }, EVENT_CONFIG.durationMs);
    }
  }, 30000);
}

module.exports = {
  EVENT_CONFIG,
  isEventActive,
  getEventState,
  getTimeRemaining,
  getNextEventTime,
  formatDuration,
  startEventScheduler,
};
