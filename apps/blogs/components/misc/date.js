import dayjs from "dayjs"

export default function Date({ dateString }) {

  require('dayjs/locale/pt')
  const day = dayjs(dateString).locale('pt')
  return ( 
    <time dateTime={dateString}>{day.format("D MMMM YYYY")}</time>
  )
}
