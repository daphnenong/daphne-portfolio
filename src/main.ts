import './style.css'
import posthog from 'posthog-js'

posthog.init('phc_tA9wLPe4ZD6LuJQUqYSAYuzMQ484E2rvJWBMyZdpMpxa', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
})

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root not found')
}

/* ---------- chrome ---------- */

const header = () => `
  <header class="masthead">
    <a class="wordmark" href="/" data-route>daphne nong</a>
    <nav aria-label="Primary navigation">
      <a href="/about" data-route${window.location.pathname === '/about' ? ' aria-current="page"' : ''}>about</a>
      <a href="https://drive.google.com/file/d/1zUVb3yU86WD1qiXNbrVuNoJfDhNWHv9J/view?usp=sharing" target="_blank" rel="noreferrer">resume</a>
    </nav>
  </header>
`

const footer = () => `
  <footer class="colophon">
    <p>let’s work together</p>
    <a
      class="linkedin"
      href="https://www.linkedin.com/in/daphnenong/"
      target="_blank"
      rel="noreferrer"
    >linkedin&nbsp;&#8599;</a>
  </footer>
`

/* ---------- home ---------- */

const workRow = (
  href: string,
  title: string,
  description: string,
  company: string,
  timeline: string,
  img: string,
  imgWidth: number,
  imgHeight: number,
  alt: string,
  caption: string,
) => `
  <a class="work-row" href="${href}" data-route data-thumb="${img}">
    <span class="w-title">${title}<span class="w-arrow" aria-hidden="true">&#8594;</span></span>
    <span class="w-desc">${description}</span>
    <span class="w-meta">${company}</span>
    <span class="w-meta">${timeline}</span>
    <span class="w-figure">
      <span class="w-figure-in">
        <span class="w-figure-pad">
          <img src="${img}" width="${imgWidth}" height="${imgHeight}" alt="${alt}" loading="lazy" decoding="async" />
          <span class="w-caption">${caption}</span>
        </span>
      </span>
    </span>
  </a>
`

const home = () => `
  ${header()}
  <main class="home">
    <div class="shell">
      <section class="statement">
        <h1>Daphne Nong is a product designer turning challenges into intuitive experiences.</h1>
        <p class="lede">Currently designing at Anaconda.</p>
      </section>
      <section class="works" aria-label="Index of works">
        <div class="works-head">
          <span>project</span>
          <span>description</span>
          <span>company</span>
          <span>timeline</span>
        </div>
        ${workRow(
          '/anaconda',
          '“Try Me” Code Preview on Anaconda.org',
          'Interactive Python sandbox on package pages',
          'Anaconda',
          'june 2026 – july 2026',
          '/assets/home/anaconda-card.webp',
          1280,
          1533,
          'Preview of the “Try Me” code sandbox on an Anaconda.org package details page',
          'pl. 01 — “try me” code preview, package details page',
        )}
        ${workRow(
          '/new-relic',
          'Compute Management Portal',
          'Adding forecasting capabilities to help users manage costs',
          'new relic',
          'april 2025 – june 2025',
          '/assets/new-relic/hero.webp',
          1920,
          1221,
          'Preview of the New Relic Compute Management Portal usage chart',
          'pl. 02 — compute management portal, forecasting',
        )}
      </section>
    </div>
  </main>
  ${footer()}
`

/* ---------- about ---------- */

const about = () => `
  ${header()}
  <main class="about">
    <div class="shell">
      <section class="record">
        <header class="record-head">
          <h1>Hi, I'm Daphne!</h1>
        </header>
        <div class="record-row">
          <figure class="plate portrait">
            <img src="/assets/about/portrait.jpg" width="520" height="650" alt="Daphne Nong at a rock hyrax enclosure" loading="eager" decoding="async" />
          </figure>
          <div class="bio" id="resume">
            <p class="bio-lede">Product designer but also full time rock hyrax lover, plushie collector, cat mom.</p>
            <p>Currently, I help lead the overall user experience on <a href="https://anaconda.org" target="_blank" rel="noreferrer">Anaconda.org</a>. Previously, I designed product-led growth and monetization experiences for users at New Relic. I graduated from the University of California, San Diego with a B.S. in Cognitive Science, specializing in Design and Interaction.</p>
            <p>When I'm not designing, you'll find me hanging out with my cat, planning my next trip, and buying fun things at the grocery store.</p>
          </div>
        </div>
      </section>
    </div>
  </main>
  ${footer()}
`

