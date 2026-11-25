import Navbar from './src/components/Navbar'
import Intro from './src/components/Intro'
import SobreMi from './src/components/SobreMi'
import Galeria from './src/components/Galeria'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Intro />
        <SobreMi />
        <Galeria />
        <section id="recorrido" className="ph ph--cream">cuadro a cuadro · paso 4</section>
        <section id="contacto" className="ph ph--wine">contacto · paso 5</section>
      </main>
    </>
  )
}