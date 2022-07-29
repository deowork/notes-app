import SimpleMdeReact from 'react-simplemde-editor'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Layout } from 'antd'
import NotePreview from './NotePreview'
import { AppContext } from '../context'
import { useDebounce } from '../hooks/useDebounce'
import { createNote, updateNote } from '../services/NoteService'
import { INoteUpdate } from '../models/INote'
import 'easymde/dist/easymde.min.css'

const { Content } = Layout

interface EditorProps {
  isEditing: boolean
}

function Editor({ isEditing }: EditorProps) {
  const { currentNote, setCurrentNote } = useContext(AppContext)
  const [value, setValue] = useState<string>('')

  const onChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const debouncedEditor: string = useDebounce<string>(value, 1000)

  const saveNote = async (id: number, updates: INoteUpdate) => {
    if (currentNote) {
      updateNote(id, updates)
    } else {
      const createdNote = await createNote({
        name: 'Note From Editor',
        note: updates.note || '',
        created: new Date(),
      })

      if (setCurrentNote) {
        setCurrentNote(createdNote)
      }
    }
  }

  useEffect(() => {
    if (debouncedEditor && currentNote?.id) {
      saveNote(currentNote?.id, { note: debouncedEditor }).then()
    }
  }, [debouncedEditor])

  useEffect(() => {
    setValue(currentNote ? currentNote?.note : '')
  }, [currentNote])

  const editorOptions = useMemo(() => ({ autofocus: true }), [])

  return (
    <Content>
      {!isEditing ? (
        <NotePreview content={value} />
      ) : (
        <SimpleMdeReact
          options={editorOptions}
          value={value}
          onChange={onChange}
        />
      )}
    </Content>
  )
}

export default Editor
