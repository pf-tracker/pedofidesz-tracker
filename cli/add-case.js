#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataPath = path.join(__dirname, '../data/cases.json');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function addCase() {
  console.log('🔄 Új Fidesz pedofil botrány hozzáadása\n');
  
  try {
    // Adatok beolvasása
    const title = await question('📰 Cikk címe: ');
    const summary = await question('📝 Rövid összefoglaló: ');
    const sourceUrl = await question('🔗 Hírforrás URL: ');
    const date = await question('📅 Dátum (YYYY-MM-DD): ');
    const perpetrator = await question('👤 Elkövető neve/pozíciója: ');
    const location = await question('📍 Helyszín: ');
    
    // Validáció
    if (!title || !summary || !sourceUrl || !date) {
      console.log('❌ Minden mező kitöltése kötelező!');
      rl.close();
      return;
    }
    
    // Dátum validálása
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      console.log('❌ Hibás dátum formátum! Használj YYYY-MM-DD formátumot.');
      rl.close();
      return;
    }
    
    // Adatok beolvasása
    let data = { cases: [], lastUpdated: new Date().toISOString() };
    if (fs.existsSync(dataPath)) {
      data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
    
    // Új eset hozzáadása
    const newCase = {
      id: Date.now().toString(),
      title: title.trim(),
      summary: summary.trim(),
      sourceUrl: sourceUrl.trim(),
      date: date,
      perpetrator: perpetrator.trim() || 'Ismeretlen',
      location: location.trim() || 'Ismeretlen',
      addedAt: new Date().toISOString()
    };
    
    data.cases.push(newCase);
    data.lastUpdated = new Date().toISOString();
    
    // Dátum szerint rendezés (legújabb elől)
    data.cases.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Mentés
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    console.log('\n✅ Esemény sikeresen hozzáadva!');
    console.log(`📊 Összesen ${data.cases.length} eset van nyilvántartva.`);
    
  } catch (error) {
    console.error('❌ Hiba történt:', error.message);
  } finally {
    rl.close();
  }
}

addCase(); 