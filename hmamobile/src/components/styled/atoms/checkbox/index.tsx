import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';

interface HMACheckBoxProps extends TouchableOpacityProps {
  value?: boolean;
  onChange?: (val: boolean) => void;
}

export default function HMACheckBox(props: HMACheckBoxProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => props?.onChange?.(!props?.value)}
      style={[
        props?.style,
        cStyle.rowJustify,
        style.designed,
        { borderColor: colors.primary },
        props?.value ? { backgroundColor: colors.primary } : { borderWidth: 2 },
      ]}
    >
      {props?.value && (
        <Image
          source={require('src/assets/icons/check.png')}
          style={{ height: 10, width: 10, tintColor: colors.background }}
        />
      )}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  designed: {
    height: 20,
    width: 20,
    borderRadius: 2,
  },
});
