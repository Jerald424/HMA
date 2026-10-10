import { ReactNode, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View
      style={{
        backgroundColor: colors?.background,
        paddingHorizontal: spacing?.md,
      }}
    >
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <HMADivider space={'sm'} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <HMAText color="textSecondary" style={{ flex: 1 }}>
            {title}
          </HMAText>
          <HMAIcon
            name="arrow_down"
            size="xs"
            style={{
              transform: [{ rotate: isOpen ? '0deg' : '180deg' }],
              opacity: 0.8,
            }}
          />
        </View>
        {!isOpen && <HMADivider space={'sm'} />}
      </TouchableOpacity>
      {isOpen && (
        <>
          <HMADivider space={'xs'} thickness={1} />
          {children}
        </>
      )}
    </View>
  );
}
