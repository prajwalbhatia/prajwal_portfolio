import type { Role } from '@/content/experience'

/** "MM/YYYY" → a Date at the first of that month. */
function parse(value: string): Date {
  if (value === 'present') return new Date()
  const [month, year] = value.split('/').map(Number)
  return new Date(year, month - 1, 1)
}

/**
 * Positions each role's bar on a shared career timeline, so the /work table
 * shows relative tenure at a glance rather than making the reader do date maths.
 */
export function tenureBars(roles: Role[]) {
  const starts = roles.map((r) => parse(r.start).getTime())
  const ends = roles.map((r) => parse(r.end).getTime())
  const first = Math.min(...starts)
  const last = Math.max(...ends)
  const span = last - first || 1

  return roles.map((role) => {
    const from = (parse(role.start).getTime() - first) / span
    const to = (parse(role.end).getTime() - first) / span
    return {
      id: role.id,
      left: `${(from * 100).toFixed(1)}%`,
      right: `${((1 - to) * 100).toFixed(1)}%`,
    }
  })
}

/** Whole years between a start date and now, for the depth-by-area table. */
export function yearsSince(start: string): number {
  const ms = Date.now() - parse(start).getTime()
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24 * 365.25)))
}
