// Konfigurációs fájl a Pedofidesz Tracker-hez

export const config = {
  // Reddit felhasználónév, ahova a beküldések érkeznek
  redditUsername: 'pf-tracker', // Cseréld ki a saját Reddit felhasználónevedre
  
  // GitHub Pages URL (opcionális)
  githubPagesUrl: 'https://pf-tracker.github.io/pedofidesz-tracker-pages/',
  
  // Reddit DM template
  redditMessageTemplate: {
    subject: 'Új Fidesz pedofil botrány',
    message: `Üdvözlöm!

Új Fidesz pedofil botrányt szeretnék beküldeni:

🔗 Hírforrás URL:

Köszönöm!`
  }
}

// Reddit DM URL generálása
export const getRedditDmUrl = () => {
  const { redditUsername, redditMessageTemplate } = config
  const encodedSubject = encodeURIComponent(redditMessageTemplate.subject)
  const encodedMessage = encodeURIComponent(redditMessageTemplate.message)
  
  return `https://www.reddit.com/message/compose/?to=${redditUsername}&subject=${encodedSubject}&message=${encodedMessage}`
} 