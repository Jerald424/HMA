import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { colors } from 'src/theme/colors';
import { spacing } from 'src/theme/spacing';

export interface HMADividerProps extends ViewProps {
  /**
   * @default border
   */
  color?: keyof typeof colors;
  /**
   * @default horizontal
   */
  variant?: 'horizontal' | 'vertical';
  /**
   * @default 0
   */
  thickness?: 0 | 1 | 2 | 3 | 4;
  /**
   * @default xs
   */
  space?: keyof typeof spacing | 0;
}

export default function HMADivider({
  color = 'border',
  variant = 'horizontal',
  thickness = 0,
  space = 'xs',
  ...props
}: HMADividerProps) {
  const { spacing } = useTheme();

  const thicknessMap = {
    0: 0,
    1: StyleSheet.hairlineWidth,
    2: 2,
    3: 3,
    4: 4,
  }[thickness];

  return (
    <View
      {...props}
      style={[
        variant == 'horizontal'
          ? { height: thicknessMap, marginVertical: space ? spacing[space] : 0 }
          : {
              width: thicknessMap,
              height: '100%',
              marginHorizontal: space ? spacing[space] : 0,
            },
        { backgroundColor: colors?.[color] },
      ]}
    />
  );
}
