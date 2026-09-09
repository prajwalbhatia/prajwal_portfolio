import type { ReactNode } from 'react'

/**
 * Glyphs for the stack ticker.
 *
 * Hand-drawn rather than pulled from an icon package: nothing is installed,
 * and adding one for thirteen 18px marks is not worth the dependency on a
 * site that argues about payload.
 *
 * They are deliberately *category* marks, not brand logos — a hexagon for the
 * runtime, a gauge for the vitals work, stacked layers for the queue. Redrawn
 * brand logos at this size come out wrong and misuse the trademarks; a
 * consistent line family reads better and is honest about what it is.
 *
 * One shared viewBox, one stroke weight, all currentColor, so they sit
 * together as a set and inherit whatever the chip colour is.
 */

const S = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** Rounded badge with letterforms, for the languages. */
function Lettermark({ text }: { text: string }) {
  return (
    <svg {...S} className="size-full">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        stroke="none"
        fill="currentColor"
        letterSpacing="0.02em"
      >
        {text}
      </text>
    </svg>
  )
}

const ICONS: Record<string, ReactNode> = {
  // Orbiting electrons — the one mark that is unmistakable at this size.
  React: (
    <svg {...S} className="size-full">
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  ),

  TypeScript: <Lettermark text="TS" />,
  JavaScript: <Lettermark text="JS" />,
  'Next.js': <Lettermark text="N" />,

  // Single store, three connected consumers.
  'Redux · RTK Query': (
    <svg {...S} className="size-full">
      <circle cx="12" cy="4.5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M10 6.6 6.6 15.6M14 6.6l3.4 9M7.5 18h9" />
    </svg>
  ),

  // Hexagon: the runtime.
  'Node · Express': (
    <svg {...S} className="size-full">
      <path d="M12 2.5l8.2 4.7v9.6L12 21.5 3.8 16.8V7.2z" />
      <path d="M12 8v8M8.5 10v4M15.5 10v4" />
    </svg>
  ),

  // Stacked layers with jobs draining off the top — a queue.
  'BullMQ · Redis': (
    <svg {...S} className="size-full">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),

  // Headless browser window plus the object it writes to.
  'Puppeteer · GCS': (
    <svg {...S} className="size-full">
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M2.5 8h19M5.5 6h.01M8 6h.01" />
      <path d="M8 20h8" />
    </svg>
  ),

  // Passing assertion.
  'Jest · RTL': (
    <svg {...S} className="size-full">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.4l2.6 2.6L16.2 9.4" />
    </svg>
  ),

  // Speedometer.
  'Core Web Vitals': (
    <svg {...S} className="size-full">
      <path d="M3.5 17a9 9 0 1 1 17 0" />
      <path d="M12 12.5 16.5 9" />
      <circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none" />
      <path d="M3.5 17h3M17.5 17h3" />
    </svg>
  ),

  // Monitoring trace.
  'Datadog RUM · Sentry': (
    <svg {...S} className="size-full">
      <path d="M2 14h3.2l2.2-6 3 12 2.6-9 2 5H22" />
    </svg>
  ),

  // Overlapping panels — a component library.
  'Material UI': (
    <svg {...S} className="size-full">
      <rect x="2.5" y="2.5" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="12" height="12" rx="2" />
    </svg>
  ),

  // The universal access figure.
  Accessibility: (
    <svg {...S} className="size-full">
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="7.2" r="1.5" fill="currentColor" stroke="none" />
      <path d="M6.8 10.2h10.4M12 10.6v4.2M12 14.8l-2.4 4M12 14.8l2.4 4" />
    </svg>
  ),
}

/**
 * One hue per entry, keyed by the same names as ICONS.
 *
 * Chosen in the spirit of each technology's own brand rather than copied from
 * it — most brand colours (React's #61DAFB, JS's #F7DF1E, Redis's #DC382D)
 * are pitched for dark UI and fall under 3:1 on a near-white chip. These are
 * the same families darkened to clear AA, and adjacent entries in the ticker
 * are kept apart in hue so the strip does not read as one smear of colour.
 */
export const STACK_HUES: Record<string, string> = {
  React: '#0891b2',
  TypeScript: '#2c66c9',
  JavaScript: '#a16207',
  'Next.js': '#27272a',
  'Redux · RTK Query': '#7c3aed',
  'Node · Express': '#3f7d4c',
  'BullMQ · Redis': '#b91c1c',
  'Puppeteer · GCS': '#0f766e',
  'Jest · RTL': '#be123c',
  'Core Web Vitals': '#c2410c',
  'Datadog RUM · Sentry': '#a21caf',
  'Material UI': '#0b6bc4',
  Accessibility: '#075985',
}

/** Falls back to the body colour so an unmapped entry still looks deliberate. */
export function stackHue(name: string) {
  return STACK_HUES[name] ?? 'var(--color-body)'
}

/** Falls back to a neutral dot so an unmapped stack entry still renders. */
export function StackIcon({ name }: { name: string }) {
  const icon = ICONS[name]
  if (icon) return <>{icon}</>
  return (
    <svg {...S} className="size-full">
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
}
