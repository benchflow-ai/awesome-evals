import { useCallback, useEffect, useRef, useState } from 'react'
import type { ViewName } from './types'
import { useDataset } from './lib/dataset'
import { useLiveUpdate } from './lib/useLiveUpdate'
import { useReadingState } from './lib/useReadingState'
import { css } from './lib/css'
import { Masthead } from './components/Masthead'
import { Home } from './components/Home'
import { ReadingPath } from './components/ReadingPath'
import { Catalog } from './components/Catalog'
import { MapView } from './components/MapView'
import { Learn } from './components/Learn'
import { DetailDrawer } from './components/DetailDrawer'

const VIEWS: ViewName[] = ['home', 'path', 'catalog', 'map', 'learn']

function viewFromHash(): ViewName {
  const h = location.hash.replace(/^#\/?/, '')
  return (VIEWS as string[]).includes(h) ? (h as ViewName) : 'home'
}

export function App() {
  const { data, all, stats, secLabel, findEntry } = useDataset()
  useLiveUpdate()

  const [view, setView] = useState<ViewName>(viewFromHash)
  const [selected, setSelected] = useState<string | null>(null)
  const mainRef = useRef<HTMLElement>(null)
  const reading = useReadingState()

  const scrollTop = () => {
    if (mainRef.current) mainRef.current.scrollTop = 0
  }

  // Keep the view in sync with the URL hash so views are shareable / back-button friendly.
  useEffect(() => {
    const onHash = () => {
      setView(viewFromHash())
      setSelected(null)
      scrollTop()
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = useCallback((v: ViewName) => {
    setSelected(null)
    setView(v)
    const target = v === 'home' ? '/' : '/' + v
    if (location.hash.replace(/^#/, '') !== target) location.hash = target
    scrollTop()
  }, [])

  const openEntry = useCallback((url: string) => setSelected(url), [])
  const closeEntry = useCallback(() => setSelected(null), [])

  const readCount = all.filter((e) => reading.isRead(e.url)).length
  const selectedEntry = selected ? findEntry(selected) : undefined

  return (
    <div style={css('position:fixed;inset:0;display:flex;flex-direction:column;background:#f3efe5;overflow:hidden')}>
      <Masthead view={view} total={stats.total} readCount={readCount} onNav={go} onHome={() => go('home')} />

      <main ref={mainRef} className="ef-scroll" style={css('flex:1;overflow-y:auto;overflow-x:hidden;position:relative')}>
        {view === 'home' && (
          <Home total={stats.total} sectionCount={stats.sectionCount} newCount={stats.newCount} mustCount={stats.mustCount} starterCount={stats.starterCount} onNav={go} />
        )}
        {view === 'path' && <ReadingPath starter={data.starter} reading={reading} openEntry={openEntry} onNav={go} />}
        {view === 'catalog' && <Catalog reading={reading} openEntry={openEntry} />}
        {view === 'map' && <MapView reading={reading} openEntry={openEntry} />}
        {view === 'learn' && <Learn reading={reading} openEntry={openEntry} />}
      </main>

      {selectedEntry && (
        <DetailDrawer entry={selectedEntry} sectionLabel={secLabel(selectedEntry.section || 'T')} reading={reading} onClose={closeEntry} />
      )}
    </div>
  )
}
