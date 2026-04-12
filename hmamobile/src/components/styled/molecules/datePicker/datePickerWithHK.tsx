import { Controller, ControllerProps } from 'react-hook-form';
import HMADatePickerMolecule, { HMADatePickerMoleculeProps } from '.';
import HMAText from '../../atoms/text';

export interface HMADatePickerHookProps
  extends Omit<ControllerProps, 'render'> {
  datePickerProps?: HMADatePickerMoleculeProps;
}

export default function HMADatePickerWithHook({
  datePickerProps,
  ...props
}: HMADatePickerHookProps) {
  if (props?.control && props?.name)
    return (
      <Controller
        {...props}
        render={({
          field: { onChange, value, ...restField },
          fieldState: { error },
        }) => {
          return (
            <>
              <HMADatePickerMolecule
                date={value}
                // {...restField}
                // {...props}
                onConfirm={onChange}
                {...datePickerProps}
              />
              {error?.message && (
                <HMAText size="small" color="error">
                  {error.message}
                </HMAText>
              )}
            </>
          );
        }}
      />
    );
  else
    return (
      <HMADatePickerMolecule
        date={datePickerProps?.date || new Date()}
        {...datePickerProps}
      />
    );
}
