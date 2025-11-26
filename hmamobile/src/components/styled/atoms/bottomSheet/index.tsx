import { useEffect, useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'src/hooks/useTheme';

type RBSheetProps = {} & React.ComponentProps<typeof RBSheet>;

export default function HMABottomSheet({ ...props }: RBSheetProps) {
  const insets = useSafeAreaInsets();
  const { colors, metrics } = useTheme();

  return (
    <RBSheet
      useNativeDriver={true}
      customModalProps={{
        animationType: 'slide',
        statusBarTranslucent: true,
      }}
      height={300}
      closeOnPressMask={true}
      {...props}
      customStyles={{
        ...props?.customStyles,
        draggableIcon: [
          { backgroundColor: colors?.primary },
          props?.customStyles?.draggableIcon,
        ],
        container: [
          {
            borderTopLeftRadius: metrics.radius.lg,
            borderTopRightRadius: metrics.radius.lg,
            paddingBottom: insets.bottom,
            backgroundColor: colors.background,
          },
          props?.customStyles?.container ?? { height: 'auto', flex: 1 },
        ],
      }}
    />
  );
}
