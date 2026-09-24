import { en } from './content.en'
import { de } from './content.de'
import type { Content, Lang } from './types'

export const content: Record<Lang, Content> = { en, de }

export type { Content, Lang }
export * from './types'
