/* Erzeugt public/images/qr-code.png (npm run gen:qr). Die URL muss absolut sein. */

import QRCode from 'qrcode'

const TARGET = 'https://rappde.com/images/demien-portrait.jpg'
const OUT = new URL('../public/images/qr-code.png', import.meta.url)

await QRCode.toFile(OUT.pathname, TARGET, {
  errorCorrectionLevel: 'M',
  margin: 1,
  width: 480,
  color: { dark: '#000000', light: '#ffffff' },
})
console.log(`QR -> ${TARGET}`)
