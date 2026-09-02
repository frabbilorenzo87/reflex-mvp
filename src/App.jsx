import { useEffect, useState } from 'react'
import logoImg from './assets/logo.JPG'
import Academy from './Pages/Academy'
import ReflexTraining from './Pages/ReflexTraining'
import ReactionTraining from './Pages/ReactionTraining'
import Statistiche from './Pages/Statistiche'
import './App.css'

function App() {
  const [showAcademy, setShowAcademy] = useState(false)
const [showReflexTraining, setShowReflexTraining] = useState(false)
const [showReactionTraining, setShowReactionTraining] = useState(false)
const [showStatistiche, setShowStatistiche] = useState(false)
const [totalXP, setTotalXP] = useState(() => {
  const savedXP = localStorage.getItem('reflexTotalXP')
  return savedXP ? Number(savedXP) : 0
})
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

useEffect(() => {
  window.scrollTo(0, 0)
}, [showAcademy])

useEffect(() => {
  localStorage.setItem('reflexTotalXP', String(totalXP))
}, [totalXP])

const [introAudio, setIntroAudio] = useState(null)
const [isIntroPlaying, setIsIntroPlaying] = useState(false)

const toggleIntro = () => {
  if (introAudio) {
    introAudio.pause()
    introAudio.currentTime = 0
  }

  if (isIntroPlaying) {
    setIntroAudio(null)
    setIsIntroPlaying(false)
    return
  }

  const audio = new Audio("/intro.mp3")

  audio.onended = () => {
    setIntroAudio(null)
    setIsIntroPlaying(false)
  }

  audio.play()
  setIntroAudio(audio)
  setIsIntroPlaying(true)
}

if (showAcademy) {

  return (
    <div className="app">
      <Academy />

      <nav className="bottom-nav">
        <button
          className="nav-item"
          onClick={() => setShowAcademy(false)}
        >
          <span>🏠</span>
          <small>Home</small>
        </button>

        <button className="nav-item active">
          <span>🛡️</span>
          <small>Academy</small>
        </button>

        <button
          className="nav-item"
          onClick={() => {
            setShowAcademy(false)
            setShowReflexTraining(true)
          }}
        >
          <span>⚡</span>
          <small>Reflex</small>
        </button>

        <button
  className="nav-item"
  onClick={() => {
    setShowAcademy(false)
    setShowReactionTraining(true)
  }}
>
  <span>⏱️</span>
  <small>Reaction</small>
</button>

        <button
  className="nav-item"
  onClick={() => {
    setShowAcademy(false)
    setShowStatistiche(true)
  }}
>
  <span>📊</span>
  <small>Statistiche</small>
</button>
      </nav>
    </div>
  )
}
if (showStatistiche) {
  return (
    <Statistiche
      onHome={() => setShowStatistiche(false)}

      onAcademy={() => {
        setShowStatistiche(false)
        setShowAcademy(true)
      }}

      onReflex={() => {
        setShowStatistiche(false)
        setShowReflexTraining(true)
      }}

      onReaction={() => {
        setShowStatistiche(false)
        setShowReactionTraining(true)
      }}
      totalXP={totalXP}
    />
  )
}
if (showReactionTraining) {
  return (
    <ReactionTraining
      onHome={() => setShowReactionTraining(false)}
      onAcademy={() => {
        setShowReactionTraining(false)
        setShowAcademy(true)
      }}
      onReflex={() => {
  setShowReactionTraining(false)
  setShowReflexTraining(true)
}}
onStatistiche={() => {
  setShowReactionTraining(false)
  setShowStatistiche(true)
}}
totalXP={totalXP}
setTotalXP={setTotalXP}
    />
  )
}
  if (showReflexTraining) {
  return (
    <ReflexTraining
      onHome={() => setShowReflexTraining(false)}
      onAcademy={() => {
        setShowReflexTraining(false)
        setShowAcademy(true)
      }}
      onReaction={() => {
  setShowReflexTraining(false)
  setShowReactionTraining(true)
}}
onStatistiche={() => {
  setShowReflexTraining(false)
  setShowStatistiche(true)
}}
totalXP={totalXP}
setTotalXP={setTotalXP}
    />
  )
}

  return (
    <div className="app">
      <header className="top-bar">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span>REFLEX</span>
        </div>

        <div className="level-badge">
          <span>LVL {currentLevel}</span>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <img src={logoImg} alt="REFLEX" className="home-logo" />
            <button
  className="intro-button"
  onClick={toggleIntro}
>
  {isIntroPlaying ? "⏹ FERMA INTRO" : "🔊 ASCOLTA L'INTRO"}
</button>
            <p className="eyebrow">REFLEX TRAINING SYSTEM</p>

            <h1>
              ALLENA I TUOI
              <br />
              <span>RIFLESSI.</span>
            </h1>

            <p className="hero-text">
              Impara le tecniche, allenati agli stimoli
              e misura la velocità delle tue reazioni.
            </p>

            <button
              className="primary-button"
              onClick={() => setShowAcademy(true)}
            >
              INIZIA AD ALLENARTI
              <span>→</span>
            </button>
          </div>
        </section>

        <section className="quick-section">
          <div className="section-title">
            <p>IL TUO ALLENAMENTO</p>
            <h2>Scegli la modalità</h2>
          </div>

          <div className="training-grid">
            <div className="training-card academy-card">
              <div className="card-icon">🥋</div>

              <h3>ACADEMY</h3>

              <p>
                Impara le tecniche attraverso immagini,
                spiegazioni e allenamento guidato.
              </p>

              <button onClick={() => setShowAcademy(true)}>
                ENTRA →
              </button>
            </div>

            <div className="training-card reflex-card">
              <div className="card-icon">⚡</div>

              <h3>REFLEX TRAINING</h3>

              <p>
                Ascolta il comando e reagisci eseguendo
                la tecnica il più velocemente possibile.
              </p>

              <button onClick={() => setShowReflexTraining(true)}>
  ALLENA →
</button>
            </div>

            <div className="training-card reaction-card">
              <div className="card-icon">⏱️</div>

              <h3>REACTION TEST</h3>

              <p>
                Rispondi allo stimolo BOX e misura
                il tuo tempo di reazione in millisecondi.
              </p>

              <button
  onClick={() => {
    setShowAcademy(false)
    setShowReflexTraining(false)
    setShowReactionTraining(true)
  }}
>
  TESTA →
</button>
            </div>
          </div>
        </section>

        <section className="stats-preview">
          <div>
            <p>XP TOTALI</p>
            <strong>{totalXP}</strong>
          </div>

          <div>
            <p>LIVELLO</p>
            <strong>{currentLevel}</strong>
          </div>

          <div>
            <p>MIGLIOR REAZIONE</p>
            <strong>
  {localStorage.getItem('reactionBest')
    ? `${(Number(localStorage.getItem('reactionBest')) / 1000).toFixed(2)} s`
    : '—'}
</strong>
          </div>
        </section>
      </main>

      <nav className="bottom-nav">
        <button className="nav-item active">
          <span>🏠</span>
          <small>Home</small>
        </button>

        <button
          className="nav-item"
          onClick={() => setShowAcademy(true)}
        >
          <span>🛡️</span>
          <small>Academy</small>
        </button>

        <button
  className="nav-item"
  onClick={() => {
    setShowAcademy(false)
    setShowReflexTraining(true)
  }}
>
  <span>⚡</span>
  <small>Reflex</small>
</button>

      

        <button
          className="nav-item"
          onClick={() => {
            setShowAcademy(false)
            setShowReflexTraining(false)
            setShowReactionTraining(true)
          }}
        >
          <span>⏱️</span>
          <small>Reaction</small>
        </button>

        <button
  className="nav-item"
  onClick={() => {
    setShowAcademy(false)
    setShowReflexTraining(false)
    setShowReactionTraining(false)
    setShowStatistiche(true)
  }}
>
  <span>📊</span>
  <small>Statistiche</small>
</button>
      </nav>
    </div>
  )
}

export default App