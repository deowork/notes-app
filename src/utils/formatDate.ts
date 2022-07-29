import dayjs from 'dayjs'

export const formatDate = (date: Date) => dayjs(date).format('HH:mm MM/DD/YYYY')

export default formatDate
