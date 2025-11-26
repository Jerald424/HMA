import { Controller, ControllerProps } from 'react-hook-form';
import HMATextInputMolecule, { HMATextInputMoleculeProps } from '.';
import HMAText from '../../atoms/text';

export interface HMATextInputBoxHookProps
  extends Omit<ControllerProps, 'render'> {
  textInputProps?: HMATextInputMoleculeProps;
}

export default function HMATextInputWithHook({
  textInputProps,
  ...props
}: HMATextInputBoxHookProps) {
  if (props?.control && props?.name)
    return (
      <Controller
        {...props}
        render={({
          field: { onChange, ...restField },
          fieldState: { error },
        }) => {
          return (
            <>
              <HMATextInputMolecule
                {...restField}
                {...props}
                onChangeText={onChange}
                {...textInputProps}
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
  else return <HMATextInputMolecule {...props} {...textInputProps} />;
}
