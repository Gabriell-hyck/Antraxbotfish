// ══════════════════════════════════════════════════════════════
// ADMIN GUARD — cek apakah user adalah admin/owner
// Pakai username Discord (bukan ID) sesuai request
// ══════════════════════════════════════════════════════════════

/**
 * Cek apakah message.author adalah owner (level tertinggi)
 */
function isOwner(message) {
  const ownerName = message.client.config.ownerId || '';
  return message.author.username.toLowerCase() === ownerName.toLowerCase();
}

/**
 * Cek apakah message.author adalah admin atau owner
 */
function isAdmin(message) {
  if (isOwner(message)) return true;
  const adminList = message.client.config.adminUsers || [];
  return adminList.some(name => name.toLowerCase() === message.author.username.toLowerCase());
}

/**
 * Guard middleware — reply dan return false jika bukan admin
 * Usage: if (!await requireAdmin(message)) return;
 */
async function requireAdmin(message) {
  if (isAdmin(message)) return true;
  await message.reply({
    embeds: [{
      color: 0xff4757,
      title: '🔒  Akses Ditolak',
      description: '```\nPerintah ini hanya untuk admin bot.\n```',
      footer: { text: '∆NTRAX Fishing Universe' },
    }]
  }).catch(() => {});
  return false;
}

/**
 * Guard middleware — hanya owner
 */
async function requireOwner(message) {
  if (isOwner(message)) return true;
  await message.reply({
    embeds: [{
      color: 0xff4757,
      title: '👑  Akses Ditolak',
      description: '```\nPerintah ini hanya untuk owner bot.\n```',
      footer: { text: '∆NTRAX Fishing Universe' },
    }]
  }).catch(() => {});
  return false;
}

module.exports = { isAdmin, isOwner, requireAdmin, requireOwner };
