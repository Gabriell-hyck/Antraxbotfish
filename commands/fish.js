const { EmbedBuilder } = require('discord.js');
const { getPlayer, savePlayer } = require('../utils/database');
const { getRarityRates, pickRarity, pickFish, getXpForNextLevel, RARITY_COLORS, AREAS, RODS, BAITS, MAX_LEVEL } = require('../utils/fishData');
const { errorEmbed, formatNumber, buildXpBar, RARITY_STYLE, DIVIDER } = require('../utils/helpers');
const { updateQuestProgress } = require('./quest');
const { isEventActive, EVENT_CONFIG } = require('../utils/eventManager');
const { EVENT_FISH, EVENT_FISH_CHANCES, TOKEN_REWARD_BY_RARITY } = require('../utils/eventData');

const SECRET_STYLE = { icon: '〽️', label: 'S E C R E T', bar: '▮', color: '#ffffff' };
const DIVINE_STYLE = { icon: '🌸', label: 'D I V I N E',  bar: '▮', color: '#f8c8ff' };
const EVENT_STYLE  = { icon: '🌊', label: 'E V E N T',    bar: '▮', color: '#00c9ff' };

const SECRET_AREAS = [
  'Abyssal Trench','Dark Ocean','Celestial Lake','Volcano Bay','Void Rift',
  'Origin Sea','Temporal Abyss','Eternal Storm','Aurora Depths','Shadow Realm',
  'Frozen Abyss','Blood Sea','Phantom Ocean','Crystal Abyss','Chaos Sea',
  'Nebula Waters','Dragon Grave','Void Sea','Eden Waters','Omega Rift',
];

const ANNOUNCEMENT_CHANNEL_ID = process.env.FISHING_ANNOUNCEMENT_CHANNEL || null;

// ── Junk items ─────────────────────────────────────────────────
const JUNK_ITEMS = [
  { id: 'sampah_plastik', name: 'Sampah Plastik',  emoji: '🗑️', price: 0,  desc: 'Botol plastik bekas di lautan.' },
  { id: 'sepatu_bolong',  name: 'Sepatu Bolong',   emoji: '👟', price: 5,  desc: 'Sepatu usang entah punya siapa.' },
  { id: 'kaleng_berkarat',name: 'Kaleng Berkarat', emoji: '🥫', price: 2,  desc: 'Kaleng tua tak berguna.' },
  { id: 'ban_bekas',      name: 'Ban Bekas',       emoji: '🔘', price: 3,  desc: 'Ban kendaraan yang sudah usang.' },
  { id: 'batu_berlumut',  name: 'Batu Berlumut',   emoji: '🪨', price: 1,  desc: 'Batu biasa penuh lumut hijau.' },
  { id: 'kayu_hanyut',    name: 'Kayu Hanyut',     emoji: '🪵', price: 4,  desc: 'Kayu lapuk yang hanyut.' },
  { id: 'topi_usang',     name: 'Topi Usang',      emoji: '🪖', price: 8,  desc: 'Topi entah milik siapa.' },
  { id: 'kerang_kosong',  name: 'Kerang Kosong',   emoji: '🐚', price: 10, desc: 'Cangkang kerang tanpa isi.' },
  { id: 'rumput_laut',    name: 'Rumput Laut',     emoji: '🌿', price: 6,  desc: 'Seikat rumput laut biasa.' },
  { id: 'koin_kotor',     name: 'Koin Kuno Kotor', emoji: '🪙', price: 25, desc: 'Mungkin bernilai... mungkin tidak.' },
];

// ── Outcome (pakai cooldown event jika aktif) ──────────────────
function getFishingOutcome(player) {
  const rod = RODS[player.activeRod] || RODS['Wooden Rod'];
  const levelBonus   = Math.min(player.level * 0.03, 15);
  const rodBonus     = Math.min(rod.tier * 1.2, 20);
  const successChance = Math.min(65 + levelBonus + rodBonus, 92);
  const escapeChance  = (100 - successChance) * 0.60;
  const roll = Math.random() * 100;
  if (roll < successChance) return 'success';
  if (roll < successChance + escapeChance) return 'escape';
  return 'junk';
}

