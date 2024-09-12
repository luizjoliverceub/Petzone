import dayjs from 'dayjs'

export function parseDate (date: Date | undefined) {
    return dayjs(date).format('DD/MM/YYYY')
}