const { startEventScheduler } = require('../utils/eventManager');

module.exports = {
  // FIX: renamed from 'ready' to 'clientReady' sesuai Discord.js v14
  name: 'clientReady',
  once: true,
  execute(client) {
    console.log(`[∆NTRAX] Logged in as ${client.user.tag}`);

    // Activity rotation
    const activities = [
      { name: '🎣 &fish | ∆NTRAX Fishing', type: 0 },
      { name: '🌊 &event | Poseidon\'s Blessing', type: 3 },
      { name: '🏆 &leaderboard | ∆NTRAX', type: 0 },
      { name: '📦 &eventshop | Token Shop', type: 0 },
    ];
    let i = 0;
    client.user.setActivity(activities[0].name, { type: activities[0].type });
    setInterval(() => {
      i = (i + 1) % activities.length;
      client.user.setActivity(activities[i].name, { type: activities[i].type });
    }, 15000);

    // Start event scheduler
    startEventScheduler(client);
    console.log('[∆NTRAX] Event scheduler initialized.');
  },
};
