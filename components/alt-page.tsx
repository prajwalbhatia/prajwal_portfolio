/**
 * Marker for the deeper inner-page ground — see `body:has([data-page='alt'])`
 * in app/globals.css.
 *
 * A marker rather than a class on each page's root element, because the
 * background is painted on `body` and a custom property set on a descendant
 * cannot repaint its ancestor. `:has()` on the body can, which also carries
 * the shared header and footer along with it.
 *
 * Drop it anywhere in a page that is not the home page.
 */
export function AltPage() {
  return <div data-page="alt" hidden />
}
