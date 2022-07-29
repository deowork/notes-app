export interface INote {
  id?: number
  name: string
  note: string
  created: Date
}

export interface INoteList {
  items: INote[]
}

export interface INoteUpdate {
  name?: string
  note?: string
}
