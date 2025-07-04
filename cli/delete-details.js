#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dataPath = path.join(__dirname, '../data/cases.json');
const detailsDir = path.join(__dirname, '../data/details');

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function question(rl, query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function deleteDetailsFromCase() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('🗑️  Részletek törlése meglévő esetből\n');
    console.log('Használat:');
    console.log('  npm run delete-details');
    console.log('  node cli/delete-details.js');
    console.log('  node cli/delete-details.js --id "ID"');
    console.log('  node cli/delete-details.js --title "Cím"\n');
    console.log('Példák:');
    console.log('  node cli/delete-details.js --id "1750830246732"');
    console.log('  node cli/delete-details.js --title "Csokonai"\n');
    return;
  }

  try {
    if (!fs.existsSync(dataPath)) {
      console.log('❌ A data/cases.json fájl nem létezik!');
      process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let targetCase = null;

    if (args.includes('--id') && args[args.indexOf('--id') + 1]) {
      const id = args[args.indexOf('--id') + 1];
      targetCase = data.cases.find(c => c.id === id);
      if (!targetCase) {
        console.log(`❌ Nem található eset ezzel az ID-val: ${id}`);
        process.exit(1);
      }
    } else if (args.includes('--title')) {
      const titleIndex = args.indexOf('--title');
      const title = args[titleIndex + 1];
      if (!title) {
        console.log('❌ Hiányzó cím a --title paraméter után!');
        process.exit(1);
      }
      
      const matchingCases = data.cases.filter(c => 
        c.title.toLowerCase().includes(title.toLowerCase())
      );
      
      if (matchingCases.length === 0) {
        console.log(`❌ Nem található eset ezzel a címmel: ${title}`);
        process.exit(1);
      } else if (matchingCases.length === 1) {
        targetCase = matchingCases[0];
      } else {
        console.log('🔍 Több egyező eset található:');
        matchingCases.forEach((c, index) => {
          const hasDetails = c.hasDetails ? ' ✅' : ' ❌';
          console.log(`${index + 1}.${hasDetails} ${c.title} (${c.date})`);
        });
        console.log('\nHasználj --id paramétert a pontos eset kiválasztásához.');
        process.exit(1);
      }
    } else {
      // Csak azokat az eseteket mutatjuk, amelyeknek van részlete
      const casesWithDetails = data.cases.filter(c => c.hasDetails);
      
      if (casesWithDetails.length === 0) {
        console.log('❌ Nincs olyan eset, amelynek részletei lennének!');
        process.exit(0);
      }

      console.log('📋 Válaszd ki az esetet, amelyből törölni szeretnéd a részleteket:\n');
      
      casesWithDetails.forEach((c, index) => {
        console.log(`${index + 1}. ✅ ${c.title} (${c.date})`);
        console.log(`   📄 Slug: ${c.detailsSlug}`);
      });

      const rl = createInterface();
      const choice = await question(rl, '\nVálaszd ki az eset számát: ');
      rl.close();

      const caseIndex = parseInt(choice) - 1;
      if (isNaN(caseIndex) || caseIndex < 0 || caseIndex >= casesWithDetails.length) {
        console.log('❌ Érvénytelen választás!');
        process.exit(1);
      }

      targetCase = casesWithDetails[caseIndex];
    }

    // Ellenőrizzük, hogy van-e részlete
    if (!targetCase.hasDetails) {
      console.log('❌ Ennek az esetnek nincs részlete!');
      process.exit(1);
    }

    console.log(`📝 Kiválasztott eset: ${targetCase.title}`);
    console.log(`📄 Jelenlegi slug: ${targetCase.detailsSlug}`);
    console.log(`🗂️  Markdown fájl: data/details/${targetCase.detailsSlug}.md`);

    const rl = createInterface();
    const confirm = await question(rl, '\nBiztosan törölni szeretnéd a részleteket? (i/n): ');
    rl.close();
    
    if (confirm.toLowerCase() !== 'i' && confirm.toLowerCase() !== 'igen') {
      console.log('❌ Művelet megszakítva.');
      process.exit(0);
    }

    // Markdown fájl törlése
    const markdownPath = path.join(detailsDir, `${targetCase.detailsSlug}.md`);
    if (fs.existsSync(markdownPath)) {
      fs.unlinkSync(markdownPath);
      console.log(`🗑️  Markdown fájl törölve: ${markdownPath}`);
    } else {
      console.log(`⚠️  A markdown fájl nem létezett: ${markdownPath}`);
    }

    // JSON frissítése
    targetCase.hasDetails = false;
    delete targetCase.detailsSlug;
    data.lastUpdated = new Date().toISOString();

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    console.log('✅ Részletek sikeresen törölve!');
    console.log(`📝 Eset: ${targetCase.title}`);
    console.log('🌐 A "Részletek" gomb eltűnik a weboldalon.');

  } catch (error) {
    console.error('❌ Hiba történt:', error.message);
    process.exit(1);
  }
}

deleteDetailsFromCase(); 