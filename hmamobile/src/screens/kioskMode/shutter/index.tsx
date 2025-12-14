import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import HMAIcon, { HMAIconProps } from 'src/components/styled/atoms/icon';
import { iconType } from 'src/components/styled/atoms/icon/icon';
import HMALoader from 'src/components/styled/atoms/loader';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';

export default function Shutter({
  onShutter,
  isLoading,
  setCamera,
  isOn,
  setIsOn,
  ...props
}: {
  onShutter: () => void;
  isLoading: boolean;
  setCamera: any;
  isOn: boolean;
  setIsOn: any;
} & ViewProps) {
  const { colors, spacing } = useTheme();
  return (
    <View {...props} style={[cStyle.rowAlign, props?.style]}>
      <IconWithRound
        disabled={!isOn}
        icon="rotate"
        onPress={() =>
          setCamera((prev: string) => (prev == 'back' ? 'front' : 'back'))
        }
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableOpacity
          disabled={isLoading || !isOn}
          onPress={onShutter}
          style={{
            padding: 2,
            borderWidth: 4,
            borderRadius: 50,
            borderColor: colors.primary,
            opacity: isOn ? 1 : 0.5,
          }}
        >
          <View
            style={[
              {
                height: 60,
                width: 60,
                overflow: 'hidden',
                borderRadius: 50,
              },
            ]}
          >
            {isLoading ? (
              <HMALoader size={'large'} style={{ margin: 'auto' }} />
            ) : (
              <View style={{ backgroundColor: colors.primary, flex: 1 }} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <IconWithRound
        onPress={() => setIsOn((prev: boolean) => !prev)}
        icon="power"
        iconProps={{ variant: isOn ? 'success' : 'error' }}
      />
    </View>
  );
}

export const IconWithRound = ({
  icon,
  iconProps,
  ...props
}: TouchableOpacityProps & {
  icon: iconType;
  iconProps?: Omit<HMAIconProps, 'name'>;
}) => {
  const { colors, spacing } = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          padding: spacing.md,
          backgroundColor: colors.lightBackground,
          borderRadius: 50,
          opacity: props?.disabled ? 0.5 : 1,
        },
        props?.style,
      ]}
    >
      <HMAIcon name={icon} variant="textPrimary" size="xs" {...iconProps} />
    </TouchableOpacity>
  );
};
