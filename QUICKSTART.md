# 🚀 Gyors Kezdés

## 1. Telepítés
```bash
npm install
```

## 2. Új botrány hozzáadása
```bash
npm run add-case
```

## 3. Botrányok megtekintése
```bash
npm run list-cases
```

## 4. Weboldal tesztelése
```bash
npm run dev
```
Majd nyisd meg: http://localhost:5173

## 5. Production build
```bash
npm run build
```

## 6. Hosztolás
```bash
npm run deploy
```

## 📁 Projekt struktúra

```
pedofidesz-tracker/
├── cli/                 # CLI tool-ok
│   ├── add-case.js     # Új botrány hozzáadása
│   ├── list-cases.js   # Botrányok listázása
│   └── delete-case.js  # Botrány törlése
├── data/
│   └── cases.json      # Botrányok adatai
├── src/                # React alkalmazás
├── dist/               # Production build (generált)
└── scripts/
    ├── build.js        # Build script
    └── deploy.sh       # Deployment script
```

## 🎯 Használati munkafolyamat

1. **Új botrány**: `npm run add-case`
2. **Ellenőrzés**: `npm run list-cases`
3. **Tesztelés**: `npm run dev`
4. **Publikálás**: `npm run deploy`

## 🌐 Hosztolási opciók

### GitHub Pages
```bash
git init
git add dist/*
git commit -m "Initial commit"
git branch -M gh-pages
git remote add origin YOUR_REPO_URL
git push -u origin gh-pages
```

### Netlify
- Húzd át a `dist` mappát a Netlify dashboard-ra

### Vercel
- Importáld a projektet a Vercel-re
- Build command: `npm run build`
- Output directory: `dist` 