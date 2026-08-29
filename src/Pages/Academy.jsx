import { useEffect, useState } from 'react'

import calcioImg from '../assets/techniques/calci.JPG'
import calcioTecnicaImg from '../assets/techniques/calci tecnica.JPG'
import calcioTecnica2Img from '../assets/techniques/calci tecnica 2.PNG'
import calcioSinistraImg from '../assets/techniques/calci sinistra.jpg'

import coverImg from '../assets/techniques/cover_parata.JPG'
import coverUnaManoImg from '../assets/techniques/cover una mano tecnica.JPG'
import coverDueManiImg from '../assets/techniques/cover due mani tecnica.JPG'
import coverDestraImg from '../assets/techniques/cover destra.PNG'

import direttoImg from '../assets/techniques/diretto.JPG'
import direttoTecnicaImg from '../assets/techniques/diretto tecnica.JPG'
import direttoDestroImg from '../assets/techniques/diretto destro.PNG'

import gancioImg from '../assets/techniques/gancio.JPG'
import gancioTecnicaImg from '../assets/techniques/gancio tecnica.JPG'
import gancioSinistraImg from '../assets/techniques/gancio sinistra.jpg'

import guardiaImg from '../assets/techniques/guardia.JPG'
import guardiaStep1Img from '../assets/techniques/guardia step 1.PNG'
import guardiaStep2Img from '../assets/techniques/guardia step 2.PNG'
import guardiaStep3Img from '../assets/techniques/guardia step 3.PNG'