// ── Cek apakah dapat ikan event ───────────────────────────────
function tryPickEventFish(baitData) {
  const eventFishBonus = baitData?.eventFishBonus || 0;
  const totalChance = Object.values(EVENT_FISH_CHANCES).reduce((a, b) => a + b, 0) + eventFishBonus;
  if (Math.random() * 100 > totalChance) return null;

  const adjusted = {};
  for (const [id, chance] of Object.entries(EVENT_FISH_CHANCES)) {
    adjusted[id] = chance + (eventFishBonus * chance / totalChance);
  }

  let rand = Math.random() * Object.values(adjusted).reduce((a, b) => a + b, 0);
  for (const [id, weight] of Object.entries(adjusted)) {
    rand -= weight;
    if (rand <= 0) return EVENT_FISH.find(f => f.id === id) || null;
  }
  return null;
}

// ── Global announcement ────────────────────────────────────────
async function sendGlobalAnnouncement(client, fish, playerName, rarity, isEvent = false) {
  try {
    const channelId = ANNOUNCEMENT_CHANNEL_ID || '1234567890';
    const channel   = client.channels.cache.get(channelId);
    if (!channel) return;

    let color = '#f8c8ff', title = '🌸  Divine Fish Tertangkap!';
    if (rarity === 'Secret') { color = '#ffffff'; title = '〽️  Secret Fish Tertangkap!'; }
    if (isEvent)             { color = '#00c9ff'; title = '🌊  Event Fish Tertangkap!'; }

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(title)
      .setDescription(
        `🎉 **${playerName}** berhasil menangkap **${fish.emoji} ${fish.name}** (**${rarity.toUpperCase()}**)!\n\n` +
        `\`\`\`\nHarga   : ${formatNumber(fish.price)} koin\nRarity  : ${rarity}${isEvent ? '\nEVENT   : Poseidon\'s Blessing' : ''}\n\`\`\``
      )
      .setTimestamp()
      .setFooter({ text: '∆NTRAX Fishing Universe' });

    await channel.send({ embeds: [embed] });
  } catch (e) { /* silent */ }
}

