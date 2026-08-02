import { LegalLayout } from '@/components/LegalLayout'
import { datenschutz } from '@/content/legal'

export default function Datenschutz() {
  return <LegalLayout doc={datenschutz} metaTitle="Datenschutzerklärung · Demien Rapp" />
}
