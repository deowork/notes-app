import { createContext } from 'react'
import { INote } from '../models/INote'

export interface AppContextInterface {
  currentNote?: INote | null
  setCurrentNote?: (note: INote | null) => void
}

const defaultContext = {
  currentNote: null,
}

export const AppContext =
  createContext<Partial<AppContextInterface>>(defaultContext)
