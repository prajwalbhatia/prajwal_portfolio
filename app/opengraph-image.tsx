import { ImageResponse } from 'next/og'

import { headlineMetrics } from '@/content/experience'
import { profile, yearsOfExperience } from '@/content/profile'

export const alt = `${profile.name} — ${profile.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Generated at build time. Makes a shared link unfurl with the name, the level
 * and the availability signal instead of a blank card.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0B0C0E',
          color: '#F3F4F6',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 24, letterSpacing: 4, color: '#8A8794' }}>
            {profile.title.toUpperCase()}
          </span>
          {profile.openToWork && (
            <span style={{ fontSize: 24, letterSpacing: 4, color: '#FF3D7F' }}>
              ● {profile.availabilityLabel.toUpperCase()}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 132, fontWeight: 700, lineHeight: 0.9, letterSpacing: -4 }}>
            PRAJWAL
          </span>
          <span style={{ fontSize: 132, fontWeight: 700, lineHeight: 0.9, letterSpacing: -4 }}>
            BHATIA<span style={{ color: '#FF3D7F' }}>.</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 56, borderTop: '1px solid #262A31', paddingTop: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 40, color: '#FF3D7F', fontWeight: 700 }}>
              {yearsOfExperience()} yrs
            </span>
            <span style={{ fontSize: 20, color: '#8A8794' }}>React · TypeScript</span>
          </div>
          {headlineMetrics.slice(0, 3).map((m) => (
            <div key={m.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 40, color: '#FF3D7F', fontWeight: 700 }}>{m.value}</span>
              <span style={{ fontSize: 20, color: '#8A8794' }}>{m.label.slice(0, 34)}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