/* ---------- case-study building blocks ---------- */

const caseHead = (
  title: string,
  description: string,
  team: string,
  timeline: string,
  liveLink = '',
) => `
  <header class="case-head">
    ${liveLink}
    <h1>${title}</h1>
    <p class="case-desc">${description}</p>
    <dl class="meta-ledger">
      <div><dt>role</dt><dd>Product Designer</dd></div>
      <div><dt>contributions</dt><dd>UX Design<br />Prototyping</dd></div>
      <div><dt>team</dt><dd>${team}</dd></div>
      <div><dt>timeline</dt><dd>${timeline}</dd></div>
    </dl>
  </header>
`

interface ImageOptions {
  width: number
  height: number
  eager?: boolean
}

const imgAttrs = ({ width, height, eager = false }: ImageOptions) =>
  `width="${width}" height="${height}" loading="${eager ? 'eager' : 'lazy'}"` +
  `${eager ? ' fetchpriority="high"' : ''} decoding="async"`

const plate = (src: string, alt: string, caption = '', modifier = '', opts?: ImageOptions) => `
  <figure class="plate${modifier ? ` ${modifier}` : ''}">
    <img src="${src}" alt="${alt}" ${opts ? imgAttrs(opts) : 'loading="lazy" decoding="async"'} />
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
`

const ledger = (label: string, content: string, modifier = '') => `
  <section class="ledger${modifier ? ` ${modifier}` : ''}">
    <p class="ledger-label">${label}</p>
    <div class="ledger-body">${content}</div>
  </section>
`

const entry = (
  no: string,
  src: string,
  alt: string,
  title: string,
  description: string,
  imgWidth: number,
  imgHeight: number,
) => `
  <div class="entry">
    <figure class="entry-plate">
      <img src="${src}" width="${imgWidth}" height="${imgHeight}" alt="${alt}" loading="lazy" decoding="async" />
    </figure>
    <div class="entry-copy">
      <p class="entry-no">${no}</p>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  </div>
`

/* ---------- case studies ---------- */

