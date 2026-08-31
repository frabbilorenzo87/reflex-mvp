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
  const [timeLeft, setTimeLeft] = useState(0)
  const [isPreparing, setIsPreparing] = useState(false)
const [countdown, setCountdown] = useState(5)
const [showGo, setShowGo] = useState(false)
const [currentCommand, setCurrentCommand] = useState(null)
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
const getRandomCommand = () => {
  const randomIndex = Math.floor(Math.random() * commands.length)
  return commands[randomIndex]
  
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
    setIsPreparing(false)
    setShowGo(true)
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
  if (!isTraining) return

  const interval = setInterval(() => {
    setTimeLeft((previous) => {
      if (previous <= 1) {
        clearInterval(interval)
        setIsTraining(false)
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
    setCurrentCommand(getRandomCommand())
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
if (isPreparing) {
  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">REFLEX TRAINING</p>

        <h1>PREPARATI</h1>

        <div>
          <strong>{countdown}</strong>
        </div>

        <p>Preparati... si parte!</p>
      </header>
    </main>
  )
}
if (showGo) {
  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">REFLEX TRAINING</p>

        <h1>GUARDIA!</h1>

        <p>Preparati alla prima tecnica!</p>
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

        <p>
          Durata: {duration} minuti · Livello: {level}
        </p>
      </header>

      <section className="reflex-options">
        <h2>ALLENAMENTO ATTIVO</h2>
        <p>COMANDO</p>

<strong>{currentCommand}</strong>
        <div>
  <strong>
    {Math.floor(timeLeft / 60)}:
    {String(timeLeft % 60).padStart(2, '0')}
  </strong>
</div>

        <button
          type="button"
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

        <p>
  Seleziona la durata, seleziona il livello e avvia l'allenamento!
</p>

<p>
  Ascolta il comando e reagisci il più velocemente possibile.
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
  <small>50 XP</small>
</button>

          <button
  type="button"
  className={duration === 5 ? 'selected-duration' : ''}
  onClick={() => setDuration(5)}
>
  <strong>5 MINUTI</strong>
  <small>100 XP</small>
</button>

          <button
  type="button"
  className={duration === 7 ? 'selected-duration' : ''}
  onClick={() => setDuration(7)}
>
  <strong>7 MINUTI</strong>
  <small>150 XP</small>
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
  <small>Ogni 5 secondi · +20 XP</small>
</button>

          <button
  type="button"
  className={level === 'intermedio' ? 'selected-level' : ''}
  onClick={() => setLevel('intermedio')}
>
  <strong>INTERMEDIO</strong>
  <small>Ogni 4 secondi · +40 XP</small>
</button>

          <button
  type="button"
  className={level === 'avanzato' ? 'selected-level' : ''}
  onClick={() => setLevel('avanzato')}
>
  <strong>AVANZATO</strong>
  <small>Ogni 3 secondi · +60 XP</small>
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
      <button
        type="button"
        onClick={onHome}
      >
        🏠 TORNA ALLA HOME
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