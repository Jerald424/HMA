import { View } from 'react-native';
import HMALoader from '../../atoms/loader';
import HMAModal, { HMAModalProps } from '../../atoms/modal';
import { useTheme } from 'src/hooks/useTheme';

export default function HMAModalLoader(props: HMAModalProps) {
  const { colors, spacing } = useTheme();
  return (
    <HMAModal
      {...props}
      animationIn={'fadeIn'}
      animationInTiming={0}
      containerProps={{ style: { backgroundColor: '#00000000' } }}
    >
      <View
        style={{
          backgroundColor: colors.background,
          alignSelf: 'center',
          padding: spacing.sm,
          borderRadius: 50,
        }}
      >
        <HMALoader size={'large'} />
      </View>
    </HMAModal>
  );
}
