import { ScrollView, StatusBar, View } from 'react-native';
import HMAAvatar from 'src/components/styled/atoms/avatar';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
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