const anaconda = () => `
  ${header()}
  <main class="case">
    <div class="shell">
      ${caseHead(
        '“Try Me” Code Preview on Anaconda.org',
        'I built an interactive sandbox on Anaconda.org package pages where practitioners can write, run, and test code in the browser before installing anything locally, turning registration into a genuine value-add.',
        'UX Researcher<br />PM Partner<br />Engineering Partner',
        'June 2026 – July 2026',
        '<a class="live-link" href="https://anaconda.org/channels/main/packages/pandas/overview" target="_blank" rel="noreferrer">live as beta — try it on the pandas package page &#8599;</a>',
      )}
      ${plate(
        '/assets/anaconda/hero-ui.webp',
        'Anaconda.org package details page featuring the in-browser “Try This Package” sandbox panel',
        '',
        'hero-plate',
        { width: 1920, height: 968, eager: true },
      )}
      ${ledger('problem', `
        <h2>Only 1% of 400,000 weekly visitors were creating accounts</h2>
        <p>The platform offered no compelling reason to register. Despite massive traffic, logged-in and anonymous users had identical experiences, and evaluating a package meant leaving the site entirely.</p>
        ${plate(
          '/assets/anaconda/comparison-panel.webp',
          'Side-by-side comparison of the anonymous and logged-in Anaconda.org package page experiences',
          '',
          '',
          { width: 1920, height: 571 },
        )}
      `)}
      ${ledger('how might we…', `
        <h2 class="statement-lg">add value to the practitioner experience to make users stay and register more?</h2>
      `, 'compact')}
      ${ledger('research', `
        <h2>Identifying the barriers to registration</h2>
        <p>We spoke with 5 data practitioners, and their feedback pointed to the same three problems.</p>
        <div class="item-list">
          <div class="item">
            <h3>4 of 5 practitioners</h3>
            <p>have no account, or made one and saw no difference.</p>
          </div>
          <div class="item">
            <h3>Registration follows value, not gates</h3>
            <p>Accounts convert when they're part of a workflow, not a one-time ask.</p>
          </div>
          <div class="item">
            <h3>High friction in evaluation</h3>
            <p>Evaluating a package meant leaving the site and installing locally.</p>
          </div>
        </div>
      `)}
      ${ledger('user flow', `
        <h2>Mapping the path from exploration to conversion</h2>
        <p>To connect discovery with retention, I mapped the journey for both anonymous and logged-in users.</p>
        ${plate(
          '/assets/anaconda/user-flow.webp',
          'User flow mapping the journey from the “Try Me” sandbox to a shareable link',
          '',
          '',
          { width: 1920, height: 822 },
        )}
      `)}
      ${ledger('solution', `
        <h2>An interactive sandbox that removes local installation friction</h2>
        <p>For the beta, we shipped the free half of that journey, letting users run and edit code entirely in the browser. The core experience looks like:</p>
        <div class="entry-list">
          ${entry(
            '01',
            '/assets/anaconda/instant-panel.webp',
            'Sandbox editor running a Python snippet instantly in the browser, with a resettable code block',
            'Instant execution',
            'Users can immediately run, edit, and reset Python snippets directly in the browser, completely bypassing the need for a local terminal setup.',
            1234,
            750,
          )}
          ${entry(
            '02',
            '/assets/anaconda/contextual-panel.webp',
            'Sandbox embedded directly on the Anaconda.org package details page, next to package metadata',
            'Contextual discovery',
            'The sandbox is embedded right on the package details page, ensuring practitioners stay within the Anaconda ecosystem while evaluating tools.',
            1234,
            750,
          )}
          ${entry(
            '03',
            '/assets/anaconda/conversion-panel.webp',
            'Dialog prompting an anonymous user to create an account in order to save sandbox work',
            '<span class="after-tag">(after beta)</span> Value-led conversion',
            'The designed conversion moment: asking users to save their work organically bridges the gap between a quick anonymous test and a long-term registered account.',
            1234,
            750,
          )}
        </div>
      `)}
      ${ledger('impact', `
        <h2>Proof that practitioners want in-browser evaluation</h2>
        <p>Within the first seven days of our beta launch across 100+ packages, the telemetry showed:</p>
        <div class="stats-ledger">
          <div class="stat"><strong>2,665</strong><span>total browser interactions</span></div>
          <div class="stat"><strong>112</strong><span>successful code executions</span></div>
          <div class="stat"><strong>2,542</strong><span>unique code edits</span></div>
        </div>
        <p>95% of interactions included a code edit. Visitors weren't just clicking through the widget, they were genuinely evaluating packages.</p>
      `)}
      ${ledger('what’s next', `
        <h2>Turning engagement into accounts</h2>
        <p>The beta showed that practitioners will use the sandbox if it's there. The next step is to release save and share, the gated half of the flow. Once that's live, we can track saves, sign-ins, and shared links to see if more visitors actually become registered users.</p>
      `)}
    </div>
  </main>
  ${footer()}
`

