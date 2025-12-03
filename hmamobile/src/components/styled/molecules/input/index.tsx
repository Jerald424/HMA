import { useTheme } from 'src/hooks/useTheme';
import HMATextInput, { HMATextInputProps } from '../../atoms/input';
import HMAIcon, { HMAIconProps } from '../../atoms/icon';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { useState } from 'react';

export interface HMATextInputMoleculeProps extends HMATextInputProps {
  rightIconProps?: HMAIconProps & { visible?: boolean };
}

export default function HMATextInputMolecule({
  rightIconProps,
  ...props
}: HMATextInputMoleculeProps) {
  const { colors, metrics, spacing } = useTheme();
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <View style={{ position: 'relative', justifyContent: 'center' }}>
      <HMATextInput
        {...props}
        secureTextEntry={props?.secureTextEntry && !isShowPassword}
        style={[
          {
            backgroundColor: colors.lightBackground,
            paddingHorizontal: spacing.sm,
            paddingTop: spacing.md,
            paddingBottom: spacing.md,
            borderRadius: metrics.radius.md,
          },
          props?.style,
        ]}
      />
      {props?.secureTextEntry && (
        <RightIcon
          iconProps={{ name: isShowPassword ? 'eye' : 'eye_crossed' }}
          onPress={() => setIsShowPassword(prev => !prev)}
        />
      )}
      {rightIconProps?.visible && <RightIcon iconProps={rightIconProps} />}
    </View>
  );
}

const RightIcon = ({
  iconProps,
  ...props
}: TouchableOpacityProps & { iconProps: HMAIconProps }) => {
  const { spacing } = useTheme();

  return (
    <TouchableOpacity
      {...props}
      hitSlop={20}
      style={{ position: 'absolute', right: spacing.md }}
    >
      <HMAIcon {...iconProps} />
    </TouchableOpacity>
  );
};
