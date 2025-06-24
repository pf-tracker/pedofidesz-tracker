const fs = require('fs');
const path = require('path');

// Vite build után futtatandó script
// A data/cases.json fájlt átmásolja a dist mappába

const sourceDataPath = path.join(__dirname, '../data/cases.json');
const targetDataPath = path.join(__dirname, '../dist/data/cases.json');

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

  // Másoljuk át a fájlt
  fs.copyFileSync(sourceDataPath, targetDataPath);
  console.log('✅ data/cases.json sikeresen átmásolva a dist mappába');

} catch (error) {
  console.error('❌ Hiba történt a data fájl másolásakor:', error.message);
  process.exit(1);
} 