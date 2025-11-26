import { ScrollView } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import { useTheme } from 'src/hooks/useTheme';
import Header from './header';
import Login from './login';
import Offices from './offices';

export default function Profile() {
  const { colors, spacing } = useTheme();
  return (
    <Container
      safeAreaViewProps={{ edges: ['left', 'top', 'right'] }}
      backgroundColor="background"
      padding={0}
    >
      <ScrollView style={{ flex: 1, backgroundColor: colors?.lightBackground }}>
        <Header />
        <HMADivider />
        <Offices />
        <HMADivider />
        <Login />
      </ScrollView>
    </Container>
  );
}
