import { useEffect, useState, useRef } from 'react'

function ReflexTraining({
  onHome,
  onAcademy,
  onReaction,
  onStatistiche,
  totalXP,
  setTotalXP,
}) {
  const [duration, setDuration] = useState(null)
  const [level, setLevel] = useState(null)
  const [isTraining, setIsTraining] = useState(false)
  const [sessionSummary, setSessionSummary] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isPreparing, setIsPreparing] = useState(false)
const [countdown, setCountdown] = useState(5)
const [showGo, setShowGo] = useState(false)
const [currentCommand, setCurrentCommand] = useState(null)
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

  const audio = new Audio("/intro reflex.mp3")

  audio.onended = () => {
    setIntroAudio(null)
    setIsIntroPlaying(false)
  }

  audio.play()
  setIntroAudio(audio)
  setIsIntroPlaying(true)
}
const audioCache = useRef({})

const commands = [
  'passo avanti',
  'passo indietro',
  'guardia',
  'diretto sinistro',
  'diretto destro',
  'gancio sinistro',
  'gancio destro',
  'calcio sinistro',
  'calcio destro',
  'parata sinistra',
  'parata destra',
  'parata a due mani',
]
const getRandomCommand = (previousCommand = null) => {
  const availableCommands = commands.filter(
    (command) => command !== previousCommand
  )

  const randomIndex = Math.floor(Math.random() * availableCommands.length)

  return availableCommands[randomIndex]

  
}
const audioFiles = {
  'passo avanti': '/passo avanti.mp3',
  'passo indietro': '/passo indietro.mp3',
  'guardia': '/guardia comando.mp3',
  'diretto sinistro': '/diretto sinistro.mp3',
  'diretto destro': '/diretto destro.mp3',
  'gancio sinistro': '/gancio sinistro.mp3',
  'gancio destro': '/gancio destro.mp3',
  'calcio sinistro': '/calcio sinistro.mp3',
  'calcio destro': '/calcio destro.mp3',
  'parata sinistra': '/parata sinistra.mp3',
  'parata destra': '/parata destra.mp3',
  'parata a due mani': '/parata a due mani.mp3',
}
useEffect(() => {
  Object.entries(audioFiles).forEach(([command, file]) => {
    const audio = new Audio(file)
    audio.preload = 'auto'
    audioCache.current[command] = audio
  })
}, [])
  useEffect(() => {
  if (!isPreparing) return

  if (countdown === 0) {
  setTimeLeft(duration * 60)
  setCurrentCommand(getRandomCommand())
  setIsPreparing(false)
  setIsTraining(true)
  return
}

  const timer = setTimeout(() => {
    setCountdown((previous) => previous - 1)
  }, 1000)

  return () => clearTimeout(timer)
}, [isPreparing, countdown])

useEffect(() => {
  if (!showGo) return

  const goTimer = setTimeout(() => {
  
    setTimeLeft(duration * 60)
  setCurrentCommand(getRandomCommand())
  setShowGo(false)
  setIsTraining(true)
}, 1000)
  return () => clearTimeout(goTimer)
}, [showGo])
useEffect(() => {
  if (!isTraining || !duration) return

  const trainingTimer = setTimeout(() => {
    const baseXP =
      duration === 3
        ? 50
        : duration === 5
          ? 100
          : duration === 7
            ? 150
            : 0

    const levelBonus =
      level === 'principiante'
        ? 20
        : level === 'intermedio'
          ? 40
          : level === 'avanzato'
            ? 60
            : 0

    const earnedXP = baseXP + levelBonus

const intervalSeconds =
  level === 'principiante'
    ? 5
    : level === 'intermedio'
      ? 4
      : 3

const techniquesCompleted =
  1 + Math.floor((duration * 60) / intervalSeconds)

console.log('🏆 XP REFLEX ASSEGNATI:', earnedXP)

setSessionSummary({
  techniques: techniquesCompleted,
  earnedXP,
  duration,
  level,
})

setIsTraining(false)
setTimeLeft(0)
setTotalXP((previousXP) => previousXP + earnedXP)
  }, duration * 60 * 1000)

  return () => clearTimeout(trainingTimer)
}, [isTraining, duration, level, setTotalXP])
useEffect(() => {
  if (!isTraining) return

  const interval = setInterval(() => {
    setTimeLeft((previous) => {
      if (previous <= 1) {
        clearInterval(interval)
        return 0
      }

      return previous - 1
    })
  }, 1000)

  return () => clearInterval(interval)
}, [isTraining])



