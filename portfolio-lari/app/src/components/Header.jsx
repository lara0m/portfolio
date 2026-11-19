export default function Header({ tabs, active, onChange }) {
  return (
    <header className="header">
      <span className="header__name">lara-muiña</span>
      <nav className="tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={'tab' + (t.id === active ? ' tab--active' : '')}
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
