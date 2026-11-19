export default function Hello() {
  return (
    <section className="hello">
      <div className="hello__text">
        <p className="muted">Hi all. I am</p>
        <h1 className="hello__name">Lara Muiña</h1>
        <h2 className="hello__role">&gt; Front-end developer</h2>
        <p className="muted">// find my profile on Github:</p>
        <p>
          <span className="kw">const</span> githubLink ={' '}
          <a href="https://github.com/lara0m" target="_blank" rel="noreferrer">
            "https://github.com/lara0m"
          </a>
        </p>
      </div>

      {/* Acá después va el juego de la viborita */}
      <div className="hello__game">[ game placeholder ]</div>
    </section>
  )
}
