import ReactMarkdown from 'react-markdown'
import { Space } from 'antd'

interface NotePreviewProps {
  content?: string
}

function NotePreview({ content }: NotePreviewProps) {
  return (
    <Space direction="vertical" className="mde-preview">
      {content && <ReactMarkdown>{content}</ReactMarkdown>}
    </Space>
  )
}

NotePreview.defaultProps = {
  content: '',
}

export default NotePreview