useEffect(() => {
  if (!isTraining) return  
const intervalSeconds =
    level === 'principiante'
      ? 5
      : level === 'intermedio'
        ? 4
        : 3

  const interval = setInterval(() => {
  setCurrentCommand((previousCommand) =>
    getRandomCommand(previousCommand)
  )
}, intervalSeconds * 1000)

  return () => clearInterval(interval)
}, [isTraining, level])
useEffect(() => {
  if (!isTraining || !currentCommand) return

  
  const audio = audioCache.current[currentCommand]

if (!audio) return

audio.currentTime = 0

audio.play().catch(error => {
  console.error('Errore riproduzione audio:', error)
})

return () => {
  audio.pause()
  audio.currentTime = 0
}
}, [currentCommand, isTraining])
if (sessionSummary) {
  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">REFLEX TRAINING</p>

        <h1>ALLENAMENTO COMPLETATO</h1>

        <p className="session-result-info">
          Tecniche effettuate: <strong>{sessionSummary.techniques}</strong>
        </p>

        <p className="session-result-info">
          XP guadagnati: <strong>+{sessionSummary.earnedXP}</strong>
        </p>

        <p className="session-result-info">
          Durata: <strong>{sessionSummary.duration} minuti</strong>
        </p>

        <p className="session-result-info">
          Livello: <strong>{sessionSummary.level}</strong>
        </p>

        <p className="total-session-xp">
          Ottimo lavoro! Continua così.
        </p>
      </header>

      <button
        type="button"
        onClick={() => {
          setSessionSummary(null)
          setCurrentCommand(null)
          setTimeLeft(0)
        }}
      >
        ▶️ NUOVO ALLENAMENTO
      </button>

      <button
        type="button"
        onClick={onHome}
      >
        🏠 TORNA ALLA HOME
      </button>
    </main>
  )
}
if (isPreparing) {
  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">REFLEX TRAINING</p>

        <h1>PREPARATI</h1>

        <div>
  <strong>{countdown}</strong>
</div>

<h2>GUARDIA!</h2>

<p className="preparation-subtitle">
  Preparati alla prima tecnica!
</p>

</header>
    </main>
  )
}

  if (isTraining) {
  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">REFLEX TRAINING</p>

        <h1>SESSIONE IN CORSO</h1>

        <p className="session-info">
  Durata: {duration} minuti · Livello: {level}
</p>
      </header>

      <section className="reflex-options">
        <h2>ALLENAMENTO ATTIVO</h2>
        <p>COMANDO</p>

<strong className="active-command">
  {currentCommand}
</strong>
        <div className="active-timer">
  <strong>
    {Math.floor(timeLeft / 60)}:
    {String(timeLeft % 60).padStart(2, '0')}
  </strong>
</div>

        <button
  type="button"
  className="terminate-training-button"
  onClick={() => setIsTraining(false)}
>
  ⏹ TERMINA ALLENAMENTO
</button>
      </section>
    </main>
  )
}

  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">REFLEX TRAINING</p>

        <h1>ALLENAMENTO</h1>
        <button
  className="intro-button"
  onClick={toggleIntro}
>
  {isIntroPlaying ? "⏹ FERMA INTRO" : "🔊 ASCOLTA L'INTRO"}
</button>

        <p className="reflex-intro-text">
  <strong>1.</strong> Seleziona la durata, seleziona il livello e avvia l'allenamento!
</p>

<p className="reflex-intro-text">
  <strong>2.</strong> Ascolta il comando e reagisci il più velocemente possibile.
</p>
      </header>

      <section className="reflex-options">
        <h2>DURATA</h2>
       

        <div className="reflex-duration-options">
          <button
  type="button"
  className={duration === 3 ? 'selected-duration' : ''}
  onClick={() => setDuration(3)}
>
  <strong>3 MINUTI</strong>
  <small> +50 XP</small>
</button>

          <button
  type="button"
  className={duration === 5 ? 'selected-duration' : ''}
  onClick={() => setDuration(5)}
>
  <strong>5 MINUTI</strong>
  <small> +100 XP</small>
</button>

          <button
  type="button"
  className={duration === 7 ? 'selected-duration' : ''}
  onClick={() => setDuration(7)}
>
  <strong>7 MINUTI</strong>
  <small> +150 XP</small>
</button>
        </div>
      </section>
 <section className="reflex-options">
        <h2>LIVELLO</h2>

        <div className="reflex-level-options">
          <button
  type="button"
  className={level === 'principiante' ? 'selected-level' : ''}
  onClick={() => setLevel('principiante')}
>
  <strong>PRINCIPIANTE</strong>
  <small> +20 XP</small>
</button>

          <button
  type="button"
  className={level === 'intermedio' ? 'selected-level' : ''}
  onClick={() => setLevel('intermedio')}
>
  <strong>INTERMEDIO</strong>
  <small> +40 XP</small>
</button>

          <button
  type="button"
  className={level === 'avanzato' ? 'selected-level' : ''}
  onClick={() => setLevel('avanzato')}
>
  <strong>AVANZATO</strong>
  <small> +60 XP</small>
</button>
        </div>
      </section>
      <button
  type="button"
  disabled={!duration || !level}
  onClick={() => {
  setCountdown(5)
  setIsPreparing(true)
}}
>
  ▶️ AVVIA ALLENAMENTO
</button>
      
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

        <button className="nav-item active">
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

        <button
  className="nav-item"
  onClick={onStatistiche}
>
  <span>📊</span>
  <small>Statistiche</small>
</button>
      </nav>
    </main>
  )
}

export default ReflexTraining