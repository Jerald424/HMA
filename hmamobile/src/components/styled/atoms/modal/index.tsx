import { View, ViewProps } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { useTheme } from 'src/hooks/useTheme';

export interface HMAModalProps extends Partial<ModalProps> {
  containerProps?: ViewProps;
}

export default function HMAModal({ containerProps, ...props }: HMAModalProps) {
  const { colors } = useTheme();
  return (
    <Modal {...props} statusBarTranslucent>
      <View
        {...containerProps}
        style={[{ backgroundColor: colors.background }, containerProps?.style]}
      >
        {props?.children}
      </View>
    </Modal>
  );
}
