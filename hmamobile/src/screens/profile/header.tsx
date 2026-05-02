import { View } from 'react-native';
import HMAAvatar from 'src/components/styled/atoms/avatar';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useAuth, useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function Header({ profile }: { profile?: any }) {
  const { colors, spacing } = useTheme();
  const { data } = useUserInfo();
  const { baseurl } = useAuth();
  const img_url = profile?.profile?.contact?.fields?.image_url;
  return (
    <View style={{ padding: spacing?.md, backgroundColor: colors?.background }}>
      <HMAText size="title">Profile</HMAText>
      <HMADivider space={'sm'} />
      <View style={[cStyle.rowAlign]}>
        <HMAAvatar
          size="md"
          source={
            !!img_url
              ? {
                  uri: `${baseurl}${profile?.profile?.contact?.fields?.image_url}`,
                }
              : require('src/assets/icons/profile-user.png')
          }
        />
        <View
          style={{
            flex: 1,
            marginLeft: spacing?.md,
          }}
        >
          <HMAText size="large">
            {data?.result?.data?.basic_info?.name || '-'}
          </HMAText>
          <HMADivider />
          <HMAText size="regular" color="textSecondary">
            {data?.result?.data?.basic_info?.work_email || '-'}
          </HMAText>
        </View>
      </View>
    </View>
  );
}
