const LINKS = [
  { href: '#sobre-mi', label: 'sobre mí' },
  { href: '#galeria', label: 'galería' },
  { href: '#recorrido', label: 'recorrido' },
  { href: '#contacto', label: 'contacto' },
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