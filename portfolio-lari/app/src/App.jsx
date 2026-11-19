import { useState } from 'react'
import Header from './components/Header.jsx'
import Hello from './pages/Hello.jsx'
import MiPerfil from './pages/MiPerfil.jsx'
import Proyectos from './pages/Proyectos.jsx'

const TABS = [
  { id: 'hello', label: 'hello-world!', Page: Hello },
  { id: 'perfil', label: 'mi-perfil', Page: MiPerfil },
  { id: 'proyectos', label: 'proyectos', Page: Proyectos },
]

export default function App() {
  const [active, setActive] = useState('hello')
  const { Page } = TABS.find((t) => t.id === active)

  return (
    <div className="app">
      <Header tabs={TABS} active={active} onChange={setActive} />
      <main className="main">
        <Page />
      </main>
    </div>
  )
}
