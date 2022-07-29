import { Button, Layout, Menu, Space } from 'antd'
import React, { useContext, useState } from 'react'
import Editor from '../components/Editor'
import { AppContext } from '../context'
import { createNote } from '../services/NoteService'
import NotesList from '../components/NotesList'
import SearchForm from '../components/SearchForm'
import '../assets/styles/NotesLayout.less'

const { Header, Sider } = Layout

function NotesLayout() {
  const { setCurrentNote } = useContext(AppContext)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const toggleEditor = () => {
    setIsEditing((isEditing) => !isEditing)
  }

  const createBlankNote = async () => {
    const createdNote = await createNote({
      name: 'New Note',
      note: '',
      created: new Date(),
    })

    if (setCurrentNote) {
      setCurrentNote(createdNote)
    }
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        width={430}
        collapsedWidth={240}
        collapsible
        className="sidebar-width"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <SearchForm search={search} setSearch={setSearch} />
        <Space direction="horizontal">
          <Button onClick={createBlankNote}>New Note</Button>
        </Space>
        <NotesList search={search} />
        <Menu defaultSelectedKeys={['1']} mode="inline" />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button onClick={toggleEditor}>Toggle editor</Button>
        </Header>
        <Editor isEditing={isEditing} />
      </Layout>
    </Layout>
  )
}

export default NotesLayout
