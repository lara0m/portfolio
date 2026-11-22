import type { ReactNode } from 'react'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { MailIcon, PhoneIcon } from './Icons'
import { contacts } from '../data/contact'

function Item({
  href,
  icon,
  label,
  open = false,
  external = false,
  className = '',
}: {
  href: string
  icon: ReactNode
  label: string
  open?: boolean // true = el nombre se ve siempre; false = solo al pasar el mouse
  external?: boolean
  className?: string
}) {
  return (
    <a
      className={`foot__item ${open ? 'foot__item--open' : ''} ${className}`}
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {icon}
      <span className="foot__label">{label}</span>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__group">
        <span className="foot__title">contacto:</span>
        <Item href={contacts.email.href} label={contacts.email.label} icon={<MailIcon />} open className="foot__item--mail" />
        <Item href={contacts.phone.href} label={contacts.phone.label} icon={<PhoneIcon />} />
        <Item href={contacts.linkedin.href} label={contacts.linkedin.label} icon={<FaLinkedinIn />} external />
      </div>

      <Item
        href={contacts.github.href}
        label={contacts.github.label}
        icon={<FaGithub />}
        open
        external
        className="foot__item--right"
      />
    </footer>
  )
}