const newRelic = () => `
  ${header()}
  <main class="case">
    <div class="shell">
      ${caseHead(
        'Compute Management Portal',
        'The Compute Management Portal allows users to manage their observability spend effectively by providing a clear and detailed view of CCU consumption.',
        'Design Partner<br />PM Partner<br />Engineering Partner',
        'April 2025 – June 2025',
      )}
      ${plate(
        '/assets/new-relic/hero.webp',
        'New Relic Compute Management Portal showing CCU consumption charts',
        '',
        'hero-plate',
        { width: 1920, height: 1221, eager: true },
      )}
      ${ledger('problem', `
        <h2 class="statement-md">Lack of clear insights prevents customers from effectively understanding and managing their compute usage.</h2>
      `, 'compact')}
      ${ledger('goal', `
        <h2 class="statement-md">Add forecasting capabilities which will provide early warnings about potential budget overages, enabling teams to adjust their usage in real-time and prevent bill shock entirely.</h2>
      `, 'compact')}
      ${ledger('where we started', `
        <div class="split">
          <div class="split-copy">
            <h2>How predictions work today</h2>
            <p>In the platform, there is a query (NRQL Predict) that a customer can type to run predictions for a set of data.</p>
          </div>
          ${plate(
            '/assets/new-relic/query-panel.webp',
            'NRQL Predict query and resulting forecast chart in the New Relic platform',
            '',
            '',
            { width: 1476, height: 748 },
          )}
        </div>
      `)}
      ${ledger('why the portal?', `
        <h2 class="statement-md">The billing admin, a non-technical user, is the primary audience for the compute management portal. They need an easy way to predict their team's compute usage without relying on queries or code.</h2>
      `, 'compact')}
      ${ledger('iterations', `
        <h2>I initially explored three concepts, but feedback from partners and existing design system constraints revealed these iterations weren't feasible.</h2>
        <div class="item-list">
          <div class="item iteration">
            <figure class="item-plate">
              <img src="/assets/new-relic/iteration-button.webp" width="1170" height="1258" alt="Discarded concept placing a forecasting button in the portal toolbar" loading="lazy" decoding="async" />
            </figure>
            <div class="item-copy">
              <h3>Button</h3>
              <p>Con: Too busy with all the other buttons on the page</p>
            </div>
          </div>
          <div class="item iteration">
            <figure class="item-plate">
              <img src="/assets/new-relic/iteration-switch.webp" width="1170" height="1258" alt="Discarded concept toggling forecasts with a switch control" loading="lazy" decoding="async" />
            </figure>
            <div class="item-copy">
              <h3>Switch</h3>
              <p>Con: Can't choose a custom time frame</p>
            </div>
          </div>
          <div class="item iteration">
            <figure class="item-plate">
              <img src="/assets/new-relic/iteration-drawer.webp" width="1170" height="1258" alt="Discarded concept opening forecasts in a side drawer" loading="lazy" decoding="async" />
            </figure>
            <div class="item-copy">
              <h3>Drawer</h3>
              <p>Con: Doesn't align with how drawers are used in our current design system</p>
            </div>
          </div>
        </div>
      `)}
      ${ledger('feedback &amp; constraints', `
        <h2 class="statement-md">While NRQL Predict currently only supports line charts, customer interest remained strong. Users are less concerned with the specific chart type (line vs. bar), especially when the feature is introduced as a beta or preview with clear guidance.</h2>
      `, 'compact')}
      ${ledger('solution', `
        <div class="entry-list">
          ${entry(
            '01',
            '/assets/new-relic/feature-visibility.webp',
            'Forecasting option surfaced in the portal with a visible beta label',
            'Feature visibility',
            'Customers can easily locate the forecasting feature and are clearly informed of its beta status.',
            1280,
            814,
          )}
          ${entry(
            '02',
            '/assets/new-relic/hero.webp',
            'Expanded graph menu where billing admins can enable usage forecasting',
            'Forecasting made easy for billing admins',
            'Customers can get a grasp on what their future usage will look like by clicking into the existing graph menu.',
            1920,
            1221,
          )}
          ${entry(
            '03',
            '/assets/new-relic/predictive-data.webp',
            'Chart tooltip marking forecast values as predictive rather than real-time data',
            'Communicating predictive data',
            "Tooltips and hovers transparently communicate predictive data, clarifying it's not real-time.",
            1440,
            900,
          )}
        </div>
      `)}
      ${ledger('next steps', `
        <h2>Further User Research &amp; Validation</h2>
        <p>Our next steps involve iterating on the forecasting UI based on insights from upcoming customer interviews and feedback. We'll also explore predictions for bar charts once NRQL Predict is able to support that feature, allowing greater consistency.</p>
      `)}
    </div>
  </main>
  ${footer()}
`

/* ---------- 404 ---------- */

const notFound = () => `
  ${header()}
  <main class="case">
    <div class="shell">
      <section class="statement">
        <h1>Page not found.</h1>
        <p class="lede">This page doesn’t exist. <a href="/" data-route>Back to the index&nbsp;&#8594;</a></p>
      </section>
    </div>
  </main>
  ${footer()}
`

/* ---------- cursor-following work preview ---------- */

const cursorThumb = document.createElement('div')
cursorThumb.className = 'cursor-thumb'
cursorThumb.setAttribute('aria-hidden', 'true')
const cursorThumbImg = document.createElement('img')
cursorThumbImg.alt = ''
cursorThumbImg.draggable = false
cursorThumbImg.decoding = 'async'
cursorThumb.appendChild(cursorThumbImg)
document.body.appendChild(cursorThumb)

