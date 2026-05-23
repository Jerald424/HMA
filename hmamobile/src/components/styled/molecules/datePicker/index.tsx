import { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { jsDateToDDMMYYYY } from 'src/function/dateConversion';
import { useTheme } from 'src/hooks/useTheme';
import HMADatePicker, { HMADatePickerProps } from '../../atoms/datePicker';
import HMAIcon from '../../atoms/icon';
import HMATextInput from '../../atoms/input';
import { blendWithWhite } from 'src/function/colorCorrection';

export interface HMADatePickerMoleculeProps extends HMADatePickerProps {
  label?: string;
}

export default function HMADatePickerMolecule({
  label = 'Please select date',
  ...props
}: HMADatePickerMoleculeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { colors, metrics, spacing } = useTheme();

  const dateStr = useMemo(() => {
    try {
      if (!props?.date) return label;
      else return jsDateToDDMMYYYY(props?.date);
    } catch (error) {}
  }, [props?.date, label]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={{ position: 'relative', justifyContent: 'center' }}
      >
        <HMATextInput
          value={dateStr}
          {...props}
          editable={false}
          style={[
            {
              backgroundColor: colors.lightBackground,
              paddingHorizontal: spacing.sm,
              paddingTop: spacing.md,
              paddingBottom: spacing.md,
              borderRadius: metrics.radius.md,
              color: props?.date
                ? colors.textSecondary
                : blendWithWhite(colors.textSecondary, 0.5),
              // pointerEvents: 'none',
            },
          ]}
        />
        <View style={{ position: 'absolute', right: spacing.md }}>
          <HMAIcon name={'arrow_down'} />
        </View>
      </TouchableOpacity>
      <HMADatePicker
        open={isOpen}
        {...props}
        date={props?.date || new Date()}
        onCancel={() => {
          setIsOpen(false);
        }}
        onConfirm={date => {
          props?.onConfirm?.(date);
          setIsOpen(false);
        }}
      />
    </>
  );
}
