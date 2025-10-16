import { View } from 'react-native';
import HMAAvatar from '../styled/atoms/avatar';
import HMADivider from '../styled/atoms/divider';
import HMAText from '../styled/atoms/text';

export default function NoData() {
  return (
    <>
      <HMADivider space={'lg'} />

      <View style={{ alignItems: 'center' }}>
        <HMAAvatar
          size="lg"
          source={require('src/assets/color-icons/out-of-stock.png')}
        />
        <HMADivider space={'md'} />
        <HMAText size="large">No Data !</HMAText>
      </View>
    </>
  );
}
