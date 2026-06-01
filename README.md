# 🎣 Gaby Fishing Bot

Discord bot game memancing menggunakan Node.js dan discord.js v14.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Konfigurasi bot:**
   Edit `config.json` dan masukkan token bot kamu:
   ```json
   {
     "token": "TOKEN_BOT_KAMU_DISINI",
     "prefix": "&"
   }
   ```

3. **Jalankan bot:**
   ```bash
   npm start
   ```

## Perintah

| Perintah | Deskripsi |
|----------|-----------|
| `&fish` | Mulai memancing |
| `&area` | Lihat/ganti area |
| `&inventory` | Lihat inventaris |
| `&sell all` | Jual semua ikan |
| `&sell <nama>` | Jual ikan tertentu |
| `&shop` | Lihat toko |
| `&buy <nama>` | Beli rod/bait |
| `&enchant` | Toko enchantment |
| `&profile` | Profil pemain |
| `&leaderboard` | Papan peringkat |
| `&daily` | Reward harian |
| `&quest` | Lihat quest |
| `&claimquest` | Klaim reward quest |
| `&help` | Daftar perintah |

## Struktur Folder

```
gaby-fishing/
├── commands/        # File command bot
├── events/          # Event handler discord.js
├── data/            # Database JSON (auto-generated)
├── utils/           # Helper utilities
├── index.js         # Entry point
├── config.json      # Konfigurasi bot
└── package.json
```

## Cara Mendapatkan Token Bot

1. Buka https://discord.com/developers/applications
2. Buat aplikasi baru
3. Masuk ke tab "Bot"
4. Klik "Reset Token" dan copy token
5. Aktifkan **Message Content Intent** di bagian Privileged Gateway Intents
6. Invite bot ke server dengan permission: Send Messages, Embed Links, Read Message History
