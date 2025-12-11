import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Pressable,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useAppContext } from 'src/App';
import NoData from 'src/components/layout/noData';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMALoader from 'src/components/styled/atoms/loader';
import HMAText from 'src/components/styled/atoms/text';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import HMAModalOrganism from 'src/components/styled/organism/modal';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import { EMPLOYEE_REGISTER_COUNT } from 'src/utils/variables';
import { useLandingContext } from '../landing/context';
import List from './list';

export default function RegisterEmployee() {
  const {
    isInitProgress,
    isPending,
    onSync,
    employee,
    itemPerInit,
    setItemPerInit,
  } = useLandingContext();
  const { isConnected } = useAppContext();
  const EMPLOYEE_LENGTH = employee?.length;
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [doneCount, setDoneCount] = useState(0);

  const handleSync = () => {
    onSync({ start: doneCount }).then(() => {
      let up = doneCount + itemPerInit;
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

  if (!isConnected)
    return (
      <Container>
        <NoData
          message="No internet connection.."
          avatarProps={{
            source: require('src/assets/color-icons/wifi-slash.png'),
          }}
        />
      </Container>
    );
  return (
    <Container>
      <BigRoundButton
        onPress={handleSync}
        isLoading={isPending || isInitProgress}
        title={`${doneCount} / ${employee?.length || 0}\n Init`}
      />
      <HMADivider space={'md'} />
      <Pressable onLongPress={() => setIsOpenEdit(true)}>
        <HMAText align="center">
          You can initialize up to {itemPerInit} employees per request
        </HMAText>
      </Pressable>
      <HMADivider />
      <HMAText
        align="center"
        onPress={handleReset}
        color="error"
        style={{ textDecorationLine: 'underline' }}
      >
        Click here to reset
      </HMAText>
      <HMADivider />

      <List />
      <HMAModalOrganism
        isVisible={isOpenEdit}
        headingProps={{ children: 'Edit item count' }}
      >
        <HMATextInputMolecule
          value={String(itemPerInit)}
          onChangeText={val => setItemPerInit(+val)}
        />
        <HMADivider space={'sm'} />
        <HMAButton title="Ok" onPress={() => setIsOpenEdit(false)} />
      </HMAModalOrganism>
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
