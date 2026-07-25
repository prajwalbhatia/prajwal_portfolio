import { Pair } from '@/components/pair'
import { proofLedger } from '@/content/experience'

/**
 * The motif's clearest statement, so it gets room: five measured pairs, one
 * per cell, nothing else competing for attention on this surface.
 */
export function ProofLedger() {
  return (
    <section aria-labelledby="proof-heading" className="rule-t">
      <div className="shell gutter py-10 sm:py-14">
        <h2 id="proof-heading" className="label text-muted mb-8">
          Measured, at p75, in the field
        </h2>

        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {proofLedger.map((m) => (
            <li key={`${m.label}-${m.where}`}>
              <Pair size="lg" was={m.was} now={m.now} label={m.label} where={m.where} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
