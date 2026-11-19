// Contenedor genérico de la barra lateral. Las páginas le pasan el contenido.
export default function Sidebar({ children }) {
  return <aside className="sidebar">{children}</aside>
}
