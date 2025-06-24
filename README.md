# Pedofidesz Tracker

Fidesz pedofil botrányok kronológikus nyilvántartása statikus weboldalon.

## Funkciók

- 📊 **Statisztikák**: Összes botrány, eltérő elkövetők, helyszínek száma
- 📅 **Kronológiai sorrend**: Időrendben visszafelé a botrányok
- 🔗 **Források**: Minden esethez hírforrás link
- 📱 **Reszponzív**: Mobilbarát modern design
- 🛠️ **CLI Tool**: Egyszerű tartalomkezelés
- 🌐 **GitHub Pages**: Automatikus deployment git submodule-lel

## Telepítés

```bash
# Függőségek telepítése
npm install

# Git beállítása (GitHub Pages submodule-lel)
npm run setup-git

# Fejlesztői szerver indítása
npm run dev

# Production build
npm run build
```

## CLI Használat

### Új botrány hozzáadása
```bash
npm run add-case
```

Interaktív módon kérdezi ki:
- 📰 Cikk címe
- 📝 Rövid összefoglaló  
- 🔗 Hírforrás URL
- 📅 Dátum (YYYY-MM-DD)
- 👤 Elkövető neve/pozíciója
- 📍 Helyszín

### Botrányok listázása
```bash
npm run list-cases
```

### Botrány törlése
```bash
npm run delete-case
```

## 🌐 GitHub Pages Deployment

A projekt git submodule-lel van konfigurálva a GitHub Pages automatikus deployment-hez.

### Beállítás
1. Hozz létre két repository-t:
   - `pedofidesz-tracker` (fő projekt)
   - `pedofidesz-tracker-pages` (GitHub Pages)
2. Frissítsd a `.gitmodules` fájlt a saját felhasználóneveddel
3. Futtasd: `npm run setup-git`

### Deployment
```bash
# Automatikus build és push a GitHub Pages-re
npm run deploy
```

Részletes útmutató: [GIT_SETUP.md](GIT_SETUP.md)

## Adatstruktúra

A botrányok a `data/cases.json` fájlban tárolódnak:

```json
{
  "cases": [
    {
      "id": "1704067200000",
      "title": "Botrány címe",
      "summary": "Rövid összefoglaló",
      "sourceUrl": "https://hirforras.hu/cikk",
      "date": "2024-01-01",
      "perpetrator": "Elkövető neve",
      "location": "Helyszín",
      "addedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
```

## Hosztolási opciók

### GitHub Pages (Ajánlott)
- Automatikus deployment git submodule-lel
- `npm run deploy` parancs
- URL: `https://YOUR_USERNAME.github.io/pedofidesz-tracker-pages/`

### Egyéb statikus hosztolók
- Netlify
- Vercel
- Firebase Hosting
- stb.

## Technológia

- **Frontend**: React + Vite
- **Styling**: CSS3 (Glassmorphism design)
- **Icons**: Lucide React
- **CLI**: Node.js
- **Deployment**: Git Submodule + GitHub Pages

## Hasznos linkek

- [Gyors Kezdés](QUICKSTART.md)
- [Git Setup](GIT_SETUP.md)
- [GitHub Pages Setup](GITHUB_PAGES_SETUP.md)

## Licenc

MIT 