module.exports = {
  name: 'fish',
  description: 'Memancing ikan!',
  cooldown: 5,
  async execute(message, args, client) {
    try {
    const player   = getPlayer(message.author.id);
    const areaData = AREAS[player.activeArea];
    const eventActive = isEventActive();
    if (!areaData) return message.reply({ embeds: [errorEmbed('Area tidak valid!')] });

    if (player.activeArea === 'Point Nemo' && player.level < 700)
      return message.reply({ embeds: [errorEmbed(`Butuh **Level 700** untuk memancing di Point Nemo!\nLevel kamu: **${player.level}**`)] });

    if (SECRET_AREAS.includes(player.activeArea)) {
      const required = areaData.unlockLevel || 50;
      if (player.level < required)
        return message.reply({ embeds: [errorEmbed(`Butuh **Level ${required}** untuk memancing di **${player.activeArea}**!\nLevel kamu: **${player.level}**`)] });
    }

    // Override cooldown saat event
    if (eventActive) {
      const ts = client.cooldowns.get('fish');
      if (ts) {
        ts.set(message.author.id, Date.now() - (5000 - EVENT_CONFIG.bonuses.fishCooldown * 1000));
      }
    }

    const rodData  = RODS[player.activeRod] || RODS['Wooden Rod'];
    const baitData = player.activeBait ? BAITS[player.activeBait] : null;
    const isNemo   = player.activeArea === 'Point Nemo';
    const isSecret = SECRET_AREAS.includes(player.activeArea);

    // ── Casting embed ──────────────────────────────────────────
    const castEmbed = new EmbedBuilder()
      .setColor(eventActive ? '#00c9ff' : isNemo ? '#ffffff' : isSecret ? '#2d1b69' : '#1a1a2e')
      .setTitle(
        eventActive ? '🌊  Memancing di Tengah Berkah Poseidon...' :
        isNemo      ? '〽️  Melempar Kail ke Titik Terpencil...' :
        isSecret    ? '🔒  Melempar Kail ke Area Rahasia...' :
                     `${areaData.emoji}  Melempar Kail...`
      )
      .setDescription(
        eventActive
          ? '```fix\n🌊  Poseidon\'s Blessing aktif!\n✨  Luck x40 | XP x2 | Coin x2\n⚡  Ikan event mungkin muncul...\n```'
          : isNemo
            ? '```\n🌀  Memasuki koordinat 48°52\'S 123°23\'W...\n```'
            : isSecret
              ? `\`\`\`\n🔒  Masuk ke ${player.activeArea}...\n\`\`\``
              : `\`\`\`\n🎣  Mengayunkan ${player.activeRod}...\n💧  Kail menyentuh air ${player.activeArea}\n\`\`\``
      )
      .addFields(
        { name: '🗺️ Area',  value: `${areaData.emoji} **${player.activeArea}**`, inline: true },
        { name: '🎣 Rod',   value: `${rodData.emoji} **${player.activeRod}**`,   inline: true },
        { name: '🪱 Bait',  value: baitData ? `${baitData.emoji} **${player.activeBait}**` : '`—`', inline: true },
        ...(eventActive ? [{ name: '🌊 Event', value: '`Poseidon\'s Blessing Aktif!`', inline: true }] : []),
      )
      .setFooter({ text: '∆NTRAX Fishing Universe' });

    let castMsg;
    try {
      castMsg = await message.reply({ embeds: [castEmbed] });
    } catch (replyErr) {
      console.error('[fish] Failed to send cast message:', replyErr.message);
      return;
    }
    const waitTime = eventActive ? 800 + Math.random() * 800 :
                     isNemo      ? 3000 + Math.random() * 2000 :
                     isSecret    ? 2500 + Math.random() * 1500 :
                                   1500 + Math.random() * 1500;
    await new Promise(r => setTimeout(r, waitTime));

    const outcome = (isNemo || isSecret) ? 'success' : getFishingOutcome(player);

    // ── Escape ──────────────────────────────────────────────────
    if (outcome === 'escape') {
      let baitMsg = '';
      if (player.activeBait) { player.activeBait = null; baitMsg = `\n🪱 Bait habis.`; savePlayer(player); }
      const msgs = ['🐟 Ikan menggigit... lalu meloloskan diri!','💨 Ikan menarik kencang lalu putus!','😮 Hampir! Ikan kabur detik terakhir!'];
      return castMsg.edit({ embeds: [new EmbedBuilder().setColor('#e67e22').setTitle('💨  Ikan Kabur!').setDescription(`\`${msgs[Math.floor(Math.random()*msgs.length)]}\`${baitMsg}`).setFooter({ text: '∆NTRAX • Coba lagi!' })] });
    }

    // ── Junk ───────────────────────────────────────────────────
    if (outcome === 'junk') {
      const junk = JUNK_ITEMS[Math.floor(Math.random() * JUNK_ITEMS.length)];
      let baitMsg = '';
      if (player.activeBait) { player.activeBait = null; baitMsg = `\n🪱 Bait habis.`; }
      if (junk.price > 0) {
        const ex = player.inventory.find(f => f.id === junk.id);
        if (ex) ex.count++; else player.inventory.push({ id: junk.id, name: junk.name, rarity: 'Junk', price: junk.price, count: 1, emoji: junk.emoji });
      }
      savePlayer(player);
      return castMsg.edit({ embeds: [new EmbedBuilder().setColor('#636e72').setTitle(`${junk.emoji}  Dapat Sampah...`).setDescription(`\`${junk.name} — ${junk.desc}\`${baitMsg}`).setFooter({ text: '∆NTRAX • Coba lagi!' })] });
    }

    // ── BERHASIL ────────────────────────────────────────────────
    const caughtIds = player.oneTimeCaught || [];
    let fish = null;
    let isEventFish = false;

    // Prioritas: coba ikan event dulu (hanya saat event aktif + bukan secret/nemo area)
    if (eventActive && !isSecret && !isNemo) {
      fish = tryPickEventFish(baitData);
      if (fish) isEventFish = true;
    }

    // Kalau bukan event fish, pick normal
    if (!fish) {
      const rates  = getRarityRates({ ...player, ...(eventActive ? { _eventActive: true } : {}) });

      // Event bonus luck: kalikan semua rate non-common (simulasi luck x40)
      if (eventActive) {
        for (const r of ['Exotic','Legendary','Mythic','Divine']) {
          if (rates[r]) rates[r] = Math.min(rates[r] * 3, 40);
        }
      }

      const rarity = pickRarity(rates);
      fish = pickFish(player.activeArea, rarity, caughtIds, player.activeBait);
    }

    if (!fish) {
      return castMsg.edit({ embeds: [new EmbedBuilder().setColor('#ffffff').setTitle('〽️  Point Nemo Kosong').setDescription('```\nSemua makhluk di Point Nemo sudah tertangkap.\n```').setFooter({ text: '∆NTRAX' })] });
    }

    // ── Hitung reward ──────────────────────────────────────────
    const minW = fish.minWeight || 0.1;
    const maxW = fish.maxWeight || 5.0;
    const weightBonus = (RODS[player.activeRod]?.weightBonus || 0);
    const fishWeight = (minW + Math.random() * (maxW - minW) + weightBonus * 0.1).toFixed(2);

    let baseXp    = fish.xp;
    let basePrice = fish.price;
    let earnedCoins = 0; // coins dari sell nanti, tapi bonus coin event langsung ke inventory value

    const xpMultiplier   = eventActive ? EVENT_CONFIG.bonuses.xpMultiplier : 1;
    const coinMultiplier = eventActive ? EVENT_CONFIG.bonuses.coinMultiplier : 1;
    const finalXp        = Math.floor(baseXp * xpMultiplier);
    const bonusCoin      = coinMultiplier > 1 ? Math.floor(basePrice * (coinMultiplier - 1)) : 0;

    // Token reward
    let tokenEarned = 0;
    if (eventActive) {
      tokenEarned = isEventFish
        ? (fish.tokenReward || 10)
        : (TOKEN_REWARD_BY_RARITY[fish.rarity] || 1);
      player.poseidonTokens = (player.poseidonTokens || 0) + tokenEarned;
    }

    // Bait habis
    let baitUsedMsg = '';
    if (player.activeBait && baitData && Math.random() < 0.30) {
      baitUsedMsg = `\n🪱 **${player.activeBait}** habis.`;
      player.activeBait = null;
    }

    // oneTime
    const isOneTime = !!fish.oneTime;
    if (isOneTime) {
      if (!player.oneTimeCaught) player.oneTimeCaught = [];
      player.oneTimeCaught.push(fish.id);
    }

    // Inventory
    if (isEventFish || isOneTime) {
      const alreadyHas = player.inventory.find(f => f.id === fish.id);
      if (!alreadyHas) player.inventory.push({ id: fish.id, name: fish.name, rarity: fish.rarity, price: fish.price + bonusCoin, count: 1, emoji: fish.emoji, oneTime: !!fish.oneTime, eventFish: isEventFish });
      else if (!isOneTime) alreadyHas.count++;
    } else {
      const existing = player.inventory.find(f => f.id === fish.id);
      if (existing) existing.count++;
      else player.inventory.push({ id: fish.id, name: fish.name, rarity: fish.rarity, price: fish.price + bonusCoin, count: 1, emoji: fish.emoji });
    }

    player.xp += finalXp;
    player.totalFishCaught = (player.totalFishCaught || 0) + 1;

    let leveledUp = false;
    while (player.xp >= getXpForNextLevel(player.level) && player.level < MAX_LEVEL) {
      player.xp -= getXpForNextLevel(player.level);
      player.level++;
      leveledUp = true;
    }
    if (player.level >= MAX_LEVEL) player.xp = 0;

    savePlayer(player);
    await updateQuestProgress(message.author.id, 'catch', 1);
    if (['Rare','Epic','Exotic','Legendary','Mythic','Divine','Secret'].includes(fish.rarity))
      await updateQuestProgress(message.author.id, 'catchRare', 1);

    // Announcement
    if (['Divine','Secret'].includes(fish.rarity)) await sendGlobalAnnouncement(client, fish, message.author.username, fish.rarity);
    if (isEventFish && fish.rarity === 'Mythic') await sendGlobalAnnouncement(client, fish, message.author.username, fish.rarity, true);

    // ── Result embed ───────────────────────────────────────────
    let style, embedColor;
    if (isEventFish)        { style = EVENT_STYLE;  embedColor = '#00c9ff'; }
    else if (fish.rarity === 'Secret') { style = SECRET_STYLE; embedColor = '#ffffff'; }
    else if (fish.rarity === 'Divine') { style = DIVINE_STYLE; embedColor = '#f8c8ff'; }
    else { style = RARITY_STYLE[fish.rarity] || RARITY_STYLE['Common']; embedColor = RARITY_COLORS[fish.rarity]; }

    const xpNeeded = getXpForNextLevel(player.level);
    const xpBar    = buildXpBar(player.xp, xpNeeded);

    const lines = [
      isEventFish ? `🌊  **${fish.name}**  *(Event Exclusive!)*` : `${style.icon}  **${fish.name}**`,
      '```ml',
      `Rarity  : ${style.label}`,
      `Harga   : ${formatNumber(fish.price + bonusCoin)} koin${coinMultiplier > 1 ? ` (x${coinMultiplier} event!)` : ''}`,
      `XP      : +${formatNumber(finalXp)}${xpMultiplier > 1 ? ` (x${xpMultiplier} event!)` : ''}`,
      `Berat   : ${fishWeight} kg`,
      `Area    : ${player.activeArea}`,
      isOneTime   ? 'Status  : ★ SEKALI TANGKAP' : '',
      isEventFish ? `Token   : +${tokenEarned} 🌊` : (eventActive ? `Token   : +${tokenEarned} 🌊` : ''),
      '```',
      baitUsedMsg,
      DIVIDER,
      `📊 **Level ${player.level}**  —  ${xpBar}`,
      `\`${formatNumber(player.xp)} / ${formatNumber(xpNeeded)} XP\``,
      eventActive ? `\n🌊 **Poseidon Token:** \`${formatNumber(player.poseidonTokens)}\`` : '',
    ].filter(Boolean).join('\n');

    let titleStr = isEventFish ? `🌊  ━━ E V E N T  F I S H ━━` :
                   fish.rarity === 'Secret' ? '〽️  ━━ S E C R E T  F I S H ━━' :
                   fish.rarity === 'Divine' ? '🌸  ━━ D I V I N E  F I S H ━━' :
                   `${fish.emoji}  Tangkapan Baru!`;

    const resultEmbed = new EmbedBuilder()
      .setColor(embedColor)
      .setTitle(titleStr)
      .setDescription(lines)
      .setFooter({ text: isEventFish ? '∆NTRAX • Ikan event eksklusif!' : '∆NTRAX • &sell all untuk jual ikan' });

    if (leveledUp) {
      const isMax = player.level >= MAX_LEVEL;
      resultEmbed.addFields({ name: isMax ? '👑 MAX LEVEL!' : '🎉 LEVEL UP!', value: `\`\`\`fix\nLevel ${player.level}${isMax ? ' — Kamu legenda!' : ''}\n\`\`\``, inline: false });
    }

    if (castMsg) await castMsg.edit({ embeds: [resultEmbed] }).catch(e => console.error('[fish] edit error:', e.message));
    } catch (error) {
      console.error('[Error] Command fish:', error);
      try { await message.reply({ content: '❌ Terjadi kesalahan saat menjalankan command.' }); } catch {}
    }
  },
};
