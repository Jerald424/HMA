import { View } from 'react-native';
import Header from 'src/components/layout/header';
import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import { useTheme } from 'src/hooks/useTheme';

export default function ManualMode() {
  const { spacing } = useTheme();
  return (
    <Container padding={0} backgroundColor="background">
      <Header title="Manual" />
      <View style={{ paddingHorizontal: spacing.md }}>
        <HMATextInputMolecule
          placeholder="Search"
          rightIconProps={{
            visible: true,
            name: 'search',
            variant: 'background',
          }}
        />
      </View>
    </Container>
  );
}
