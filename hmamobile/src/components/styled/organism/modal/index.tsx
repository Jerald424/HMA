import { View } from 'react-native';
import HMAText, { HMATextProps } from '../../atoms/text';
import HMAModalMolecule, { HMAModalMoleculeProps } from '../../molecules/modal';
import { useTheme } from 'src/hooks/useTheme';
import Avatar, { HMAAvatarProps } from '../../atoms/avatar';

export interface HMAModalOrganismProps extends HMAModalMoleculeProps {
  headingProps?: HMATextProps;
  descriptionProps?: HMATextProps;
  cancelTextProps?: HMATextProps;
  okTextProps?: HMATextProps;
  avatarProps?: {
    position?: 'top' | 'middle';
  } & HMAAvatarProps;
}

export default function HMAModalOrganism({
  headingProps,
  descriptionProps,
  cancelTextProps,
  okTextProps,
  avatarProps,
  ...props
}: HMAModalOrganismProps) {
  const { spacing } = useTheme();

  const AvatarWrap = ({ style }: { style?: HMAAvatarProps['style'] }) =>
    avatarProps?.source ? (
      <Avatar
        style={[{ alignSelf: 'center' }, style]}
        size="lg"
        {...avatarProps}
      />
    ) : (
      <></>
    );

  return (
    <HMAModalMolecule
      {...props}
      borderRadius="md"
      containerProps={{ style: { padding: spacing.lg } }}
    >
      {(avatarProps?.position == 'top' || !!!avatarProps?.position) && (
        <AvatarWrap />
      )}
      {headingProps?.children && (
        <HMAText align="center" size="title" {...headingProps} />
      )}
      {avatarProps?.position == 'middle' && (
        <AvatarWrap style={{ marginTop: spacing.md }} />
      )}
      {descriptionProps?.children && (
        <HMAText
          align="center"
          style={{ marginTop: spacing.md }}
          {...descriptionProps}
        />
      )}
      {(cancelTextProps || okTextProps) && (
        <View style={{ flexDirection: 'row', marginTop: spacing.md }}>
          {cancelTextProps?.children && (
            <HMAText
              style={{ flex: 1, padding: spacing.sm }}
              align="center"
              fontWeight={'600'}
              {...cancelTextProps}
            />
          )}
          {okTextProps?.children && (
            <HMAText
              style={{ flex: 1, padding: spacing.sm }}
              align="center"
              fontWeight={'600'}
              color="success"
              {...okTextProps}
            />
          )}
        </View>
      )}
    </HMAModalMolecule>
  );
}
