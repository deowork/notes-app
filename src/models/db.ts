import Dexie, { Table } from 'dexie'
import { INote } from './INote'

export class NoteDB extends Dexie {
  notes!: Table<INote>

  constructor() {
    super('notes')
    this.version(1).stores({
      notes: '++id, name, note, created',
    })
  }
}

export const db = new NoteDB()
