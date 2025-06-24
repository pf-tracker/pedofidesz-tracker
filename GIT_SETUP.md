# 🔧 Git Submodule Setup Guide

Ez az útmutató segít beállítani a git submodule konfigurációt, hogy a `dist` mappa egy külön GitHub Pages repository-ra mutasson.

## 📋 Előfeltételek

1. Git telepítve van
2. GitHub fiók
3. Két repository létrehozva:
   - `pedofidesz-tracker` (fő projekt)
   - `pedofidesz-tracker-pages` (GitHub Pages)

## 🚀 Gyors beállítás

### 1. Automatikus beállítás
```bash
npm run setup-git
```

### 2. Repository-ok létrehozása GitHub-on

#### Fő projekt repository:
- Név: `pedofidesz-tracker`
- Leírás: "Fidesz pedofil botrányok nyilvántartása"
- Publikus vagy privát

#### GitHub Pages repository:
- Név: `pedofidesz-tracker-pages`
- Leírás: "Pedofidesz Tracker website"
- Publikus (GitHub Pages miatt)
- **Fontos**: A repository neve pontosan így legyen: `pedofidesz-tracker-pages`

### 3. .gitmodules fájl frissítése

Módosítsd a `.gitmodules` fájlt a saját GitHub felhasználóneveddel:

```ini
[submodule "dist"]
	path = dist
	url = https://github.com/YOUR_USERNAME/pedofidesz-tracker-pages.git
	branch = main
```

### 4. Git submodule hozzáadása

```bash
# Töröld a jelenlegi dist mappát (ha létezik)
rm -rf dist

# Add the submodule
git submodule add https://github.com/YOUR_USERNAME/pedofidesz-tracker-pages.git dist

# Initialize and update submodule
git submodule update --init --recursive
```

### 5. Fő projekt push

```bash
# Add all changes
git add .

# Commit
git commit -m "Add git submodule for GitHub Pages"

# Push to main repository
git push -u origin main
```

## 🔄 Napi használat

### Új tartalom hozzáadása:
```bash
# 1. Új botrány hozzáadása
npm run add-case

# 2. Build és deploy
npm run deploy
```

### Manuális deploy:
```bash
# Build
npm run build

# Deploy (automatikusan push a GitHub Pages repository-ba)
npm run deploy
```

## 📁 Projekt struktúra

```
pedofidesz-tracker/           # Fő projekt repository
├── .git/                     # Fő projekt git
├── .gitmodules              # Submodule konfiguráció
├── dist/                    # GitHub Pages repository (submodule)
│   ├── .git/               # GitHub Pages git
│   ├── index.html          # Website
│   ├── assets/             # Built assets
│   └── data/               # Cases data
├── src/                    # Source code
├── cli/                    # CLI tools
├── data/                   # Source data
└── scripts/                # Build scripts
```

## 🌐 GitHub Pages beállítás

1. Menj a `pedofidesz-tracker-pages` repository Settings oldalára
2. Görgess le a "Pages" szekcióig
3. Source: "Deploy from a branch"
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

A website elérhető lesz: `https://YOUR_USERNAME.github.io/pedofidesz-tracker-pages/`

## 🔧 Hibaelhárítás

### Submodule nem működik:
```bash
# Reinitialize submodule
git submodule deinit -f dist
git submodule update --init --recursive
```

### Dist mappa nem git repository:
```bash
# Remove and re-add submodule
rm -rf dist
git submodule add https://github.com/YOUR_USERNAME/pedofidesz-tracker-pages.git dist
```

### Push hiba:
```bash
# Check submodule status
git submodule status

# Update submodule
git submodule update --remote
```

## 📝 Hasznos parancsok

```bash
# Submodule status
git submodule status

# Update submodule
git submodule update --init --recursive

# Update submodule to latest
git submodule update --remote

# Clone with submodules
git clone --recursive https://github.com/YOUR_USERNAME/pedofidesz-tracker.git

# Pull with submodules
git pull --recurse-submodules
```

## 🎯 Munkafolyamat

1. **Fejlesztés**: `npm run dev`
2. **Új tartalom**: `npm run add-case`
3. **Build**: `npm run build`
4. **Deploy**: `npm run deploy` (automatikusan push a GitHub Pages-re)
5. **Ellenőrzés**: Nézd meg a GitHub Pages oldalt

Ez a setup lehetővé teszi, hogy a fő projekt kódja és a website külön repository-kban legyenek, de automatikusan szinkronizálva maradjanak. 