import spostamentoImg from '../assets/techniques/spostamento.JPG'
const categories = [
 {
  title: 'GUARDIA',
  image: guardiaImg,
  techniques: [
    {
      name: 'Guardia',
      description:
        'Posizione di base con mani alte, mento protetto e piedi pronti a muoversi.',
      steps: [
        'Posiziona un piede leggermente avanti rispetto all’altro.',
        'Mantieni i piedi alla larghezza delle spalle per avere una base stabile.',
        'Piega leggermente le ginocchia e distribuisci il peso in modo equilibrato.',
        'Porta le mani all’altezza del viso per proteggere la testa.',
        'Tieni il mento leggermente abbassato e guarda sempre davanti a te.'
      ],
      images: [
        guardiaStep1Img,
        guardiaStep2Img,
        guardiaStep3Img
      ]
    }
  ]
},
  


{
  title: 'COVER E PARATA ALTA',
  image: coverImg,
  techniques: [
    {
      name: 'Parata sinistra',
      description:
        'Parata sul lato sinistro per proteggere la testa.',
      steps: [
        'Parti dalla posizione di guardia, con le mani alte e il mento protetto.',
        'Porta la mano sinistra verso il lato della testa per proteggere il volto.',
        'Mantieni il braccio destro vicino al viso per continuare a proteggerti.',
        'Mantieni una posizione stabile senza perdere l’equilibrio.',
        'Riporta rapidamente la mano sinistra nella posizione di guardia.'
      ],
      images: [
        guardiaStep3Img,
        coverUnaManoImg
      ]
    },
    {
      name: 'Parata destra',
      description:
        'Parata sul lato destro per proteggere la testa.',
      steps: [
        'Parti dalla posizione di guardia, con le mani alte e il mento protetto.',
        'Porta la mano destra verso il lato della testa per proteggere il volto.',
        'Mantieni il braccio sinistro vicino al viso per continuare a proteggerti.',
        'Mantieni una posizione stabile senza perdere l’equilibrio.',
        'Riporta rapidamente la mano destra nella posizione di guardia.'
      ],
      images: [
        guardiaStep3Img,
        coverDestraImg
      ]
    },
    {
      name: 'Parata due mani',
      description:
        'Protezione alta eseguita utilizzando entrambe le mani.',
      steps: [
        'Parti dalla posizione di guardia, con entrambe le mani alte.',
        'Porta entrambe le mani davanti e sopra la testa per creare una protezione alta.',
        'Mantieni i gomiti leggermente piegati e vicini al corpo.',
        'Proteggi la testa mantenendo il mento leggermente abbassato.',
        'Torna rapidamente nella posizione di guardia.'
      ],
      images: [
        guardiaStep3Img,
        coverDueManiImg
      ]
    }
  ]
},

 {
  title: 'SPOSTAMENTO',
  image: spostamentoImg,
  techniques: [
    {
      name: 'Passo avanti',
      description:
        'Avanzamento controllato per ridurre la distanza mantenendo equilibrio, guardia e capacità di reagire.',
      steps: [
        'Parti dalla posizione di guardia, con i piedi stabili e il peso distribuito.',
        'Sposta in avanti il piede anteriore mantenendo la stessa distanza tra i piedi.',
        'Porta in avanti anche il piede posteriore, tornando nella posizione di guardia.',
        'Mantieni le ginocchia leggermente piegate e il busto stabile durante il movimento.',
        'Continua a tenere le mani alte e lo sguardo rivolto davanti a te.'
      ],
      images: [
        guardiaStep3Img,
        spostamentoImg
      ]
    },
    {
      name: 'Passo indietro',
      description:
        'Arretramento controllato per aumentare la distanza mantenendo equilibrio, protezione e possibilità di reagire.',
      steps: [
        'Parti dalla posizione di guardia, con i piedi stabili e il peso distribuito.',
        'Sposta indietro il piede posteriore mantenendo la stessa distanza tra i piedi.',
        'Porta indietro anche il piede anteriore, tornando nella posizione di guardia.',
        'Mantieni le ginocchia leggermente piegate e il busto stabile durante il movimento.',
        'Continua a tenere le mani alte e lo sguardo rivolto davanti a te.'
      ],
      images: [
        guardiaStep3Img,
        spostamentoImg
      ]
    }
  ]
},

 {
  title: 'DIRETTO',
  image: direttoImg,
  techniques: [
    {
      name: 'Diretto sinistro',
      description:
        'Colpo lineare eseguito con la mano sinistra, mantenendo controllo, equilibrio e protezione.',
      steps: [
        'Parti dalla posizione di guardia, con la mano sinistra pronta davanti al viso.',
        'Ruota leggermente il piede e il bacino per accompagnare il movimento.',
        'Estendi il braccio sinistro in linea verso il bersaglio, mantenendo la spalla rilassata.',
        'Mantieni la mano destra vicino al viso per proteggerti durante l’esecuzione.',
        'Riporta rapidamente il braccio sinistro nella posizione di guardia.'
      ],
      images: [
        guardiaStep3Img,
        direttoTecnicaImg
      ]
    },
    {
      name: 'Diretto destro',
      description:
        'Colpo lineare eseguito con la mano destra, accompagnato dalla rotazione del corpo per aumentare controllo e potenza.',
      steps: [
        'Parti dalla posizione di guardia, con la mano destra pronta vicino al viso.',
        'Ruota il piede e il bacino per accompagnare il movimento.',
        'Estendi il braccio destro in linea verso il bersaglio, mantenendo la spalla rilassata.',
        'Mantieni la mano sinistra vicino al viso per proteggerti durante l’esecuzione.',
        'Riporta rapidamente il braccio destro nella posizione di guardia.'
      ],
      images: [
        guardiaStep3Img,
        direttoDestroImg
      ]
    }
  ]
},

 { title: 'GANCIO', image: gancioImg, techniques: [ { name: 'Gancio sinistro', description: 'Colpo circolare eseguito con il braccio sinistro, mantenendo il corpo stabile e la mano destra in protezione.', steps: [ 'Parti dalla posizione di guardia, con entrambe le mani alte.', 'Ruota leggermente il piede e il bacino per accompagnare il movimento.', 'Piega il braccio sinistro e portalo lateralmente verso il bersaglio.', 'Mantieni la mano destra vicino al viso per proteggerti.', 'Riporta rapidamente il braccio sinistro nella posizione di guardia.' ], images: [ guardiaStep3Img, gancioTecnicaImg ] }, { name: 'Gancio destro', description: 'Colpo circolare eseguito con il braccio destro, mantenendo il corpo stabile e la mano sinistra in protezione.', steps: [ 'Parti dalla posizione di guardia, con entrambe le mani alte.', 'Ruota leggermente il piede e il bacino per accompagnare il movimento.', 'Piega il braccio destro e portalo lateralmente verso il bersaglio.', 'Mantieni la mano sinistra vicino al viso per proteggerti.', 'Riporta rapidamente il braccio destro nella posizione di guardia.' ], images: [ guardiaStep3Img, gancioSinistraImg ] } ] },

{
  title: 'CALCIO CENTRALE E LATERALE',
  image: calcioImg,
  techniques: [
    {
      name: 'Calcio sinistro',
      description:
        'Calcio eseguito con la gamba sinistra, mantenendo equilibrio, controllo e protezione.',
      steps: [
        'Parti dalla posizione di guardia, con le mani alte e il peso ben distribuito.',
        'Sposta il peso sulla gamba destra e prepara la gamba sinistra al movimento.',
        'Porta la gamba sinistra verso il bersaglio mantenendo il busto stabile.',
        'Mantieni le mani in protezione durante tutta l’esecuzione.',
        'Riporta rapidamente la gamba nella posizione di guardia.'
      ],
      images: [
        guardiaStep3Img,
        calcioSinistraImg
      ]
    },
    {
      name: 'Calcio destro',
      description:
        'Calcio eseguito con la gamba destra, mantenendo equilibrio, controllo e protezione.',
      steps: [
        'Parti dalla posizione di guardia, con le mani alte e il peso ben distribuito.',
        'Sposta il peso sulla gamba sinistra e prepara la gamba destra al movimento.',
        'Porta la gamba destra verso il bersaglio mantenendo il busto stabile.',
        'Mantieni le mani in protezione durante tutta l’esecuzione.',
        'Riporta rapidamente la gamba nella posizione di guardia.'
      ],
      images: [
        guardiaStep3Img,
        calcioTecnicaImg,
        calcioTecnica2Img
      ]
    }
  ]
},
]

