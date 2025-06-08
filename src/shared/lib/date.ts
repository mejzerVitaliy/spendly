export enum DateFormat {
  'MM/DD/YYYY' = 'MM/DD/YYYY',
  'DD/MM/YYYY' = 'DD/MM/YYYY',
  'YYYY-MM-DD' = 'YYYY-MM-DD'
}

export const formatDate = (date: Date, format: DateFormat): string => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  switch (format) {
    case DateFormat['MM/DD/YYYY']:
      return `${month}/${day}/${year}`
    case DateFormat['DD/MM/YYYY']:
      return `${day}/${month}/${year}`
    case DateFormat['YYYY-MM-DD']:
      return `${year}-${month}-${day}`
    default:
      return `${month}/${day}/${year}`
  }
} 