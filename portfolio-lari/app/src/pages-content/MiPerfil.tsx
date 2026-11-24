import Sidebar, { SidebarSection, TreeFolder, TreeItem } from '@/components/Sidebar'
import { FileTextIcon, ImageIcon, MailIcon, PhoneIcon } from '@/components/Icons'
import { profile } from '@/data/profile'

export default function MiPerfil() {
  return (
    <div className="layout">
      <Sidebar>
        <SidebarSection title="mi-perfil">
          <TreeFolder label="bio" color="var(--pink)" defaultOpen>
            <TreeItem icon={<FileTextIcon />}>sobre-mi</TreeItem>
            <TreeItem icon={<ImageIcon />}>foto-lari</TreeItem>
          </TreeFolder>
        </SidebarSection>

        <SidebarSection title="contacto">
          <TreeItem icon={<MailIcon />}>{profile.email}</TreeItem>
          <TreeItem icon={<PhoneIcon />}>{profile.phone}</TreeItem>
        </SidebarSection>
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
        <img className="photo" src="/mi-perfil.jpeg" alt="Foto de Lara" />
      </section>
    </div>
  )
}