let currentRow: Element | null = null
let isBroken = false

cursorThumbImg.onload = () => {
  isBroken = false
}
cursorThumbImg.onerror = () => {
  isBroken = true
  currentRow = null
  cursorThumb.classList.remove('is-visible')
}

const hide = () => {
  currentRow = null
  cursorThumb.classList.remove('is-visible')
}

const clampThumb = (clientX: number, clientY: number) => {
  const pad = 24
  const w = cursorThumb.offsetWidth
  const h = cursorThumb.offsetHeight
  const x = Math.max(pad, Math.min(clientX + pad, window.innerWidth - w - pad))
  const y = Math.max(pad, Math.min(clientY + pad, window.innerHeight - h - pad))
  cursorThumb.style.transform = `translate(${x}px, ${y}px)`
}

document.addEventListener('mouseover', (event) => {
  if (!(event.target instanceof Element)) {
    return
  }
  const row = event.target.closest('.work-row')
  if (!row || row === currentRow) {
    return
  }
  currentRow = row
  const src = row.getAttribute('data-thumb')
  if (!src) {
    hide()
    return
  }

  // if the thumbnail is already on screen (row-to-row glide), keep it
  // visible and swap smoothly so the content layer never blinks
  const alreadyVisible = cursorThumb.classList.contains('is-visible') && !isBroken
  if (alreadyVisible) {
    clampThumb(event.clientX, event.clientY)
    cursorThumbImg.src = src
    return
  }

  cursorThumbImg.src = src
  clampThumb(event.clientX, event.clientY)
  cursorThumb.classList.add('is-visible')
})

document.addEventListener('mousemove', (event) => {
  if (currentRow && !isBroken) {
    clampThumb(event.clientX, event.clientY)
  }
})

document.addEventListener('mouseout', (event) => {
  if (!currentRow) {
    return
  }
  const to = event.relatedTarget as Node | null
  if (to && currentRow.contains(to)) {
    return
  }
  hide()
})

/* ---------- router ---------- */

window.history.scrollRestoration = 'manual'
const scrollPositions = new Map<string, number>()
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let currentPath = window.location.pathname

const routes: Record<string, { title: string; description: string; render: () => string }> = {
  '/': {
    title: 'Daphne Nong Portfolio',
    description: 'Daphne Nong is a product designer creating intuitive experiences at Anaconda.',
    render: home,
  },
  '/about': {
    title: 'About — Daphne Nong',
    description: 'About Daphne Nong, product designer at Anaconda, previously New Relic. B.S. Cognitive Science (Design and Interaction), UC San Diego.',
    render: about,
  },
  '/anaconda': {
    title: 'Anaconda.org Case Study — Daphne Nong',
    description: 'Case study: an interactive in-browser “Try Me” code sandbox on Anaconda.org package pages.',
    render: anaconda,
  },
  '/new-relic': {
    title: 'New Relic Case Study — Daphne Nong',
    description: 'Case study: adding usage forecasting to the New Relic Compute Management Portal.',
    render: newRelic,
  },
}

const setMetaDescription = (content: string) => {
  const el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (el) {
    el.content = content
  }
}

const render = () => {
  const route = routes[window.location.pathname]
  document.title = route ? route.title : 'Not found — Daphne Nong'
  setMetaDescription(route ? route.description : routes['/'].description)
  app.innerHTML = route ? route.render() : notFound()
  currentPath = window.location.pathname
  document.body.dataset.route = currentPath
  hide()
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) {
    return
  }
  const link = event.target.closest<HTMLAnchorElement>('a[data-route]')
  if (!link || link.target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  const url = new URL(link.href)
  if (url.origin !== window.location.origin) {
    return
  }

  event.preventDefault()
  scrollPositions.set(currentPath, window.scrollY)
  window.history.pushState({}, '', `${url.pathname}${url.hash}`)
  render()
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' })
})

window.addEventListener('popstate', () => {
  scrollPositions.set(currentPath, window.scrollY)
  render()
  window.scrollTo({ top: scrollPositions.get(currentPath) ?? 0, behavior: 'auto' })
})

render()
