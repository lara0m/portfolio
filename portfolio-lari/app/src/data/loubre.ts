// Medidas del Figma del frame "Loubre Portfolio - Intro".
// X e Y son relativas al frame (así las muestra Figma).
export const FRAME = { w: 1440, h: 810 } // ← ancho y alto reales de tu frame

export const intro = {
  // alto = automático; y = donde empieza el lente
  camera: { src: '/loubre/camara.svg', x: 590, y: 570, w: 360 },

  // Usá los nombres reales de tus archivos (.svg)
  shots: [
    { src: '/loubre/intro-1.svg', x: 370, y: 0, w: 306, h: 580 },
    { src: '/loubre/intro-2.svg', x: 548, y: 0, w: 173, h: 580 },
    { src: '/loubre/intro-3.svg', x: 719, y: 0, w: 176, h: 580 },
    { src: '/loubre/intro-4.svg', x: 766, y: 0, w: 304, h: 580 },
  ],
}
export const sobreMi = {
  eyebrow: 'SOBRE MÍ',
  title: 'Detrás del lente',
  text: 'Soy Rena, fotógrafa deportiva. La chica de la foto soy yo hace 8 años practicando el deporte del cuál me volví fanática y hoy en día me apasiona el arte de captar momentos e inmortalizarlos en una foto.',
  image: '/loubre/camara-espalda.svg',
}
export const galeria = {
  eyebrow: 'GALERÍA',
  title: 'Momentos de cancha',
  sub: 'Una selección de mis fotos de handball:',
  // Usá 8 o 17 fotos (ver el componente). Si tus nombres son otros, listalos acá a mano.
  photos: Array.from(
    { length: 17 },
    (_, i) => `/loubre/galeria/foto-${String(i + 1).padStart(2, '0')}.jpg`
  ),
}