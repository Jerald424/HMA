import { Controller, ControllerProps } from 'react-hook-form';
import HMADropdownMolecule, { HMADropdownMoleculeProps } from '.';
import HMAText from '../../atoms/text';

export interface HMADropdownHookProps extends Omit<ControllerProps, 'render'> {
  dropdownProps?: HMADropdownMoleculeProps;
}

export default function HMADropdownWithHook({
  dropdownProps,
  ...props
}: HMADropdownHookProps) {
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
              <HMADropdownMolecule
                {...restField}
                {...props}
                onSelect={onChange}
                {...dropdownProps}
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
  else return <HMADropdownMolecule {...props} {...dropdownProps} />;
}
