import { Fragment, type ReactNode } from 'react'

/**
 * Renders `**bold**` inside content strings.
 *
 * Content files carry emphasis on the figures that matter ("**−42%**"), and
 * this is the whole of what they need — pulling in a markdown parser to bold
 * six numbers would be silly.
 */
export function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}
