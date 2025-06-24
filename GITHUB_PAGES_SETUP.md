# 🚀 GitHub Pages Quick Setup

## 1. Repository-ok létrehozása

### Fő projekt: `pedofidesz-tracker`
- Publikus vagy privát
- Leírás: "Fidesz pedofil botrányok nyilvántartása"

### GitHub Pages: `pedofidesz-tracker-pages`
- **Publikus** (GitHub Pages miatt kötelező)
- Leírás: "Pedofidesz Tracker website"
- **Fontos**: A név pontosan `pedofidesz-tracker-pages` legyen

## 2. .gitmodules frissítése

```bash
# Módosítsd a .gitmodules fájlt:
[submodule "dist"]
	path = dist
	url = https://github.com/YOUR_USERNAME/pedofidesz-tracker-pages.git
	branch = main
```

## 3. Submodule beállítása

```bash
# Töröld a jelenlegi dist mappát
rm -rf dist

# Add submodule
git submodule add https://github.com/YOUR_USERNAME/pedofidesz-tracker-pages.git dist

# Initialize
git submodule update --init --recursive
```

## 4. Push mindkét repository-ba

```bash
# Fő projekt
git add .
git commit -m "Setup git submodule"
git remote add origin https://github.com/YOUR_USERNAME/pedofidesz-tracker.git
git push -u origin main
```

## 5. GitHub Pages aktiválása

1. Menj a `pedofidesz-tracker-pages` repository Settings oldalára
2. Pages → Source: "Deploy from a branch"
3. Branch: `main`
4. Folder: `/ (root)`
5. Save

## 6. Tesztelés

```bash
# Új botrány hozzáadása
npm run add-case

# Deploy
npm run deploy
```

A website elérhető lesz: `https://YOUR_USERNAME.github.io/pedofidesz-tracker-pages/`

## 🔄 Napi használat

```bash
# Új tartalom
npm run add-case

# Deploy (automatikusan push a GitHub Pages-re)
npm run deploy
```

## 📁 Végső struktúra

```
pedofidesz-tracker/           # Fő projekt
├── .git/                     # Fő projekt git
├── .gitmodules              # Submodule config
├── dist/                    # GitHub Pages (submodule)
│   ├── .git/               # GitHub Pages git
│   ├── index.html          # Website
│   ├── assets/             # Built files
│   └── data/               # Cases data
├── src/                    # Source code
├── cli/                    # CLI tools
└── data/                   # Source data
```

## ⚡ Gyors parancsok

```bash
# Status
git submodule status

# Update submodule
git submodule update --init --recursive

# Deploy
npm run deploy

# Clone with submodules
git clone --recursive https://github.com/YOUR_USERNAME/pedofidesz-tracker.git
``` 