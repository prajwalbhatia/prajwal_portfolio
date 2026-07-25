import type { Metadata } from 'next'

import { Band } from '@/components/band'
import { beyondCode, roles } from '@/content/experience'
import { awards, education } from '@/content/profile'
import { tenureBars } from '@/lib/tenure'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Employment history, measured results, and the process work behind them — Core Web Vitals, incident response, review standards and mentoring.',
}

function period(start: string, end: string) {
  return end === 'present' ? `${start} — now` : `${start} — ${end}`
}

export default function WorkPage() {
  const bars = tenureBars(roles)

  return (
    <>
      <section className="shell gutter pt-12 pb-6">
        <h1 className="display text-[clamp(2.4rem,8vw,4.5rem)] mb-4">
          Work<span className="text-signal">.</span>
        </h1>
        <p className="text-base text-dim max-w-[58ch] leading-relaxed">
          Everything below is measured in the field at p75, not on my laptop. Where there
          isn&rsquo;t an honest number, there isn&rsquo;t one shown.
        </p>
      </section>

      <Band title="Employment · 2019 — present" action="Résumé" actionHref="/resume">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[46rem]">
            <caption className="sr-only">
              Employment history with core work and measured results
            </caption>
            <thead>
              <tr>
                {['Period', 'Role', 'Organisation', 'Core work', 'Result', 'Tenure'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="label text-muted font-normal text-left border-b border-line-2 px-3 py-2.5 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => {
                const bar = bars.find((b) => b.id === role.id)
                return (
                  <tr key={role.id}>
                    <td className="border-b border-line px-3 py-3 align-baseline text-muted tabular-nums whitespace-nowrap">
                      {period(role.start, role.end)}
                    </td>
                    <th
                      scope="row"
                      className="border-b border-line px-3 py-3 align-baseline text-left font-semibold text-text whitespace-nowrap"
                    >
                      {role.shortTitle}
                    </th>
                    <td className="border-b border-line px-3 py-3 align-baseline text-dim">
                      {role.company}
                    </td>
                    <td className="border-b border-line px-3 py-3 align-baseline text-dim">
                      {role.coreWork}
                    </td>
                    <td className="border-b border-line px-3 py-3 align-baseline text-signal tabular-nums whitespace-nowrap">
                      {role.result ?? '—'}
                    </td>
                    <td className="border-b border-line px-3 py-3 align-baseline w-32">
                      <span
                        aria-hidden="true"
                        className="relative block h-[5px] bg-line w-28"
                      >
                        <i
                          className="absolute inset-y-0 bg-signal"
                          style={{ left: bar?.left, right: bar?.right }}
                        />
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Band>

      <Band title="Beyond shipping code">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[40rem]">
            <caption className="sr-only">Process and team contributions</caption>
            <thead>
              <tr>
                {['Area', 'What I changed', 'Evidence'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="label text-muted font-normal text-left border-b border-line-2 px-3 py-2.5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {beyondCode.map((row) => (
                <tr key={row.area}>
                  <th
                    scope="row"
                    className="border-b border-line px-3 py-3 align-baseline text-left font-semibold text-text whitespace-nowrap"
                  >
                    {row.area}
                  </th>
                  <td className="border-b border-line px-3 py-3 align-baseline text-dim">
                    {row.change}
                  </td>
                  <td
                    className={`border-b border-line px-3 py-3 align-baseline whitespace-nowrap ${
                      row.isMetric ? 'text-signal tabular-nums' : 'text-dim'
                    }`}
                  >
                    {row.evidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Band>

      <Band title="Education & recognition">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[40rem]">
            <caption className="sr-only">Education and awards</caption>
            <thead>
              <tr>
                {['Year', 'What', 'Detail'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="label text-muted font-normal text-left border-b border-line-2 px-3 py-2.5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-line px-3 py-3 align-baseline text-muted tabular-nums whitespace-nowrap">
                  {education.period}
                </td>
                <th
                  scope="row"
                  className="border-b border-line px-3 py-3 align-baseline text-left font-semibold text-text"
                >
                  {education.degree}
                </th>
                <td className="border-b border-line px-3 py-3 align-baseline text-dim">
                  {education.institution}, {education.location}
                </td>
              </tr>
              {awards.map((a) => (
                <tr key={a.title}>
                  <td className="border-b border-line px-3 py-3 align-baseline text-muted tabular-nums">
                    {a.year}
                  </td>
                  <th
                    scope="row"
                    className="border-b border-line px-3 py-3 align-baseline text-left font-semibold text-text"
                  >
                    {a.title}
                  </th>
                  <td className="border-b border-line px-3 py-3 align-baseline text-dim">
                    {a.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Band>
    </>
  )
}
