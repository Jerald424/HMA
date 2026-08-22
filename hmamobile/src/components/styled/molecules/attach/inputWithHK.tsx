import { Controller, ControllerProps } from 'react-hook-form';
import HMATextInputMolecule, { HMAAttachMoleculeProps } from '.';
import HMAText from '../../atoms/text';
import HMAAttachMolecule from '.';

export interface HMAAttachHookProps extends Omit<ControllerProps, 'render'> {
  textInputProps?: HMAAttachMoleculeProps;
}

export default function HMAAttachWithHook({
  textInputProps,
  ...props
}: HMAAttachHookProps) {
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
              <HMAAttachMolecule
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
  else return <HMAAttachMolecule {...props} {...textInputProps} />;
}
