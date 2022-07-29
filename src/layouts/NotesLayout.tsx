import { Button, Layout, Menu, Space } from 'antd'
import React, { useContext, useState } from 'react'
import Editor from '../components/Editor'
import { AppContext } from '../context'
import { createNote } from '../services/NoteService'
import '../assets/styles/NotesLayout.less'
import NotesList from '../components/NotesList'

const { Header, Sider } = Layout

function NotesLayout() {
  const { setCurrentNote } = useContext(AppContext)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

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
        <Space direction="horizontal">
          <Button onClick={createBlankNote}>New Note</Button>
        </Space>
        <NotesList />
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
