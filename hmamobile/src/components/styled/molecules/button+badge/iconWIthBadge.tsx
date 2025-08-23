import { View } from 'react-native';
import HMAIcon, { HMAIconProps } from '../../atoms/icon';
import HMABadge, { HMABadgeProps } from '../../atoms/badge';

interface IconWithBadgeProps extends HMAIconProps {
  badgeProps?: HMABadgeProps;
}

export default function IconWithBadge({
  badgeProps,
  ...props
}: IconWithBadgeProps) {
  return (
    <View style={{ alignItems: 'flex-start' }}>
      <View style={{ position: 'relative' }}>
        <HMAIcon {...props} />
        <HMABadge {...badgeProps} />
      </View>
    </View>
  );
}
