// ∆NTRAX Fishing Bot — Fish data (EXPANDED)
const FISH = [
  // ══════════════════════════════════════════
  // COMMON (25 ikan)
  // ══════════════════════════════════════════
  { id: 'mujair',    name: 'Ikan Mujair',      rarity: 'Common', price: 50,   xp: 750, emoji: '🐟', areas: ['Sungai','Danau'] },
  { id: 'lele',      name: 'Ikan Lele',         rarity: 'Common', price: 60,   xp: 900, emoji: '🐠', areas: ['Sungai','Danau'] },
  { id: 'nila',      name: 'Ikan Nila',         rarity: 'Common', price: 55,   xp: 800, emoji: '🐟', areas: ['Sungai','Danau'] },
  { id: 'gurame',    name: 'Ikan Gurame',       rarity: 'Common', price: 80,   xp: 1100, emoji: '🐡', areas: ['Sungai','Danau'] },
  { id: 'sardine',   name: 'Ikan Sarden',       rarity: 'Common', price: 45,   xp: 600,  emoji: '🐟', areas: ['Laut'] },
  { id: 'tongkol',   name: 'Ikan Tongkol',      rarity: 'Common', price: 90,   xp: 1350, emoji: '🐠', areas: ['Laut'] },
  { id: 'kembung',   name: 'Ikan Kembung',      rarity: 'Common', price: 70,   xp: 1050, emoji: '🐡', areas: ['Laut'] },
  { id: 'bandeng',   name: 'Ikan Bandeng',      rarity: 'Common', price: 85,   xp: 1200, emoji: '🐟', areas: ['Laut','Danau'] },
  { id: 'gabus',     name: 'Ikan Gabus',        rarity: 'Common', price: 65,   xp: 1000, emoji: '🐟', areas: ['Sungai','Danau'] },
  { id: 'betok',     name: 'Ikan Betok',        rarity: 'Common', price: 40,   xp: 600,  emoji: '🐠', areas: ['Sungai','Danau'] },
  { id: 'sepat',     name: 'Ikan Sepat',        rarity: 'Common', price: 35,   xp: 500,  emoji: '🐡', areas: ['Sungai'] },
  { id: 'tambakan',  name: 'Ikan Tambakan',     rarity: 'Common', price: 45,   xp: 700,  emoji: '🐟', areas: ['Sungai','Danau'] },
  { id: 'layur',     name: 'Ikan Layur',        rarity: 'Common', price: 75,   xp: 1100, emoji: '🐠', areas: ['Laut'] },
  { id: 'selar',     name: 'Ikan Selar',        rarity: 'Common', price: 60,   xp: 900, emoji: '🐟', areas: ['Laut'] },
  { id: 'layang',    name: 'Ikan Layang',       rarity: 'Common', price: 55,   xp: 800, emoji: '🐡', areas: ['Laut'] },
  { id: 'wader',     name: 'Ikan Wader',        rarity: 'Common', price: 30,   xp: 450,  emoji: '🐟', areas: ['Sungai'] },
  { id: 'louhan',    name: 'Ikan Louhan',       rarity: 'Common', price: 75,   xp: 1050, emoji: '🐠', areas: ['Danau','Sungai'] },
  { id: 'cupang',    name: 'Ikan Cupang',       rarity: 'Common', price: 50,   xp: 750, emoji: '🐡', areas: ['Sungai','Danau'] },
  { id: 'baronang',  name: 'Ikan Baronang',     rarity: 'Common', price: 65,   xp: 1000, emoji: '🐟', areas: ['Laut'] },
  { id: 'cakalang',  name: 'Ikan Cakalang',     rarity: 'Common', price: 80,   xp: 1200, emoji: '🐠', areas: ['Laut'] },
  { id: 'belanak',   name: 'Ikan Belanak',      rarity: 'Common', price: 55,   xp: 800, emoji: '🐡', areas: ['Laut','Sungai'] },
  { id: 'papuyu',    name: 'Ikan Papuyu',       rarity: 'Common', price: 45,   xp: 700,  emoji: '🐟', areas: ['Sungai','Danau'] },
  { id: 'gabus_rawa',name: 'Gabus Rawa',        rarity: 'Common', price: 55,   xp: 800, emoji: '🐠', areas: ['Rawa'] },
  { id: 'lele_rawa', name: 'Lele Rawa',         rarity: 'Common', price: 50,   xp: 750, emoji: '🐟', areas: ['Rawa'] },
  { id: 'ikan_es',   name: 'Ikan Es Kutub',     rarity: 'Common', price: 70,   xp: 1050, emoji: '🐡', areas: ['Kutub'] },

  // ══════════════════════════════════════════
  // RARE (22 ikan)
  // ══════════════════════════════════════════
  { id: 'kakap',      name: 'Kakap Merah',       rarity: 'Rare', price: 250,  xp: 4800,  emoji: '🐠', areas: ['Laut','Laut Dalam'] },
  { id: 'bawal',      name: 'Ikan Bawal',        rarity: 'Rare', price: 220,  xp: 4320,  emoji: '🐡', areas: ['Laut','Danau'] },
  { id: 'kerapu',     name: 'Ikan Kerapu',       rarity: 'Rare', price: 300,  xp: 5760,  emoji: '🐠', areas: ['Laut','Laut Dalam'] },
  { id: 'arwana',     name: 'Arwana Silver',     rarity: 'Rare', price: 350,  xp: 6720,  emoji: '🐟', areas: ['Sungai','Danau'] },
  { id: 'mas',        name: 'Ikan Mas',          rarity: 'Rare', price: 200,  xp: 3840,  emoji: '🐡', areas: ['Sungai','Danau'] },
  { id: 'belida',     name: 'Ikan Belida',       rarity: 'Rare', price: 280,  xp: 5280,  emoji: '🐟', areas: ['Sungai'] },
  { id: 'tuna_kecil', name: 'Tuna Kecil',        rarity: 'Rare', price: 320,  xp: 6240,  emoji: '🐠', areas: ['Laut'] },
  { id: 'patin',      name: 'Ikan Patin',        rarity: 'Rare', price: 240,  xp: 4620,  emoji: '🐟', areas: ['Sungai','Danau'] },
  { id: 'barakuda',   name: 'Ikan Barakuda',     rarity: 'Rare', price: 380,  xp: 7200,  emoji: '🐠', areas: ['Laut','Laut Dalam'] },
  { id: 'tenggiri',   name: 'Ikan Tenggiri',     rarity: 'Rare', price: 290,  xp: 5580,  emoji: '🐡', areas: ['Laut'] },
  { id: 'koi_langka', name: 'Koi Langka',        rarity: 'Rare', price: 400,  xp: 7680,  emoji: '🐟', areas: ['Danau'] },
  { id: 'snapper',    name: 'Red Snapper',       rarity: 'Rare', price: 360,  xp: 6900,  emoji: '🐠', areas: ['Laut','Laut Dalam'] },
  { id: 'grouper',    name: 'Giant Grouper',     rarity: 'Rare', price: 420,  xp: 8040,  emoji: '🐡', areas: ['Laut Dalam'] },
  { id: 'sidat',      name: 'Belut Sidat',       rarity: 'Rare', price: 310,  xp: 5940,  emoji: '🐍', areas: ['Sungai','Danau'] },
  { id: 'taimen',     name: 'Ikan Taimen',       rarity: 'Rare', price: 450,  xp: 8640,  emoji: '🐟', areas: ['Sungai'] },
  { id: 'payara',     name: 'Ikan Payara',       rarity: 'Rare', price: 480,  xp: 9240,  emoji: '🐠', areas: ['Sungai','Danau'] },
  { id: 'pompano',    name: 'Ikan Pompano',      rarity: 'Rare', price: 390,  xp: 7500,  emoji: '🐡', areas: ['Laut','Laut Dalam'] },
  { id: 'cobia',      name: 'Ikan Cobia',        rarity: 'Rare', price: 430,  xp: 8280,  emoji: '🐟', areas: ['Laut','Laut Dalam'] },
  { id: 'yellowfin',  name: 'Tuna Sirip Kuning', rarity: 'Rare', price: 460,  xp: 8820,  emoji: '🐠', areas: ['Laut','Laut Dalam'] },
  { id: 'ikan_kristal',name: 'Ikan Kristal',     rarity: 'Rare', price: 500,  xp: 9600, emoji: '💎', areas: ['Gua Bawah Air'] },
  { id: 'belut_rawa', name: 'Belut Rawa Purba',  rarity: 'Rare', price: 420,  xp: 8040,  emoji: '🐍', areas: ['Rawa'] },
  { id: 'cod_kutub',  name: 'Arctic Cod',        rarity: 'Rare', price: 480,  xp: 9240,  emoji: '🐟', areas: ['Kutub'] },

  // ══════════════════════════════════════════
  // EPIC (21 ikan)
  // ══════════════════════════════════════════
  { id: 'tuna',        name: 'Tuna Sirip Biru',   rarity: 'Epic', price: 800,  xp: 16575, emoji: '🐟', areas: ['Laut','Laut Dalam','Samudra'] },
  { id: 'marlin',      name: 'Ikan Marlin',       rarity: 'Epic', price: 1000, xp: 19890, emoji: '⚔️', areas: ['Laut Dalam','Samudra'] },
  { id: 'swordfish',   name: 'Ikan Pedang',       rarity: 'Epic', price: 950,  xp: 18785, emoji: '🗡️', areas: ['Laut Dalam','Samudra'] },
  { id: 'arwana_emas', name: 'Arwana Emas',       rarity: 'Epic', price: 1200, xp: 22100, emoji: '✨', areas: ['Sungai','Danau'] },
  { id: 'napoleon',    name: 'Napoleon Wrasse',   rarity: 'Epic', price: 900,  xp: 17680, emoji: '👑', areas: ['Laut','Laut Dalam'] },
  { id: 'pari',        name: 'Pari Manta',        rarity: 'Epic', price: 1100, xp: 20995, emoji: '🦅', areas: ['Laut Dalam','Samudra'] },
  { id: 'hiu_macan',   name: 'Hiu Macan',         rarity: 'Epic', price: 1300, xp: 23205, emoji: '🦈', areas: ['Laut Dalam'] },
  { id: 'sailfish',    name: 'Ikan Layar',        rarity: 'Epic', price: 1150, xp: 21580, emoji: '⛵', areas: ['Laut Dalam','Samudra'] },
  { id: 'oarfish',     name: 'Oarfish Raksasa',   rarity: 'Epic', price: 1400, xp: 24310, emoji: '🌊', areas: ['Laut Dalam'] },
  { id: 'sunfish',     name: 'Mola Mola',         rarity: 'Epic', price: 1250, xp: 22620, emoji: '☀️', areas: ['Laut','Laut Dalam'] },
  { id: 'wahoo',       name: 'Ikan Wahoo',        rarity: 'Epic', price: 850,  xp: 17160, emoji: '💨', areas: ['Laut','Samudra'] },
  { id: 'dorado',      name: 'Mahi-Mahi',         rarity: 'Epic', price: 980,  xp: 19370, emoji: '🌈', areas: ['Laut','Samudra'] },
  { id: 'king_salmon', name: 'King Salmon',       rarity: 'Epic', price: 1050, xp: 20410, emoji: '🍣', areas: ['Sungai','Danau'] },
  { id: 'sturgeon',    name: 'Ikan Sturgeon',     rarity: 'Epic', price: 1350, xp: 23790, emoji: '🏛️', areas: ['Sungai','Danau','Laut'] },
  { id: 'giant_squid', name: 'Cumi Raksasa',      rarity: 'Epic', price: 1500, xp: 25415, emoji: '🦑', areas: ['Laut Dalam','Samudra'] },
  { id: 'hammerhead',  name: 'Hiu Martil',        rarity: 'Epic', price: 1600, xp: 27040, emoji: '🦈', areas: ['Laut','Laut Dalam'] },
  { id: 'arapaima',    name: 'Arapaima Gigas',    rarity: 'Epic', price: 1450, xp: 24830, emoji: '🐊', areas: ['Sungai'] },
  { id: 'tarpon',      name: 'Ikan Tarpon',       rarity: 'Epic', price: 1100, xp: 21190, emoji: '🌊', areas: ['Laut','Sungai'] },
  { id: 'gua_anglerfish',name: 'Anglerfish Gua',  rarity: 'Epic', price: 1700, xp: 28210, emoji: '💡', areas: ['Gua Bawah Air'] },
  { id: 'rawa_dragon', name: 'Naga Rawa',         rarity: 'Epic', price: 1800, xp: 29250, emoji: '🌿', areas: ['Rawa'] },
  { id: 'narwhal',     name: 'Ikan Unicorn Laut', rarity: 'Epic', price: 2000, xp: 30940, emoji: '🦄', areas: ['Kutub'] },

  // ══════════════════════════════════════════
  // EXOTIC (20 ikan baru)
  // ══════════════════════════════════════════
  { id: 'exotic_aurora',   name: 'Aurora Jellyfish',   rarity: 'Exotic', price: 3500,   xp: 43200,  emoji: '🪼', minWeight: 0.5,  maxWeight: 3.0,  chance: 1.2, areas: ['Laut','Samudra'] },
  { id: 'exotic_cobalt',   name: 'Cobalt Tuna',        rarity: 'Exotic', price: 4200,   xp: 51840,  emoji: '💙', minWeight: 5.0,  maxWeight: 30.0, chance: 1.0, areas: ['Laut Dalam','Samudra'] },
  { id: 'exotic_prism',    name: 'Prism Koi',          rarity: 'Exotic', price: 5000,   xp: 59400,  emoji: '🌈', minWeight: 1.0,  maxWeight: 8.0,  chance: 0.9, areas: ['Danau'] },
  { id: 'exotic_phantom',  name: 'Phantom Catfish',    rarity: 'Exotic', price: 3800,   xp: 45360,  emoji: '👁️', minWeight: 2.0,  maxWeight: 15.0, chance: 1.3, areas: ['Sungai','Rawa'] },
  { id: 'exotic_ember',    name: 'Ember Eel',          rarity: 'Exotic', price: 4500,   xp: 54000,  emoji: '🔥', minWeight: 1.5,  maxWeight: 10.0, chance: 1.1, areas: ['Rawa','Sungai'] },
  { id: 'exotic_glacier',  name: 'Glacier Salmon',     rarity: 'Exotic', price: 6000,   xp: 66960,  emoji: '🧊', minWeight: 3.0,  maxWeight: 20.0, chance: 0.8, areas: ['Kutub'] },
  { id: 'exotic_venom',    name: 'Venom Puffer',       rarity: 'Exotic', price: 5500,   xp: 62640,  emoji: '💚', minWeight: 0.8,  maxWeight: 5.0,  chance: 1.4, areas: ['Laut','Laut Dalam'] },
  { id: 'exotic_abyssal',  name: 'Abyssal Lantern',    rarity: 'Exotic', price: 7000,   xp: 75600,  emoji: '🏮', minWeight: 1.0,  maxWeight: 6.0,  chance: 0.9, areas: ['Laut Dalam'] },
  { id: 'exotic_crimson',  name: 'Crimson Marlin',     rarity: 'Exotic', price: 6500,   xp: 71280,  emoji: '❤️', minWeight: 10.0, maxWeight: 80.0, chance: 0.8, areas: ['Samudra','Laut Dalam'] },
  { id: 'exotic_mystic',   name: 'Mystic Carp',        rarity: 'Exotic', price: 4800,   xp: 57240,  emoji: '🌙', minWeight: 2.0,  maxWeight: 12.0, chance: 1.2, areas: ['Danau','Sungai'] },
  { id: 'exotic_stardust', name: 'Stardust Ray',       rarity: 'Exotic', price: 8000,   xp: 84240,  emoji: '✨', minWeight: 5.0,  maxWeight: 40.0, chance: 1.0, areas: ['Samudra','Laut Dalam'] },
  { id: 'exotic_midnight', name: 'Midnight Barracuda', rarity: 'Exotic', price: 5200,   xp: 60480,  emoji: '🌑', minWeight: 4.0,  maxWeight: 25.0, chance: 1.1, areas: ['Laut','Laut Dalam'] },
  { id: 'exotic_blazing',  name: 'Blazing Dragonfish', rarity: 'Exotic', price: 9000,   xp: 91800,  emoji: '🐲', minWeight: 0.5,  maxWeight: 4.0,  chance: 0.8, areas: ['Laut Dalam','Samudra'] },
  { id: 'exotic_sapphire', name: 'Sapphire Coelacanth',rarity: 'Exotic', price: 10000,  xp: 97200,  emoji: '💠', minWeight: 15.0, maxWeight: 60.0, chance: 1.5, areas: ['Laut Dalam'] },
  { id: 'exotic_golden',   name: 'Golden Arapaima',    rarity: 'Exotic', price: 7500,   xp: 78840,  emoji: '🌟', minWeight: 8.0,  maxWeight: 50.0, chance: 0.9, areas: ['Sungai'] },
  { id: 'exotic_void',     name: 'Void Eel',           rarity: 'Exotic', price: 11000,  xp: 102600,  emoji: '🕳️', minWeight: 1.0,  maxWeight: 8.0,  chance: 0.8, areas: ['Gua Bawah Air'] },
  { id: 'exotic_swamp',    name: 'Swamp Hydra',        rarity: 'Exotic', price: 6800,   xp: 73440,  emoji: '🌿', minWeight: 3.0,  maxWeight: 18.0, chance: 1.3, areas: ['Rawa'] },
  { id: 'exotic_polar',    name: 'Polar Phoenix Fish', rarity: 'Exotic', price: 9500,   xp: 93960,  emoji: '❄️', minWeight: 2.0,  maxWeight: 12.0, chance: 1.0, areas: ['Kutub'] },
  { id: 'exotic_thunder',  name: 'Thunder Shark',      rarity: 'Exotic', price: 12000,  xp: 108000, emoji: '⚡', minWeight: 20.0, maxWeight: 150.0,chance: 1.2, areas: ['Samudra','Laut Dalam'] },
  { id: 'exotic_ancient',  name: 'Ancient Koi Titan',  rarity: 'Exotic', price: 13500,  xp: 118800, emoji: '🏺', minWeight: 5.0,  maxWeight: 30.0, chance: 0.8, areas: ['Danau'] },

  // ══════════════════════════════════════════
  // LEGENDARY (29 ikan — 16 lama + 10 baru + 3 eksklusif area)
  // ══════════════════════════════════════════
  { id: 'coelacanth',     name: 'Coelacanth',         rarity: 'Legendary', price: 5000,  xp: 25000,  emoji: '🌟', minWeight: 20.0, maxWeight: 80.0,  chance: 0.15, areas: ['Laut Dalam','Samudra'] },
  { id: 'megalodon_baby', name: 'Bayi Megalodon',      rarity: 'Legendary', price: 6000,  xp: 30000,  emoji: '💫', minWeight: 50.0, maxWeight: 200.0, chance: 0.12, areas: ['Samudra'] },
  { id: 'hiu_putih',      name: 'Hiu Putih Raksasa',   rarity: 'Legendary', price: 5500,  xp: 27500,  emoji: '⭐', minWeight: 80.0, maxWeight: 300.0, chance: 0.14, areas: ['Laut Dalam','Samudra'] },
  { id: 'paus_mini',      name: 'Paus Pembunuh',       rarity: 'Legendary', price: 7000,  xp: 35000,  emoji: '🐋', minWeight: 200.0,maxWeight: 800.0, chance: 0.10, areas: ['Samudra'] },
  { id: 'kraken_tentacle',name: 'Tentakel Kraken',    rarity: 'Legendary', price: 8000,  xp: 40000,  emoji: '🦑', minWeight: 30.0, maxWeight: 120.0, chance: 0.09, areas: ['Samudra'] },
  { id: 'sea_serpent',    name: 'Ular Laut Purba',     rarity: 'Legendary', price: 9000,  xp: 45000,  emoji: '🐍', minWeight: 40.0, maxWeight: 180.0, chance: 0.08, areas: ['Samudra','Laut Dalam'] },
  { id: 'leviathan_jr',   name: 'Leviathan Muda',      rarity: 'Legendary', price: 10000, xp: 50000, emoji: '🌀', minWeight: 100.0,maxWeight: 400.0, chance: 0.07, areas: ['Samudra'] },
  { id: 'abyssal_ray',    name: 'Pari Jurang Gelap',   rarity: 'Legendary', price: 7500,  xp: 37500,  emoji: '🌑', minWeight: 25.0, maxWeight: 100.0, chance: 0.11, areas: ['Laut Dalam','Samudra'] },
  { id: 'ghost_koi',      name: 'Koi Hantu',           rarity: 'Legendary', price: 8500,  xp: 42500,  emoji: '👻', minWeight: 3.0,  maxWeight: 15.0,  chance: 0.10, areas: ['Danau'] },
  { id: 'titan_crab',     name: 'Kepiting Titan',      rarity: 'Legendary', price: 6500,  xp: 32500,  emoji: '🦀', minWeight: 10.0, maxWeight: 50.0,  chance: 0.12, areas: ['Laut Dalam','Samudra'] },
  { id: 'angler_king',    name: 'Raja Anglerfish',     rarity: 'Legendary', price: 11000, xp: 55000, emoji: '💡', minWeight: 5.0,  maxWeight: 25.0,  chance: 0.08, areas: ['Laut Dalam'] },
  { id: 'kraken_eye',     name: 'Mata Kraken',         rarity: 'Legendary', price: 9500,  xp: 47500,  emoji: '👁️', minWeight: 8.0,  maxWeight: 40.0,  chance: 0.09, areas: ['Laut Dalam','Samudra'] },
  { id: 'deep_whale',     name: 'Paus Abyss',          rarity: 'Legendary', price: 12000, xp: 60000, emoji: '🐋', minWeight: 300.0,maxWeight: 1000.0,chance: 0.07, areas: ['Laut Dalam','Samudra'] },
  { id: 'loch_monster',   name: 'Monster Danau',       rarity: 'Legendary', price: 13000, xp: 65000, emoji: '🦎', minWeight: 50.0, maxWeight: 200.0, chance: 0.06, areas: ['Danau'] },
  { id: 'electric_ray',   name: 'Pari Listrik',        rarity: 'Legendary', price: 8800,  xp: 44000,  emoji: '⚡', minWeight: 15.0, maxWeight: 60.0,  chance: 0.10, areas: ['Laut Dalam','Samudra'] },
  { id: 'shadow_shark',   name: 'Hiu Bayangan',        rarity: 'Legendary', price: 14000, xp: 70000, emoji: '🌑', minWeight: 60.0, maxWeight: 250.0, chance: 0.06, areas: ['Samudra','Laut Dalam'] },
  { id: 'crystal_leviathan',name: 'Leviathan Kristal', rarity: 'Legendary', price: 16000, xp: 80000, emoji: '🔮', minWeight: 80.0, maxWeight: 350.0, chance: 0.05, areas: ['Gua Bawah Air'] },
  { id: 'swamp_god',      name: 'Dewa Rawa Kuno',      rarity: 'Legendary', price: 15000, xp: 75000, emoji: '🌿', minWeight: 30.0, maxWeight: 120.0, chance: 0.07, areas: ['Rawa'] },
  { id: 'ice_leviathan',  name: 'Leviathan Es',        rarity: 'Legendary', price: 18000, xp: 90000, emoji: '🧊', minWeight: 100.0,maxWeight: 450.0, chance: 0.05, areas: ['Kutub'] },
  // 10 Legendary baru
  { id: 'leg_abyssal_kraken',  name: 'Kraken Abyss Jr',     rarity: 'Legendary', price: 20000, xp: 100000, emoji: '🦑', minWeight: 50.0, maxWeight: 200.0, chance: 0.08, areas: ['Samudra','Laut Dalam'] },
  { id: 'leg_void_whale',      name: 'Paus Kekosongan',      rarity: 'Legendary', price: 22000, xp: 110000, emoji: '🌌', minWeight: 200.0,maxWeight: 700.0, chance: 0.06, areas: ['Samudra'] },
  { id: 'leg_time_serpent',    name: 'Ular Waktu',           rarity: 'Legendary', price: 19000, xp: 95000, emoji: '⏳', minWeight: 20.0, maxWeight: 80.0,  chance: 0.09, areas: ['Samudra','Sungai'] },
  { id: 'leg_star_ray',        name: 'Pari Bintang Jatuh',   rarity: 'Legendary', price: 17000, xp: 85000, emoji: '🌠', minWeight: 10.0, maxWeight: 50.0,  chance: 0.10, areas: ['Samudra','Laut Dalam'] },
  { id: 'leg_galaxy_eel',      name: 'Belut Galaksi',        rarity: 'Legendary', price: 21000, xp: 105000, emoji: '🌌', minWeight: 5.0,  maxWeight: 30.0,  chance: 0.07, areas: ['Laut Dalam','Gua Bawah Air'] },
  { id: 'leg_magma_shark',     name: 'Hiu Magma',            rarity: 'Legendary', price: 23000, xp: 115000, emoji: '🌋', minWeight: 40.0, maxWeight: 180.0, chance: 0.06, areas: ['Samudra'] },
  { id: 'leg_frozen_serpent',  name: 'Ular Beku Purba',      rarity: 'Legendary', price: 18500, xp: 92500, emoji: '❄️', minWeight: 15.0, maxWeight: 70.0,  chance: 0.08, areas: ['Kutub'] },
  { id: 'leg_ruin_crab',       name: 'Kepiting Reruntuhan',  rarity: 'Legendary', price: 16500, xp: 82500, emoji: '🦀', minWeight: 20.0, maxWeight: 90.0,  chance: 0.09, areas: ['Gua Bawah Air','Laut Dalam'] },
  { id: 'leg_soul_tuna',       name: 'Tuna Jiwa',            rarity: 'Legendary', price: 25000, xp: 125000, emoji: '👁️', minWeight: 30.0, maxWeight: 120.0, chance: 0.05, areas: ['Samudra'] },
  { id: 'leg_phantom_koi',     name: 'Koi Fantom',           rarity: 'Legendary', price: 24000, xp: 120000, emoji: '👻', minWeight: 2.0,  maxWeight: 12.0,  chance: 0.06, areas: ['Danau','Sungai'] },

  // ══════════════════════════════════════════
  // MYTHIC (25 ikan — 15 lama + 10 baru + 2 khusus)
  // ══════════════════════════════════════════
  { id: 'dragon_fish',    name: 'Ikan Naga',            rarity: 'Mythic', price: 20000,  xp: 154000,  emoji: '🐉', minWeight: 50.0, maxWeight: 200.0, chance: 0.045,  areas: ['Samudra','Laut Dalam'] },
  { id: 'phoenix_fish',   name: 'Ikan Phoenix',         rarity: 'Mythic', price: 25000,  xp: 192500,  emoji: '🔥', minWeight: 30.0, maxWeight: 120.0, chance: 0.04,  areas: ['Samudra'] },
  { id: 'god_fish',       name: 'Ikan Dewa Laut',       rarity: 'Mythic', price: 50000,  xp: 385000,  emoji: '🌊', minWeight: 100.0,maxWeight: 400.0, chance: 0.02,  areas: ['Samudra'] },
  { id: 'void_fish',      name: 'Ikan Kekosongan',      rarity: 'Mythic', price: 35000,  xp: 269500,  emoji: '🌌', minWeight: 20.0, maxWeight: 80.0,  chance: 0.035, areas: ['Samudra','Laut Dalam'] },
  { id: 'celestial_koi',  name: 'Koi Surgawi',          rarity: 'Mythic', price: 40000,  xp: 308000,  emoji: '🌠', minWeight: 5.0,  maxWeight: 25.0,  chance: 0.038, areas: ['Danau','Sungai'] },
  { id: 'abyss_leviathan',name: 'Leviathan Jurang',     rarity: 'Mythic', price: 60000,  xp: 462000,  emoji: '👁️', minWeight: 500.0,maxWeight: 2000.0,chance: 0.015, areas: ['Samudra'] },
  { id: 'time_fish',      name: 'Ikan Waktu',           rarity: 'Mythic', price: 45000,  xp: 346500,  emoji: '⏳', minWeight: 10.0, maxWeight: 60.0,  chance: 0.025, areas: ['Samudra','Laut Dalam'] },
  { id: 'genesis_fish',   name: 'Ikan Genesis',         rarity: 'Mythic', price: 100000, xp: 770000, emoji: '💎', minWeight: 200.0,maxWeight: 800.0, chance: 0.008, areas: ['Samudra'] },
  { id: 'astral_fish',    name: 'Ikan Astral',          rarity: 'Mythic', price: 75000,  xp: 577500,  emoji: '🌟', minWeight: 50.0, maxWeight: 200.0, chance: 0.012, areas: ['Samudra','Laut Dalam'] },
  { id: 'chaos_fish',     name: 'Ikan Kekacauan',       rarity: 'Mythic', price: 80000,  xp: 616000,  emoji: '💥', minWeight: 80.0, maxWeight: 300.0, chance: 0.01, areas: ['Samudra'] },
  { id: 'spirit_fish',    name: 'Ikan Roh Laut',        rarity: 'Mythic', price: 55000,  xp: 423500,  emoji: '👻', minWeight: 15.0, maxWeight: 70.0,  chance: 0.03, areas: ['Samudra','Danau'] },
  { id: 'titan_fish',     name: 'Ikan Titan',           rarity: 'Mythic', price: 120000, xp: 924000, emoji: '⚡', minWeight: 300.0,maxWeight: 1200.0,chance: 0.006, areas: ['Samudra'] },
  { id: 'void_crystal_fish',name: 'Ikan Kristal Void',  rarity: 'Mythic', price: 90000,  xp: 693000,  emoji: '🔮', minWeight: 30.0, maxWeight: 150.0, chance: 0.009, areas: ['Gua Bawah Air'] },
  { id: 'swamp_phantom',  name: 'Hantu Rawa Abadi',     rarity: 'Mythic', price: 85000,  xp: 654500,  emoji: '👻', minWeight: 10.0, maxWeight: 50.0,  chance: 0.011, areas: ['Rawa'] },
  { id: 'frozen_god',     name: 'Dewa Lautan Beku',     rarity: 'Mythic', price: 130000, xp: 1001000, emoji: '🧊', minWeight: 100.0,maxWeight: 500.0, chance: 0.007, areas: ['Kutub'] },
  // 10 Mythic baru
  { id: 'myth_omega_shark',    name: 'Hiu Omega',             rarity: 'Mythic', price: 65000,  xp: 500500,  emoji: '🦈', minWeight: 200.0,maxWeight: 800.0, chance: 0.018, areas: ['Samudra','Laut Dalam'] },
  { id: 'myth_eclipse_ray',    name: 'Pari Gerhana',          rarity: 'Mythic', price: 70000,  xp: 539000,  emoji: '🌘', minWeight: 40.0, maxWeight: 160.0, chance: 0.016, areas: ['Samudra'] },
  { id: 'myth_nebula_eel',     name: 'Belut Nebula',          rarity: 'Mythic', price: 95000,  xp: 731500,  emoji: '🌌', minWeight: 8.0,  maxWeight: 40.0,  chance: 0.009, areas: ['Laut Dalam','Gua Bawah Air'] },
  { id: 'myth_cosmic_whale',   name: 'Paus Kosmik',           rarity: 'Mythic', price: 110000, xp: 847000, emoji: '🐋', minWeight: 600.0,maxWeight: 2500.0,chance: 0.005, areas: ['Samudra'] },
  { id: 'myth_soul_serpent',   name: 'Ular Jiwa Purba',       rarity: 'Mythic', price: 88000,  xp: 677600,  emoji: '🐍', minWeight: 30.0, maxWeight: 130.0, chance: 0.01, areas: ['Samudra','Sungai'] },
  { id: 'myth_radiant_koi',    name: 'Koi Bercahaya',         rarity: 'Mythic', price: 77000,  xp: 592900,  emoji: '🌈', minWeight: 3.0,  maxWeight: 18.0,  chance: 0.013, areas: ['Danau'] },
  { id: 'myth_abyss_god',      name: 'Dewa Jurang',           rarity: 'Mythic', price: 140000, xp: 1078000, emoji: '🌑', minWeight: 400.0,maxWeight: 1500.0,chance: 0.004, areas: ['Samudra','Laut Dalam'] },
  { id: 'myth_storm_tuna',     name: 'Tuna Badai',            rarity: 'Mythic', price: 82000,  xp: 631400,  emoji: '⛈️', minWeight: 60.0, maxWeight: 250.0, chance: 0.012, areas: ['Samudra','Laut Dalam'] },
  // 2 Mythic khusus yang diminta
  { id: 'bahlil_fish',         name: 'Bahlil Fish',           rarity: 'Mythic', price: 75000000, xp: 57750000, emoji: '🧑', minWeight: 1.0,  maxWeight: 5.0,   chance: 0.003, areas: ['Samudra','Laut Dalam','Danau','Sungai'] },
  { id: 'fufufafa_fish',       name: 'Fufufafa Fish',         rarity: 'Mythic', price: 100000000,xp: 77000000,emoji: '👤', minWeight: 0.5,  maxWeight: 3.0,   chance: 0.002, areas: ['Samudra','Laut Dalam','Danau','Sungai'] },

  // ══════════════════════════════════════════
  // DIVINE (5 ikan baru — rarity baru antara Mythic dan Secret)
  // ══════════════════════════════════════════
  { id: 'divine_genesis',    name: 'Genesis of All',      rarity: 'Divine', price: 500000000,  xp: 500000,  emoji: '🌐', minWeight: 1000.0, maxWeight: 5000.0,  chance: 0.0009, areas: ['Samudra','Point Nemo'] },
  { id: 'divine_cosmos',     name: 'Cosmos Leviathan',    rarity: 'Divine', price: 750000000,  xp: 750000,  emoji: '🌌', minWeight: 800.0,  maxWeight: 3500.0,  chance: 0.00075, areas: ['Samudra'] },
  { id: 'divine_eternity',   name: 'Eternity Serpent',    rarity: 'Divine', price: 1000000000, xp: 1000000, emoji: '♾️', minWeight: 200.0,  maxWeight: 1000.0,  chance: 0.00058, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_omega_koi',  name: 'Omega Koi Ilahi',     rarity: 'Divine', price: 600000000,  xp: 600000,  emoji: '🪷', minWeight: 10.0,   maxWeight: 60.0,    chance: 0.00085, areas: ['Danau','Sungai'] },
  { id: 'divine_void_god',   name: 'Void God Fish',       rarity: 'Divine', price: 2000000000, xp: 2000000, emoji: '👑', minWeight: 500.0,  maxWeight: 2000.0,  chance: 0.00018, areas: ['Samudra'] },
  // ── 10 Divine Fish Baru ────────────────────────────────────────
  { id: 'divine_storm_titan',  name: 'Storm Titan',         rarity: 'Divine', price: 800000000,   xp: 800000,  emoji: '⛈️', minWeight: 300.0,  maxWeight: 1200.0,  chance: 0.00072, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_nebula_whale', name: 'Nebula Whale',        rarity: 'Divine', price: 1200000000,  xp: 1200000,  emoji: '🌌', minWeight: 800.0,  maxWeight: 3000.0,  chance: 0.00048, areas: ['Samudra'] },
  { id: 'divine_phoenix',      name: 'Divine Phoenix Fish', rarity: 'Divine', price: 1500000000,  xp: 1500000,  emoji: '🔥', minWeight: 50.0,   maxWeight: 250.0,   chance: 0.00034, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_crystal_king', name: 'Crystal King',        rarity: 'Divine', price: 900000000,   xp: 900000,  emoji: '💎', minWeight: 100.0,  maxWeight: 500.0,   chance: 0.00065, areas: ['Gua Bawah Air','Laut Dalam'] },
  { id: 'divine_abyssal_god',  name: 'Abyssal God',         rarity: 'Divine', price: 2500000000,  xp: 2500000,  emoji: '🌑', minWeight: 600.0,  maxWeight: 2500.0,  chance: 0.00011, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_chaos_dragon', name: 'Chaos Dragon Fish',   rarity: 'Divine', price: 3000000000,  xp: 3000000,  emoji: '🐉', minWeight: 200.0,  maxWeight: 900.0,   chance: 7e-05, areas: ['Samudra'] },
  { id: 'divine_time_god',     name: 'Time God Ancient',    rarity: 'Divine', price: 1800000000,  xp: 1800000,  emoji: '⏳', minWeight: 30.0,   maxWeight: 150.0,   chance: 0.00023, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_shadow_titan', name: 'Shadow Titan',        rarity: 'Divine', price: 2200000000,  xp: 2200000,  emoji: '👁️', minWeight: 400.0,  maxWeight: 1800.0,  chance: 0.00014, areas: ['Samudra'] },
  { id: 'divine_aurora_god',   name: 'Aurora God Fish',     rarity: 'Divine', price: 1600000000,  xp: 1600000,  emoji: '🌠', minWeight: 80.0,   maxWeight: 400.0,   chance: 0.0003, areas: ['Samudra','Kutub'] },
  { id: 'divine_omega_god',    name: 'Omega God',           rarity: 'Divine', price: 5000000000,  xp: 5000000, emoji: '⚡', minWeight: 1000.0, maxWeight: 5000.0,  chance: 1.5e-05, areas: ['Samudra'] },

  // ── 30 Divine Fish Baru ────────────────────────────────────────
  { id: 'divine_solar_titan',     name: 'Solar Titan',          rarity: 'Divine', price: 1100000000,  xp: 1100000,  emoji: '☀️',  minWeight: 200.0,  maxWeight: 900.0,   chance: 0.00052, areas: ['Samudra'] },
  { id: 'divine_lunar_god',       name: 'Lunar God Fish',       rarity: 'Divine', price: 1300000000,  xp: 1300000,  emoji: '🌙',  minWeight: 150.0,  maxWeight: 700.0,   chance: 0.00042, areas: ['Samudra','Kutub'] },
  { id: 'divine_nova_serpent',    name: 'Nova Serpent',         rarity: 'Divine', price: 1400000000,  xp: 1400000,  emoji: '💫',  minWeight: 300.0,  maxWeight: 1300.0,  chance: 0.00039, areas: ['Samudra'] },
  { id: 'divine_quasar_whale',    name: 'Quasar Whale',         rarity: 'Divine', price: 1700000000,  xp: 1700000,  emoji: '🌀',  minWeight: 900.0,  maxWeight: 4000.0,  chance: 0.00027, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_galactic_eel',    name: 'Galactic Eel',         rarity: 'Divine', price: 2000000000,  xp: 2000000,  emoji: '🌌',  minWeight: 50.0,   maxWeight: 250.0,   chance: 0.00019, areas: ['Samudra'] },
  { id: 'divine_inferno_koi',     name: 'Inferno Koi Ilahi',    rarity: 'Divine', price: 700000000,   xp: 700000,   emoji: '🔥',  minWeight: 5.0,    maxWeight: 40.0,    chance: 0.0008, areas: ['Danau','Sungai'] },
  { id: 'divine_frost_emperor',   name: 'Frost Emperor',        rarity: 'Divine', price: 1900000000,  xp: 1900000,  emoji: '❄️',  minWeight: 400.0,  maxWeight: 1700.0,  chance: 0.00021, areas: ['Kutub','Samudra'] },
  { id: 'divine_thunder_kraken',  name: 'Thunder Kraken',       rarity: 'Divine', price: 2300000000,  xp: 2300000,  emoji: '⚡',  minWeight: 700.0,  maxWeight: 3000.0,  chance: 0.00013, areas: ['Samudra'] },
  { id: 'divine_blood_titan',     name: 'Blood Titan Fish',     rarity: 'Divine', price: 2700000000,  xp: 2700000,  emoji: '🩸',  minWeight: 500.0,  maxWeight: 2200.0,  chance: 9e-05, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_jade_dragon',     name: 'Jade Dragon Ilahi',    rarity: 'Divine', price: 850000000,   xp: 850000,   emoji: '🐲',  minWeight: 60.0,   maxWeight: 300.0,   chance: 0.00068, areas: ['Sungai','Danau'] },
  { id: 'divine_phantom_colossus',name: 'Phantom Colossus',     rarity: 'Divine', price: 3200000000,  xp: 3200000,  emoji: '👁️',  minWeight: 800.0,  maxWeight: 3500.0,  chance: 6e-05, areas: ['Samudra'] },
  { id: 'divine_void_leviathan',  name: 'Void Leviathan',       rarity: 'Divine', price: 3500000000,  xp: 3500000,  emoji: '🕳️',  minWeight: 1000.0, maxWeight: 4500.0,  chance: 5e-05, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_eden_angel',      name: 'Eden Angel Fish',      rarity: 'Divine', price: 950000000,   xp: 950000,   emoji: '🌿',  minWeight: 10.0,   maxWeight: 70.0,    chance: 0.00062, areas: ['Danau','Sungai'] },
  { id: 'divine_crimson_hydra',   name: 'Crimson Hydra',        rarity: 'Divine', price: 2800000000,  xp: 2800000,  emoji: '💥',  minWeight: 600.0,  maxWeight: 2600.0,  chance: 8e-05, areas: ['Samudra'] },
  { id: 'divine_celestial_koi',   name: 'Celestial Koi',        rarity: 'Divine', price: 1050000000,  xp: 1050000,  emoji: '🪷',  minWeight: 8.0,    maxWeight: 55.0,    chance: 0.00055, areas: ['Danau'] },
  { id: 'divine_crystal_titan',   name: 'Crystal Titan',        rarity: 'Divine', price: 2100000000,  xp: 2100000,  emoji: '💎',  minWeight: 450.0,  maxWeight: 1900.0,  chance: 0.00016, areas: ['Gua Bawah Air','Laut Dalam'] },
  { id: 'divine_omega_serpent',   name: 'Omega Serpent',        rarity: 'Divine', price: 4000000000,  xp: 4000000,  emoji: '🐍',  minWeight: 200.0,  maxWeight: 800.0,   chance: 3e-05, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_nebula_god',      name: 'Nebula God',           rarity: 'Divine', price: 3800000000,  xp: 3800000,  emoji: '🌠',  minWeight: 700.0,  maxWeight: 3200.0,  chance: 3.5e-05, areas: ['Samudra'] },
  { id: 'divine_aether_ray',      name: 'Aether Stingray',      rarity: 'Divine', price: 1250000000,  xp: 1250000,  emoji: '🌊',  minWeight: 80.0,   maxWeight: 400.0,   chance: 0.00045, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_obsidian_whale',  name: 'Obsidian Whale',       rarity: 'Divine', price: 2600000000,  xp: 2600000,  emoji: '🖤',  minWeight: 1200.0, maxWeight: 5500.0,  chance: 0.0001, areas: ['Samudra'] },
  { id: 'divine_gravity_eel',     name: 'Gravity Eel',          rarity: 'Divine', price: 1450000000,  xp: 1450000,  emoji: '🌑',  minWeight: 40.0,   maxWeight: 200.0,   chance: 0.00036, areas: ['Laut Dalam'] },
  { id: 'divine_stellar_shark',   name: 'Stellar Shark',        rarity: 'Divine', price: 1550000000,  xp: 1550000,  emoji: '🦈',  minWeight: 300.0,  maxWeight: 1400.0,  chance: 0.00032, areas: ['Samudra'] },
  { id: 'divine_echo_titan',      name: 'Echo Titan',           rarity: 'Divine', price: 2400000000,  xp: 2400000,  emoji: '📡',  minWeight: 550.0,  maxWeight: 2400.0,  chance: 0.00012, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_magma_dragon',    name: 'Magma Dragon Fish',    rarity: 'Divine', price: 3100000000,  xp: 3100000,  emoji: '🌋',  minWeight: 250.0,  maxWeight: 1100.0,  chance: 6.5e-05, areas: ['Samudra'] },
  { id: 'divine_polar_god',       name: 'Polar God Ancient',    rarity: 'Divine', price: 1750000000,  xp: 1750000,  emoji: '🧊',  minWeight: 350.0,  maxWeight: 1600.0,  chance: 0.00025, areas: ['Kutub'] },
  { id: 'divine_wind_emperor',    name: 'Wind Emperor Fish',    rarity: 'Divine', price: 2050000000,  xp: 2050000,  emoji: '🌪️',  minWeight: 100.0,  maxWeight: 500.0,   chance: 0.00017, areas: ['Samudra'] },
  { id: 'divine_spirit_whale',    name: 'Spirit Whale Ilahi',   rarity: 'Divine', price: 4500000000,  xp: 4500000,  emoji: '🕊️',  minWeight: 1500.0, maxWeight: 6000.0,  chance: 2e-05,areas: ['Samudra'] },
  { id: 'divine_cosmos_hydra',    name: 'Cosmos Hydra',         rarity: 'Divine', price: 3700000000,  xp: 3700000,  emoji: '🌌',  minWeight: 900.0,  maxWeight: 4200.0,  chance: 4e-05, areas: ['Samudra','Laut Dalam'] },
  { id: 'divine_alpha_god',       name: 'Alpha God',            rarity: 'Divine', price: 6000000000,  xp: 6000000,  emoji: '🔱',  minWeight: 2000.0, maxWeight: 8000.0,  chance: 8e-06,areas: ['Samudra'] },
  { id: 'divine_supreme_one',     name: 'The Supreme One',      rarity: 'Divine', price: 9999000000,  xp: 9999000,  emoji: '👁️',  minWeight: 3000.0, maxWeight: 10000.0, chance: 2e-06,areas: ['Samudra','Point Nemo'] },

  // ══════════════════════════════════════════════════════════
  // SEGITIGA BERMUDA — LEGENDARY & MYTHIC eksklusif (Lv 100)
  // ══════════════════════════════════════════════════════════
  { id: 'bermuda_specter',  name: 'Specter Bermuda',      rarity: 'Legendary', price: 20000,  xp: 100000,  emoji: '🔺', areas: ['Segitiga Bermuda'] },
  { id: 'bermuda_anomaly',  name: 'Anomali Laut Merah',   rarity: 'Legendary', price: 22000,  xp: 110000,  emoji: '🌀', areas: ['Segitiga Bermuda'] },
  { id: 'bermuda_wraith',   name: 'Wraith Kapal Hilang',  rarity: 'Legendary', price: 25000,  xp: 125000,  emoji: '👻', areas: ['Segitiga Bermuda'] },
  { id: 'bermuda_rift',     name: 'Ikan Celah Dimensi',   rarity: 'Legendary', price: 28000,  xp: 140000,  emoji: '🕳️', areas: ['Segitiga Bermuda'] },
  { id: 'bermuda_signal',   name: 'Sinyal Terakhir',      rarity: 'Legendary', price: 30000,  xp: 150000,  emoji: '📡', areas: ['Segitiga Bermuda'] },
  { id: 'bermuda_phantom',  name: 'Phantom Flight 19',    rarity: 'Mythic',    price: 200000, xp: 1400000, emoji: '✈️', areas: ['Segitiga Bermuda'] },
  { id: 'bermuda_vortex',   name: 'Iblis Pusaran',        rarity: 'Mythic',    price: 250000, xp: 1750000, emoji: '🌪️', areas: ['Segitiga Bermuda'] },
  { id: 'bermuda_blackhole',name: 'Ikan Lubang Hitam',    rarity: 'Mythic',    price: 350000, xp: 2450000, emoji: '⚫', areas: ['Segitiga Bermuda'] },
  { id: 'bermuda_god',      name: 'Dewa Bermuda',         rarity: 'Mythic',    price: 450000, xp: 3150000, emoji: '🔱', areas: ['Segitiga Bermuda'] },

  // ══════════════════════════════════════════════════════════
  // POINT NEMO — MYTHIC (sekali tangkap, tidak bisa dobel)
  // ══════════════════════════════════════════════════════════
  { id: 'nemo_abyssal',   name: 'Iblis Jurang Nemo',    rarity: 'Mythic', price: 500000,  xp: 3500000,  emoji: '🌀', areas: ['Point Nemo'], oneTime: true },
  { id: 'nemo_colossus',  name: 'Colossus Nemo',        rarity: 'Mythic', price: 750000,  xp: 5250000,  emoji: '🔱', areas: ['Point Nemo'], oneTime: true },
  { id: 'nemo_void',      name: 'Ikan Kekosongan Abadi',rarity: 'Mythic', price: 600000,  xp: 4200000,  emoji: '🕳️', areas: ['Point Nemo'], oneTime: true },
  { id: 'nemo_omega',     name: 'Omega Ikan Laut',      rarity: 'Mythic', price: 900000,  xp: 6300000,  emoji: '⚡', areas: ['Point Nemo'], oneTime: true },
  { id: 'nemo_phantom',   name: 'Phantasm Nemo',        rarity: 'Mythic', price: 650000,  xp: 4550000,  emoji: '👁️', areas: ['Point Nemo'], oneTime: true },

  // ══════════════════════════════════════════════════════════
  // SECRET FISH — Hanya muncul di area eksklusif masing-masing
  // ══════════════════════════════════════════════════════════
  { id: 'secret_leviathan',  name: 'Leviathan',          rarity: 'Secret', price: 10000000,  xp: 500000,  emoji: '🐉', secretArea: 'Abyssal Trench',  secretChance: 0.0012, areas: ['Abyssal Trench'],  oneTime: false },
  { id: 'secret_kraken',     name: 'Kraken Prime',        rarity: 'Secret', price: 15000000,  xp: 750000,  emoji: '🐙', secretArea: 'Dark Ocean',      secretChance: 0.0009, areas: ['Dark Ocean'],      oneTime: false },
  { id: 'secret_cosmic_koi', name: 'Cosmic Koi',          rarity: 'Secret', price: 20000000,  xp: 1000000,  emoji: '🌌', secretArea: 'Celestial Lake',  secretChance: 0.0007, areas: ['Celestial Lake'],  oneTime: false },
  { id: 'secret_infernal',   name: 'Infernal Eel',        rarity: 'Secret', price: 12000000,  xp: 600000,  emoji: '🔥', secretArea: 'Volcano Bay',     secretChance: 0.001, areas: ['Volcano Bay'],     oneTime: false },
  { id: 'secret_void_god',   name: 'Void God Serpent',    rarity: 'Secret', price: 25000000,  xp: 1250000,  emoji: '🌑', secretArea: 'Void Rift',       secretChance: 0.0006, areas: ['Void Rift'],       oneTime: false },
  { id: 'secret_genesis',    name: 'Genesis Titan',       rarity: 'Secret', price: 50000000,  xp: 2500000,  emoji: '🌟', secretArea: 'Origin Sea',      secretChance: 0.0003, areas: ['Origin Sea'],      oneTime: false },
  { id: 'secret_time',       name: 'Time Devourer',       rarity: 'Secret', price: 30000000,  xp: 1500000,  emoji: '⏳', secretArea: 'Temporal Abyss',  secretChance: 0.0005, areas: ['Temporal Abyss'],  oneTime: false },
  { id: 'secret_storm',      name: 'Storm Leviathan',     rarity: 'Secret', price: 18000000,  xp: 900000,  emoji: '⛈️', secretArea: 'Eternal Storm',   secretChance: 0.0008, areas: ['Eternal Storm'],   oneTime: false },
  { id: 'secret_aurora',     name: 'Aurora Serpent',      rarity: 'Secret', price: 22000000,  xp: 1100000,  emoji: '🌠', secretArea: 'Aurora Depths',   secretChance: 0.0007, areas: ['Aurora Depths'],   oneTime: false },
  { id: 'secret_shadow',     name: 'Shadow of the Deep',  rarity: 'Secret', price: 40000000,  xp: 2000000,  emoji: '👁️', secretArea: 'Shadow Realm',    secretChance: 0.0004, areas: ['Shadow Realm'],    oneTime: false },

  // ══════════════════════════════════════════════════════════
  // POINT NEMO — SECRET (sangat langka, sekali tangkap selamanya)
  // ══════════════════════════════════════════════════════════
  { id: 'secret_zero',    name: '【 Z E R O 】',          rarity: 'Secret', price: 5000000,  xp: 250000,  emoji: '⬛', areas: ['Point Nemo'], oneTime: true, secretChance: 0.06  },
  { id: 'secret_origin',  name: '【 O R I G I N 】',      rarity: 'Secret', price: 8000000,  xp: 400000,  emoji: '🌑', areas: ['Point Nemo'], oneTime: true, secretChance: 0.04  },
  { id: 'secret_god',     name: '【 G O D 】',             rarity: 'Secret', price: 15000000, xp: 750000, emoji: '👑', areas: ['Point Nemo'], oneTime: true, secretChance: 0.025 },
  { id: 'secret_world',   name: '【 W O R L D 】',         rarity: 'Secret', price: 25000000, xp: 1250000, emoji: '🌍', areas: ['Point Nemo'], oneTime: true, secretChance: 0.015 },
  { id: 'secret_abyss',   name: '【 A B Y S S 】',         rarity: 'Secret', price: 40000000, xp: 2000000, emoji: '🌌', areas: ['Point Nemo'], oneTime: true, secretChance: 0.008 },
  { id: 'secret_eternal', name: '【 E T E R N A L 】',     rarity: 'Secret', price: 75000000, xp: 3750000, emoji: '♾️', areas: ['Point Nemo'], oneTime: true, secretChance: 0.004 },
  { id: 'secret_nemo',    name: '【 N E M O 】',           rarity: 'Secret', price: 999999999,xp: 49999999,emoji: '〽️', areas: ['Point Nemo'], oneTime: true, secretChance: 5e-05},

  // ── 10 Secret Fish Area Eksklusif Baru ────────────────────────
  { id: 'secret_frost_titan',   name: 'Frost Titan',          rarity: 'Secret', price: 28000000,  xp: 3500000,  emoji: '🧊', secretArea: 'Frozen Abyss',  secretChance: 0.0006, areas: ['Frozen Abyss'],  oneTime: false },
  { id: 'secret_blood_god',     name: 'Blood God Shark',      rarity: 'Secret', price: 35000000,  xp: 4375000,  emoji: '🩸', secretArea: 'Blood Sea',     secretChance: 0.0005, areas: ['Blood Sea'],     oneTime: false },
  { id: 'secret_phantom_king',  name: 'Phantom King Whale',   rarity: 'Secret', price: 42000000,  xp: 5250000,  emoji: '👻', secretArea: 'Phantom Ocean', secretChance: 0.0004, areas: ['Phantom Ocean'], oneTime: false },
  { id: 'secret_crystal_god',   name: 'Crystal God Eel',      rarity: 'Secret', price: 55000000,  xp: 6875000,  emoji: '💠', secretArea: 'Crystal Abyss', secretChance: 0.0003, areas: ['Crystal Abyss'], oneTime: false },
  { id: 'secret_chaos_hydra',   name: 'Chaos Hydra',          rarity: 'Secret', price: 65000000,  xp: 8125000,  emoji: '💥', secretArea: 'Chaos Sea',     secretChance: 0.00025, areas: ['Chaos Sea'],     oneTime: false },
  { id: 'secret_nebula_dragon', name: 'Nebula Dragon',        rarity: 'Secret', price: 80000000,  xp: 10000000,  emoji: '🌌', secretArea: 'Nebula Waters', secretChance: 0.00022, areas: ['Nebula Waters'], oneTime: false },
  { id: 'secret_dragon_god',    name: 'Dragon God Ancient',   rarity: 'Secret', price: 100000000, xp: 12500000,  emoji: '🐲', secretArea: 'Dragon Grave',  secretChance: 0.00018, areas: ['Dragon Grave'],  oneTime: false },
  { id: 'secret_void_emperor',  name: 'Void Emperor Fish',    rarity: 'Secret', price: 120000000, xp: 15000000,  emoji: '⬛', secretArea: 'Void Sea',      secretChance: 0.00015, areas: ['Void Sea'],      oneTime: false },
  { id: 'secret_eden_serpent',  name: 'Eden Serpent',         rarity: 'Secret', price: 150000000, xp: 18750000,  emoji: '🌿', secretArea: 'Eden Waters',   secretChance: 0.00012, areas: ['Eden Waters'],   oneTime: false },
  { id: 'secret_omega_beast',   name: 'Omega Beast',          rarity: 'Secret', price: 200000000, xp: 25000000, emoji: '🔱', secretArea: 'Omega Rift',    secretChance: 8e-05,areas: ['Omega Rift'],    oneTime: false },

  // ── 10 Secret Fish Baru ────────────────────────────────────────
  { id: 'secret_solar_leviathan', name: 'Solar Leviathan',      rarity: 'Secret', price: 250000000,  xp: 31250000,  emoji: '☀️', secretArea: 'Solar Abyss',   secretChance: 6.5e-05,  areas: ['Solar Abyss'],   oneTime: false },
  { id: 'secret_lunar_serpent',   name: 'Lunar Serpent',        rarity: 'Secret', price: 300000000,  xp: 37500000,  emoji: '🌙', secretArea: 'Lunar Depths',  secretChance: 5e-05,  areas: ['Lunar Depths'],  oneTime: false },
  { id: 'secret_nova_titan',      name: 'Nova Titan',           rarity: 'Secret', price: 380000000,  xp: 47500000,  emoji: '💫', secretArea: 'Nova Crater',   secretChance: 4e-05,  areas: ['Nova Crater'],   oneTime: false },
  { id: 'secret_star_eater',      name: 'Star Eater',           rarity: 'Secret', price: 450000000,  xp: 56250000,  emoji: '⭐', secretArea: 'Stellar Void',  secretChance: 3.2e-05,  areas: ['Stellar Void'],  oneTime: false },
  { id: 'secret_aether_god',      name: 'Aether God Ancient',   rarity: 'Secret', price: 550000000,  xp: 68750000,  emoji: '🌊', secretArea: 'Aether Sea',    secretChance: 2.5e-05,  areas: ['Aether Sea'],    oneTime: false },
  { id: 'secret_cosmos_beast',    name: 'Cosmos Beast',         rarity: 'Secret', price: 650000000,  xp: 81250000,  emoji: '🌌', secretArea: 'Cosmos Trench', secretChance: 1.8e-05, areas: ['Cosmos Trench'], oneTime: false },
  { id: 'secret_thunder_god',     name: 'Thunder God Shark',    rarity: 'Secret', price: 750000000,  xp: 93750000,  emoji: '⚡', secretArea: 'Thunder Deep',  secretChance: 1.2e-05,  areas: ['Thunder Deep'],  oneTime: false },
  { id: 'secret_obsidian_dragon', name: 'Obsidian Dragon Fish', rarity: 'Secret', price: 888000000,  xp: 111000000, emoji: '🐉', secretArea: 'Obsidian Rift', secretChance: 8e-06, areas: ['Obsidian Rift'], oneTime: false },
  { id: 'secret_alpha_leviathan', name: 'Alpha Leviathan',      rarity: 'Secret', price: 999000000,  xp: 124875000, emoji: '🔱', secretArea: 'Alpha Deep',    secretChance: 5e-06, areas: ['Alpha Deep'],    oneTime: false },
  { id: 'secret_supreme_titan',   name: 'The Supreme Titan',    rarity: 'Secret', price: 1500000000, xp: 187500000, emoji: '👑', secretArea: 'Supreme Abyss', secretChance: 1e-06, areas: ['Supreme Abyss'], oneTime: true  },

  // ── 8 Secret Fish Point Nemo Baru (oneTime) ───────────────────
  { id: 'secret_nemo_void',     name: '【 V O I D 】',         rarity: 'Secret', price: 60000000,  xp: 7500000,  emoji: '🕳️', areas: ['Point Nemo'], oneTime: true, secretChance: 0.003   },
  { id: 'secret_nemo_chaos',    name: '【 C H A O S 】',       rarity: 'Secret', price: 80000000,  xp: 10000000,  emoji: '💥', areas: ['Point Nemo'], oneTime: true, secretChance: 0.0022   },
  { id: 'secret_nemo_omega',    name: '【 O M E G A 】',       rarity: 'Secret', price: 120000000, xp: 15000000,  emoji: '⚡', areas: ['Point Nemo'], oneTime: true, secretChance: 0.0016   },
  { id: 'secret_nemo_phantom',  name: '【 P H A N T O M 】',   rarity: 'Secret', price: 160000000, xp: 20000000,  emoji: '👻', areas: ['Point Nemo'], oneTime: true, secretChance: 0.0011  },
  { id: 'secret_nemo_dragon',   name: '【 D R A G O N 】',     rarity: 'Secret', price: 200000000, xp: 25000000, emoji: '🐉', areas: ['Point Nemo'], oneTime: true, secretChance: 0.00075  },
  { id: 'secret_nemo_genesis',  name: '【 G E N E S I S 】',   rarity: 'Secret', price: 350000000, xp: 43750000, emoji: '🌟', areas: ['Point Nemo'], oneTime: true, secretChance: 0.00045  },
  { id: 'secret_nemo_divine',   name: '【 D I V I N E 】',     rarity: 'Secret', price: 500000000, xp: 62500000, emoji: '🌸', areas: ['Point Nemo'], oneTime: true, secretChance: 0.00025  },
  { id: 'secret_nemo_infinity', name: '【 I N F I N I T Y 】', rarity: 'Secret', price: 777777777, xp: 97222222, emoji: '♾️', areas: ['Point Nemo'], oneTime: true, secretChance: 0.0001 },

  // ── Kraken & Godzilla ──────────────────────────────────────────
  {
    id: 'secret_kraken',
    name: 'Kraken',
    rarity: 'Secret',
    price: 250000000,
    xp: 125000000,
    emoji: '🐙',
    minWeight: 9999.0,
    maxWeight: 99999.0,
    areas: ['Dark Ocean', 'Abyssal Trench', 'Void Rift'],
    secretArea: 'Dark Ocean',
    secretChance: 0.0009,
    oneTime: false,
    description: 'Makhluk laut purba yang paling ditakuti. Tentakelnya mampu menghancurkan kapal terbesar sekalipun.',
  },
  {
    id: 'secret_godzilla',
    name: 'Godzilla',
    rarity: 'Secret',
    price: 500000000,
    xp: 250000000,
    emoji: '🦖',
    minWeight: 99999.0,
    maxWeight: 999999.0,
    areas: ['Point Nemo'],
    oneTime: true,
    secretChance: 5e-05,
    description: 'Raja monster laut yang bersemayam di titik terdalam bumi. Hanya satu pemancing di dunia yang pernah melihatnya.',
  },
];

// ══════════════════════════════════════════════════════════
// RARITY STYLING
// ══════════════════════════════════════════════════════════
const RARITY_COLORS = {
  Common:    '#7f8c8d',
  Rare:      '#2980b9',
  Epic:      '#8e44ad',
  Exotic:    '#00b894',
  Legendary: '#e67e22',
  Mythic:    '#c0392b',
  Divine:    '#f8c8ff',
  Secret:    '#ffffff',
};

const RARITY_EMOJI = {
  Common:    '⬜ Common',
  Rare:      '🟦 Rare',
  Epic:      '🟪 Epic',
  Exotic:    '🟩 Exotic',
  Legendary: '🟨 Legendary',
  Mythic:    '🟥 Mythic',
  Divine:    '🌸 Divine',
  Secret:    '⬛ SECRET',
};

const RARITY_BADGE = {
  Common:    '▫️ Common',
  Rare:      '🔷 Rare',
  Epic:      '🔮 Epic',
  Exotic:    '🟢 Exotic',
  Legendary: '🌟 Legendary',
  Mythic:    '💠 Mythic',
  Divine:    '🌸 **D I V I N E**',
  Secret:    '〽️ **S E C R E T**',
};

const BASE_RATES = {
  Common:    60,
  Rare:      25,
  Epic:      10,
  Exotic:    3.5,
  Legendary: 1.2,
  Mythic:    0.08,
  Divine:    0.003,
  Secret:    0, // hanya muncul via logika khusus
};

// ══════════════════════════════════════════════════════════
// AREAS
// ══════════════════════════════════════════════════════════
const MAX_LEVEL = 700;

const AREAS = {
  'Sungai':          { unlockLevel: 1,   desc: 'Aliran sungai yang jernih dan tenang',               emoji: '🏞️' },
  'Danau':           { unlockLevel: 5,   desc: 'Danau biru yang dalam penuh misteri',                emoji: '🏔️' },
  'Rawa':            { unlockLevel: 8,   desc: 'Rawa berlumpur misterius di pinggir hutan gelap',    emoji: '🌿' },
  'Laut':            { unlockLevel: 10,  desc: 'Pantai laut luas dengan ombak gemuruh',              emoji: '🌊' },
  'Laut Dalam':      { unlockLevel: 20,  desc: 'Kegelapan abyssal penuh makhluk purba',              emoji: '🌑' },
  'Gua Bawah Air':   { unlockLevel: 28,  desc: 'Gua tersembunyi di bawah laut penuh kristal ajaib',  emoji: '🔮' },
  'Samudra':         { unlockLevel: 35,  desc: 'Samudra tanpa batas — rumah para dewa laut',         emoji: '🌌' },
  'Kutub':           { unlockLevel: 45,  desc: 'Perairan beku kutub utara — dingin mematikan',       emoji: '🧊' },
  'Abyssal Trench':  { unlockLevel: 60,  desc: '🔒 Area rahasia — rumah Leviathan sejati',           emoji: '🐉', secretOnly: true },
  'Dark Ocean':      { unlockLevel: 70,  desc: '🔒 Samudra kegelapan — Kraken Prime bersemayam',     emoji: '🐙', secretOnly: true },
  'Celestial Lake':  { unlockLevel: 80,  desc: '🔒 Danau bercahaya — Cosmic Koi berenang bebas',     emoji: '🌌', secretOnly: true },
  'Volcano Bay':     { unlockLevel: 65,  desc: '🔒 Teluk vulkanik — Infernal Eel mengintai',         emoji: '🔥', secretOnly: true },
  'Void Rift':       { unlockLevel: 75,  desc: '🔒 Celah dimensi — Void God bersembunyi',            emoji: '🌑', secretOnly: true },
  'Origin Sea':      { unlockLevel: 85,  desc: '🔒 Laut asal mula — Genesis Titan tidur di sini',    emoji: '🌟', secretOnly: true },
  'Temporal Abyss':  { unlockLevel: 90,  desc: '🔒 Jurang waktu — Time Devourer menunggu korban',    emoji: '⏳', secretOnly: true },
  'Eternal Storm':   { unlockLevel: 55,  desc: '🔒 Badai abadi — Storm Leviathan berkuasa',          emoji: '⛈️', secretOnly: true },
  'Aurora Depths':   { unlockLevel: 70,  desc: '🔒 Kedalaman aurora — Aurora Serpent bersinar',      emoji: '🌠', secretOnly: true },
  'Shadow Realm':    { unlockLevel: 95,  desc: '🔒 Alam bayangan — Shadow of the Deep berdiam',      emoji: '👁️', secretOnly: true },
  // ── 10 Area Secret Baru ────────────────────────────────────────
  'Frozen Abyss':    { unlockLevel: 65,  desc: '🔒 Jurang beku abadi — makhluk kuno tertidur di sini',   emoji: '🧊', secretOnly: true },
  'Blood Sea':       { unlockLevel: 72,  desc: '🔒 Laut merah darah — predator puncak berkuasa',         emoji: '🩸', secretOnly: true },
  'Phantom Ocean':   { unlockLevel: 78,  desc: '🔒 Samudra hantu — antara alam nyata dan alam arwah',    emoji: '👻', secretOnly: true },
  'Crystal Abyss':   { unlockLevel: 83,  desc: '🔒 Jurang kristal — cahaya yang membutakan di kedalaman',emoji: '💠', secretOnly: true },
  'Chaos Sea':       { unlockLevel: 88,  desc: '🔒 Laut kekacauan — hukum fisika tidak berlaku di sini', emoji: '💥', secretOnly: true },
  'Nebula Waters':   { unlockLevel: 92,  desc: '🔒 Perairan nebula — bintang-bintang tenggelam di sini', emoji: '🌌', secretOnly: true },
  'Dragon Grave':    { unlockLevel: 96,  desc: '🔒 Kuburan naga — tulang naga membentuk labirin bawah laut', emoji: '🐲', secretOnly: true },
  'Void Sea':        { unlockLevel: 98,  desc: '🔒 Laut kekosongan — tidak ada cahaya, tidak ada suara',  emoji: '⬛', secretOnly: true },
  'Eden Waters':     { unlockLevel: 99,  desc: '🔒 Perairan Eden — surga yang tersembunyi di bawah lautan',emoji: '🌿', secretOnly: true },
  'Omega Rift':      { unlockLevel: 100, desc: '🔒 Celah Omega — titik di mana realita mulai retak',      emoji: '🔱', secretOnly: true },
  'Segitiga Bermuda':{ unlockLevel: 100, desc: 'Zona terlarang penuh anomali & makhluk tak dikenal. Sinyal GPS tidak bekerja di sini.', emoji: '🔺' },
  'Point Nemo':      { unlockLevel: 700, desc: '📍 48°52\'S 123°23\'W — Titik terjauh dari daratan manapun.\nTidak ada yang tahu apa yang hidup di sini.', emoji: '🌀' },
  // ── 10 Area Secret Baru ────────────────────────────────────────
  'Solar Abyss':     { unlockLevel: 105, desc: '🔒 Jurang matahari — Solar Leviathan bersemayam di kedalamannya',        emoji: '☀️', secretOnly: true },
  'Lunar Depths':    { unlockLevel: 110, desc: '🔒 Kedalaman bulan — Lunar Serpent mengintai dalam kegelapan',           emoji: '🌙', secretOnly: true },
  'Nova Crater':     { unlockLevel: 115, desc: '🔒 Kawah nova — ledakan bintang menciptakan area misterius ini',         emoji: '💫', secretOnly: true },
  'Stellar Void':    { unlockLevel: 120, desc: '🔒 Kekosongan bintang — Star Eater memangsa cahaya di sini',             emoji: '⭐', secretOnly: true },
  'Aether Sea':      { unlockLevel: 130, desc: '🔒 Laut eter — energi semesta mengalir di setiap tetes airnya',          emoji: '🌊', secretOnly: true },
  'Cosmos Trench':   { unlockLevel: 140, desc: '🔒 Palung kosmik — titik pertemuan semua galaksi yang tersembunyi',      emoji: '🌌', secretOnly: true },
  'Thunder Deep':    { unlockLevel: 150, desc: '🔒 Kedalaman petir — badai abadi bersumber dari sini',                   emoji: '⚡', secretOnly: true },
  'Obsidian Rift':   { unlockLevel: 160, desc: '🔒 Celah obsidian — terbentuk dari gunung berapi purba yang meledak',    emoji: '🐉', secretOnly: true },
  'Alpha Deep':      { unlockLevel: 175, desc: '🔒 Kedalaman Alpha — awal dari segalanya tersimpan di sini',             emoji: '🔱', secretOnly: true },
  'Supreme Abyss':   { unlockLevel: 200, desc: '🔒 Jurang Tertinggi — hanya satu makhluk yang menguasai tempat ini',     emoji: '👑', secretOnly: true },
};

// ══════════════════════════════════════════════════════════
// RODS (25 total — 20 lama + 5 baru endgame)
// ══════════════════════════════════════════════════════════
const RODS = {
  'Wooden Rod':     { price: 0,          luckBonus: 0,   coinBonus: 0,    rarityBonus: 0,   weightBonus: 0,   description: 'Joran kayu sederhana untuk pemula',             emoji: '🪵', tier: 1  },
  'Bamboo Rod':     { price: 500,        luckBonus: 3,   coinBonus: 0,    rarityBonus: 0,   weightBonus: 0.5, description: 'Joran bambu ringan buatan sendiri',              emoji: '🌿', tier: 2  },
  'Iron Rod':       { price: 1000,       luckBonus: 5,   coinBonus: 1,    rarityBonus: 0,   weightBonus: 1.0, description: 'Joran besi yang kokoh dan tahan lama',           emoji: '⚙️', tier: 3  },
  'Steel Rod':      { price: 3000,       luckBonus: 9,   coinBonus: 2,    rarityBonus: 0,   weightBonus: 1.5, description: 'Joran baja tempa berkualitas tinggi',            emoji: '🔩', tier: 4  },
  'Gold Rod':       { price: 5000,       luckBonus: 12,  coinBonus: 3,    rarityBonus: 1,   weightBonus: 2.0, description: 'Joran emas berkilauan milik bangsawan',          emoji: '✨', tier: 5  },
  'Crystal Rod':    { price: 10000,      luckBonus: 17,  coinBonus: 5,    rarityBonus: 1,   weightBonus: 2.5, description: 'Joran kristal transparan nan elegan',            emoji: '💠', tier: 6  },
  'Diamond Rod':    { price: 20000,      luckBonus: 22,  coinBonus: 7,    rarityBonus: 2,   weightBonus: 3.0, description: 'Joran berlian sekeras intan permata',            emoji: '💎', tier: 7  },
  'Obsidian Rod':   { price: 40000,      luckBonus: 28,  coinBonus: 10,   rarityBonus: 2,   weightBonus: 3.5, description: 'Joran obsidian dari letusan gunung berapi',      emoji: '🌋', tier: 8  },
  'Mythic Rod':     { price: 100000,     luckBonus: 35,  coinBonus: 15,   rarityBonus: 3,   weightBonus: 4.0, description: 'Joran legendaris dari alam arwah',               emoji: '🌟', tier: 9  },
  'Thunder Rod':    { price: 180000,     luckBonus: 42,  coinBonus: 20,   rarityBonus: 3,   weightBonus: 5.0, description: 'Dialiri petir dari langit ke-7',                 emoji: '⚡', tier: 10 },
  'Shadow Rod':     { price: 250000,     luckBonus: 48,  coinBonus: 25,   rarityBonus: 4,   weightBonus: 6.0, description: 'Ditempa dari kegelapan samudra purba',           emoji: '🌑', tier: 11 },
  'Phantom Rod':    { price: 380000,     luckBonus: 55,  coinBonus: 30,   rarityBonus: 4,   weightBonus: 7.0, description: 'Joran tak kasat mata milik sang hantu laut',     emoji: '👻', tier: 12 },
  'Cosmic Rod':     { price: 600000,     luckBonus: 62,  coinBonus: 38,   rarityBonus: 5,   weightBonus: 8.0, description: 'Tersusun dari debu bintang antariksa',           emoji: '🌌', tier: 13 },
  'Dragon Rod':     { price: 800000,     luckBonus: 70,  coinBonus: 45,   rarityBonus: 5,   weightBonus: 9.0, description: 'Dicuri dari cakar naga api purba',               emoji: '🐉', tier: 14 },
  'Celestial Rod':  { price: 1000000,    luckBonus: 78,  coinBonus: 55,   rarityBonus: 6,   weightBonus: 10.0,description: 'Turun dari kahyangan para dewa pemancingan',     emoji: '☀️', tier: 15 },
  'Genesis Rod':    { price: 1500000,    luckBonus: 80,  coinBonus: 60,   rarityBonus: 6,   weightBonus: 11.0,description: 'Joran pertama yang pernah ada di dunia',         emoji: '🔱', tier: 16 },
  'Void Rod':       { price: 2500000,    luckBonus: 90,  coinBonus: 70,   rarityBonus: 7,   weightBonus: 12.0,description: 'Tercabut dari celah kekosongan dimensi lain',    emoji: '🕳️', tier: 17 },
  'Omega Rod':      { price: 4000000,    luckBonus: 102, coinBonus: 85,   rarityBonus: 8,   weightBonus: 14.0,description: 'Senjata pamungkas sang Omega pemancing',         emoji: '🔮', tier: 18 },
  'Titan Rod':      { price: 7000000,    luckBonus: 118, coinBonus: 100,  rarityBonus: 9,   weightBonus: 16.0,description: 'Joran raksasa milik Titan penguasa lautan',      emoji: '🏔️', tier: 19 },
  'Absolute Rod':   { price: 15000000,   luckBonus: 140, coinBonus: 120,  rarityBonus: 10,  weightBonus: 18.0,description: 'Kekuatan absolut. Tidak ada yang melampaui.',    emoji: '👑', tier: 20 },
  // 5 Rod endgame baru
  'Abyss Rod':      { price: 30000000,   luckBonus: 165, coinBonus: 150,  rarityBonus: 12,  weightBonus: 21.0,description: 'Dicabut dari jurang terdalam lautan eksistensi',  emoji: '🌀', tier: 21 },
  'Eclipse Rod':    { price: 60000000,   luckBonus: 195, coinBonus: 185,  rarityBonus: 14,  weightBonus: 25.0,description: 'Diberkahi kekuatan gerhana total semesta',         emoji: '🌘', tier: 22 },
  'Sovereign Rod':  { price: 120000000,  luckBonus: 230, coinBonus: 225,  rarityBonus: 17,  weightBonus: 30.0,description: 'Milik penguasa tunggal seluruh lautan',           emoji: '🏯', tier: 23 },
  'Genesis Rod II': { price: 250000000,  luckBonus: 275, coinBonus: 270,  rarityBonus: 20,  weightBonus: 36.0,description: 'Evolusi dari Genesis — kekuatan penciptaan murni', emoji: '💫', tier: 24 },
  'Void Sovereign': { price: 500000000,  luckBonus: 330, coinBonus: 325,  rarityBonus: 25,  weightBonus: 45.0,description: 'Penguasa kekosongan. Melampaui batas realita.',    emoji: '⚫', tier: 25 },
  // ── 12 Rod Ultra Endgame ────────────────────────────────────────
  'Nebula Rod':     { price: 1000000000,  luckBonus: 390,  coinBonus: 385,  rarityBonus: 30,  weightBonus: 55.0, description: 'Ditenun dari sisa ledakan bintang raksasa.',           emoji: '🌌', tier: 26 },
  'Aether Rod':     { price: 2000000000,  luckBonus: 460,  coinBonus: 455,  rarityBonus: 35,  weightBonus: 65.0, description: 'Mengalir dengan energi eter alam semesta.',             emoji: '🌀', tier: 27 },
  'Phantom King Rod':{ price: 3500000000, luckBonus: 540,  coinBonus: 535,  rarityBonus: 40,  weightBonus: 76.0, description: 'Joran milik sang raja dari dunia arwah.',               emoji: '👑', tier: 28 },
  'Titan Omega Rod':{ price: 6000000000,  luckBonus: 630,  coinBonus: 625,  rarityBonus: 46,  weightBonus: 88.0, description: 'Kekuatan Titan dan Omega menyatu dalam satu joran.',     emoji: '⚡', tier: 29 },
  'Cosmic Void Rod':{ price: 10000000000, luckBonus: 730,  coinBonus: 725,  rarityBonus: 53,  weightBonus: 102.0,description: 'Lahir dari pertemuan kosmik dan kekosongan abadi.',      emoji: '🕳️', tier: 30 },
  'Celestial Omega':{ price: 18000000000, luckBonus: 845,  coinBonus: 840,  rarityBonus: 61,  weightBonus: 118.0,description: 'Berkah surgawi tertinggi, diakui para dewa langit.',      emoji: '☀️', tier: 31 },
  'Dragon God Rod': { price: 30000000000, luckBonus: 975,  coinBonus: 970,  rarityBonus: 70,  weightBonus: 136.0,description: 'Dicabut dari tubuh dewa naga yang tidur selama eon.',     emoji: '🐉', tier: 32 },
  'Abyssal God Rod':{ price: 50000000000, luckBonus: 1120, coinBonus: 1115, rarityBonus: 80,  weightBonus: 156.0,description: 'Dewa jurang yang turun ke dasar terdalam eksistensi.',    emoji: '🌑', tier: 33 },
  'Origin Rod':     { price: 85000000000, luckBonus: 1280, coinBonus: 1275, rarityBonus: 92,  weightBonus: 178.0,description: 'Joran dari asal-usul segalanya — sebelum waktu ada.',     emoji: '🔱', tier: 34 },
  'Eternity Rod':   { price: 150000000000,luckBonus: 1460, coinBonus: 1455, rarityBonus: 105, weightBonus: 203.0,description: 'Kekekalan tersegel di dalamnya. Tak ada akhir.',           emoji: '♾️', tier: 35 },
  'Revelation Rod': { price: 250000000000,luckBonus: 1660, coinBonus: 1655, rarityBonus: 120, weightBonus: 231.0,description: 'Wahyu terakhir alam semesta — hanya satu yang layak.',     emoji: '💫', tier: 36 },
  'Omnipotent Rod':   { price: 500000000000,  luckBonus: 1900,  coinBonus: 1895,  rarityBonus: 140,  weightBonus: 264.0,  description: 'Maha Kuasa. Satu-satunya joran yang melampaui dewa itu sendiri.',    emoji: '🌟', tier: 37 },
  // ── 13 Rod Transcendent (Tier 38–50) ───────────────────────────
  'Transcendent Rod': { price: 900000000000,  luckBonus: 2180,  coinBonus: 2175,  rarityBonus: 160,  weightBonus: 300.0,  description: 'Melampaui batas dunia fana — diakui alam semesta.',                   emoji: '🌌', tier: 38 },
  'Singularity Rod':  { price: 1500000000000, luckBonus: 2500,  coinBonus: 2495,  rarityBonus: 183,  weightBonus: 340.0,  description: 'Lahir dari singularitas alam semesta — satu titik tanpa batas.',       emoji: '⚫', tier: 39 },
  'Arcane Rod':       { price: 2500000000000, luckBonus: 2870,  coinBonus: 2865,  rarityBonus: 210,  weightBonus: 385.0,  description: 'Ditenun dari sihir arkana tertua — sebelum bahasa ada.',               emoji: '🔯', tier: 40 },
  'Primordial Rod':   { price: 4000000000000, luckBonus: 3300,  coinBonus: 3295,  rarityBonus: 240,  weightBonus: 436.0,  description: 'Joran dari era primordial — ketika lautan pertama kali terbentuk.',    emoji: '🌊', tier: 41 },
  'Infinity Rod':     { price: 6500000000000, luckBonus: 3800,  coinBonus: 3795,  rarityBonus: 275,  weightBonus: 494.0,  description: 'Tak terhingga dalam segala hal — luck, koin, nasib.',                  emoji: '♾️', tier: 42 },
  'Sovereign God Rod':{ price: 10000000000000,luckBonus: 4380,  coinBonus: 4375,  rarityBonus: 315,  weightBonus: 560.0,  description: 'Raja para dewa — penguasa lautan dari semua dimensi.',                  emoji: '👑', tier: 43 },
  'Astral Rod':       { price: 16000000000000,luckBonus: 5050,  coinBonus: 5045,  rarityBonus: 362,  weightBonus: 635.0,  description: 'Tersusun dari materi astral yang hanya ada di antara bintang-bintang.', emoji: '🌠', tier: 44 },
  'Chaos Rod':        { price: 25000000000000,luckBonus: 5820,  coinBonus: 5815,  rarityBonus: 416,  weightBonus: 720.0,  description: 'Kekacauan murni yang dipadatkan — tak ada yang bisa memprediksinya.',  emoji: '💥', tier: 45 },
  'Genesis Omega Rod':{ price: 40000000000000,luckBonus: 6710,  coinBonus: 6705,  rarityBonus: 478,  weightBonus: 816.0,  description: 'Gabungan Genesis dan Omega — awal sekaligus akhir dari segalanya.',     emoji: '🔱', tier: 46 },
  'Void Emperor Rod': { price: 65000000000000,luckBonus: 7740,  coinBonus: 7735,  rarityBonus: 550,  weightBonus: 925.0,  description: 'Kaisar kekosongan — bahkan kekosongan tunduk di hadapannya.',           emoji: '🕳️', tier: 47 },
  'Divine Emperor Rod':{ price: 100000000000000,luckBonus: 8930, coinBonus: 8925, rarityBonus: 632,  weightBonus: 1048.0, description: 'Kaisar ilahi — para dewa sendiri yang membuatnya.',                    emoji: '🪷', tier: 48 },
  'Eternal God Rod':  { price: 160000000000000,luckBonus: 10300, coinBonus: 10295,rarityBonus: 728,  weightBonus: 1188.0, description: 'Tuhan pemancingan abadi — eksis sejak sebelum waktu diciptakan.',       emoji: '♾️', tier: 49 },
  'THE ONE Rod':      { price: 250000000000000,luckBonus: 12000, coinBonus: 11995,rarityBonus: 850,  weightBonus: 1350.0, description: '【 T H E   O N E 】— Joran tertinggi. Tidak ada lagi setelah ini.',     emoji: '⬜', tier: 50 },
};

// ══════════════════════════════════════════════════════════
// BAITS
// ══════════════════════════════════════════════════════════
const BAITS = {
  'Worm':        { price: 50,          rarityBonus: 2,  luckBonus: 0,   mythicChance: 0,   legendaryChance: 0,   divineChance: 0,   secretChance: 0,   description: 'Cacing tanah biasa',                    emoji: '🪱' },
  'Shrimp':      { price: 150,         rarityBonus: 5,  luckBonus: 0,   mythicChance: 0,   legendaryChance: 0,   divineChance: 0,   secretChance: 0,   description: 'Udang segar pilihan',                   emoji: '🦐' },
  'Golden Worm': { price: 500,         rarityBonus: 10, luckBonus: 5,   mythicChance: 0,   legendaryChance: 0,   divineChance: 0,   secretChance: 0,   description: 'Cacing emas yang sangat langka',        emoji: '🌟' },
  'Magic Bait':  { price: 2000,        rarityBonus: 18, luckBonus: 10,  mythicChance: 0,   legendaryChance: 0,   divineChance: 0,   secretChance: 0,   description: 'Umpan ajaib racikan sang penyihir',     emoji: '🔮' },
  'Mythic Bait': { price: 8000,        rarityBonus: 30, luckBonus: 20,  mythicChance: 0,   legendaryChance: 0,   divineChance: 0,   secretChance: 0,   description: 'Umpan mitik yang tak ternilai harganya',emoji: '💫' },
  'MBG Bait':       { price: 500000000,   rarityBonus: 50,  luckBonus: 150,  mythicChance: 25,  legendaryChance: 10,  divineChance: 5,    secretChance: 2,    description: 'Umpan premium yang konon membuat ikan langka berdatangan.',emoji: '🍱' },
  // ── 6 Bait Baru ────────────────────────────────────────────────
  'Cursed Bait':    { price: 25000000,    rarityBonus: 38,  luckBonus: 60,   mythicChance: 5,   legendaryChance: 8,   divineChance: 0,    secretChance: 0,    description: 'Umpan terkutuk — ikan langka tertarik pada aura gelapnya.',  emoji: '💀' },
  'Void Bait':      { price: 80000000,    rarityBonus: 44,  luckBonus: 95,   mythicChance: 12,  legendaryChance: 10,  divineChance: 1,    secretChance: 0,    description: 'Umpan dari celah dimensi — memanggil makhluk tak biasa.',    emoji: '🌑' },
  'Celestial Bait': { price: 150000000,   rarityBonus: 46,  luckBonus: 110,  mythicChance: 18,  legendaryChance: 10,  divineChance: 2,    secretChance: 0,    description: 'Diberkahi sinar kahyangan — dewa laut pun mendekat.',        emoji: '🌟' },
  'Dragon Bait':    { price: 250000000,   rarityBonus: 48,  luckBonus: 130,  mythicChance: 22,  legendaryChance: 10,  divineChance: 3,    secretChance: 1,    description: 'Darah naga dipadatkan jadi umpan — berbahaya tapi efektif.', emoji: '🐉' },
  'Abyssal Bait':   { price: 350000000,   rarityBonus: 49,  luckBonus: 140,  mythicChance: 23,  legendaryChance: 10,  divineChance: 4,    secretChance: 1,    description: 'Dari kedalaman jurang paling gelap — tidak semua berani pakai.', emoji: '👁️' },
  'Omega Bait':     { price: 1000000000,  rarityBonus: 55,  luckBonus: 200,  mythicChance: 30,  legendaryChance: 12,  divineChance: 8,    secretChance: 3,    description: 'Puncak teknologi umpan — lebih kuat dari MBG, harganya setimpal.', emoji: '⚡' },
};

// ══════════════════════════════════════════════════════════
// ENCHANTMENTS — 1 enchant aktif per rod, tidak bisa stack
// ══════════════════════════════════════════════════════════
const ENCHANTMENTS = {
  'Luck I':          { price: 2000,    luckBonus: 5,   description: 'Sedikit sentuhan keberuntungan',          emoji: '🍀', tier: 1 },
  'Luck II':         { price: 5000,    luckBonus: 10,  description: 'Keberuntungan yang mulai terasa',          emoji: '🍀', tier: 2 },
  'Luck III':        { price: 12000,   luckBonus: 18,  description: 'Keberuntungan mengalir deras',             emoji: '🍀', tier: 3 },
  'Fortune':         { price: 25000,   luckBonus: 28,  description: 'Jimat keberuntungan sang penjelajah',      emoji: '🎯', tier: 4 },
  'Treasure Hunter': { price: 50000,   luckBonus: 40,  description: 'Pemburu harta dari ujung dunia',           emoji: '🏴‍☠️', tier: 5 },
  'Ancient Seal':    { price: 100000,  luckBonus: 55,  description: 'Segel kuno dari peradaban yang hilang',    emoji: '🔯', tier: 6 },
  'Void Touch':      { price: 200000,  luckBonus: 70,  description: 'Sentuhan kekosongan yang mengubah nasib',  emoji: '🌑', tier: 7 },
  'Star Blessing':   { price: 400000,  luckBonus: 88,  description: 'Berkah bintang jatuh di malam purnama',    emoji: '🌠', tier: 8 },
  'Omega Luck':      { price: 800000,  luckBonus: 108, description: 'Keberuntungan absolut milik sang Omega',   emoji: '⚡', tier: 9 },
  'Genesis Charm':   { price: 2000000,    luckBonus: 130,  description: 'Jimat asal-muasal alam semesta ini',              emoji: '🔱', tier: 10 },
  // ── 15 Enchantment Baru (Tier 11–25) ──────────────────────────
  'Abyss Seal':      { price: 5000000,    luckBonus: 155,  description: 'Segel dari dasar jurang yang tak bertepi',           emoji: '🌑', tier: 11 },
  'Shadow Veil':     { price: 10000000,   luckBonus: 183,  description: 'Tirai kegelapan yang menyembunyikan nasib buruk',    emoji: '🌒', tier: 12 },
  'Cosmic Rune':     { price: 20000000,   luckBonus: 215,  description: 'Rune kuno dari peradaban bintang yang punah',        emoji: '🌌', tier: 13 },
  'Void Crest':      { price: 38000000,   luckBonus: 252,  description: 'Lambang kekosongan yang mengundang ikan langka',     emoji: '🕳️', tier: 14 },
  'Dragon Sigil':    { price: 70000000,   luckBonus: 295,  description: 'Segel naga purba — ikan-ikan takut sekaligus tertarik', emoji: '🐉', tier: 15 },
  'Celestial Mark':  { price: 130000000,  luckBonus: 345,  description: 'Tanda langit yang dipilih para dewa pemancingan',    emoji: '☀️', tier: 16 },
  'Titan Brand':     { price: 240000000,  luckBonus: 402,  description: 'Cap milik Titan — memanggil makhluk-makhluk raksasa',emoji: '🏔️', tier: 17 },
  'Nebula Enchant':  { price: 450000000,  luckBonus: 468,  description: 'Sihir nebula yang menarik ikan dari dimensi lain',   emoji: '✨', tier: 18 },
  'Abyssal Crown':   { price: 800000000,  luckBonus: 543,  description: 'Mahkota abyss — simbol kuasa atas lautan terdalam',  emoji: '👁️', tier: 19 },
  'Phantom Sigil':   { price: 1500000000, luckBonus: 630,  description: 'Tanda hantu abadi yang tak kasat mata',              emoji: '👻', tier: 20 },
  'Eclipse Rune':    { price: 2800000000, luckBonus: 728,  description: 'Rune gerhana — muncul hanya saat matahari tertutup', emoji: '🌘', tier: 21 },
  'Origin Seal':     { price: 5000000000, luckBonus: 840,  description: 'Segel dari titik asal semesta — sangat kuno',        emoji: '🌐', tier: 22 },
  'Divine Rune':     { price: 9000000000, luckBonus: 968,  description: 'Rune ilahi yang ditulis tangan para dewa sendiri',   emoji: '🪷', tier: 23 },
  'Eternal Mark':    { price: 16000000000,luckBonus: 1115, description: 'Tanda kekekalan — melampaui batas ruang dan waktu',  emoji: '♾️', tier: 24 },
  'Omnipotent Seal': { price: 30000000000,luckBonus: 1300, description: 'Segel maha kuasa. Puncak dari semua enchantment.',   emoji: '💎', tier: 25 },
};

// ══════════════════════════════════════════════════════════
// LOGIC
// ══════════════════════════════════════════════════════════
function getRarityRates(player) {
  // Di Point Nemo tidak ada Common/Rare/Epic/Legendary biasa
  if (player.activeArea === 'Point Nemo') {
    return { Mythic: 70, Secret: 30 };
  }

  // Area Secret Fish exclusive
  const secretAreas = ['Abyssal Trench','Dark Ocean','Celestial Lake','Volcano Bay','Void Rift','Origin Sea','Temporal Abyss','Eternal Storm','Aurora Depths','Shadow Realm','Frozen Abyss','Blood Sea','Phantom Ocean','Crystal Abyss','Chaos Sea','Nebula Waters','Dragon Grave','Void Sea','Eden Waters','Omega Rift','Solar Abyss','Lunar Depths','Nova Crater','Stellar Void','Aether Sea','Cosmos Trench','Thunder Deep','Obsidian Rift','Alpha Deep','Supreme Abyss'];
  if (secretAreas.includes(player.activeArea)) {
    return { Secret: 100 };
  }

  const rates = { ...BASE_RATES };
  delete rates.Secret; // Secret tidak muncul di area biasa
  const rod   = RODS[player.activeRod] || RODS['Wooden Rod'];
  const bait  = player.activeBait ? BAITS[player.activeBait] : null;
  const levelBonus = Math.floor((player.level - 1) * 0.5);

  let enchantBonus = 0;
  // Enchant baru: 1 enchant aktif per rod (disimpan di player.activeEnchant)
  const activeEnchant = player.activeEnchant;
  if (activeEnchant && ENCHANTMENTS[activeEnchant]) {
    enchantBonus = ENCHANTMENTS[activeEnchant].luckBonus;
  }

  const baitLuck = bait ? (bait.luckBonus || 0) : 0;
  const totalLuck = rod.luckBonus + (bait ? bait.rarityBonus : 0) + levelBonus + enchantBonus + baitLuck;
  const shift = Math.min(totalLuck, 80);

  rates.Common    = Math.max(5,    rates.Common    - shift * 0.7);
  rates.Rare      += shift * 0.35;
  rates.Epic      += shift * 0.20;
  rates.Exotic    += shift * 0.15;
  rates.Legendary += shift * 0.15;
  rates.Mythic    += shift * 0.10;
  rates.Divine    += shift * 0.05;

  // MBG Bait extra bonus
  if (bait && bait.mythicChance) {
    rates.Mythic    += bait.mythicChance;
    rates.Legendary += bait.legendaryChance;
    rates.Divine    += bait.divineChance;
    // Secret: handled in pickFish via secretChance
  }

  return rates;
}

function pickRarity(rates) {
  const total = Object.values(rates).reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (const [rarity, weight] of Object.entries(rates)) {
    rand -= weight;
    if (rand <= 0) return rarity;
  }
  return 'Common';
}

function pickFish(area, rarity, caughtIds = [], baitName = null) {
  const secretAreas = ['Abyssal Trench','Dark Ocean','Celestial Lake','Volcano Bay','Void Rift','Origin Sea','Temporal Abyss','Eternal Storm','Aurora Depths','Shadow Realm','Frozen Abyss','Blood Sea','Phantom Ocean','Crystal Abyss','Chaos Sea','Nebula Waters','Dragon Grave','Void Sea','Eden Waters','Omega Rift','Solar Abyss','Lunar Depths','Nova Crater','Stellar Void','Aether Sea','Cosmos Trench','Thunder Deep','Obsidian Rift','Alpha Deep','Supreme Abyss'];

  // Area secret fish eksklusif: hanya 1 ikan secret per area
  if (secretAreas.includes(area)) {
    const fish = FISH.find(f => f.rarity === 'Secret' && f.secretArea === area);
    if (!fish) return FISH.find(f => f.rarity === 'Common');

    // MBG Bait extra secret chance
    let secretRoll = Math.random() * 100;
    const bait = baitName ? BAITS[baitName] : null;
    const extraSecretChance = bait ? (bait.secretChance || 0) : 0;
    const adjustedChance = (fish.secretChance || 0.002) * 100 + extraSecretChance;

    if (secretRoll <= adjustedChance) return fish;
    // Kalau gagal chance secret, dapat Legendary biasa dari area manapun
    const legPool = FISH.filter(f => f.rarity === 'Legendary' && !f.areas.includes('Point Nemo') && !f.areas.some(a => secretAreas.includes(a)));
    return legPool.length > 0 ? legPool[Math.floor(Math.random() * legPool.length)] : FISH.find(f => f.rarity === 'Common');
  }

  // Point Nemo
  if (area === 'Point Nemo') {
    if (rarity === 'Secret') {
      const available = FISH.filter(f => f.rarity === 'Secret' && f.areas.includes('Point Nemo') && (!f.oneTime || !caughtIds.includes(f.id)));
      if (available.length === 0) return null;
      const totalChance = available.reduce((sum, f) => sum + (f.secretChance || 0.1), 0);
      let rand = Math.random() * totalChance;
      for (const f of available) {
        rand -= (f.secretChance || 0.1);
        if (rand <= 0) return f;
      }
      return available[0];
    }
    const available = FISH.filter(f => f.rarity === rarity && f.areas.includes('Point Nemo') && (!f.oneTime || !caughtIds.includes(f.id)));
    if (available.length === 0) return pickFish(area, 'Secret', caughtIds);
    return available[Math.floor(Math.random() * available.length)];
  }

  // Area biasa
  let pool = FISH.filter(f => f.rarity === rarity && f.areas.includes(area) && !secretAreas.some(sa => f.areas.length === 1 && f.areas.includes(sa)));
  if (pool.length === 0) {
    const fallback = FISH.filter(f => f.rarity === rarity && !secretAreas.some(sa => f.areas.includes(sa)));
    return fallback.length > 0 ? fallback[Math.floor(Math.random() * fallback.length)] : FISH.find(f => f.rarity === 'Common');
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function getXpForNextLevel(level) {
  // Formula: 300 * level^1.6 — curve moderat, tidak meledak di level tinggi
  // Lv1: 300 | Lv25: 51.739 | Lv100: 475.467 | Lv700: 10.697.397
  return Math.floor(300 * Math.pow(level, 1.6));
}

module.exports = {
  FISH, RARITY_COLORS, RARITY_BADGE, BASE_RATES,
  AREAS, RODS, BAITS, ENCHANTMENTS, MAX_LEVEL,
  getRarityRates, pickRarity, pickFish, getXpForNextLevel,
};
