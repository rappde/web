import { LegalLayout } from '@/components/LegalLayout'
import { impressum } from '@/content/legal'

export default function Impressum() {
  return <LegalLayout doc={impressum} metaTitle="Impressum · Demien Rapp" />
}
