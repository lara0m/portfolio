import Sidebar from '../components/Sidebar.jsx'
import { profile } from '../data/profile.js'

export default function MiPerfil() {
  return (
    <div className="layout">
      <Sidebar>
        <h3 className="sidebar__title">mi-perfil</h3>
        <ul className="tree">
          <li>bio
            <ul>
              <li>sobre-mi</li>
              <li>foto-lari</li>
            </ul>
          </li>
          <li>hobbies</li>
        </ul>

        <h3 className="sidebar__title">contacto</h3>
        <ul className="tree">
          <li>{profile.email}</li>
          <li>{profile.phone}</li>
        </ul>
      </Sidebar>

      <section className="panel">
        <div className="panel__tab">sobre-mi</div>
        <div className="code">
          {profile.bio.map((line, i) => (
            <div className="code__line" key={i}>
              <span className="code__num">{i + 1}</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel panel--photo">
        <div className="panel__tab">foto-lari</div>
        <img className="photo" src={profile.photo} alt="Foto de Lara" />
      </section>
    </div>
  )
}
