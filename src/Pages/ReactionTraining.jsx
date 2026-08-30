import { useEffect, useRef, useState } from 'react'

function ReactionTraining({
  onHome,
  onAcademy,
  onReflex,
  totalXP,
  setTotalXP,
}) {
  const [isPreparing, setIsPreparing] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [isTesting, setIsTesting] = useState(false)
  const [currentCommand, setCurrentCommand] = useState(null)
  const [reactionTime, setReactionTime] = useState(null)
  const [noResponse, setNoResponse] = useState(false)
  
const [reactionTimes, setReactionTimes] = useState([])
const [validHits, setValidHits] = useState(0)
  const [micReady, setMicReady] = useState(false)
  const [roundNumber, setRoundNumber] = useState(1)
  const [debugTranscript, setDebugTranscript] = useState('')

  const recognitionRef = useRef(null)
  const startTimeRef = useRef(null)
  const audioRef = useRef(null)

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
  recognition.continuous = true
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
        setTotalXP((previous) => previous + 10)
        setValidHits((previous) => previous + 1)

        // HIT valida: chiudiamo questa tecnica
startTimeRef.current = null
isTestingRef.current = false
recognitionShouldRunRef.current = false

if (roundTimeoutRef.current) {
  clearTimeout(roundTimeoutRef.current)
  roundTimeoutRef.current = null
}

// Se non siamo alla 10ª tecnica, mostra il risultato per 1 secondo
if (validHits + 1 < 10) {

  setTimeout(() => {

    if (!isTestingRef.current) return

    setRoundNumber((previous) => previous + 1)

  }, 1000)

} else {

  console.log('🏁 TEST COMPLETATO 10/10')

  setTotalXP((previous) => previous + 20)

  setTimeout(() => {

    setIsTesting(false)

    isTestingRef.current = false

    recognitionShouldRunRef.current = false

  }, 1000)

}

        

        try {
          recognition.stop()
        } catch (error) {
          // nessun problema
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

    const command = getRandomCommand()
    const audioFile = audioFiles[command]

    setCurrentCommand(command)
setReactionTime(null)
setNoResponse(false)

    startTimeRef.current = null

    if (!audioFile) {
      console.error('Audio non trovato per:', command)
      return
    }

    const audio = new Audio(audioFile)

    audio.preload = 'auto'
    audioRef.current = audio

    audio.onplay = () => {
  startTimeRef.current = performance.now()

  isTestingRef.current = true
  recognitionShouldRunRef.current = true

  const recognition =
    recognitionRef.current || setupRecognition()

  if (recognition) {
    try {
      recognition.start()
      console.log(
        '🎤 MICROFONO AVVIATO CON LISANDRO'
      )
    } catch (error) {
      console.log(
        'Riconoscimento già attivo'
      )
    }
  }

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
    recognitionShouldRunRef.current = false

    try {
      recognitionRef.current?.stop()
    } catch (error) {
      // nessun problema
    }

    roundTimeoutRef.current = null
setNoResponse(true)

if (roundNumber < 10) {
  setTimeout(() => {
    setRoundNumber((previous) => previous + 1)
  }, 1000)
} else {
  console.log('🏁 TEST COMPLETATO 10/10')
  setTimeout(() => {
    setIsTesting(false)
    isTestingRef.current = false
    recognitionShouldRunRef.current = false
  }, 1000)
}
  }, 6000)
}

    audio.onended = () => {
      console.log('🔊 Audio terminato')
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
    setCurrentCommand(firstCommand)

    const firstAudioFile = audioFiles[firstCommand]

    if (firstAudioFile) {
      const preloadAudio = new Audio(firstAudioFile)
      preloadAudio.preload = 'auto'
      preloadAudio.load()
    }

    setIsPreparing(true)
  }

  const stopTest = () => {
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
    setIsTesting(false)
    setIsPreparing(false)
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

          <p>
            Preparati... si parte!
          </p>
        </header>
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

          <p>
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
    <p>
      NESSUNA RISPOSTA
    </p>
  </>
) : (
  <>
    <p>
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

        <h1>REACTION TEST</h1>

        <p>
  <strong>Come funziona</strong>
</p>

<p>
  Clicca su <strong>AVVIA REACTION TEST</strong> per iniziare.
  Partirà un countdown iniziale.
</p>

<p>
  Al termine del countdown, ascolta il comando vocale e
  osserva la tecnica indicata sullo schermo.
</p>

<p>
  Esegui la tecnica il più velocemente possibile e, appena
  l’hai eseguita, urla <strong>HIT</strong>. Il tempo di
  reazione verrà calcolato automaticamente.
</p>

<p>
  La sessione è automatica e comprende <strong>10 tecniche casuali</strong>.
  Se non rispondi entro il tempo massimo, si passa
  automaticamente alla tecnica successiva.
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

      <button
        type="button"
        onClick={leaveReaction}
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

  <button className="nav-item">
    <span>📊</span>
    <small>Statistiche</small>
  </button>
</nav>
    </main>
  )
}

export default ReactionTraining