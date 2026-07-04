import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import HMAIcon from '../styled/atoms/icon';
import HMAText from '../styled/atoms/text';
import HMADivider from '../styled/atoms/divider';

const HeaderWithBackIcon = ({
  title,
  onPressBack,
}: {
  title: string;
  onPressBack?: () => void;
}) => {
  const { spacing } = useTheme();

  return (
    <View style={[{ padding: spacing.md, flexDirection: 'row' }]}>
      {onPressBack && (
        <TouchableOpacity onPress={onPressBack} hitSlop={20}>
          <HMAIcon
            name="arrow_down"
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        </TouchableOpacity>
      )}
      <HMADivider variant="vertical" space={'md'} />
      <HMAText variant="title" size="large">
        {title}
      </HMAText>
    </View>
  );
};

export default HeaderWithBackIcon;
