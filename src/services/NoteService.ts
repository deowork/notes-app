import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../models/db'
import { INote } from '../models/INote'

export const noteService = {
  fetchNotes: () =>
    useLiveQuery(() => db.notes.orderBy('id').reverse().toArray()),
  createNote: async (note: INote): Promise<INote> => {
    const id = await db.notes.add(note)
    return new Promise((resolve) => {
      resolve({ ...note, id: Number(id) })
    })
  },
}

export const { fetchNotes, createNote } = noteService

export default noteService
