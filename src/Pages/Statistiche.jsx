function Statistiche({
  onHome,
  onAcademy,
  onReflex,
  onReaction,
}) {
  return (
    <main className="reflex-training-page">
      <header className="academy-header">
        <p className="eyebrow">
          REFLEX
        </p>

        <h1>STATISTICHE</h1>

        <p>
          Qui vedrai i tuoi progressi, gli XP e le statistiche
          dei tuoi allenamenti.
        </p>
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