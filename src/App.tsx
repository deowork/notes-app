import { useMemo, useState } from 'react'
import { AppContext } from './context'
import NotesLayout from './components/layouts/NotesLayout'
import { INote } from './models/INote'
import './assets/styles/theme.less'

function App() {
  const [currentNote, setCurrentNote] = useState<INote | null>(null)

  const appContext = useMemo(
    () => ({
      currentNote,
      setCurrentNote,
    }),
    [currentNote]
  )

  return (
    <AppContext.Provider value={appContext}>
      <NotesLayout />
    </AppContext.Provider>
  )
}

export default App
