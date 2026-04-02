import { localizedString } from './objects/localizedString'
import { localizedText } from './objects/localizedText'
import { localizedPortableText } from './objects/localizedPortableText'
import { localizedSeo } from './objects/localizedSeo'
import { resource } from './objects/resource'
import { wcagRule } from './documents/wcagRule'
import { guide } from './documents/guide'

export const schemaTypes = [
  // Objects
  localizedString,
  localizedText,
  localizedPortableText,
  localizedSeo,
  resource,
  // Documents
  wcagRule,
  guide,
]
