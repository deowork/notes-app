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
  deleteNote: (id: number) => {
    db.notes.delete(id)
  },
  resetDatabase: () =>
    db.transaction('rw', db.notes, async () => {
      await Promise.all(db.tables.map((table) => table.clear()))
    }),
}

export const { fetchNotes, createNote, updateNote, deleteNote, resetDatabase } =
  noteService

export default noteService
