import { useState } from 'react'

import calcioImg from '../assets/techniques/calci.JPG'
import calcioTecnicaImg from '../assets/techniques/calci tecnica.JPG'

import coverImg from '../assets/techniques/cover_parata.JPG'
import coverUnaManoImg from '../assets/techniques/cover una mano tecnica.JPG'
import coverDueManiImg from '../assets/techniques/cover due mani tecnica.JPG'

import direttoImg from '../assets/techniques/diretto.JPG'
import direttoTecnicaImg from '../assets/techniques/diretto tecnica.JPG'

import gancioImg from '../assets/techniques/gancio.JPG'
import gancioTecnicaImg from '../assets/techniques/gancio tecnica.JPG'

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
        'Protezione del lato sinistro della testa attraverso una posizione compatta del braccio e della mano.',
      steps: [
        'Parti dalla posizione di guardia, con le mani alte e il mento protetto.',
        'Porta il braccio sinistro verso il lato della testa, mantenendo il gomito vicino al corpo.',
        'Proteggi la tempia e la parte laterale del viso con avambraccio e mano.',
        'Mantieni la posizione stabile senza perdere l’equilibrio.',
        'Riporta rapidamente la mano nella posizione di guardia.'
      ]
    },
    {
      name: 'Parata destra',
      description:
        'Protezione del lato destro della testa attraverso una posizione compatta del braccio e della mano.',
      steps: [
        'Parti dalla posizione di guardia, con le mani alte e il mento protetto.',
        'Porta il braccio destro verso il lato della testa, mantenendo il gomito vicino al corpo.',
        'Proteggi la tempia e la parte laterale del viso con avambraccio e mano.',
        'Mantieni la posizione stabile senza perdere l’equilibrio.',
        'Riporta rapidamente la mano nella posizione di guardia.'
      ]
    },
    {
      name: 'Parata due mani',
      description:
        'Protezione alta della testa utilizzando entrambe le mani e gli avambracci per creare una copertura compatta.',
      steps: [
        'Parti dalla posizione di guardia.',
        'Porta entrambe le mani verso la parte alta della testa.',
        'Avvicina gli avambracci per creare una protezione compatta.',
        'Mantieni il mento abbassato e il corpo stabile.',
        'Una volta superato lo stimolo, torna rapidamente in guardia.'
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
      ]
    }
  ]
},

  {
  title: 'GANCIO',
  image: gancioImg,
  techniques: [
    {
      name: 'Gancio sinistro',
      description:
        'Colpo circolare eseguito con il braccio sinistro, mantenendo il corpo stabile e la mano destra in protezione.',
      steps: [
        'Parti dalla posizione di guardia, con entrambe le mani alte.',
        'Ruota leggermente il piede e il bacino per accompagnare il movimento.',
        'Piega il braccio sinistro e portalo lateralmente verso il bersaglio.',
        'Mantieni la mano destra vicino al viso per proteggerti.',
        'Riporta rapidamente il braccio sinistro nella posizione di guardia.'
      ]
    },
    {
      name: 'Gancio destro',
      description:
        'Colpo circolare eseguito con il braccio destro, mantenendo il corpo stabile e la mano sinistra in protezione.',
      steps: [
        'Parti dalla posizione di guardia, con entrambe le mani alte.',
        'Ruota leggermente il piede e il bacino per accompagnare il movimento.',
        'Piega il braccio destro e portalo lateralmente verso il bersaglio.',
        'Mantieni la mano sinistra vicino al viso per proteggerti.',
        'Riporta rapidamente il braccio destro nella posizione di guardia.'
      ]
    }
  ]
},

 {
  title: 'CALCIO CENTRALE E LATERALE',
  image: calcioImg,
  techniques: [
    {
      name: 'Calcio sinistro',
      description:
        'Calcio eseguito con la gamba sinistra, mantenendo equilibrio, controllo e capacità di rientrare rapidamente in guardia.',
      steps: [
        'Parti dalla posizione di guardia, con il peso distribuito e le mani alte.',
        'Sposta il peso sulla gamba destra, mantenendo il busto stabile.',
        'Solleva la gamba sinistra e porta il ginocchio nella direzione del bersaglio.',
        'Estendi la gamba in modo controllato verso il bersaglio.',
        'Riporta rapidamente la gamba a terra e torna nella posizione di guardia.'
      ]
    },
    {
      name: 'Calcio destro',
      description:
        'Calcio eseguito con la gamba destra, mantenendo equilibrio, controllo e capacità di rientrare rapidamente in guardia.',
      steps: [
        'Parti dalla posizione di guardia, con il peso distribuito e le mani alte.',
        'Sposta il peso sulla gamba sinistra, mantenendo il busto stabile.',
        'Solleva la gamba destra e porta il ginocchio nella direzione del bersaglio.',
        'Estendi la gamba in modo controllato verso il bersaglio.',
        'Riporta rapidamente la gamba a terra e torna nella posizione di guardia.'
      ]
    }
  ]
},
]

function Academy() {
  const [selectedTechnique, setSelectedTechnique] = useState(null)

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
              onClick={() => setSelectedTechnique(null)}
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
    />
  ))}
</div>

            <div className="technique-detail-content">
              <p className="eyebrow">REFLEX ACADEMY</p>

              <h2>{selectedTechnique.name}</h2>

              {selectedTechnique.steps && (
  <div className="technique-steps">
    <h3>COME ESEGUIRLA</h3>

    <ol>
      {selectedTechnique.steps.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ol>
  </div>
)}

              <div className="video-placeholder">
                <span>▶</span>
                <strong>VIDEO TECNICA</strong>
                <small>
                  Il video verrà aggiunto qui
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Academy
