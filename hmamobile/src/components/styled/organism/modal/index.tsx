import { View } from 'react-native';
import HMAText, { HMATextProps } from '../../atoms/text';
import HMAModalMolecule, { HMAModalMoleculeProps } from '../../molecules/modal';
import { useTheme } from 'src/hooks/useTheme';
import Avatar, { AvatarProps } from '../../atoms/avatar';

export interface HMAModalOrganismProps extends HMAModalMoleculeProps {
  headingProps?: HMATextProps;
  descriptionProps?: HMATextProps;
  cancelTextProps?: HMATextProps;
  okTextProps?: HMATextProps;
  avatarProps?: {
    position?: 'top' | 'middle';
  } & AvatarProps;
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

  const Avatar = () =>
    avatarProps?.source ? (
      <Avatar
        style={{ alignSelf: 'center', marginTop: spacing.md }}
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
        <Avatar />
      )}
      {headingProps?.children && (
        <HMAText align="center" size="title" {...headingProps} />
      )}
      {avatarProps?.position == 'middle' && <Avatar />}
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
