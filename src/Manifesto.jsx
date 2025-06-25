import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function Manifesto() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-nav">
            <Link to="/" className="back-link">
              <ArrowLeft size={20} />
              Vissza a főoldalra
            </Link>
          </div>
          <h1>Manifesztó</h1>
          <p>A Pedofidesz Tracker célja és jelentősége</p>
        </div>
      </header>

      <main className="container">
        <div className="manifesto-content">
          <section className="manifesto-section">
            <h2>Miért létezik ez az oldal?</h2>
            <p>
              A Pedofidesz Tracker egy nyilvános, objektív adatbázis, amely a Fidesz és 
              kapcsolódó szervezetek pedofil botrányait gyűjti össze kronológiai sorrendben. 
              Célunk nem a politikai támadás, hanem a tények dokumentálása és a nyilvánosság 
              tájékoztatása.
            </p>
          </section>

          <section className="manifesto-section">
            <h2>Miért fontos ez?</h2>
            <p>
              A pedofilia és gyermekbántalmazás súlyos bűncselekmény, amely minden 
              társadalmi réteget érint. Amikor politikusok, közszolgálati személyek vagy 
              befolyásos személyek érintettek ilyen ügyekben, az különösen fontos, hogy 
              a nyilvánosság tudjon róla.
            </p>
            <p>
              A Fidesz és kapcsolódó szervezetek számos pedofil botrányban érintettek 
              voltak az elmúlt években. Ezek az esetek gyakran eltussoltak, elbagatellizáltak 
              vagy politikai okokból elhallgattak.
            </p>
          </section>

          <section className="manifesto-section">
            <h2>Rendszerszintű problémák</h2>
            <p>
              A Fidesz hatalmi struktúrája és működése számos elemző és újságíró szerint 
              rendszerszintű problémákat hordoz, amelyek lehetővé teszik, hogy a szexuális 
              ragadozók – és általában a visszaélők – nagyobb biztonságban érezzék magukat 
              a politikai környezetben, mint egy egészségesen működő demokráciában.
            </p>
            <p>
              A magyar állam működését többen „maffiaállamként" írják le, ahol a közhatalmi 
              intézmények függetlensége megszűnt, a kontrollfunkciókat kiiktatták, és a 
              szakigazgatás helyett a politikai család bizalmasai uralják a döntéshozatalt. 
              Ez a rendszer nemcsak a korrupció, hanem a különféle visszaélések – köztük a 
              szexuális bűncselekmények – eltussolására is alkalmas, hiszen a hatalom 
              koncentrációja, az intézményi átláthatatlanság és a politikai lojalitás 
              előtérbe helyezése gátolja a valódi felelősségre vonást.
            </p>
            <p>
              A Fidesz gyakran használja fel a gyermekvédelem és a pedofília elleni fellépés 
              retorikáját politikai haszonszerzésre, miközben a valóságban több alkalommal 
              akadályozta vagy hiteltelenítette az érdemi, rendszerszintű fellépést ezek 
              ellen a bűncselekmények ellen. Az ellenzéki javaslatokat rendre leszavazták, 
              a botrányokat pedig igyekeznek elkenni vagy politikai támadásként beállítani. 
              Amikor mégis kirobban egy ügy, a Fidesz első reakciója a védekezés, a 
              felelősség áthárítása vagy a témaváltás, nem pedig az átlátható kivizsgálás 
              és felelősségre vonás.
            </p>
            <p>
              A rendszerszintű korrupció, az intézményi kontroll hiánya és a politikai 
              lojalitás mind hozzájárulnak ahhoz, hogy a hatalmi pozícióban lévők – köztük 
              potenciális szexuális ragadozók – úgy érezhetik, kevés az esélyük a lebukásra 
              vagy a felelősségre vonásra. Ez a struktúra nemcsak a pénzügyi visszaélések, 
              hanem a legsúlyosabb erkölcsi és jogi bűncselekmények eltussolására is 
              alkalmas közeget teremt.
            </p>
            <p className="highlight-text">
              <strong>
                Ezért tartjuk kiemelten fontosnak, hogy az ilyen eseteket rendszerezzük 
                és nyilvánossá tegyük. Csak a közösségi tudás, az átláthatóság és a 
                nyilvánosság ereje képes ellensúlyozni azt a rendszert, amely a visszaélések 
                eltussolását szolgálja. Az oldal célja, hogy mindenki számára elérhetővé 
                tegye az információkat, és hozzájáruljon ahhoz, hogy a felelősök ne 
                bújhassanak el a hatalmi struktúrák mögé.
              </strong>
            </p>
          </section>

          <section className="manifesto-section">
            <h2>Milyen adatokat gyűjtünk?</h2>
            <ul>
              <li><strong>Hivatalos hírforrásokból</strong> származó információkat</li>
              <li><strong>Bírósági ítéleteket</strong> és nyomozati eredményeket</li>
              <li><strong>Nyilvános dokumentumokat</strong> és jelentéseket</li>
              <li><strong>Megbízható médiából</strong> származó híreket</li>
            </ul>
            <p>
              Minden esethez forrás linket adunk, hogy a látogatók ellenőrizhessék 
              az információkat.
            </p>
          </section>

          <section className="manifesto-section">
            <h2>Amik NEM vagyunk</h2>
            <ul>
              <li>Nem vagyunk politikai párt vagy szervezet</li>
              <li>Nem gyártunk hamis híreket vagy propagandát</li>
              <li>Nem támadunk személyeket, csak tényeket dokumentálunk</li>
              <li>Nem vagyunk jogi tanácsadó vagy bíróság</li>
            </ul>
          </section>

          <section className="manifesto-section">
            <h2>Amik VAGYUNK</h2>
            <ul>
              <li>Független, objektív adatbázis</li>
              <li>Nyilvános dokumentáció</li>
              <li>Átláthatósági kezdeményezés</li>
              <li>Civil társadalmi felügyelet</li>
            </ul>
          </section>

          <section className="manifesto-section">
            <h2>Hogyan segíthetsz?</h2>
            <p>
              Ha tudsz olyan esetről, amely nincs még nyilvántartva, küldd el nekünk 
              a "Új eset beküldése" gombra kattintva. Fontos, hogy csak megbízható 
              forrásokból származó információkat küldj.
            </p>
            <p>
              Az oldal nyílt forráskódú, és mindenki hozzájárulhat a fejlesztéshez 
              vagy javaslatokat tehet.
            </p>
          </section>

          <section className="manifesto-section">
            <h2>Jogi nyilatkozat</h2>
            <p>
              Ez az oldal kizárólag nyilvánosan elérhető információk gyűjteménye. 
              Minden adat forrása meg van jelölve. Az oldal nem felelős a források 
              tartalmáért vagy pontosságáért.
            </p>
            <p>
              Ha bármilyen jogi problémát tapasztalsz, kérjük jelezd, és azonnal 
              eltávolítjuk a vitatott tartalmat.
            </p>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            A Pedofidesz Tracker egy független, civil kezdeményezés.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Manifesto 