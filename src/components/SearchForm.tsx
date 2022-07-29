import { ChangeEvent } from 'react'
import { Input, Space } from 'antd'

const { Search } = Input

interface SearchFormProps {
  search: string
  setSearch: (search: string) => void
}

function SearchForm({ search, setSearch }: SearchFormProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSearch = (value: string) => {
    setSearch(value)
  }

  return (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        allowClear
        value={search}
        onSearch={onSearch}
        onChange={onChange}
        style={{ width: '100%' }}
      />
    </Space>
  )
}

export default SearchForm
