import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useNotifications, useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

export default function Header() {
  const { colors, metrics, spacing } = useTheme();
  const { data } = useUserInfo();
  const navigation = useNavigation();
  const { data: notifications } = useNotifications();

  const unReadNotificationsCount = useMemo(() => {
    try {
      return notifications?.notifications?.filter(item => !item?.read)?.length;
    } catch (error) {
      console.error(error);
    }
  }, [notifications]);

  return (
    <View style={[cStyle.rowAlign, { padding: spacing.md }]}>
      <View style={{ width: 30 }} />
      <HMAText style={{ flex: 1 }} variant="title" size="title" align="center">
        Hi, {data?.result?.data?.basic_info?.name}
      </HMAText>
      <View style={{ width: 30 }}>
        <TouchableOpacity
          onPress={() => navigation?.navigate('Notifications')}
          style={{ position: 'relative' }}
        >
          {unReadNotificationsCount > 0 && (
            <HMAText
              color="background"
              style={{
                position: 'absolute',
                top: -10,
                right: -4,
                backgroundColor: colors.error,
                paddingHorizontal: 5,
                borderRadius: 50,
                zIndex: 99,
              }}
            >
              {unReadNotificationsCount}
            </HMAText>
          )}
          <HMAIcon name="bell" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
