import { FlatList, Image, StatusBar, View } from 'react-native';
import HMAAvatar from 'src/components/styled/atoms/avatar';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAIcon from 'src/components/styled/atoms/icon';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import { cStyle } from 'src/utils/style';
import Header from './header';

export default function Dashboard({ navigation }) {
  const { colors, spacing, metrics } = useTheme();

  return (
    <Container
      padding={0}
      backgroundColor="primary"
      safeAreaViewProps={{
        edges: ['left', 'right'],
      }}
    >
      <Header />
      <View
        style={{
          flex: 3,
          backgroundColor: colors?.lightBackground,
          borderTopEndRadius: metrics?.radius?.lg,
          borderTopStartRadius: metrics?.radius?.lg,
          padding: spacing.lg,
        }}
      >
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ gap: spacing.lg }}
          data={[
            {
              id: '1',
              image: 'map',
              title: 'Entry',
              link: 'Map',
            },
            {
              id: '2',
              image: 'checklist',
              title: 'Attendance list',
              link: 'Map',
            },
          ]}
          renderItem={({ item }) => (
            <HMACard
              onPress={() => navigation.navigate(item?.link)}
              style={[
                {
                  flex: 1,
                  alignItems: 'center',
                  padding: spacing.md,
                  borderRadius: metrics.radius.lg,
                },
              ]}
            >
              <HMAIcon variant="secondary" size="lg" name={item?.image} />
              <HMADivider />
              <HMAText>{item?.title}</HMAText>
            </HMACard>
          )}
        />
      </View>
    </Container>
  );
}
