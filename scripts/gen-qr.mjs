/* Erzeugt public/images/qr-code.png. Scannt man ihn mit dem Handy, oeffnet
   sich das Portraet. Neu erzeugen: npm run gen:qr
   Die Adresse muss absolut sein, ein Handy kennt keine relative URL. */

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
