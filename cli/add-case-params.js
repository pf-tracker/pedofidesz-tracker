#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/cases.json');

function addCaseWithParams() {
  // Parancssori argumentumok beolvasása
  const args = process.argv.slice(2);
  
  // Használati útmutató
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log('🔄 Fidesz pedofil botrány hozzáadása paraméterekkel\n');
    console.log('Használat:');
    console.log('  node cli/add-case-params.js "Cikk címe" "Összefoglaló" "URL" "YYYY-MM-DD" "Elkövető" "Helyszín" [--has-details] [--details-slug "slug"]\n');
    console.log('Példa:');
    console.log('  node cli/add-case-params.js "Csokonai botrány" "Tanár zaklatta diákot" "https://example.com" "2025-06-18" "J. Dániel" "Debrecen"\n');
    console.log('Példa részletes esettel:');
    console.log('  node cli/add-case-params.js "Csokonai botrány" "Tanár zaklatta diákot" "https://example.com" "2025-06-18" "J. Dániel" "Debrecen" --has-details --details-slug "csokonai-botrany"\n');
    console.log('\nVagy interaktív mód:');
    console.log('  node cli/add-case-params.js --interactive\n');
    return;
  }

  // Interaktív mód
  if (args.includes('--interactive') || args.includes('-i')) {
    const { spawn } = require('child_process');
    spawn('node', ['cli/add-case.js'], { stdio: 'inherit' });
    return;
  }

  // Paraméterek ellenőrzése
  if (args.length < 6) {
    console.log('❌ Hiányzó paraméterek!');
    console.log('Szükséges: cím, összefoglaló, URL, dátum, elkövető, helyszín');
    console.log('Használat: node cli/add-case-params.js "cím" "összefoglaló" "URL" "YYYY-MM-DD" "elkövető" "helyszín"');
    process.exit(1);
  }

  const [title, summary, sourceUrl, date, perpetrator, location] = args;

  // Opcionális paraméterek
  const hasDetails = args.includes('--has-details');
  const detailsSlugIndex = args.indexOf('--details-slug');
  let detailsSlug = null;
  
  if (detailsSlugIndex !== -1 && args[detailsSlugIndex + 1]) {
    detailsSlug = args[detailsSlugIndex + 1];
  } else if (hasDetails) {
    // Automatikus slug generálás a cím alapján
    detailsSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Dátum validálása
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    console.log('❌ Hibás dátum formátum! Használj YYYY-MM-DD formátumot.');
    process.exit(1);
  }

  // URL validálása
  if (!sourceUrl.startsWith('http')) {
    console.log('❌ Hibás URL! Az URL http:// vagy https://-val kell kezdődnie.');
    process.exit(1);
  }

  try {
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
      addedAt: new Date().toISOString(),
      hasDetails: hasDetails,
      ...(detailsSlug && { detailsSlug: detailsSlug })
    };

    data.cases.push(newCase);
    data.lastUpdated = new Date().toISOString();

    // Dátum szerint rendezés (legújabb elől)
    data.cases.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Mentés
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    console.log('✅ Esemény sikeresen hozzáadva!');
    console.log(`📊 Összesen ${data.cases.length} eset van nyilvántartva.`);
    console.log('\n📝 Hozzáadott eset:');
    console.log(`   Cím: ${newCase.title}`);
    console.log(`   Dátum: ${newCase.date}`);
    console.log(`   Elkövető: ${newCase.perpetrator}`);
    console.log(`   Helyszín: ${newCase.location}`);
    
    if (hasDetails && detailsSlug) {
      console.log(`   Részletes oldal: /eset/${detailsSlug}`);
      
      // Markdown fájl létrehozása
      const detailsDir = path.join(__dirname, '../data/details');
      if (!fs.existsSync(detailsDir)) {
        fs.mkdirSync(detailsDir, { recursive: true });
      }
      
      const markdownPath = path.join(detailsDir, `${detailsSlug}.md`);
      const markdownTemplate = `# ${newCase.title}

## A botrány háttere

${newCase.summary}

## Részletes leírás

Itt írhatod le részletesen a botrány történetét...

## A Fidesz reakciója

Hogyan reagált a Fidesz erre a botrányra?

## Következmények

Milyen következményekkel járt a botrány?

---

## Források

1. [${newCase.title}](${newCase.sourceUrl}) - ${new URL(newCase.sourceUrl).hostname}

---

*Ez a részletes leírás a nyilvánosan elérhető információk alapján készült.*`;
      
      fs.writeFileSync(markdownPath, markdownTemplate);
      console.log(`   📄 Markdown fájl létrehozva: data/details/${detailsSlug}.md`);
    }

  } catch (error) {
    console.error('❌ Hiba történt:', error.message);
    process.exit(1);
  }
}

addCaseWithParams(); 