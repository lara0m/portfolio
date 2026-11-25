/*TODO: Cambiar el color de fondo del nav a un color más oscuro y con menos transparencia para que se vea mejor el contenido detrás de él.*/
/*TODO: Titulo de "loubre" correrlo mas hacia el costado izquerdo*/

import Navbar from './src/components/Navbar'
import Intro from './src/components/Intro'
import SobreMi from './src/components/SobreMi'
import Galeria from './src/components/Galeria'
import Recorrido from './src/components/Recorrido'
import Contacto from './src/components/Contacto'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Intro />
        <SobreMi />
        <Galeria />
        <Recorrido />
        <Contacto />
      </main>
    </>
  )
}