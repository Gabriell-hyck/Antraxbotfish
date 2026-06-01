const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const fs   = require('fs');
const path = require('path');
const config = require('./config.json');
const { initDatabase } = require('./utils/database');

// ══════════════════════════════════════════════════════════════
// GLOBAL ERROR HANDLERS — mencegah bot crash total
// ══════════════════════════════════════════════════════════════
process.on('unhandledRejection', (reason, promise) => {
  console.error('[FATAL] Unhandled Promise Rejection:', reason);
  // Bot tetap jalan, hanya log error
});

process.on('uncaughtException', (error) => {
  console.error('[FATAL] Uncaught Exception:', error);
  // Bot tetap jalan untuk error non-fatal
});

process.on('uncaughtExceptionMonitor', (error) => {
  console.error('[MONITOR] Exception:', error?.message || error);
});

// ══════════════════════════════════════════════════════════════
// CLIENT SETUP
// ══════════════════════════════════════════════════════════════
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel],
});

client.commands  = new Collection();
client.cooldowns = new Collection();
client.config    = config;

// ══════════════════════════════════════════════════════════════
// LOAD COMMANDS
// ══════════════════════════════════════════════════════════════
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  try {
    const command = require(path.join(commandsPath, file));
    if (command.name) {
      client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias => client.commands.set(alias, command));
      }
    }
    // Register sub-commands (trade.accept, trade.cancel)
    for (const key of ['accept', 'cancel']) {
      if (command[key] && command[key].name) {
        client.commands.set(command[key].name, command[key]);
        if (command[key].aliases) {
          command[key].aliases.forEach(alias => client.commands.set(alias, command[key]));
        }
      }
    }
    console.log(`[Commands] Loaded: ${file}`);
  } catch (err) {
    console.error(`[Commands] Failed to load ${file}:`, err.message);
  }
}

// ══════════════════════════════════════════════════════════════
// LOAD EVENTS
// ══════════════════════════════════════════════════════════════
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));

for (const file of eventFiles) {
  try {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
    console.log(`[Events] Loaded: ${file}`);
  } catch (err) {
    console.error(`[Events] Failed to load ${file}:`, err.message);
  }
}

// ══════════════════════════════════════════════════════════════
// DISCORD CLIENT ERROR HANDLERS
// ══════════════════════════════════════════════════════════════
client.on('error', (error) => {
  console.error('[Discord] Client error:', error.message);
});

client.on('warn', (info) => {
  console.warn('[Discord] Warning:', info);
});

// ══════════════════════════════════════════════════════════════
// INIT & LOGIN
// ══════════════════════════════════════════════════════════════
initDatabase();
client.login(config.token).catch(err => {
  console.error('[Login] Failed to login:', err.message);
  process.exit(1);
});
