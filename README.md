# Pedofidesz Tracker

Fidesz pedofil botrányok kronológikus nyilvántartása statikus weboldalon.

## Funkciók

- 📊 **Statisztikák**: Összes botrány, eltérő elkövetők, helyszínek száma
- 📅 **Kronológiai sorrend**: Időrendben visszafelé a botrányok
- 🔗 **Források**: Minden esethez hírforrás link
- 📱 **Reszponzív**: Mobilbarát modern design
- 🛠️ **CLI Tool**: Egyszerű tartalomkezelés
- 🌐 **GitHub Pages**: Automatikus deployment git submodule-lel
- 📜 **Manifesztó**: A projekt céljának és jelentőségének bemutatása, rendszerszintű elemzéssel
- 📨 **Reddit DM**: Új esetek beküldése Reddit üzenetben
- 📄 **Részletes esetek**: Markdown alapú részletes leírások kiválasztott botrányokról

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

#### Interaktív mód
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

#### Paraméterezhető mód
```bash
npm run add-case-params -- "Cikk címe" "Összefoglaló" "URL" "YYYY-MM-DD" "Elkövető" "Helyszín"
```

**Példa:**
```bash
npm run add-case-params -- "Csokonai botrány" "Tanár zaklatta diákot" "https://example.com" "2025-01-18" "J. Dániel" "Debrecen"
```

**Vagy közvetlenül:**
```bash
node cli/add-case-params.js "Csokonai botrány" "Tanár zaklatta diákot" "https://example.com" "2025-01-18" "J. Dániel" "Debrecen"
```

**Hasznos opciók:**
- `--help` vagy `-h`: Használati útmutató
- `--interactive` vagy `-i`: Interaktív mód indítása
- `--has-details`: Részletes oldal létrehozása
- `--details-slug "slug"`: Egyedi slug megadása (opcionális)

### Részletes esetek hozzáadása új esethez
```bash
npm run add-case-params -- "Cikk címe" "Összefoglaló" "URL" "YYYY-MM-DD" "Elkövető" "Helyszín" --has-details
```

Ez automatikusan:
- Létrehoz egy markdown fájlt a `data/details/` mappában
- Hozzáadja a `hasDetails: true` mezőt az esethez
- Generál egy slug-ot a cím alapján
- Megjelenik a "Részletek" gomb a weboldalon

### Részletek hozzáadása meglévő esethez
```bash
npm run add-details
```

**Változatok:**
```bash
# Interaktív mód (eset kiválasztása listából)
npm run add-details

# ID alapján
npm run add-details -- --id "1750830246732"

# Cím alapján (fuzzy search)
npm run add-details -- --title "Csokonai"

# Közvetlenül
node cli/add-details.js --id "1750830246732"
node cli/add-details.js --title "Csokonai botrány"
```

Ez a parancs:
- Megkeresi a megfelelő esetet ID vagy cím alapján
- Létrehoz egy markdown sablont a `data/details/` mappában
- Frissíti a JSON adatbázist a `hasDetails` és `detailsSlug` mezőkkel
- Megjelenik a "Részletek" gomb a weboldalon

### Részletek törlése esetből
```bash
npm run delete-details
```

**Változatok:**
```bash
# Interaktív mód (csak azok az esetek, amelyeknek van részlete)
npm run delete-details

# ID alapján
npm run delete-details -- --id "1750830246732"

# Cím alapján (fuzzy search)
npm run delete-details -- --title "Csokonai"

# Közvetlenül
node cli/delete-details.js --id "1750830246732"
node cli/delete-details.js --title "Csokonai botrány"
```

Ez a parancs:
- Megkeresi a megfelelő esetet ID vagy cím alapján
- Törli a markdown fájlt a `data/details/` mappából
- Eltávolítja a `hasDetails` és `detailsSlug` mezőket az esetből
- A "Részletek" gomb eltűnik a weboldalon

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
      "addedAt": "2024-01-01T00:00:00.000Z",
      "hasDetails": false,
      "detailsSlug": "botrany-slug"
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
- **Markdown**: React Markdown

## Hasznos linkek

- [Gyors Kezdés](QUICKSTART.md)
- [Git Setup](GIT_SETUP.md)
- [GitHub Pages Setup](GITHUB_PAGES_SETUP.md)
- [Manifesztó](MANIFESTO.md) - A projekt céljának és jelentőségének bemutatása

## Licenc

MIT