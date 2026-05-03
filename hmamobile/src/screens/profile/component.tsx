import { ReactNode } from 'react';
import { View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

export default function ProfileCard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors?.background,
        paddingHorizontal: spacing?.md,
      }}
    >
      <HMADivider space={'sm'} />
      <HMAText color="textSecondary">{title}</HMAText>
      <HMADivider space={'xs'} thickness={1} />

      {children}
    </View>
  );
}
