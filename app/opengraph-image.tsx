import { ImageResponse } from 'next/og'

import { proofLedger } from '@/content/experience'
import { profile, yearsOfExperience } from '@/content/profile'

export const alt = `${profile.name} — ${profile.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Dark ground only — an OG card has no viewer theme to respond to.
const GROUND = '#191d21'
const INK = '#e9e7e2'
const MUTED = '#8d9299'
const RULE = '#2c3238'
const WAS = '#b3714a'
const NOW = '#56b3a7'

/**
 * Generated at build time. Carries the motif rather than a name on a
 * background: three measured pairs is the whole argument of the site,
 * legible at thumbnail size in a DM or a LinkedIn unfurl.
 */
export default function Image() {
  const pairs = proofLedger.slice(0, 3)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: GROUND,
          color: INK,
          padding: '64px 72px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 22, letterSpacing: 3, color: MUTED }}>
            {profile.title.toUpperCase()} · {profile.level}
          </span>
          {profile.openToWork && (
            <span style={{ fontSize: 22, letterSpacing: 3, color: INK }}>
              {profile.availabilityLabel.toUpperCase()}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={{ fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>{profile.name}</span>
          <span style={{ fontSize: 40, lineHeight: 1.2, color: MUTED, letterSpacing: -1 }}>
            I make slow things fast and I own what breaks.
          </span>
        </div>

        <div style={{ display: 'flex', gap: 64, borderTop: `1px solid ${RULE}`, paddingTop: 30 }}>
          {pairs.map((p) => (
            <div key={p.where} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 14, fontSize: 40 }}>
                <span style={{ color: WAS }}>{p.was}</span>
                <span style={{ width: 22, height: 1, background: RULE }} />
                <span style={{ color: NOW }}>{p.now}</span>
              </span>
              <span style={{ fontSize: 19, color: MUTED, letterSpacing: 1.5 }}>
                {p.label.toUpperCase()}
              </span>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 40, color: INK }}>{yearsOfExperience()} yrs</span>
            <span style={{ fontSize: 19, color: MUTED, letterSpacing: 1.5 }}>REACT · TYPESCRIPT</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
