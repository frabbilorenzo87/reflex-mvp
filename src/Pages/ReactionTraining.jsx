import { useEffect, useRef, useState } from 'react'
import logoImg from '../assets/logo.JPG'
function ReactionTraining({
  onHome,
  onAcademy,
  onReflex,
  onStatistiche,
  totalXP,
  setTotalXP,
}) {
  const [isPreparing, setIsPreparing] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [isTesting, setIsTesting] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [currentCommand, setCurrentCommand] = useState(null)
  const [reactionTime, setReactionTime] = useState(null)
  const [noResponse, setNoResponse] = useState(false)
  
const [reactionTimes, setReactionTimes] = useState([])
const [validHits, setValidHits] = useState(0)
  const [micReady, setMicReady] = useState(false)
  const [roundNumber, setRoundNumber] = useState(1)
  const [debugTranscript, setDebugTranscript] = useState('')
  const [introAudio, setIntroAudio] = useState(null)
const [isIntroPlaying, setIsIntroPlaying] = useState(false)
useEffect(() => {
  return () => {
    if (introAudio) {
      introAudio.pause()
      introAudio.currentTime = 0
    }
  }
}, [introAudio])

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

  const audio = new Audio("/intro reaction.mp3")

  audio.onended = () => {
    setIntroAudio(null)
    setIsIntroPlaying(false)
  }

  audio.play()
  setIntroAudio(audio)
  setIsIntroPlaying(true)
}

  const recognitionRef = useRef(null)
  const startTimeRef = useRef(null)
  const audioRef = useRef(null)
  const firstCommandRef = useRef(null)
  const audioCacheRef = useRef({})

  const isTestingRef = useRef(false)
  const recognitionShouldRunRef = useRef(false)
  const roundTimeoutRef = useRef(null)
  const nextRoundTimeoutRef = useRef(null)

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

  const getRandomCommand = () => {
    const randomIndex = Math.floor(Math.random() * commands.length)
    return commands[randomIndex]
  }

  // RICHIESTA MICROFONO APPENA SI ENTRA IN REACTION
  useEffect(() => {
    let stream = null

    const requestMicrophone = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })

        setMicReady(true)

        stream.getTracks().forEach((track) => track.stop())
      } catch (error) {
        console.error('Errore accesso microfono:', error)
      }
    }

    requestMicrophone()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // CREA E CONFIGURA IL RICONOSCIMENTO VOCALE
  const setupRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    console.error('Riconoscimento vocale non supportato')
    return null
  }

  const recognition = new SpeechRecognition()

  recognition.lang = 'it-IT'
  recognition.continuous = false
  recognition.interimResults = false
  recognition.maxAlternatives = 5

  recognition.onresult = (event) => {
    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {
      const transcript = event.results[i][0].transcript
        .trim()
        .toLowerCase()

      console.log(
        '🎤 VOCE RICONOSCIUTA:',
        JSON.stringify(transcript)
      )

      setDebugTranscript(transcript)

      // Ignoriamo qualsiasi voce fuori dalla finestra di reazione
      console.log(
  '🔎 CONTROLLO HIT:',
  JSON.stringify({
    transcript,
    isTesting: isTestingRef.current,
    startTime: startTimeRef.current
  })
)

if (
  !isTestingRef.current ||
  startTimeRef.current === null
) {
  continue
}

      /*
       * RISPOSTA VALIDA:
       * accettiamo parole molto brevi che terminano
       * con il suono/scrittura "it".
       *
       * Esempi possibili:
       * hit
       * kit
       * rit
       * sit
       * fit
       *
       * Non accettiamo frasi lunghe.
       */

      const words = transcript.split(/\s+/)

      if (words.length !== 1) {
        continue
      }

      const isShortResponse =
        transcript.length >= 2 &&
        transcript.length <= 5

      const endsWithIT =
        transcript.endsWith('it')

      if (
  !isTestingRef.current ||
  startTimeRef.current === null
) {
  continue
}
        if (isShortResponse && endsWithIT) {
        const elapsed = Math.round(
          performance.now() - startTimeRef.current
        )

        console.log(
          '🔥 RISPOSTA VALIDA:',
          transcript,
          elapsed,
          'ms'
        )

        setReactionTime(elapsed)
        setReactionTimes((previous) => [...previous, elapsed])
        setTotalXP((previous) => previous + 10)
        setValidHits((previous) => previous + 1)

        // HIT valida: chiudiamo questa tecnica
startTimeRef.current = null



if (roundTimeoutRef.current) {
  clearTimeout(roundTimeoutRef.current)
  roundTimeoutRef.current = null
}

// Se non siamo alla 10ª tecnica, mostra il risultato per 1 secondo
if (roundNumber < 10) {

  setTimeout(() => {

    if (!isTestingRef.current) return

    setRoundNumber((previous) => {
      if (previous >= 10) {
        return 10
      }

      return previous + 1
    })

  }, 1000)

} else {

  console.log('🏁 TEST COMPLETATO 10/10')

  setTimeout(() => {
    isTestingRef.current = false
    recognitionShouldRunRef.current = false

    setIsTesting(false)
    setSessionCompleted(true)
  }, 1000)
}

        

       return 
      }
    }
  }

  recognition.onerror = (event) => {
    console.error(
      '❌ ERRORE RICONOSCIMENTO:',
      event.error
    )
  }

  recognition.onend = () => {
    console.log('🎤 RICONOSCIMENTO TERMINATO')

    if (recognitionShouldRunRef.current) {
      setTimeout(() => {
        if (!recognitionShouldRunRef.current) return

        try {
          recognition.start()
          console.log('🎤 RICONOSCIMENTO RIAVVIATO')
        } catch (error) {
          console.log('Riconoscimento già attivo')
        }
      }, 150)
    }
  }

  recognitionRef.current = recognition

  return recognition
}

  // COUNTDOWN
  useEffect(() => {
    if (!isPreparing) return

    if (countdown === 0) {
      setIsPreparing(false)
      setIsTesting(true)
      isTestingRef.current = true
      return
    }

    const timer = setTimeout(() => {
      setCountdown((previous) => previous - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isPreparing, countdown])

  // PARTE IL ROUND
  useEffect(() => {
    if (!isTesting) return

    const command =
  roundNumber === 1 && firstCommandRef.current
    ? firstCommandRef.current
    : getRandomCommand()
    const audioFile = audioFiles[command]

    setCurrentCommand(command)
setReactionTime(null)
setNoResponse(false)

    startTimeRef.current = null

    if (!audioFile) {
      console.error('Audio non trovato per:', command)
      return
    }

   const audio = audioCacheRef.current[command]

if (!audio) {
  console.error('Audio non presente nella cache per:', command)
  return
}

audio.preload = 'auto'
audioRef.current = audio

if (roundNumber === 1) {
  audio.muted = false
}

    audio.onplay = () => {
  startTimeRef.current = performance.now()

  isTestingRef.current = true
  recognitionShouldRunRef.current = true

  

  console.log(
    '⏱️ TIMER PARTITO CON LA VOCE DI LISANDRO'
  )

  // Finestra massima di risposta: 6 secondi
  roundTimeoutRef.current = setTimeout(() => {
    if (startTimeRef.current === null) {
      return
    }

    console.log(
      '⏰ TEMPO MASSIMO RAGGIUNTO'
    )

    startTimeRef.current = null
    isTestingRef.current = false
    

    // Non fermiamo il riconoscimento tra un round e l'altro.
// Su iPhone Safari il riavvio dopo stop() può generare "aborted".

    roundTimeoutRef.current = null
setNoResponse(true)

if (roundNumber < 10) {

  setTimeout(() => {

    setRoundNumber((previous) => previous + 1)

  }, 1000)

} else {

  console.log('🏁 SESSIONE TERMINATA 10/10')

  setTimeout(() => {
  setIsTesting(false)
  isTestingRef.current = false
  recognitionShouldRunRef.current = false
  setSessionCompleted(true)
}, 1000)

}
  }, 6000)
}

    audio.onended = () => {
  console.log('🔊 Audio terminato')

  const recognition =
    recognitionRef.current || setupRecognition()

  if (recognition) {
    try {
      recognition.start()
      console.log(
        '🎤 MICROFONO AVVIATO DOPO LA VOCE DI LISANDRO'
      )
    } catch (error) {
      console.log(
        'Riconoscimento già attivo'
      )
    }
  }
}

    audio.play().catch((error) => {
      console.error(
        'Errore riproduzione audio:',
        error
      )
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      startTimeRef.current = null
    }
  }, [isTesting, roundNumber])

  const startTest = () => {
    if (introAudio) {
  introAudio.pause()
  introAudio.currentTime = 0
  setIntroAudio(null)
  setIsIntroPlaying(false)
}
    setReactionTime(null)
    setNoResponse(false)
    setCurrentCommand(null)
    setCountdown(5)
    setRoundNumber(1)

    isTestingRef.current = false
recognitionShouldRunRef.current = false
setRoundNumber(1)
setReactionTimes([])
setValidHits(0)



    const firstCommand = getRandomCommand()
    
    firstCommandRef.current = firstCommand
    setCurrentCommand(firstCommand)

    const firstAudioFile = audioFiles[firstCommand]

    audioCacheRef.current = {}

Object.entries(audioFiles).forEach(([command, file]) => {
  const audio = new Audio(file)
  audio.preload = 'auto'
  audio.load()
  audioCacheRef.current[command] = audio
})

if (firstAudioFile) {
  audioRef.current = audioCacheRef.current[firstCommand]
}

const recognition = recognitionRef.current || setupRecognition()

if (recognition) {
  try {
    recognition.start()
    console.log('🎤 RICONOSCIMENTO AVVIATO DA START TEST')
  } catch (error) {
    console.log('Riconoscimento già attivo')
  }
}   
setIsPreparing(true)
  }

  const stopTest = (
  finalValidHits = validHits,
  finalReactionTimes = reactionTimes
) => {
    isTestingRef.current = false
    recognitionShouldRunRef.current = false

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        // nessun problema
      }
    }

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    recognitionRef.current = null
    audioRef.current = null
    startTimeRef.current = null

    if (roundTimeoutRef.current) {
  clearTimeout(roundTimeoutRef.current)
  roundTimeoutRef.current = null
}
if (finalValidHits === 10) {
  setTotalXP((previous) => previous + 20)
}  
if (finalReactionTimes.length > 0) {
  const average =
    finalReactionTimes.reduce((sum, time) => sum + time, 0) /
    finalReactionTimes.length

  const best = Math.min(...finalReactionTimes)

  localStorage.setItem('reactionAverage', String(Math.round(average)))
  localStorage.setItem('reactionBest', String(best))
}  
setIsTesting(false)
setIsPreparing(false)
setSessionCompleted(true)
    setCurrentCommand(null)
    setReactionTime(null)
    setCountdown(5)
  }

  const leaveReaction = () => {
    stopTest()
    onHome()
  }

  if (isPreparing) {
    return (
      <main className="reflex-training-page">
        <header className="academy-header">
          <p className="eyebrow">
            REFLEX REACTION
          </p>

          <h1>PREPARATI</h1>

          <div>
            <strong>{countdown}</strong>
          </div>

          <p className="preparation-subtitle">
  Preparati... si parte!
</p>
        </header>
      </main>
    )
  }

  if (sessionCompleted) {
  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">
          REFLEX REACTION
        </p>

        <h1>SESSIONE TERMINATA</h1>

        <p className="session-result-info">
  Hai completato la sessione.
</p>

<p className="session-result-info">
  HIT riconosciuti: <strong>{validHits}</strong> / 10
</p>

<p className="session-result-info">
  XP HIT: <strong>{validHits * 10}</strong>
</p>

{validHits === 10 && (
  <p>
    Bonus sessione perfetta: <strong>+20 XP</strong>
  </p>
)}

<p className="total-session-xp">
  XP totali sessione: <strong>
    {validHits * 10 + (validHits === 10 ? 20 : 0)}
  </strong>
</p>
      </header>

      <button
        type="button"
        onClick={() => {
          setSessionCompleted(false)
          setValidHits(0)
          setReactionTimes([])
          setCurrentCommand(null)
          setReactionTime(null)
        }}
      >
        ▶️ NUOVA SESSIONE
      </button>

      <button
        type="button"
        onClick={leaveReaction}
      >
        🏠 TORNA ALLA HOME
      </button>
    </main>
  )
}
  if (isTesting) {
    return (
      <main className="reflex-training-page">
        <header className="academy-header">
          <p className="eyebrow">
            REFLEX REACTION
          </p>

          <p className="round-info">
  Tecnica {roundNumber} di 10
</p>
          <h1>{currentCommand}</h1>

          {reactionTime !== null ? (
  <>
    <p>
      Tempo di reazione
    </p>

    <strong>
      {reactionTime} ms
    </strong>
  </>
) : noResponse ? (
  <>
    <p className="no-response-message">
  NESSUNA RISPOSTA
</p>
  </>
) : (
  <>
    <p className="reaction-instruction">
  Ascolta il comando e pronuncia HIT.
</p>
  </>
)}
        </header>

        <button
          type="button"
          onClick={stopTest}
        >
          ⏹️ TERMINA TEST
        </button>
      </main>
    )
  }

  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">
          REFLEX REACTION
        </p>

        <div className="page-title-with-logo">
  <img
    src={logoImg}
    alt="Reflex"
    className="page-title-logo"
  />
  <h1>REACTION TEST</h1>
</div>
        <button
  className="intro-button"
  onClick={toggleIntro}
>
  {isIntroPlaying ? "⏹ FERMA INTRO" : "🔊 ASCOLTA L'INTRO"}
</button>

        

<p>
  <strong>1.</strong> Avvia il Reaction Test e preparati al countdown.
</p>

<p>
  <strong>2.</strong> Ascolta il comando vocale ed esegui la tecnica indicata.
</p>

<p>
  <strong>3.</strong> Appena hai eseguito la tecnica, pronuncia <strong>HIT</strong> il più velocemente possibile.
</p>

<p>
  La sessione comprende <strong>10 tecniche casuali</strong>.
  Se non rispondi entro il tempo massimo, si passa automaticamente
  alla tecnica successiva.
</p>

<p className="reaction-final-instruction">
  Al termine delle 10 tecniche, clicca su "termina test" e visualizzerai i risultati della sessione.
</p>

        {!micReady && (
          <p>
            Attivazione microfono in corso...
          </p>
        )}
      </header>

      <button
        type="button"
        onClick={startTest}
      >
        ▶️ AVVIA REACTION TEST
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

  <button
    className="nav-item"
    onClick={onReflex}
  >
    <span>⚡</span>
    <small>Reflex</small>
  </button>

  <button className="nav-item active">
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

export default ReactionTraining