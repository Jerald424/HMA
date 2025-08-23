import { View } from 'react-native';
import HMABadge, { HMABadgeProps } from '../../atoms/badge';
import HMAButton, { HMAButtonProps } from '../../atoms/button';

interface ButtonWithBadgeProps extends HMAButtonProps {
  badgeProps?: HMABadgeProps;
}

export default function ButtonWithBadge({
  badgeProps,
  ...props
}: ButtonWithBadgeProps) {
  return (
    <View style={{ position: 'relative' }}>
      <HMAButton {...props} />
      <HMABadge {...badgeProps} />
    </View>
  );
}
