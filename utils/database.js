const fs   = require('fs');
const path = require('path');

const DB_PATH    = path.join(__dirname, '..', 'data', 'players.json');
const QUEST_PATH = path.join(__dirname, '..', 'data', 'quests.json');

// ── Write queue — mencegah race condition corrupt JSON ─────────
let _writeQueue    = Promise.resolve();
let _questQueue    = Promise.resolve();

function initDatabase() {
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(DB_PATH))    fs.writeFileSync(DB_PATH,    JSON.stringify({}, null, 2));
  if (!fs.existsSync(QUEST_PATH)) fs.writeFileSync(QUEST_PATH, JSON.stringify({}, null, 2));
  console.log('[Database] Initialized successfully.');
}

function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    if (!raw || !raw.trim()) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('[Database] readDB error:', e.message);
    return {};
  }
}

// FIX: Queued write — operasi tulis dijalankan satu per satu
function writeDB(data) {
  _writeQueue = _writeQueue.then(() => {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('[Database] writeDB error:', e.message);
    }
  });
  return _writeQueue;
}

function readQuestDB() {
  try {
    const raw = fs.readFileSync(QUEST_PATH, 'utf8');
    if (!raw || !raw.trim()) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('[Database] readQuestDB error:', e.message);
    return {};
  }
}

function writeQuestDB(data) {
  _questQueue = _questQueue.then(() => {
    try {
      fs.writeFileSync(QUEST_PATH, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('[Database] writeQuestDB error:', e.message);
    }
  });
  return _questQueue;
}

function getPlayer(userId) {
  const db = readDB();
  if (!db[userId]) {
    db[userId] = {
      userId,
      coins:          0,
      xp:             0,
      level:          1,
      inventory:      [],
      activeRod:      'Wooden Rod',
      activeBait:     null,
      activeArea:     'Sungai',
      activeEnchant:  null,
      lastDaily:      null,
      lastFish:       null,
      totalFishCaught:0,
      poseidonTokens: 0,
      chests:         {},
      ownedEventRods: [],
      oneTimeCaught:  [],
      aquarium:       { tier: 1, fish: [] },
      firstSeen:      Date.now(),   // FIX: track kapan pertama main (untuk veteran LB)
    };
    writeDB(db);
  }

  // FIX: Patch player lama yang mungkin belum punya field baru
  const p = db[userId];
  if (!p.inventory)      p.inventory      = [];
  if (!p.chests)         p.chests         = {};
  if (!p.ownedEventRods) p.ownedEventRods = [];
  if (!p.oneTimeCaught)  p.oneTimeCaught  = [];
  if (!p.aquarium)       p.aquarium       = { tier: 1, fish: [] };
  if (p.poseidonTokens == null) p.poseidonTokens = 0;
  if (p.totalFishCaught == null) p.totalFishCaught = 0;
  if (!p.activeEnchant)  p.activeEnchant  = p.activeEnchant || null;
  if (!p.firstSeen)      p.firstSeen      = Date.now();

  return p;
}

function savePlayer(player) {
  if (!player || !player.userId) {
    console.error('[Database] savePlayer: invalid player object');
    return;
  }
  const db = readDB();
  db[player.userId] = player;
  writeDB(db);
}

function getAllPlayers() {
  return readDB();
}

function deletePlayer(userId) {
  const db = readDB();
  if (db[userId]) {
    delete db[userId];
    writeDB(db);
    return true;
  }
  return false;
}

function getPlayerQuest(userId) {
  const db  = readQuestDB();
  const now = Date.now();
  if (!db[userId] || now - db[userId].resetTime > 86400000) {
    db[userId] = {
      userId,
      resetTime: now,
      quests: [
        { id: 'catch10',   desc: 'Tangkap 10 ikan',   type: 'catch',     target: 10, progress: 0, reward: { coins: 500,  xp: 200 }, claimed: false },
        { id: 'catchRare3',desc: 'Tangkap 3 ikan Rare',type: 'catchRare', target: 3,  progress: 0, reward: { coins: 1000, xp: 400 }, claimed: false },
        { id: 'sell15',    desc: 'Jual 15 ikan',       type: 'sell',      target: 15, progress: 0, reward: { coins: 800,  xp: 300 }, claimed: false },
      ],
    };
    writeQuestDB(db);
  }
  return db[userId];
}

function savePlayerQuest(questData) {
  if (!questData || !questData.userId) {
    console.error('[Database] savePlayerQuest: invalid quest data');
    return;
  }
  const db = readQuestDB();
  db[questData.userId] = questData;
  writeQuestDB(db);
}

module.exports = {
  initDatabase,
  getPlayer, savePlayer, getAllPlayers, deletePlayer,
  getPlayerQuest, savePlayerQuest,
};
