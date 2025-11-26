import isEmpty from 'lodash/isEmpty';
import { useMemo, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import NoData from 'src/components/layout/noData';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { HAIRLINE_WIDTH, SCREEN_HEIGHT } from 'src/utils/variables';
import HMAButton from '../../atoms/button';
import HMACheckBox from '../../atoms/checkbox';
import HMADivider from '../../atoms/divider';
import HMAIcon from '../../atoms/icon';
import HMATextInput from '../../atoms/input';
import HMAText from '../../atoms/text';
import HMATextInputMolecule, { HMATextInputMoleculeProps } from '../input';
import HMAModalMolecule from '../modal';

type optionType = { [key: string]: string };

export interface HMADropdownMoleculeProps
  extends Omit<HMATextInputMoleculeProps, 'value'> {
  options?: optionType[];
  onSelect?: (val: optionType) => void;
  isAdd?: boolean;
  /**@default label */
  optionalLabel?: string;
  /**@default value */

  optionalValue?: string;
  value?: optionType;
  searchTextInputProps?: HMATextInputMoleculeProps;
}

export default function HMADropdownMolecule({
  optionalLabel = 'label',
  optionalValue = 'value',
  options,
  onSelect,
  isAdd,
  value,
  searchTextInputProps,
  ...props
}: HMADropdownMoleculeProps) {
  const { colors, metrics, spacing } = useTheme();
  const bsRef = useRef(null);
  const [val, setVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    try {
      return options?.filter(res => {
        return String(res?.[optionalLabel])
          ?.toLowerCase()
          ?.includes?.(val?.toLowerCase());
      });
    } catch (error) {
      console.error(error);
      return options;
    }
  }, [val, options]);

  const onSelectItem = (item: any) => {
    onSelect?.(item);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={{ position: 'relative', justifyContent: 'center' }}
      >
        <HMATextInput
          {...props}
          value={value?.[optionalLabel]}
          {...props}
          editable={false}
          style={[
            {
              backgroundColor: colors.lightBackground,
              paddingHorizontal: spacing.sm,
              paddingTop: spacing.md,
              paddingBottom: spacing.md,
              borderRadius: metrics.radius.md,
              // pointerEvents: 'none',
            },
          ]}
        />
        <View style={{ position: 'absolute', right: spacing.md }}>
          <HMAIcon name={'arrow_down'} />
        </View>
      </TouchableOpacity>
      <HMAModalMolecule isVisible={isOpen}>
        <View style={{ height: SCREEN_HEIGHT / 1.5, padding: spacing.md }}>
          <HMATextInputMolecule
            {...searchTextInputProps}
            value={val}
            onChangeText={setVal}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredOptions?.map(item => (
              <SeparateOption
                onSelectItem={onSelectItem}
                optionalLabel={optionalLabel}
                optionalValue={optionalValue}
                item={item}
                key={item?.[optionalValue]}
                value={value}
              />
            ))}
            {val && (
              <SeparateOption
                onSelectItem={onSelectItem}
                isAdd
                optionalLabel={optionalLabel}
                optionalValue={optionalValue}
                item={{
                  label: val,
                  value: val,
                }}
                value={value}
              />
            )}
            {isEmpty(options) && !val && <NoData />}
          </ScrollView>
          <HMAButton title="CLOSE" onPress={() => setIsOpen(false)} />
        </View>
      </HMAModalMolecule>
    </>
  );
}

const SeparateOption = ({
  item,
  optionalValue,
  optionalLabel,
  value,
  isAdd,
  onSelectItem,
}: {
  item: any;
  optionalValue: string;
  optionalLabel: string;
  value?: optionType;
  isAdd?: boolean;
  onSelectItem: (item: optionType) => void;
}) => {
  const { spacing, colors, metrics } = useTheme();
  return (
    <>
      <TouchableOpacity
        onPress={() => onSelectItem(item)}
        style={[
          {
            padding: spacing.md,
            borderWidth: HAIRLINE_WIDTH,
            borderColor: colors?.lightBackground,
            borderRadius: metrics.radius.md,
          },
          cStyle.rowAlign,
        ]}
      >
        <HMACheckBox
          isRadio
          value={item?.[optionalValue] == value?.[optionalValue]}
        />
        <HMADivider variant="vertical" space={'sm'} />
        <View style={{ flex: 1 }}>
          <HMAText>{item?.[optionalLabel]}</HMAText>
          {isAdd && (
            <HMAText size="small" color="textSecondary">
              Add manually
            </HMAText>
          )}
        </View>
      </TouchableOpacity>
      <HMADivider space={'sm'} />
    </>
  );
};
