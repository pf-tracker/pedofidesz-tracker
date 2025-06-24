# 🔗 Reddit DM Beküldési Funkció Beállítása

A weboldalon egy "Új eset beküldése" gomb található, ami Reddit DM-re irányít a látogatókat, ahol új Fidesz pedofil botrányokat tudnak beküldeni.

## 🚀 Beállítás

### 1. Reddit felhasználónév beállítása

Módosítsd a `src/config.js` fájlt:

```javascript
export const config = {
  // Cseréld ki a saját Reddit felhasználónevedre
  redditUsername: 'YOUR_REDDIT_USERNAME',
  
  // GitHub Pages URL (opcionális)
  githubPagesUrl: 'https://YOUR_USERNAME.github.io/pedofidesz-tracker-pages/',
  
  // Reddit DM template
  redditMessageTemplate: {
    subject: 'Új Fidesz pedofil botrány',
    message: `Üdvözlöm!

Új Fidesz pedofil botrányt szeretnék beküldeni:

📰 Cikk címe:
📝 Rövid összefoglaló:
🔗 Hírforrás URL:
📅 Dátum (YYYY-MM-DD):
👤 Elkövető neve/pozíciója:
📍 Helyszín:

Köszönöm!`
  }
}
```

### 2. Példa beállítás

```javascript
export const config = {
  redditUsername: 'pedofidesz_tracker', // A te Reddit felhasználóneved
  githubPagesUrl: 'https://pf-tracker.github.io/pedofidesz-tracker-pages/',
  // ... többi beállítás
}
```

## 📝 Beküldési folyamat

1. **Látogató** rákattint az "Új eset beküldése" gombra
2. **Reddit DM** megnyílik előre kitöltött sablonnal
3. **Látogató** kitölti a hiányzó mezőket
4. **Te** megkapod a DM-et a Reddit-en
5. **Te** ellenőrzöd és hozzáadod a CLI tool-lal

## 🎨 Testreszabás

### DM sablon módosítása

A `src/config.js` fájlban módosíthatod:

- **Tárgy**: `redditMessageTemplate.subject`
- **Üzenet**: `redditMessageTemplate.message`
- **Felhasználónév**: `redditUsername`

### Stílus módosítása

A `src/index.css` fájlban módosíthatod:

```css
.submit-case-link {
  background: linear-gradient(45deg, #4CAF50, #45a049);
  /* Egyéb stílusok... */
}
```

## 🔧 Hibaelhárítás

### Reddit DM nem nyílik meg
- Ellenőrizd, hogy a Reddit felhasználónév helyes-e
- Győződj meg róla, hogy a Reddit fiókod létezik és publikus

### URL encoding problémák
- A konfigurációs fájl automatikusan kezeli az URL encoding-ot
- Magyar ékezetek és speciális karakterek rendben működnek

## 📱 Mobilbarát

A gomb reszponzív és mobilbarát:
- Kisebb padding mobil eszközökön
- Touch-friendly méret
- Hover effekt helyett tap effekt

## 🚀 Deployment

A változások automatikusan megjelennek a weboldalon:

```bash
npm run deploy
```

## 💡 Tippek

1. **Teszteld** a DM funkciót saját magadnak küldött üzenettel
2. **Ellenőrizd** a Reddit beállításokat (DM-ek fogadása)
3. **Frissítsd** a sablont szükség szerint
4. **Kövesd** a beküldéseket és válaszolj gyorsan

## 🔒 Biztonság

- A Reddit DM funkció biztonságos
- Nincs adatbázis vagy szerver oldali tárolás
- Minden kommunikáció a Reddit-en keresztül történik
- A látogatók nem látják a te Reddit felhasználónevedet a kódban 