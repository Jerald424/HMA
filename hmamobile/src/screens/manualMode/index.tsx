import { FlatList, View } from 'react-native';
import Header from 'src/components/layout/header';
import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import { useTheme } from 'src/hooks/useTheme';
import SeparateEmployee from './seperateEmployee';
import HMADivider from 'src/components/styled/atoms/divider';

export default function ManualMode() {
  const { spacing } = useTheme();
  return (
    <Container padding={0} backgroundColor="background">
      <Header title="Manual" />
      <View style={{ paddingHorizontal: spacing.md, flex: 1 }}>
        <HMATextInputMolecule
          placeholder="Search"
          rightIconProps={{
            visible: true,
            name: 'search',
            variant: 'background',
          }}
        />
        <HMADivider />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={new Array(10).fill(0)}
          renderItem={() => <SeparateEmployee />}
        />
      </View>
    </Container>
  );
}
