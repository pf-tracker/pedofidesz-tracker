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

async function deleteCase() {
  try {
    if (!fs.existsSync(dataPath)) {
      console.log('❌ Nincs még adat a rendszerben.');
      rl.close();
      return;
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (data.cases.length === 0) {
      console.log('📭 Nincs még eset nyilvántartva.');
      rl.close();
      return;
    }
    
    console.log('🗑️  Esemény törlése\n');
    
    // Események listázása
    console.log('Elérhető események:');
    data.cases.forEach((case_, index) => {
      console.log(`${index + 1}. [${case_.id}] ${case_.title} (${case_.date})`);
    });
    
    const caseId = await question('\n🆔 Törlendő esemény ID-ja: ');
    
    const caseIndex = data.cases.findIndex(c => c.id === caseId);
    
    if (caseIndex === -1) {
      console.log('❌ Nem található esemény ezzel az ID-val!');
      rl.close();
      return;
    }
    
    const caseToDelete = data.cases[caseIndex];
    
    console.log(`\n⚠️  Törlendő esemény:`);
    console.log(`   Cím: ${caseToDelete.title}`);
    console.log(`   Dátum: ${caseToDelete.date}`);
    console.log(`   Elkövető: ${caseToDelete.perpetrator}`);
    
    const confirm = await question('\n❓ Biztosan törölni szeretnéd? (igen/nem): ');
    
    if (confirm.toLowerCase() !== 'igen' && confirm.toLowerCase() !== 'i') {
      console.log('❌ Törlés megszakítva.');
      rl.close();
      return;
    }
    
    // Törlés
    data.cases.splice(caseIndex, 1);
    data.lastUpdated = new Date().toISOString();
    
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    console.log('✅ Esemény sikeresen törölve!');
    console.log(`📊 Maradt ${data.cases.length} eset nyilvántartva.`);
    
  } catch (error) {
    console.error('❌ Hiba történt:', error.message);
  } finally {
    rl.close();
  }
}

deleteCase(); 