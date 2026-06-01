// ═══════════════════════════════════════════════════════════════
// EVENT DATA — Ikan, Rod, Bait, Enchant, Chest event
// ═══════════════════════════════════════════════════════════════

// ── Ikan eksklusif event ──────────────────────────────────────
const EVENT_FISH = [
  {
    id: 'event_crowned_koi',
    name: 'Crowned Koi',
    rarity: 'Legendary',
    price: 50000,
    xp: 5000,
    emoji: '👑',
    minWeight: 3.0,
    maxWeight: 20.0,
    eventOnly: true,
    tokenReward: 15,
    description: 'Koi bermahkota emas yang hanya muncul saat Poseidon berkuasa.',
  },
  {
    id: 'event_ocean_emperor',
    name: 'Ocean Emperor',
    rarity: 'Legendary',
    price: 75000,
    xp: 7500,
    emoji: '🏛️',
    minWeight: 30.0,
    maxWeight: 150.0,
    eventOnly: true,
    tokenReward: 25,
    description: 'Kaisar lautan purba yang bangkit setiap hari Sabtu malam.',
  },
  {
    id: 'event_poseidon_fish',
    name: 'Poseidon Fish',
    rarity: 'Mythic',
    price: 500000,
    xp: 50000,
    emoji: '🔱',
    minWeight: 50.0,
    maxWeight: 300.0,
    eventOnly: true,
    tokenReward: 80,
    description: 'Ikan suci milik dewa laut — hanya muncul saat berkahnya turun.',
  },
  {
    id: 'event_celestial_whale',
    name: 'Celestial Whale',
    rarity: 'Mythic',
    price: 750000,
    xp: 75000,
    emoji: '🌌',
    minWeight: 500.0,
    maxWeight: 2000.0,
    eventOnly: true,
    tokenReward: 120,
    description: 'Paus surgawi raksasa yang muncul dari langit ke dalam laut.',
  },
];

// ── Chance event fish (dari total pool saat event) ─────────────
const EVENT_FISH_CHANCES = {
  event_crowned_koi:    8.0,   // 8% dari total catch saat event
  event_ocean_emperor:  5.0,
  event_poseidon_fish:  2.0,
  event_celestial_whale:1.0,
};

// ── Token reward per rarity (non-event fish) ──────────────────
const TOKEN_REWARD_BY_RARITY = {
  Common:    1,
  Rare:      2,
  Epic:      4,
  Exotic:    6,
  Legendary: 10,
  Mythic:    20,
  Divine:    50,
  Secret:    100,
};

// ── Rod event shop ────────────────────────────────────────────
const EVENT_RODS = {
  'Poseidon Rod': {
    price: 0,           // harga dalam Poseidon Token
    tokenPrice: 200,
    luckBonus: 500,
    coinBonus: 450,
    rarityBonus: 45,
    weightBonus: 80.0,
    description: 'Joran suci Poseidon — diberkahi kekuatan lautan.',
    emoji: '🔱',
    tier: 51,
    eventOnly: true,
  },
  'Celestial Rod': {
    price: 0,
    tokenPrice: 350,
    luckBonus: 800,
    coinBonus: 750,
    rarityBonus: 70,
    weightBonus: 120.0,
    description: 'Joran cahaya surgawi — hanya ada saat Poseidon hadir.',
    emoji: '🌌',
    tier: 52,
    eventOnly: true,
  },
};

// ── Bait event shop ───────────────────────────────────────────
const EVENT_BAITS = {
  'Ocean Bait': {
    tokenPrice: 30,
    rarityBonus: 35,
    luckBonus: 80,
    mythicChance: 10,
    legendaryChance: 8,
    divineChance: 2,
    secretChance: 0,
    eventFishBonus: 20,   // +20% chance event fish
    description: 'Umpan lautan — memanggil ikan event lebih sering.',
    emoji: '🌊',
    eventOnly: true,
  },
  'Divine Bait': {
    tokenPrice: 80,
    rarityBonus: 48,
    luckBonus: 180,
    mythicChance: 28,
    legendaryChance: 12,
    divineChance: 6,
    secretChance: 2,
    eventFishBonus: 40,
    description: 'Umpan ilahi dari kuil Poseidon — sangat langka.',
    emoji: '🪷',
    eventOnly: true,
  },
};

// ── Enchant event shop ────────────────────────────────────────
const EVENT_ENCHANTS = {
  'Ocean Fortune': {
    tokenPrice: 50,
    luckBonus: 200,
    description: 'Keberuntungan lautan mengalir dalam rod kamu.',
    emoji: '🌊',
    tier: 26,
    eventOnly: true,
  },
  "Poseidon's Blessing": {
    tokenPrice: 120,
    luckBonus: 400,
    description: 'Restu langsung dari Poseidon sang dewa laut.',
    emoji: '🔱',
    tier: 27,
    eventOnly: true,
  },
};

