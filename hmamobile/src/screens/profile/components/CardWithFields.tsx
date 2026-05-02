import { View } from 'react-native';
import ProfileCard from '../component';
import { cStyle } from 'src/utils/style';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

interface CardWithFieldsType {
  title: string;
  data: { label: string; value: string }[];
}

export default function CardWithFields({ data, title }: CardWithFieldsType) {
  const { colors, spacing } = useTheme();

  return (
    <ProfileCard title={title}>
      {data?.map(item => (
        <View
          key={item?.label}
          style={[cStyle.row, { marginBottom: spacing.sm }]}
        >
          <HMAText style={{ flex: 1 }} size="small">
            {item?.label}
          </HMAText>
          <HMAText style={{ flex: 1 }} size="small" variant="large">
            {item?.value || '_'}
          </HMAText>
        </View>
      ))}
    </ProfileCard>
  );
}
