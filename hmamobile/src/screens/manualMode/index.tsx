import Header from 'src/components/layout/header';
import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';

export default function ManualMode() {
  const { spacing } = useTheme();
  return (
    <Container padding={0}>
      <Header title="Manual" />
    </Container>
  );
}
