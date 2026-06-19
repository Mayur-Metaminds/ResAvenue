/**
 * Renders the current calendar year, read at render time — so a copyright line
 * (or anything else) rolls over automatically on January 1 with zero code
 * changes and no yearly intervention.
 *
 * Usage:
 *   © <CurrentYear /> ResAvenue. All rights reserved.
 *
 * Reusable as-is across React / Next.js projects (no dependencies, no "use
 * client" — works inside both Server and Client Components).
 *
 * `suppressHydrationWarning` silences the one-off React dev warning for the
 * rare case where a page is server-rendered just before midnight on Dec 31 and
 * hydrated on the client just after, so the year differs across that boundary.
 */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>
}
