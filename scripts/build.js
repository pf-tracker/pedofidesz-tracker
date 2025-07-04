const fs = require('fs');
const path = require('path');

// Vite build után futtatandó script
// A data/cases.json fájlt és a data/details mappát átmásolja a dist mappába

const sourceDataPath = path.join(__dirname, '../data/cases.json');
const targetDataPath = path.join(__dirname, '../dist/data/cases.json');
const sourceDetailsPath = path.join(__dirname, '../data/details');
const targetDetailsPath = path.join(__dirname, '../dist/data/details');

try {
  // Ellenőrizzük, hogy létezik-e a source fájl
  if (!fs.existsSync(sourceDataPath)) {
    console.log('⚠️  A data/cases.json fájl nem létezik, létrehozom...');
    const defaultData = {
      cases: [],
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(sourceDataPath, JSON.stringify(defaultData, null, 2));
  }

  // Létrehozzuk a data mappát a dist-ben, ha nem létezik
  const targetDataDir = path.dirname(targetDataPath);
  if (!fs.existsSync(targetDataDir)) {
    fs.mkdirSync(targetDataDir, { recursive: true });
  }

  // Másoljuk át a cases.json fájlt
  fs.copyFileSync(sourceDataPath, targetDataPath);
  console.log('✅ data/cases.json sikeresen átmásolva a dist mappába');

  // Másoljuk át a details mappát, ha létezik
  if (fs.existsSync(sourceDetailsPath)) {
    // Létrehozzuk a target details mappát
    if (!fs.existsSync(targetDetailsPath)) {
      fs.mkdirSync(targetDetailsPath, { recursive: true });
    }

    // Másoljuk át az összes .md fájlt
    const files = fs.readdirSync(sourceDetailsPath);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const sourceFile = path.join(sourceDetailsPath, file);
        const targetFile = path.join(targetDetailsPath, file);
        fs.copyFileSync(sourceFile, targetFile);
      }
    });
    console.log('✅ data/details mappa sikeresen átmásolva a dist mappába');
  } else {
    console.log('ℹ️  A data/details mappa nem létezik, kihagyva');
  }

} catch (error) {
  console.error('❌ Hiba történt a data fájlok másolásakor:', error.message);
  process.exit(1);
} 