import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMALoader from 'src/components/styled/atoms/loader';
import HMAText from 'src/components/styled/atoms/text';
import { ITEM_PER_INIT } from 'src/hooks/useEmployee';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { EMPLOYEE_REGISTER_COUNT } from 'src/utils/variables';
import { useLandingContext } from '../landing/context';

export default function RegisterEmployee() {
  const { colors, metrics } = useTheme();
  const { isInitProgress, isPending, onSync, employee } = useLandingContext();
  const EMPLOYEE_LENGTH = employee?.length;

  const [doneCount, setDoneCount] = useState(0);

  const handleSync = () => {
    onSync({ start: doneCount }).then(() => {
      let up = doneCount + ITEM_PER_INIT;
      if (up > EMPLOYEE_LENGTH) {
        up = EMPLOYEE_LENGTH;
      }
      AsyncStorage.setItem(EMPLOYEE_REGISTER_COUNT, JSON.stringify(up));
      setDoneCount(up);
    });
  };

  const handleReset = () => {
    AsyncStorage.setItem(EMPLOYEE_REGISTER_COUNT, JSON.stringify(0));
    setDoneCount(0);
  };

  useEffect(() => {
    const load = async () => {
      let count = await AsyncStorage.getItem(EMPLOYEE_REGISTER_COUNT);
      if (count) {
        try {
          count = JSON.parse(count);
          setDoneCount(count);
        } catch (error) {
          console.error(error);
        }
      }
    };
    load();
  }, []);

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
      <HMAButton title="RESET" onPress={handleReset} />
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
