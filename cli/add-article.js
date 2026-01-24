#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataPath = path.join(__dirname, '../data/articles.json');
const casesPath = path.join(__dirname, '../data/cases.json');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function addArticle() {
  console.log('📰 Új cikk hozzáadása\n');
  
  try {
    // Botrányok betöltése a kapcsolódáshoz
    let cases = [];
    if (fs.existsSync(casesPath)) {
      const casesData = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
      cases = casesData.cases || [];
    }

    // Adatok beolvasása
    const title = await question('📰 Cikk címe: ');
    const summary = await question('📝 Bevezető/összefoglaló: ');
    const sourceUrl = await question('🔗 Hírforrás URL: ');
    const date = await question('📅 Dátum (YYYY-MM-DD): ');
    
    // Botrány kiválasztása
    console.log('\n📋 Kapcsolódó botrány kiválasztása:');
    if (cases.length === 0) {
      console.log('⚠️  Nincs elérhető botrány az adatbázisban.');
      const relatedCaseId = await question('🆔 Botrány ID (vagy üres, ha nincs kapcsolódó botrány): ');
      var relatedCase = relatedCaseId.trim() || null;
    } else {
      cases.slice(0, 10).forEach((c, i) => {
        console.log(`${i + 1}. ${c.title.substring(0, 60)}... (ID: ${c.id})`);
      });
      const caseIndex = await question(`\nVálassz botrányt (1-${Math.min(cases.length, 10)}) vagy ID-t, vagy üres ha nincs: `);
      
      if (caseIndex.trim() === '') {
        var relatedCase = null;
      } else if (!isNaN(caseIndex) && parseInt(caseIndex) >= 1 && parseInt(caseIndex) <= Math.min(cases.length, 10)) {
        var relatedCase = cases[parseInt(caseIndex) - 1].id;
      } else {
        // ID alapján keresés
        const foundCase = cases.find(c => c.id === caseIndex.trim());
        if (foundCase) {
          var relatedCase = foundCase.id;
        } else {
          console.log('⚠️  Botrány nem található, folytatás kapcsolódás nélkül.');
          var relatedCase = null;
        }
      }
    }
    
    const partyAffiliation = await question('🏛️  Pártkapcsolat (fidesz/dk/stb. vagy üres): ');
    
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
    
    // Slug generálás
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
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
      relatedCase: relatedCase || null,
      partyAffiliation: partyAffiliation.trim() || null,
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
    
    console.log('\n✅ Cikk sikeresen hozzáadva!');
    console.log(`📊 Összesen ${data.articles.length} cikk van nyilvántartva.`);
    console.log(`📄 Markdown fájl létrehozva: data/articles/${slug}.md`);
    console.log(`🔗 Cikk URL: /cikk/${slug}`);
    
  } catch (error) {
    console.error('❌ Hiba történt:', error.message);
  } finally {
    rl.close();
  }
}

addArticle();

