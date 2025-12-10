import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMALoader from 'src/components/styled/atoms/loader';
import HMAText from 'src/components/styled/atoms/text';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import { ITEM_PER_INIT } from 'src/hooks/useEmployee';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { useLandingContext } from '../landing/context';
import { useState } from 'react';
import HMADivider from 'src/components/styled/atoms/divider';

export default function RegisterEmployee() {
  const { colors, metrics } = useTheme();
  const { isInitProgress, isPending, onSync, employee } = useLandingContext();

  const [doneCount, setDoneCount] = useState(0);

  const handleSync = () => {
    onSync({ start: doneCount }).then(() => {
      setDoneCount(prev => {
        const up = prev + ITEM_PER_INIT;
        if (up > employee?.length) return 0;
        else up;
      });
    });
  };

  return (
    <Container>
      <BigRoundButton
        onPress={handleSync}
        isLoading={isPending || isInitProgress}
        title={`${doneCount} / ${employee?.length || 0}\n Init`}
      />
      <HMADivider space={'md'} />
      <HMAText align="center">
        You can initialize up to {ITEM_PER_INIT} employees per request
      </HMAText>
      <HMADivider space={'md'} />
    </Container>
  );
}

export const BigRoundButton = ({
  title,
  isLoading,
  ...props
}: { title: string; isLoading?: boolean } & TouchableOpacityProps) => {
  const { colors, metrics } = useTheme();

  return (
    <TouchableOpacity
      disabled={isLoading}
      {...props}
      style={[
        {
          height: 150,
          width: 150,
          borderRadius: 150,
          borderWidth: 2,
          borderColor: colors.primary,
          backgroundColor: colors.lightBackground,
        },
        metrics.shadow,
        cStyle.rowJustify,
        {
          shadowColor: colors.primary,
          marginHorizontal: 'auto',
        },
      ]}
    >
      {isLoading ? (
        <HMALoader size={'large'} />
      ) : (
        <HMAText align="center" size="title" color="primary">
          {title}
        </HMAText>
      )}
    </TouchableOpacity>
  );
};
