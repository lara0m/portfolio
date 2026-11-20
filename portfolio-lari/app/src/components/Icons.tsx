import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': true } as const

export const CaretIcon = (p: P) => (
  <svg {...base} {...p}><path d="M4 6l4 4 4-4z" /></svg>
)

export const ChevronIcon = (p: P) => (
  <svg {...base} {...p}><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
)

export const FolderIcon = (p: P) => (
  <svg {...base} {...p}><path d="M1.5 3.5a1 1 0 0 1 1-1h3.2l1.5 1.5h6.3a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z" /></svg>
)

export const FileTextIcon = (p: P) => (
  <svg {...base} {...p}><path d="M2 3h12v1.5H2zM2 6.25h8v1.5H2zM2 9.5h12V11H2zM2 12.75h8v1.5H2z" /></svg>
)

export const ImageIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2" y="3" width="12" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5.5" cy="6.5" r="1" />
    <path d="M3 12l3.5-3.5L9 11l2-2 2 3z" />
  </svg>
)

export const MailIcon = (p: P) => (
  <svg {...base} {...p}><path d="M2 3h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm0 1.5V5l6 3.5L14 5v-.5z" /></svg>
)

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}><path d="M3.6 1.5l2 .6.7 2.6-1.3 1.1a8 8 0 0 0 3.8 3.8l1.1-1.3 2.6.7.6 2c.2.8-.4 1.5-1.2 1.6C7 12.6 3.4 9 2.6 2.7c.1-.8.8-1.4 1-1.2z" /></svg>
)