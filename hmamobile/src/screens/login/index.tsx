import Container from 'src/components/styled/atoms/container';
import HMAText from 'src/components/styled/atoms/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import { SCREEN_WIDTH } from 'src/utils/variables';
import { loginStyle } from './style';
import { cStyle } from 'src/utils/style';
import HMATextInputMolecule from 'src/components/styled/molecules/input';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAButton from 'src/components/styled/atoms/button';

export default function Login({navigation}) {
  const { colors, spacing, metrics } = useTheme();
  return (
    <Container
      padding={0}
      backgroundColor="primary"
      safeAreaViewProps={{ edges: ['left', 'right'] }}
    >
      <View style={[{ flex: 1.2 }, cStyle.rowJustify]}>
        <HMAText color="background" size="title">
          BRAND NAME
        </HMAText>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: colors?.background,
          borderTopEndRadius: metrics?.radius?.lg,
          borderTopStartRadius: metrics?.radius?.lg,
          padding: spacing.lg,
        }}
      >
        <View
          style={[
            loginStyle.absView,
            {
              backgroundColor: colors.background,
              width: SCREEN_WIDTH - spacing.md * 2,
              borderRadius: metrics?.radius?.lg,
            },
          ]}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
        <HMAText size="large" align="center">
          Enter Credential To Login
        </HMAText>
        <HMADivider space={'md'} />
        <HMATextInputMolecule placeholder="Enter Url" />
        <HMADivider space="sm" />

        <HMATextInputMolecule placeholder="Enter Username" />
        <HMADivider space="sm" />

        <HMATextInputMolecule placeholder="Enter Password" />
        <HMADivider space="sm" />
        <HMAButton title="Login" onPress={()=>navigation.navigate("auth", {
          screen:"Dashboard"
        })} />
          </ScrollView>
      </View>
    </Container>
  );
}
