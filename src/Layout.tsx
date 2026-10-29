import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { LangProvider, useLang } from './i18n'
import { LogoFilter } from './Logo'
import Nav from './Nav'
import Footer from './Footer'
import './index.css'

/*
  Bos Paradys is a multi-page site: every page has its own HTML file (index,
  venue, events, gallery, reviews, contact) and its own entry in src/pages.
  Each entry calls mount(), which wraps the page in what every page shares:
  language, reduced-motion handling, the logo filter, nav and footer.
*/

function Shell({ Page }: { Page: ComponentType }) {
  const { t } = useLang()
  return (
    <MotionConfig reducedMotion="user">
      <LogoFilter />
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Nav />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Page />
      </main>
      <Footer />
    </MotionConfig>
  )
}

export function mount(Page: ComponentType) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LangProvider>
        <Shell Page={Page} />
      </LangProvider>
    </StrictMode>,
  )
}
