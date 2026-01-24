#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/articles.json');
const casesPath = path.join(__dirname, '../data/cases.json');

function addArticleWithParams() {
  // Parancssori argumentumok beolvasása
  const args = process.argv.slice(2);
  
  // Használati útmutató
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log('📰 Cikk hozzáadása paraméterekkel\n');
    console.log('Használat:');
    console.log('  node cli/add-article-params.js "Cikk címe" "Bevezető" "URL" "YYYY-MM-DD" "Botrány ID" [--party "fidesz"] [--slug "slug"]\n');
    console.log('Példa:');
    console.log('  node cli/add-article-params.js "Dudás kirúgva" "A Szőlő utcai botrány kapcsán..." "https://444.hu/..." "2025-06-13" "1750800503127"\n');
    console.log('\nVagy interaktív mód:');
    console.log('  node cli/add-article-params.js --interactive\n');
    return;
  }

  // Interaktív mód
  if (args.includes('--interactive') || args.includes('-i')) {
    const { spawn } = require('child_process');
    spawn('node', ['cli/add-article.js'], { stdio: 'inherit' });
    return;
  }

  // Paraméterek ellenőrzése
  if (args.length < 5) {
    console.log('❌ Hiányzó paraméterek!');
    console.log('Szükséges: cím, bevezető, URL, dátum, botrány ID (vagy üres)');
    console.log('Használat: node cli/add-article-params.js "cím" "bevezető" "URL" "YYYY-MM-DD" "botrány-id"');
    process.exit(1);
  }

  const [title, summary, sourceUrl, date, relatedCaseId] = args;

  // Opcionális paraméterek
  const partyIndex = args.indexOf('--party');
  const partyAffiliation = partyIndex !== -1 && args[partyIndex + 1] ? args[partyIndex + 1] : null;
  
  const slugIndex = args.indexOf('--slug');
  let slug = null;
  if (slugIndex !== -1 && args[slugIndex + 1]) {
    slug = args[slugIndex + 1];
  } else {
    // Automatikus slug generálás
    slug = title
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

  // Botrány ID validálása (ha meg van adva)
  let relatedCase = relatedCaseId.trim() || null;
  if (relatedCase) {
    if (fs.existsSync(casesPath)) {
      const casesData = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
      const foundCase = casesData.cases.find(c => c.id === relatedCase);
      if (!foundCase) {
        console.log(`⚠️  Figyelem: Botrány ID (${relatedCase}) nem található az adatbázisban.`);
        console.log('Folytatás kapcsolódás nélkül...');
        relatedCase = null;
      }
    }
  }

  try {
    // Adatok beolvasása
    let data = { articles: [], lastUpdated: new Date().toISOString() };
    if (fs.existsSync(dataPath)) {
      data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }

    // Új cikk hozzáadása
    const newArticle = {
      id: `article-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim(),
      sourceUrl: sourceUrl.trim(),
      date: date,
      publishedAt: new Date(`${date}T12:00:00Z`).toISOString(),
      relatedCase: relatedCase,
      partyAffiliation: partyAffiliation,
      slug: slug,
      addedAt: new Date().toISOString()
    };

    data.articles.push(newArticle);
    data.lastUpdated = new Date().toISOString();

    // Dátum szerint rendezés (legújabb elől)
    data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Mentés
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    // Markdown fájl létrehozása
    const articlesDir = path.join(__dirname, '../data/articles');
    if (!fs.existsSync(articlesDir)) {
      fs.mkdirSync(articlesDir, { recursive: true });
    }
    
    const markdownPath = path.join(articlesDir, `${slug}.md`);
    const markdownTemplate = `# ${newArticle.title}

${newArticle.summary}

## Részletes tartalom

Itt írhatod le részletesen a cikk tartalmát...

---

## Források

1. [${newArticle.title}](${newArticle.sourceUrl}) - ${new URL(newArticle.sourceUrl).hostname}

---

*Ez a cikk a nyilvánosan elérhető információk alapján készült.*`;
    
    fs.writeFileSync(markdownPath, markdownTemplate);

    console.log('✅ Cikk sikeresen hozzáadva!');
    console.log(`📊 Összesen ${data.articles.length} cikk van nyilvántartva.`);
    console.log('\n📝 Hozzáadott cikk:');
    console.log(`   Cím: ${newArticle.title}`);
    console.log(`   Dátum: ${newArticle.date}`);
    console.log(`   Kapcsolódó botrány: ${relatedCase || 'Nincs'}`);
    console.log(`   Pártkapcsolat: ${partyAffiliation || 'Nincs'}`);
    console.log(`   📄 Markdown fájl: data/articles/${slug}.md`);
    console.log(`   🔗 Cikk URL: /cikk/${slug}`);

  } catch (error) {
    console.error('❌ Hiba történt:', error.message);
    process.exit(1);
  }
}

addArticleWithParams();

