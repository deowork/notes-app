import { List, Typography } from 'antd'
import { useContext, useState } from 'react'
import { AppContext } from '../context'
import { INote } from '../models/INote'
import { fetchNotes } from '../services/NoteService'
import classes from './NotesList.module.less'
import { formatDate } from '../utils/formatDate'

function NotesList() {
  const { currentNote, setCurrentNote } = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(true)

  const notes = fetchNotes()

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
