import { useNavigation } from '@react-navigation/native';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import { iconType } from 'src/components/styled/atoms/icon/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { colorTypes } from 'src/theme/colors';
import { cStyle } from 'src/utils/style';
import { HAIRLINE_WIDTH } from 'src/utils/variables';
import { withOpacity } from 'src/utils/withOpacity';

export default function ProfileEdit() {
  const { metrics, colors, spacing } = useTheme();

  const data = [
    {
      title: 'Personal',
      key: 'Personal Edit',
      description: 'Phone, Mobile, DOB',
      icon: 'user_outline' as iconType,
      color: 'textSecondary' as keyof colorTypes,
    },

    {
      title: 'Bank',
      key: 'Bank Edit',
      description: 'Add/edit your bank details',
      icon: 'bank' as iconType,
      color: 'primary' as keyof colorTypes,
    },
  ];

  return (
    <Container>
      <FlatList
        style={{ borderRadius: metrics.radius.md }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          borderRadius: metrics.radius.md,
          borderWidth: HAIRLINE_WIDTH,
          borderColor: colors.border,
        }}
        data={data}
        renderItem={({ item }) => <SepExp item={item} />}
        ItemSeparatorComponent={() => <HMADivider thickness={1} />}
      />
    </Container>
  );
}

const SepExp = ({ item }: { item: any }) => {
  const { metrics, colors, spacing } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(item?.key)}
      style={[cStyle.rowAlign, { padding: spacing.sm }]}
    >
      <View
        style={[
          {
            height: 40,
            width: 40,
            backgroundColor: withOpacity(colors[item?.color], 0.2),
            borderRadius: metrics?.radius.md,
          },
          cStyle.rowJustify,
        ]}
      >
        <HMAIcon name={item?.icon} variant={item?.color} />
      </View>
      <HMADivider variant="vertical" space={'sm'} />
      <View style={{ flex: 1 }}>
        <HMAText variant="large">{item?.title}</HMAText>
        <HMAText size="small" color="textSecondary">
          {item.description}
        </HMAText>
      </View>
      <HMADivider variant="vertical" space={'sm'} />
      <HMAIcon
        name="arrow_down"
        style={{ transform: [{ rotate: '-90deg' }] }}
      />
    </TouchableOpacity>
  );
};
