import ReactDatePicker, {
  DatePickerProps,
} from 'react-date-picker/dist/entry.nostyle'

export interface IDatePickerProps extends DatePickerProps {}

const DatePicker: React.FC<IDatePickerProps> = (props) => {
  return <ReactDatePicker clearIcon={null} locale="pt-BR" {...props} />
}

export default DatePicker
