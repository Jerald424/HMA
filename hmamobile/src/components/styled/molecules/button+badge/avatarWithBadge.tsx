import { View } from 'react-native';
import HMAAvatar, { HMAAvatarProps } from '../../atoms/avatar';
import HMABadge, { HMABadgeProps } from '../../atoms/badge';

interface IconWithBadgeProps extends HMAAvatarProps {
  badgeProps?: HMABadgeProps;
}

export default function AvatarWithBadge({
  badgeProps,
  ...props
}: IconWithBadgeProps) {
  return (
    <View style={{ alignItems: 'flex-start' }}>
      <View style={{ position: 'relative' }}>
        <HMAAvatar {...props} />
        <HMABadge {...badgeProps} />
      </View>
    </View>
  );
}
