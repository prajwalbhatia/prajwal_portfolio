import fs from 'node:fs'
import path from 'node:path'

import { INTERNS_MENTORED, kindWords, type KindWord } from '@/content/kind-words'

/**
 * Resolves endorsements against the files actually present in public/.
 *
 * Two jobs. It drops entries whose screenshot hasn't been saved yet, so a
 * described-but-missing endorsement renders as nothing rather than as a broken
 * image. And it reads the real pixel dimensions out of the file, so nobody has
 * to keep a width and height in the content file in sync with an image they
 * cropped — a wrong aspect ratio there would cost layout shift on the one page
 * that is nothing but images.
 *
 * Server-only: it touches the filesystem. Anything client-side wanting to know
 * whether this page exists should take a prop.
 */

export type ResolvedKindWord = KindWord & { width: number; height: number }

/**
 * Reads intrinsic dimensions from a PNG or JPEG buffer.
 *
 * Hand-rolled rather than adding a dependency: the site ships React and Next
 * and nothing else, and this is thirty lines against a package.
 */
function readDimensions(buf: Buffer): { width: number; height: number } | null {
  // PNG: IHDR is always the first chunk, width and height at bytes 16 and 20.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }

  // JPEG: walk the segment chain to the first start-of-frame marker.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) {
        i += 1
        continue
      }
      const marker = buf[i + 1]
      // Standalone markers carry no length field.
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        i += 2
        continue
      }
      const len = buf.readUInt16BE(i + 2)
      const isFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)
      if (isFrame) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
      i += 2 + len
    }
  }

  return null
}

let cache: ResolvedKindWord[] | null = null

export function getKindWords(): ResolvedKindWord[] {
  if (cache) return cache

  cache = kindWords.flatMap((k) => {
    const file = path.join(process.cwd(), 'public', k.image)
    let dims: { width: number; height: number } | null = null
    try {
      dims = readDimensions(fs.readFileSync(file))
    } catch {
      // Not saved yet, or unreadable. Either way it doesn't render.
      return []
    }
    if (!dims) return []
    return [{ ...k, ...dims }]
  })

  return cache
}

export function getKindWordSections() {
  const all = getKindWords()
  return {
    all,
    recommendations: all.filter((k) => k.source === 'LinkedIn'),
    notes: all.filter((k) => k.source !== 'LinkedIn'),
    stats: {
      recommendations: all.filter((k) => k.source === 'LinkedIn').length,
      people: new Set(all.map((k) => k.name)).size,
      internsMentored: INTERNS_MENTORED,
    },
  }
}
