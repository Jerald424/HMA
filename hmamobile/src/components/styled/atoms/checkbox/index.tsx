import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';

interface HMACheckBoxProps extends TouchableOpacityProps {
  value?: boolean;
  onChange?: (val: boolean) => void;
  isRadio?: boolean;
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
        {
          borderColor: colors.primary,
          borderRadius: props?.isRadio ? 50 : 2,
        },
        props?.isRadio
          ? { borderWidth: 2, padding: 3 }
          : [
              props?.value
                ? { backgroundColor: colors.primary }
                : { borderWidth: 2 },
            ],
      ]}
    >
      {props?.value &&
        (props?.isRadio ? (
          <View
            style={{
              backgroundColor: colors.primary,
              height: '100%',
              width: '100%',
              borderRadius: 50,
            }}
          />
        ) : (
          <Image
            source={require('src/assets/icons/check.png')}
            style={{ height: 10, width: 10, tintColor: colors.background }}
          />
        ))}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  designed: {
    height: 20,
    width: 20,
  },
});
