import { useState } from 'react'

import calcioImg from '../assets/techniques/calci.JPG'
import coverImg from '../assets/techniques/cover_parata.JPG'
import direttoImg from '../assets/techniques/diretto.JPG'
import gancioImg from '../assets/techniques/gancio.JPG'
import guardiaImg from '../assets/techniques/guardia.JPG'
import spostamentoImg from '../assets/techniques/spostamento.JPG'

const categories = [
  {
    title: 'GUARDIA',
    image: guardiaImg,
    techniques: [
      {
        name: 'Guardia',
        description:
          'Posizione di base con mani alte, mento protetto e piedi pronti a muoversi.'
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
          'Parata sul lato sinistro per proteggere la testa.'
      },
      {
        name: 'Parata destra',
        description:
          'Parata sul lato destro per proteggere la testa.'
      },
      {
        name: 'Parata due mani',
        description:
          'Protezione alta eseguita utilizzando entrambe le mani.'
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
          'Avanzamento controllato mantenendo equilibrio e posizione di guardia.'
      },
      {
        name: 'Passo indietro',
        description:
          'Arretramento rapido mantenendo equilibrio e protezione.'
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
          'Colpo diretto eseguito con la mano sinistra.'
      },
      {
        name: 'Diretto destro',
        description:
          'Colpo diretto eseguito con la mano destra.'
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
          'Colpo circolare eseguito con il braccio sinistro.'
      },
      {
        name: 'Gancio destro',
        description:
          'Colpo circolare eseguito con il braccio destro.'
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
          'Calcio eseguito con la gamba sinistra.'
      },
      {
        name: 'Calcio destro',
        description:
          'Calcio eseguito con la gamba destra.'
      },
      {
        name: 'Calcio frontale',
        description:
          'Calcio frontale diretto verso il bersaglio.'
      }
    ]
  }
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

            <img
              className="technique-detail-image"
              src={selectedTechnique.image}
              alt={selectedTechnique.name}
            />

            <div className="technique-detail-content">
              <p className="eyebrow">REFLEX ACADEMY</p>

              <h2>{selectedTechnique.name}</h2>

              <p>{selectedTechnique.description}</p>

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
