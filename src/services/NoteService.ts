import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../models/db'
import { INote, INoteUpdate } from '../models/INote'

export const noteService = {
  fetchNotes: () =>
    useLiveQuery(() => db.notes.orderBy('id').reverse().toArray()),
  createNote: async (note: INote): Promise<INote> => {
    const id = await db.notes.add(note)
    return new Promise((resolve) => {
      resolve({ ...note, id: Number(id) })
    })
  },
  updateNote: (id: number, changes: INoteUpdate) => {
    db.notes.update(id, changes)
  },
}

export const { fetchNotes, createNote, updateNote } = noteService

export default noteService
