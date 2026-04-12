import DatePicker, { DatePickerProps } from 'react-native-date-picker';

export interface HMADatePickerProps extends Partial<DatePickerProps> {}
export default function HMADatePicker(props: HMADatePickerProps) {
  return <DatePicker modal date={props?.date || new Date()} {...props} />;
}
