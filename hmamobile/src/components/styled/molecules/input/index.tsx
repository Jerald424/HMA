import { useTheme } from 'src/hooks/useTheme';
import HMATextInput, { HMATextInputProps } from '../../atoms/input';
import HMAIcon from '../../atoms/icon';
import { TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import HMAText from '../../atoms/text';

export interface HMATextInputMoleculeProps extends HMATextInputProps {
  note?: string;
  /**
   * @default true
   */
  isPlaceholderAsLabel?: boolean;
  label?: string;
}

export default function HMATextInputMolecule({
  isPlaceholderAsLabel = true,
  label,
  ...props
}: HMATextInputMoleculeProps) {
  const { colors, metrics, spacing } = useTheme();
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <View style={{ position: 'relative', justifyContent: 'center' }}>
      {((isPlaceholderAsLabel && !!props?.placeholder) || label) && (
        <HMAText color="textSecondary" variant="large">
          {label ?? props?.placeholder}
        </HMAText>
      )}
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
      {props?.note && (
        <HMAText size="small" color="textSecondary">
          {props?.note}
        </HMAText>
      )}
      {props?.secureTextEntry && (
        <TouchableOpacity
          hitSlop={20}
          onPress={() => setIsShowPassword(prev => !prev)}
          style={{ position: 'absolute', right: spacing.md, top: 40 }}
        >
          {/* <HMAIcon name={isShowPassword ? 'eye' : 'eye_crossed'} /> */}
          <HMAText>{isShowPassword ? 'Hide' : 'Show'}</HMAText>
        </TouchableOpacity>
      )}
    </View>
  );
}
