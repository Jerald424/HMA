import { useImperativeHandle, useRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import useIsKeyboardIsOpened from 'src/hooks/useIsKeyboardIsOpened';
import { useTheme } from 'src/hooks/useTheme';
import HMAText from '../../atoms/text';

export type HMAOtpRefProp = {
  value?: string;
};

interface HMAOtpProps {
  /**
   * @default 6
   */
  count?: number;
  HMAOtpRef?: React.Ref<HMAOtpRefProp>;
  value?: string;
  setValue: any;
}

export default function HMAOtp({
  count = 6,
  HMAOtpRef,
  setValue,
  value,
}: HMAOtpProps) {
  const { spacing, colors, metrics } = useTheme();
  //   const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const isOpened = useIsKeyboardIsOpened();

  useImperativeHandle(HMAOtpRef, () => ({
    value,
  }));

  return (
    <>
      <Pressable
        onPress={() => {
          inputRef.current.blur?.();
          inputRef.current?.focus?.();
        }}
        style={{
          flexDirection: 'row',
          gap: spacing.sm,
          justifyContent: 'center',
        }}
      >
        {Array(count)
          .fill('0')
          .map((_, index) => (
            <View
              key={index}
              style={[
                {
                  height: 40,
                  width: 40,
                  borderWidth: 1,
                  borderColor:
                    value?.length == index && isOpened
                      ? colors.primary
                      : colors.border,
                  borderRadius: metrics.radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <HMAText>{value?.[index]}</HMAText>
            </View>
          ))}
      </Pressable>
      <View style={{ height: 0, width: 0 }}>
        <TextInput
          inputMode="numeric"
          ref={inputRef}
          onChangeText={setValue}
          value={value}
          style={{ height: 0, width: 0 }}
          maxLength={count}
        />
      </View>
    </>
  );
}
