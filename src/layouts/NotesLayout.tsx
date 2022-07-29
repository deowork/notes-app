import { Button, Layout, Menu, Space } from 'antd'
import { useContext, useState } from 'react'
import NotesList from '../components/NotesList'
import { AppContext } from '../context'
import { createNote } from '../services/NoteService'
import '../assets/styles/NotesLayout.less'

const { Header, Sider } = Layout

function NotesLayout() {
  const { setCurrentNote } = useContext(AppContext)
  const [collapsed, setCollapsed] = useState<boolean>(false)

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
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Space direction="horizontal">
          <Button onClick={createBlankNote}>New Note</Button>
        </Space>
        <NotesList />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button>Action</Button>
        </Header>
      </Layout>
    </Layout>
  )
}

export default NotesLayout