// ── Chest event shop ──────────────────────────────────────────
const EVENT_CHESTS = {
  'Lucky Chest': {
    tokenPrice: 15,
    emoji: '📦',
    color: '#2ecc71',
    description: 'Kotak keberuntungan berisi hadiah acak.',
    rewards: [
      { type: 'coins',  value: [5000,   50000],   weight: 40 },
      { type: 'xp',     value: [1000,   10000],   weight: 30 },
      { type: 'bait',   value: 'Golden Worm',     weight: 15 },
      { type: 'bait',   value: 'Magic Bait',      weight: 10 },
      { type: 'token',  value: [3, 8],            weight: 5  },
    ],
  },
  'Epic Chest': {
    tokenPrice: 40,
    emoji: '🟣',
    color: '#8e44ad',
    description: 'Kotak epik berisi item berkualitas tinggi.',
    rewards: [
      { type: 'coins',  value: [50000,  500000],  weight: 30 },
      { type: 'xp',     value: [10000,  100000],  weight: 25 },
      { type: 'bait',   value: 'Mythic Bait',     weight: 15 },
      { type: 'bait',   value: 'Cursed Bait',     weight: 10 },
      { type: 'fish',   rarity: 'Epic',           weight: 10 },
      { type: 'token',  value: [8, 20],           weight: 10 },
    ],
  },
  'Mythic Chest': {
    tokenPrice: 100,
    emoji: '🔴',
    color: '#c0392b',
    description: 'Kotak mitik — berisi item sangat langka.',
    rewards: [
      { type: 'coins',  value: [500000,  5000000], weight: 20 },
      { type: 'xp',     value: [100000,  1000000], weight: 15 },
      { type: 'bait',   value: 'Void Bait',        weight: 15 },
      { type: 'bait',   value: 'Dragon Bait',      weight: 10 },
      { type: 'fish',   rarity: 'Legendary',       weight: 15 },
      { type: 'fish',   rarity: 'Mythic',          weight: 10 },
      { type: 'enchant',value: 'Void Touch',       weight: 5  },
      { type: 'token',  value: [20, 50],           weight: 10 },
    ],
  },
  "Poseidon's Chest": {
    tokenPrice: 250,
    emoji: '🔱',
    color: '#00c9ff',
    description: 'Kotak tertinggi — dipenuhi berkah Poseidon sendiri.',
    rewards: [
      { type: 'coins',  value: [5000000,  50000000], weight: 15 },
      { type: 'xp',     value: [1000000,  10000000], weight: 10 },
      { type: 'bait',   value: 'MBG Bait',           weight: 10 },
      { type: 'bait',   value: 'Omega Bait',         weight: 8  },
      { type: 'fish',   rarity: 'Mythic',            weight: 15 },
      { type: 'fish',   rarity: 'Divine',            weight: 8  },
      { type: 'enchant',value: 'Genesis Charm',      weight: 8  },
      { type: 'enchant',value: 'Abyss Seal',         weight: 6  },
      { type: 'rod',    value: 'Poseidon Rod',       weight: 5  },
      { type: 'token',  value: [50, 150],            weight: 15 },
    ],
  },
};

// ── Helper: roll chest reward ─────────────────────────────────
function rollChestReward(chestName, allFish, allEnchants, allRods) {
  const chest = EVENT_CHESTS[chestName];
  if (!chest) return null;

  const totalWeight = chest.rewards.reduce((s, r) => s + r.weight, 0);
  let rand = Math.random() * totalWeight;
  let chosen = chest.rewards[chest.rewards.length - 1];
  for (const r of chest.rewards) {
    rand -= r.weight;
    if (rand <= 0) { chosen = r; break; }
  }

  const result = { type: chosen.type };

  if (chosen.type === 'coins') {
    result.value = Math.floor(chosen.value[0] + Math.random() * (chosen.value[1] - chosen.value[0]));
  } else if (chosen.type === 'xp') {
    result.value = Math.floor(chosen.value[0] + Math.random() * (chosen.value[1] - chosen.value[0]));
  } else if (chosen.type === 'token') {
    result.value = Math.floor(chosen.value[0] + Math.random() * (chosen.value[1] - chosen.value[0]));
  } else if (chosen.type === 'bait') {
    result.name = chosen.value;
  } else if (chosen.type === 'fish') {
    const pool = allFish.filter(f => f.rarity === chosen.rarity && !f.eventOnly && !f.oneTime);
    result.fish = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
  } else if (chosen.type === 'enchant') {
    result.name = chosen.value;
    result.data = allEnchants[chosen.value];
  } else if (chosen.type === 'rod') {
    result.name = chosen.value;
    result.data = EVENT_RODS[chosen.value];
  }

  return result;
}

module.exports = {
  EVENT_FISH,
  EVENT_FISH_CHANCES,
  TOKEN_REWARD_BY_RARITY,
  EVENT_RODS,
  EVENT_BAITS,
  EVENT_ENCHANTS,
  EVENT_CHESTS,
  rollChestReward,
};
