import { ScrollView } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import { useTheme } from 'src/hooks/useTheme';
import CardWithFields from './components/CardWithFields';
import Header from './header';
import Login from './login';
import useProfile from './useProfile';
import Bank from './bank';

export default function Profile() {
  const { isPending, profileData } = useProfile();
  const { colors, spacing } = useTheme();
  return (
    <Container
      safeAreaViewProps={{ edges: ['left', 'top', 'right'] }}
      backgroundColor="background"
      padding={0}
    >
      <ScrollView style={{ flex: 1, backgroundColor: colors?.lightBackground }}>
        <Header profile={profileData} />
        <HMADivider />
        <CardWithFields
          title="Personal"
          data={[
            {
              label: 'Company',
              value: profileData?.profile?.personal?.fields?.country_of_birth,
            },
            {
              label: 'DOB',
              value: profileData?.profile?.personal?.fields?.date_of_birth,
            },
            {
              label: 'Phone',
              value: profileData?.profile?.personal?.fields?.phone,
            },
          ]}
        />
        <HMADivider />
        <CardWithFields
          title="Contact"
          data={[
            {
              label: 'Mobile',
              value: profileData?.profile?.contact?.fields?.mobile_phone,
            },
            {
              label: 'Work Email',
              value: profileData?.profile?.contact?.fields?.work_email,
            },
            {
              label: 'Work Location',
              value: profileData?.profile?.contact?.fields?.work_location,
            },
            {
              label: 'Work Phone',
              value: profileData?.profile?.contact?.fields?.work_phone,
            },
          ]}
        />
        <HMADivider />

        <CardWithFields
          title="Company"
          data={[
            {
              label: 'Company Name',
              value: profileData?.profile?.company?.fields?.company_name,
            },
            {
              label: 'Phone',
              value: profileData?.profile?.company?.fields?.company_phone,
            },
            {
              label: 'Email',
              value: profileData?.profile?.company?.fields?.company_email,
            },
            {
              label: 'Website',
              value: profileData?.profile?.company?.fields?.company_website,
            },
          ]}
        />
        <HMADivider />
        <Bank bank={profileData?.profile?.bank} />
        {/* <Personal /> */}
        <HMADivider />
        <Login />
      </ScrollView>
      <HMAModalLoader isVisible={isPending} />
    </Container>
  );
}
