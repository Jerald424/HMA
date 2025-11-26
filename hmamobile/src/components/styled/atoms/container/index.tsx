import { ViewProps, View } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { useTheme } from 'src/hooks/useTheme';
import { colors } from 'src/theme/colors';
import { spacing } from 'src/theme/spacing';

interface ContainerProps extends ViewProps {
  padding?: keyof typeof spacing | 0;
  backgroundColor?: keyof typeof colors;
  safeAreaViewProps?: SafeAreaViewProps;
}

export default function Container({
  padding = 'md',
  backgroundColor = 'lightBackground',
  safeAreaViewProps,
  ...props
}: ContainerProps) {
  const { spacing, colors } = useTheme();
  return (
    <View
      {...props}
      style={[
        {
          padding: padding == 0 ? padding : spacing[padding],
          backgroundColor: colors[backgroundColor],
          flex: 1,
        },
        props?.style,
      ]}
    >
      <SafeAreaView
        {...safeAreaViewProps}
        style={[{ flex: 1 ,}, safeAreaViewProps?.style]}
      >
        {props?.children}
      </SafeAreaView>
    </View>
  );
}
