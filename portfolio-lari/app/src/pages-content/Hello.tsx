import Typewriter from '../components/Typewriter'
import RevealText from '../components/RevealText'
import Footer from '../components/Footer'

export default function Hello({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="intro">
      <div className="intro__stage">
        {/* Fondo cyberpunk en órbita */}
        <div className="intro__orbit-x" aria-hidden="true">
          <div className="intro__orbit-y">
            <img className="intro__bg" src="/hello-cyberpunk.svg" alt="" draggable={false} />
          </div>
        </div>

        {/* Tu foto */}
        <img className="intro__me" src="/hello-retrato.svg" alt="Lara Muiña" draggable={false} />

        {/* Compu flotante + texto encima */}
        <div className="intro__left">
          
          <div className="intro__text">
            <h1 className="intro__name">
              <RevealText text="Lara Muiña" />
            </h1>
            <h2 className="intro__role">
              <Typewriter text="Back-end developer" delay={700} />
            </h2>
            <button className="intro__btn" onClick={onEnter}>
              más info <span>›</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  )
}