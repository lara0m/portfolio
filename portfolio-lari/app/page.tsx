'use client'

import { useState } from 'react'
import Header from './src/components/Header'
import Hello from './src/pages-content/Hello'
import MiPerfil from './src/pages-content/MiPerfil'
import Proyectos from './src/pages-content/Proyectos'
import Intereses from './src/pages-content/Intereses'

const TABS = [
  { id: 'hello', label: 'hello-world!' },
  { id: 'perfil', label: 'mi-perfil' },
  { id: 'proyectos', label: 'proyectos' },
  { id: 'intereses', label: 'intereses' },
]

export default function Home() {
  const [active, setActive] = useState<string>('hello')

  return (
    <div className="app">
      {/* El header solo existe fuera de la portada */}
      {active !== 'hello' && (
        <Header tabs={TABS} active={active} onChange={setActive} />
      )}

      <main className="main">
        <div className="page" key={active}>
          {active === 'hello' && <Hello onEnter={() => setActive('perfil')} />}
          {active === 'perfil' && <MiPerfil />}
          {active === 'intereses' && <Intereses />}
          {active === 'proyectos' && <Proyectos />}
        </div>
      </main>
    </div>
  )
}