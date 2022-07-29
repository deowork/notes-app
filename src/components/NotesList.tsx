import { List, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context'
import { INote } from '../models/INote'
import { fetchNotes } from '../services/NoteService'
import classes from './NotesList.module.less'
import { formatDate } from '../utils/formatDate'
import { useDebounce } from '../hooks/useDebounce'

interface NotesListProps {
  search: string
}

function NotesList({ search }: NotesListProps) {
  const { currentNote, setCurrentNote } = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [notes, setNotes] = useState<INote[]>([])
  const debouncedSearch: string = useDebounce<string>(search, 300)
  const fetchedNotes = fetchNotes()

  useEffect(() => {
    if (fetchedNotes) {
      const sortedNotes = fetchedNotes.filter((note) => {
        if (!search) return true
        const query = debouncedSearch.toLowerCase()

        return (
          note.name.toLowerCase().indexOf(query) > -1 ||
          note.note.toLowerCase().indexOf(query) > -1
        )
      })

      setNotes(sortedNotes)
    }
  }, [fetchedNotes, debouncedSearch])

  const selectItem = (note: INote) => {
    if (setCurrentNote) {
      setCurrentNote(note)
    }
  }

  if (notes && loading) {
    setLoading(false)
  }

  return (
    <List
      bordered
      className={classes.notesList}
      loading={loading}
      dataSource={notes}
      renderItem={(item) => {
        const itemClasses = [classes.listItem]

        if (currentNote?.id === item?.id) {
          itemClasses.push(classes.currentItem)
        }

        return (
          <List.Item
            onClick={() => selectItem(item)}
            key={item.id}
            className={itemClasses.join(' ')}
          >
            <Typography.Title level={5} style={{ margin: 0 }}>
              {item.name}
            </Typography.Title>
            <Typography.Text>
              {item?.created && formatDate(item.created)}
            </Typography.Text>
          </List.Item>
        )
      }}
    />
  )
}

export default NotesList
