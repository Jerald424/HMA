import { TouchableOpacity, View, ViewProps } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import HMAText from '../../atoms/text';

type item = { label: string; value: string };
interface ToggleProps extends ViewProps {
  data: item[];
  selected: item;
  onChange?: (item: item) => void;
}

export default function Toggle({
  data,
  selected,
  onChange,
  ...props
}: ToggleProps) {
  const { colors, spacing, metrics } = useTheme();

  return (
    <View
      {...props}
      style={[
        cStyle.row,
        {
          backgroundColor: colors.lightBackground,
          borderRadius: metrics.radius.sm,
          overflow: 'hidden',
        },
      ]}
    >
      {data?.map(item => {
        const isSelected = item?.value == selected?.value;
        return (
          <TouchableOpacity
            onPress={() => onChange?.(item)}
            key={item?.value}
            style={[
              isSelected && { backgroundColor: colors.primary },
              { padding: spacing.sm, borderRadius: metrics.radius.sm },
            ]}
          >
            <HMAText
              size="small"
              variant="title"
              {...(isSelected && { color: 'background' })}
            >
              {item?.label}
            </HMAText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
