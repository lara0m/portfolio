export type ContactPayload = {
  nombre: string
  telefono: string
  email: string
  mensaje: string
}

// En desarrollo SIMULA el envío para que puedas ver las animaciones.
// En el sitio publicado devuelve error a propósito, para no decir "enviado"
// cuando en realidad no llegó nada. El envío real se conecta en el próximo paso.
export async function sendMessage(data: ContactPayload): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    console.info('[contacto] mensaje simulado:', data)
    return
  }
  throw new Error('El envío real todavía no está conectado')
}