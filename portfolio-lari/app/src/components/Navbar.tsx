const LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#galeria', label: 'Galería' },
  { href: '#recorrido', label: 'Recorrido' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  return (
    <header className="nav">
      <a className="nav__logo" href="#intro">loubre</a>
      <nav className="nav__links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>
    </header>
  )
}