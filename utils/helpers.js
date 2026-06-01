const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

const DIVIDER      = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
const DIVIDER_THIN = '┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄';

function baseEmbed(color) {
  return new EmbedBuilder()
    .setColor(color || config.embedColor)
    .setTimestamp()
    .setFooter({ text: `${config.botName} • Fishing Universe` });
}
function createEmbed(title, description, color) {
  return baseEmbed(color).setTitle(title).setDescription(description || '');
}
function errorEmbed(message) {
  return baseEmbed('#ff4757').setTitle('╔ ✖ ERROR').setDescription(`\`\`\`\n${message}\n\`\`\``);
}
function successEmbed(title, message) {
  return baseEmbed('#2ed573').setTitle(`╔ ✔ ${title}`).setDescription(message);
}
function infoEmbed(title, description) {
  return baseEmbed('#00c9ff').setTitle(`╔ ℹ ${title}`).setDescription(description);
}

function formatNumber(n) {
  return Number(n).toLocaleString('id-ID');
}
function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}j ${m % 60}m ${s % 60}d`;
  if (m > 0) return `${m}m ${s % 60}d`;
  return `${s}d`;
}

function buildXpBar(current, max, length = 12) {
  const pct = Math.min(1, current / max);
  const filled = Math.round(pct * length);
  const empty  = length - filled;
  const bar    = '▰'.repeat(filled) + '▱'.repeat(empty);
  const percent = Math.floor(pct * 100);
  return `${bar}  **${percent}%**`;
}

const RARITY_STYLE = {
  Common:    { color: '#7f8c8d', icon: '▫️',  label: 'COMMON',      bar: '░' },
  Rare:      { color: '#2980b9', icon: '🔷',  label: 'RARE',        bar: '▒' },
  Epic:      { color: '#8e44ad', icon: '🔮',  label: 'EPIC',        bar: '▓' },
  Exotic:    { color: '#00b894', icon: '🟢',  label: 'EXOTIC',      bar: '▓' },
  Legendary: { color: '#e67e22', icon: '🌟',  label: 'LEGENDARY',   bar: '█' },
  Mythic:    { color: '#c0392b', icon: '💠',  label: 'MYTHIC',      bar: '▪' },
  Divine:    { color: '#f8c8ff', icon: '🌸',  label: 'D I V I N E', bar: '▮' },
  Secret:    { color: '#ffffff', icon: '〽️', label: 'S E C R E T', bar: '▮' },
};

module.exports = {
  DIVIDER, DIVIDER_THIN,
  baseEmbed, createEmbed, errorEmbed, successEmbed, infoEmbed,
  formatNumber, formatTime, buildXpBar, RARITY_STYLE,
};
