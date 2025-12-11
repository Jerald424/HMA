import { View } from 'react-native';
import HMAAvatar, { HMAAvatarProps } from '../styled/atoms/avatar';
import HMADivider from '../styled/atoms/divider';
import HMAText from '../styled/atoms/text';

export default function NoData({
  message = 'No Data !',
  avatarProps,
}: {
  message?: string;
  avatarProps?: HMAAvatarProps;
}) {
  return (
    <>
      <HMADivider space={'lg'} />

      <View style={{ alignItems: 'center' }}>
        <HMAAvatar
          size="lg"
          source={require('src/assets/color-icons/out-of-stock.png')}
          {...avatarProps}
        />
        <HMADivider space={'md'} />
        <HMAText size="large">{message}</HMAText>
      </View>
    </>
  );
}
