function Statistiche({
  onHome,
  onAcademy,
  onReflex,
  onReaction,
  totalXP,
}) {
   const getLevel = (xp) => {
    if (xp < 50) return 1
    if (xp < 150) return 2
    if (xp < 250) return 3
    if (xp < 350) return 4
    if (xp < 450) return 5
    if (xp < 550) return 6
    if (xp < 650) return 7
    if (xp < 800) return 8
    if (xp < 1000) return 9

    return 10 + Math.floor((xp - 1000) / 500)
  }

  const currentLevel = getLevel(totalXP)
  const reactionAverage = localStorage.getItem('reactionAverage')
const reactionBest = localStorage.getItem('reactionBest')
  const currentLevelXP =
    currentLevel <= 10
      ? [0, 50, 150, 250, 350, 450, 550, 650, 800, 1000][currentLevel - 1]
      : 1000 + (currentLevel - 10) * 500

  const nextLevelXP =
    currentLevel < 10
      ? [50, 150, 250, 350, 450, 550, 650, 800, 1000, 1500][currentLevel - 1]
      : currentLevelXP + 500

  const xpIntoLevel = totalXP - currentLevelXP
  const xpNeeded = nextLevelXP - currentLevelXP

  const progressPercent = Math.min(
    100,
    Math.round((xpIntoLevel / xpNeeded) * 100)
  )
  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">
          REFLEX
        </p>

        <h1>STATISTICHE</h1>
         <p>
          LIVELLO <strong>{currentLevel}</strong>
        </p>

        <p>
          <strong>{totalXP}</strong> XP TOTALI
        </p>

        <p>
          {xpIntoLevel} / {xpNeeded} XP AL PROSSIMO LIVELLO
        </p>

        <div
          style={{
            width: '100%',
            height: '12px',
            background: '#333',
            borderRadius: '10px',
            overflow: 'hidden',
            marginTop: '10px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: '#e10600',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
          <p>
          XP TOTALI: <strong>{totalXP}</strong>
        </p>

        <p>
          LIVELLO: <strong>{currentLevel}</strong>
        </p>

        <p>
  Qui vedrai i tuoi progressi, gli XP e le statistiche
  dei tuoi allenamenti.
</p>

<h2>⚡ REACTION</h2>

{reactionAverage && reactionBest ? (
  <>
    <p>
      TEMPO MEDIO: <strong>{(Number(reactionAverage) / 1000).toFixed(2)} s</strong>
    </p>

    <p>
      TEMPO MIGLIORE: <strong>{(Number(reactionBest) / 1000).toFixed(2)} s</strong>
    </p>
  </>
) : (
  <p>
    Completa una sessione Reaction per vedere i tuoi tempi.
  </p>
)}
      </header>

      <nav className="bottom-nav">
        <button
          className="nav-item"
          onClick={onHome}
        >
          <span>🏠</span>
          <small>Home</small>
        </button>

        <button
          className="nav-item"
          onClick={onAcademy}
        >
          <span>🛡️</span>
          <small>Academy</small>
        </button>

        <button
          className="nav-item"
          onClick={onReflex}
        >
          <span>⚡</span>
          <small>Reflex</small>
        </button>

        <button
          className="nav-item"
          onClick={onReaction}
        >
          <span>⏱️</span>
          <small>Reaction</small>
        </button>

        <button className="nav-item active">
          <span>📊</span>
          <small>Statistiche</small>
        </button>
      </nav>
    </main>
  )
}

export default Statistiche