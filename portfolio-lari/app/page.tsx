import Navbar from './src/components/Navbar'
import Intro from './src/components/Intro'
import SobreMi from './src/components/SobreMi'
import Galeria from './src/components/Galeria'
import Recorrido from './src/components/Recorrido'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Intro />
        <SobreMi />
        <Galeria />
        <Recorrido />
        <section id="contacto" className="ph ph--wine">contacto · paso 5</section>
      </main>
    </>
  )
}