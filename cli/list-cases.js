#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/cases.json');

function listCases() {
  try {
    if (!fs.existsSync(dataPath)) {
      console.log('❌ Nincs még adat a rendszerben.');
      return;
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (data.cases.length === 0) {
      console.log('📭 Nincs még eset nyilvántartva.');
      return;
    }
    
    console.log(`📊 Összesen ${data.cases.length} Fidesz pedofil botrány nyilvántartva\n`);
    console.log('🔄 Utolsó frissítés:', new Date(data.lastUpdated).toLocaleString('hu-HU'));
    console.log('─'.repeat(80));
    
    data.cases.forEach((case_, index) => {
      console.log(`\n${index + 1}. ${case_.title}`);
      console.log(`   📅 Dátum: ${case_.date}`);
      console.log(`   👤 Elkövető: ${case_.perpetrator}`);
      console.log(`   📍 Helyszín: ${case_.location}`);
      console.log(`   📝 Összefoglaló: ${case_.summary}`);
      console.log(`   🔗 Forrás: ${case_.sourceUrl}`);
      console.log(`   🆔 ID: ${case_.id}`);
      console.log('─'.repeat(80));
    });
    
  } catch (error) {
    console.error('❌ Hiba történt:', error.message);
  }
}

listCases(); 