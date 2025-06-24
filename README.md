# Pedofidesz Tracker

Fidesz pedofil botrányok kronológikus nyilvántartása statikus weboldalon.

## Funkciók

- 📊 **Statisztikák**: Összes botrány, eltérő elkövetők, helyszínek száma
- 📅 **Kronológiai sorrend**: Időrendben visszafelé a botrányok
- 🔗 **Források**: Minden esethez hírforrás link
- 📱 **Reszponzív**: Mobilbarát modern design
- 🛠️ **CLI Tool**: Egyszerű tartalomkezelés

## Telepítés

```bash
# Függőségek telepítése
npm install

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

## Hosztolás

A `dist` mappát bármilyen statikus hosztoló szolgáltatáson elhelyezheted:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- stb.

**Fontos**: A `data/cases.json` fájlt is másold át a `dist` mappába!

## Technológia

- **Frontend**: React + Vite
- **Styling**: CSS3 (Glassmorphism design)
- **Icons**: Lucide React
- **CLI**: Node.js

## Licenc

MIT 