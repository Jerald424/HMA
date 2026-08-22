import {
  Alert,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { blendWithWhite } from 'src/function/colorCorrection';
import { useTheme } from 'src/hooks/useTheme';
import { typography } from 'src/theme/typography';
import fonts from 'src/utils/fonts';
import { DocumentPickerResponse, pick } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import HMAIcon from '../icon';

export interface HMATextInputProps extends TextInputProps {
  /**
   * @default 'regular'
   */
  fontSize?: keyof typeof typography;
}

export default function HMATextInput({
  fontSize = 'regular',
  ...props
}: HMATextInputProps) {
  const { colors, typography } = useTheme();
  const fontFamily = fonts[fontSize];
  const fontMapping = typography?.[fontSize];

  const handleUpload = async () => {
    try {
      const result = await pick();
      const base64Data = await RNFS.readFile(result?.[0].uri, 'base64');
      console.log('base64Data: ', base64Data);
      props?.onChangeText?.(base64Data);
    } catch (error) {
      console.log('ERROR WHILE PICK: ', error);
    }
  };
  return (
    <TouchableOpacity onPress={handleUpload} style={{ position: 'relative' }}>
      <TextInput
        readOnly
        placeholderTextColor={blendWithWhite(colors.textSecondary, 0.6)}
        {...props}
        value={props?.value && '1 file selected'}
        allowFontScaling={false}
        style={[
          {
            color: colors.textSecondary,
            fontSize: fontMapping?.fontSize,
            fontFamily,
          },
          props?.style,
        ]}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          right: 10,
          bottom: 0,
          justifyContent: 'center',
        }}
      >
        <HMAIcon name="clip" size="xs" />
      </View>
    </TouchableOpacity>
  );
}
