import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { useNotifications, useUserInfo } from 'src/redux/hooks';
import { cStyle } from 'src/utils/style';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning 👋';
  if (hour < 17) return 'Good afternoon 👋';
  return 'Good evening 👋';
}

export default function Header() {
  const { colors, metrics, spacing } = useTheme();
  const { data } = useUserInfo();
  const navigation = useNavigation();
  const { data: notifications } = useNotifications();

  const name = data?.result?.data?.basic_info?.name ?? '';
  const firstName = name.split(' ')[0] ?? name;

  const unReadNotificationsCount = useMemo(() => {
    try {
      return notifications?.notifications?.filter(item => !item?.read)?.length ?? 0;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }, [notifications]);

  return (
    <View
      style={[
        cStyle.rowAlign,
        {
          paddingHorizontal: spacing.md,
          paddingTop: spacing.md,
          paddingBottom: spacing.sm,
          justifyContent: 'space-between',
        },
      ]}
    >
      {/* Greeting + first name */}
      <View style={{ flex: 1 }}>
        <HMAText color="textSecondary" size="small">
          {getGreeting()}
        </HMAText>
        <HMAText variant="title" size="title" numberOfLines={1}>
          {firstName}
        </HMAText>
      </View>

      {/* Bell with dot badge */}
      <TouchableOpacity
        onPress={() => navigation?.navigate('Notifications')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors?.lightBackground,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {unReadNotificationsCount > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 9,
              height: 9,
              borderRadius: 99,
              backgroundColor: colors.error,
              borderWidth: 1.5,
              borderColor: colors.background,
              zIndex: 99,
            }}
          />
        )}
        <HMAIcon name="bell" />
      </TouchableOpacity>
    </View>
  );
}
