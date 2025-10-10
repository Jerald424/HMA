import { View, ViewProps } from 'react-native';
import {
  Control,
  FieldValues,
  RegisterOptions,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import HMATextInputWithHook, {
  HMATextInputBoxHookProps,
} from '../../molecules/input/inputWithHK';
import HMADivider from '../../atoms/divider';

export type controlInter = Control<FieldValues, any>;
export type resetInter = UseFormReset<FieldValues>;
export type watchInter = UseFormWatch<FieldValues>;
export type setValueInter = UseFormSetValue<FieldValues>;

export interface formData extends Partial<HMATextInputBoxHookProps> {
  name: string;
  inputType: 'input-box';
  conProps?: ViewProps;
}

export type formDataProps = formData[];

export interface HMAFormProps extends ViewProps {
  data: formData[];
  control?: controlInter;
}

const cmp = {
  'input-box': HMATextInputWithHook,
};

export default function HMAForm({ data, control, ...props }: HMAFormProps) {
  return (
    <View {...props}>
      {data?.map(item => {
        const Cmp = cmp?.[item?.inputType];
        return (
          <View key={item?.name}>
            <Cmp {...item} control={control} />
            <HMADivider space="sm" />
          </View>
        );
      })}
    </View>
  );
}