function Academy() {
  const [selectedTechnique, setSelectedTechnique] = useState(null)
  const [playingStep, setPlayingStep] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [zoomedImage, setZoomedImage] = useState(null)
  const stopCurrentAudio = () => {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    setCurrentAudio(null)
  }
  
  
  setIsPlaying(false)
  setPlayingStep(null)
}
const playTechniqueAudio = () => {
 if (!selectedTechnique) return

  stopCurrentAudio()
 

  setIsPlaying(true)
  setPlayingStep(0)

  let audioFiles = []

if (selectedTechnique?.name === 'Guardia') {
  audioFiles = [
    '/guardia.mp3',
    '/guardia-1.mp3',
    '/guardia-2.mp3',
    '/guardia-3.mp3',
    '/guardia-4.mp3',
    '/guardia-5.mp3'
  ]
}

if (selectedTechnique?.name === 'Parata sinistra') {

  audioFiles = [

    '/cover.mp3',

    '/cover-1.mp3',

    '/coversx-2.mp3',

    '/coversx-3.mp3',

    '/cover-4.mp3',

    '/coversx-5.mp3'

  ]


}if (selectedTechnique?.name === 'Parata destra') {

  audioFiles = [

    '/cover.mp3',

    '/cover-1.mp3',

    '/coverdx-2.mp3',

    '/coverdx-3.mp3',

    '/cover-4.mp3',

    '/coverdx-5.mp3'

  ]

}
if (selectedTechnique?.name === 'Parata due mani') {

  audioFiles = [

    '/cover.mp3',

    '/cover2-1.mp3',

    '/cover2-2.mp3',

    '/cover2-3.mp3',

    '/cover2-4.mp3',

    '/cover2-5.mp3'

  ]

}
if (selectedTechnique?.name === 'Passo avanti') {

  audioFiles = [

    '/spostamento.mp3',

    '/spostamento-1.mp3',

    '/spostamentoav-2.mp3',

    '/spostamentoav-3.mp3',

    '/spostamento-4.mp3',

    '/spostamento-5.mp3'

  ]

}
if (selectedTechnique?.name === 'Passo indietro') {

  audioFiles = [

    '/spostamento.mp3',

    '/spostamento-1.mp3',

    '/spostamentoind-2.mp3',

    '/spostamentoind-3.mp3',

    '/spostamento-4.mp3',

    '/spostamento-5.mp3'

  ]

}
if (selectedTechnique?.name === 'Diretto sinistro') {

  audioFiles = [

    '/diretto.mp3',

    '/direttosx-1.mp3',

    '/diretto-2.mp3',

    '/direttosx-3.mp3',

    '/direttosx-4.mp3',

    '/direttosx-5.mp3'

  ]

}
if (selectedTechnique?.name === 'Diretto destro') {

  audioFiles = [

    '/diretto.mp3',

    '/direttodx-1.mp3',

    '/diretto-2.mp3',

    '/direttodx-3.mp3',

    '/direttodx-4.mp3',

    '/direttodx-5.mp3'

  ]

}
if (selectedTechnique?.name === 'Gancio sinistro') {

  audioFiles = [

    '/gancio.mp3',

    '/gancio-1.mp3',

    '/gancio-2.mp3',

    '/ganciosx-3.mp3',

    '/ganciosx-4.mp3',

    '/ganciosx-5.mp3'

  ]

}

if (selectedTechnique?.name === 'Gancio destro') {

  audioFiles = [

    '/gancio.mp3',

    '/gancio-1.mp3',

    '/gancio-2.mp3',

    '/ganciodx-3.mp3',

    '/ganciodx-4.mp3',

    '/ganciodx-5.mp3'

  ]

}
if (selectedTechnique?.name === 'Calcio sinistro') {

  audioFiles = [

    '/calci.mp3',

    '/calci-1.mp3',

    '/calcisx-2.mp3',

    '/calcisx-3.mp3',

    '/calci-4.mp3',

    '/calci-5.mp3'

  ]

}

if (selectedTechnique?.name === 'Calcio destro') {

  audioFiles = [

    '/calci.mp3',

    '/calci-1.mp3',

    '/calcidx-2.mp3',

    '/calcidx-3.mp3',

    '/calci-4.mp3',

    '/calci-5.mp3'

  ]

}
  let currentIndex = 0
  let audio = null

  const playNext = () => {
    if (currentIndex >= audioFiles.length) {
      setPlayingStep(null)
      setIsPlaying(false)
      setCurrentAudio(null)
      return
    }

    setPlayingStep(currentIndex)

    audio = new Audio(audioFiles[currentIndex])
    setCurrentAudio(audio)
    audio.currentTime = 0

    audio.onended = () => {
      currentIndex += 1
      playNext()
    }

    audio.play().catch(error => {
  console.error('Errore riproduzione audio:', error)
})
  }

  playNext()
}
  return (
    <main className="academy-page">
      <header className="academy-header">
        <p className="eyebrow">REFLEX ACADEMY</p>

        <h1>TECNICHE</h1>

        <p>
          Impara le tecniche fondamentali e costruisci le basi
          per migliorare i tuoi riflessi.
        </p>
      </header>

      <section className="academy-content">
        {categories.map((category) => (
          <article
            className="academy-category"
            key={category.title}
          >
            <img
              className="category-image"
              src={category.image}
              alt={category.title}
            />

            <div className="category-info">
              <h2>{category.title}</h2>

              <div className="technique-list">
                {category.techniques.map((technique) => (
                  <button
                    className="technique-card"
                    key={technique.name}
                    type="button"
                    onClick={() =>
                      setSelectedTechnique({
                        ...technique,
                        image: category.image
                      })
                    }
                  >
                    <h3>{technique.name}</h3>

                    <p>{technique.description}</p>

                    <span className="technique-arrow">
                      APRI →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {selectedTechnique && (
        <div className="technique-overlay">
          <div className="technique-detail">
            <button
              className="technique-close"
              type="button"
              onClick={() => {
  stopCurrentAudio()
  setSelectedTechnique(null)
}}
            >
              ✕
            </button>

           <div className="technique-detail-images">
  {selectedTechnique.images?.map((image, index) => (
    <img
  key={index}
  className="technique-detail-image"
  src={image}
  alt={`${selectedTechnique.name} - immagine ${index + 1}`}
  onClick={() => setZoomedImage(image)}
  style={{ cursor: 'zoom-in' }}
/>
  ))}
</div>
{zoomedImage && (
  <div
    className="image-zoom-overlay"
    onClick={() => setZoomedImage(null)}
  >
    <button
      type="button"
      onClick={() => setZoomedImage(null)}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 2,
        fontSize: '28px',
        color: 'white',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      ✕
    </button>

    <img
      src={zoomedImage}
      alt="Immagine ingrandita"
      onClick={(event) => event.stopPropagation()}
      style={{
        maxWidth: '95vw',
        maxHeight: '90vh',
        objectFit: 'contain'
      }}
    />
  </div>
)}
            <div className="technique-detail-content">
              <p className="eyebrow">REFLEX ACADEMY</p>

              <h2 style={{ color: '#e10600' }}>
  {selectedTechnique.name}
</h2>

             {selectedTechnique.steps && (
  <div className="technique-steps">
    <h3>COME ESEGUIRLA</h3>

   <ol>
  {selectedTechnique.steps.map((step, index) => (
   <li
  key={index}
  style={{
    fontWeight:
      (
        selectedTechnique.name === 'Guardia' ||
        selectedTechnique.name === 'Parata sinistra' ||
        selectedTechnique.name === 'Parata destra' ||
        selectedTechnique.name === 'Parata due mani' ||
        selectedTechnique.name === 'Passo avanti' ||
        selectedTechnique.name === 'Passo indietro' ||
        selectedTechnique.name === 'Diretto sinistro' ||
        selectedTechnique.name === 'Diretto destro' ||
        selectedTechnique.name === 'Gancio sinistro' ||
        selectedTechnique.name === 'Gancio destro'
        ||
selectedTechnique.name === 'Calcio sinistro' ||
selectedTechnique.name === 'Calcio destro'
      ) &&
      playingStep === index + 1
        ? '700'
        : '400',

    background:
      (
        selectedTechnique.name === 'Guardia' ||
        selectedTechnique.name === 'Parata sinistra' ||
        selectedTechnique.name === 'Parata destra' ||
        selectedTechnique.name === 'Parata due mani' ||
        selectedTechnique.name === 'Passo avanti' ||
        selectedTechnique.name === 'Passo indietro' ||
        selectedTechnique.name === 'Diretto sinistro' ||
        selectedTechnique.name === 'Diretto destro' ||
        selectedTechnique.name === 'Gancio sinistro' ||
        selectedTechnique.name === 'Gancio destro'
        ||
selectedTechnique.name === 'Calcio sinistro' ||
selectedTechnique.name === 'Calcio destro'
      ) &&
      playingStep === index + 1
        ? '#e10600'
        : 'transparent',

    borderRadius: '10px',
    padding: '10px',
    transition: 'all 0.2s ease'
  }}
>
      <span>{step}</span>

     {(selectedTechnique.name === 'Guardia' ||
  selectedTechnique.name === 'Parata sinistra' ||
  selectedTechnique.name === 'Parata destra' ||
  selectedTechnique.name === 'Parata due mani' ||
  selectedTechnique.name === 'Passo avanti' ||
  selectedTechnique.name === 'Passo indietro' ||
  selectedTechnique.name === 'Diretto sinistro' ||
  selectedTechnique.name === 'Diretto destro' ||
  selectedTechnique.name === 'Gancio sinistro' ||
  selectedTechnique.name === 'Gancio destro' ||
  selectedTechnique.name === 'Calcio sinistro' ||
  selectedTechnique.name === 'Calcio destro') && (
    
        <button
          type="button"
          onClick={() => {
  stopCurrentAudio()

  let audioFile = ''

  if (selectedTechnique.name === 'Guardia') {
    audioFile = `/guardia-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Parata sinistra') {
    audioFile =
      index + 1 === 1 || index + 1 === 4
        ? `/cover-${index + 1}.mp3`
        : `/coversx-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Parata destra') {
    audioFile =
      index + 1 === 1 || index + 1 === 4
        ? `/cover-${index + 1}.mp3`
        : `/coverdx-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Parata due mani') {
    audioFile = `/cover2-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Passo avanti') {
    audioFile =
      index + 1 === 1 || index + 1 === 4 || index + 1 === 5
        ? `/spostamento-${index + 1}.mp3`
        : `/spostamentoav-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Passo indietro') {
    audioFile =
      index + 1 === 1 || index + 1 === 4 || index + 1 === 5
        ? `/spostamento-${index + 1}.mp3`
        : `/spostamentoind-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Diretto sinistro') {
    audioFile =
      index + 1 === 2
        ? '/diretto-2.mp3'
        : `/direttosx-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Diretto destro') {
    audioFile =
      index + 1 === 2
        ? '/diretto-2.mp3'
        : `/direttodx-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Gancio sinistro') {
    audioFile =
      index + 1 === 1 || index + 1 === 2
        ? `/gancio-${index + 1}.mp3`
        : `/ganciosx-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Gancio destro') {
    audioFile =
      index + 1 === 1 || index + 1 === 2
        ? `/gancio-${index + 1}.mp3`
        : `/ganciodx-${index + 1}.mp3`
  }

  if (selectedTechnique.name === 'Calcio sinistro') {
    if (index + 1 === 1) audioFile = '/calci-1.mp3'
    if (index + 1 === 2) audioFile = '/calcisx-2.mp3'
    if (index + 1 === 3) audioFile = '/calcisx-3.mp3'
    if (index + 1 === 4) audioFile = '/calci-4.mp3'
    if (index + 1 === 5) audioFile = '/calci-5.mp3'
  }

  if (selectedTechnique.name === 'Calcio destro') {
    if (index + 1 === 1) audioFile = '/calci-1.mp3'
    if (index + 1 === 2) audioFile = '/calcidx-2.mp3'
    if (index + 1 === 3) audioFile = '/calcidx-3.mp3'
    if (index + 1 === 4) audioFile = '/calci-4.mp3'
    if (index + 1 === 5) audioFile = '/calci-5.mp3'
  }

  const audio = new Audio(audioFile)

  setCurrentAudio(audio)
  setPlayingStep(index + 1)

  audio.play()
}}
          style={{
            marginLeft: '10px',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            fontSize: '20px'
          }}
        >
          🔊
        </button>
      )}
    </li>
  ))}
</ol>
  </div>
)}

{isPlaying ? (
  <button
    className="learn-technique-button"
    type="button"
    onClick={() => {
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }

      setCurrentAudio(null)
      setIsPlaying(false)
      setPlayingStep(null)
    }}
  >
    <span>⏹️</span>
    <strong>FERMA GUIDA</strong>
    <small>Interrompi la guida</small>
  </button>
) : (
  <button
    className="learn-technique-button"
    type="button"
    onClick={playTechniqueAudio}
  >
    <span>🔊</span>
    <strong>IMPARA TECNICA</strong>
    <small>Ascolta la guida e segui i passaggi</small>
  </button>
)}

              
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Academy
