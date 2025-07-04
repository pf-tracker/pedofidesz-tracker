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

async function addDetailsToCase() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('📄 Részletek hozzáadása meglévő esethez\n');
    console.log('Használat:');
    console.log('  npm run add-details');
    console.log('  node cli/add-details.js');
    console.log('  node cli/add-details.js --id "ID"');
    console.log('  node cli/add-details.js --title "Cím"\n');
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
          console.log(`${index + 1}. ${c.title} (${c.date})`);
        });
        console.log('\nHasználj --id paramétert a pontos eset kiválasztásához.');
        process.exit(1);
      }
    } else {
      console.log('📋 Válaszd ki az esetet, amelyhez részleteket szeretnél adni:\n');
      
      data.cases.forEach((c, index) => {
        const hasDetails = c.hasDetails ? ' ✅' : ' ❌';
        console.log(`${index + 1}.${hasDetails} ${c.title} (${c.date})`);
      });

      const rl = createInterface();
      const choice = await question(rl, '\nVálaszd ki az eset számát: ');
      rl.close();

      const caseIndex = parseInt(choice) - 1;
      if (isNaN(caseIndex) || caseIndex < 0 || caseIndex >= data.cases.length) {
        console.log('❌ Érvénytelen választás!');
        process.exit(1);
      }

      targetCase = data.cases[caseIndex];
    }

    if (targetCase.hasDetails) {
      console.log('⚠️  Ez az eset már rendelkezik részletekkel!');
      console.log(`📄 Jelenlegi slug: ${targetCase.detailsSlug}`);
      
      const rl = createInterface();
      const overwrite = await question(rl, 'Szeretnéd felülírni? (i/n): ');
      rl.close();
      
      if (overwrite.toLowerCase() !== 'i' && overwrite.toLowerCase() !== 'igen') {
        console.log('❌ Művelet megszakítva.');
        process.exit(0);
      }
    }

    let slug = targetCase.detailsSlug;
    if (!slug) {
      slug = targetCase.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    const rl = createInterface();
    const customSlug = await question(rl, `Slug (alapértelmezett: ${slug}): `);
    rl.close();
    
    if (customSlug.trim()) {
      slug = customSlug.trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    const markdownTemplate = `# ${targetCase.title}

## A botrány háttere

${targetCase.summary}

## Részletes leírás

Itt írhatod le részletesen a botrány történetét...

## A Fidesz reakciója

Hogyan reagált a Fidesz erre a botrányra?

## Következmények

Milyen következményekkel járt a botrány?


## Források

1. [${targetCase.title}](${targetCase.sourceUrl}) - ${new URL(targetCase.sourceUrl).hostname}


*Ez a részletes leírás a nyilvánosan elérhető információk alapján készült.*`;

    if (!fs.existsSync(detailsDir)) {
      fs.mkdirSync(detailsDir, { recursive: true });
    }

    const markdownPath = path.join(detailsDir, `${slug}.md`);
    fs.writeFileSync(markdownPath, markdownTemplate);

    targetCase.hasDetails = true;
    targetCase.detailsSlug = slug;
    data.lastUpdated = new Date().toISOString();

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    console.log('✅ Részletek sikeresen hozzáadva!');
    console.log(`📄 Markdown fájl: data/details/${slug}.md`);
    console.log(`🌐 Weboldal: /eset/${slug}`);
    console.log(`📝 Eset: ${targetCase.title}`);

  } catch (error) {
    console.error('❌ Hiba történt:', error.message);
    process.exit(1);
  }
}

addDetailsToCase(); 