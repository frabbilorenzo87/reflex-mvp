import { useState } from 'react'

function ReflexTraining({ onHome, onAcademy }) {
  const [duration, setDuration] = useState(null)
  const [level, setLevel] = useState(null)

  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">REFLEX TRAINING</p>

        <h1>ALLENAMENTO</h1>

        <p>
          Ascolta il comando e reagisci il più velocemente possibile.
        </p>
      </header>

      <section className="reflex-options">
        <h2>DURATA</h2>

        <div className="reflex-duration-options">
          <button
  type="button"
  onClick={() => setDuration(3)}
>
  <strong>3 MINUTI</strong>
  <small>50 XP</small>
</button>

          <button
  type="button"
  onClick={() => setDuration(5)}
>
  <strong>5 MINUTI</strong>
  <small>100 XP</small>
</button>

          <button
  type="button"
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
  onClick={() => setLevel('principiante')}
>
  <strong>PRINCIPIANTE</strong>
  <small>Ogni 5 secondi · +20 XP</small>
</button>

          <button
  type="button"
  onClick={() => setLevel('intermedio')}
>
  <strong>INTERMEDIO</strong>
  <small>Ogni 4 secondi · +40 XP</small>
</button>

          <button
  type="button"
  onClick={() => setLevel('avanzato')}
>
  <strong>AVANZATO</strong>
  <small>Ogni 3 secondi · +60 XP</small>
</button>
        </div>
      </section>
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

        <button className="nav-item">
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

export default ReflexTraining