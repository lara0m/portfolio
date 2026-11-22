export default function Hello({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="hello">
      <div className="hello__text">
        <p className="muted">Hello World</p>
        <h1 className="hello__name">Lara Muiña</h1>
        <h2 className="hello__role">&gt; Backend developer</h2>
        <p className="muted">// find my profile on Linkedin:</p>
        <p>
          <span className="kw">const</span> linkeLink ={' '}
          <a href="https://www.linkedin.com/in/lara-mui%C3%B1a-2456933b8/" target="_blank" rel="noreferrer">
            "https://www.linkedin.com/in/lara-muiña"
          </a>
        </p>
      </div>

      {/* Acá después va el juego de la viborita */}
      <button className="hello__game" onClick={onEnter}>
        [ foto placeholder ]
      </button>
    </section>
  )
}
