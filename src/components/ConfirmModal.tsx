import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

const { confirm } = Modal

type DeleteCallback = () => void

export const showConfirm = (deleteCallback: DeleteCallback) => {
  confirm({
    title: 'Do you want to delete this note?',
    icon: <ExclamationCircleOutlined />,
    content: 'Clicking "Ok" you will delete this note permanently',
    onOk() {
      deleteCallback()
    },
    onCancel() {},
  })
}

export default showConfirm
