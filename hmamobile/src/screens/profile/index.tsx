import { ScrollView, TouchableOpacity } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import { useTheme } from 'src/hooks/useTheme';
import CardWithFields from './components/CardWithFields';
import Header from './header';
import Login from './login';
import useProfile from './useProfile';
import Bank from './bank';
import HMAText from 'src/components/styled/atoms/text';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Profile({ navigation }) {
  const { isLoading, profileData, fetchProfile } = useProfile();
  const { colors, spacing } = useTheme();

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, []),
  );

  return (
    <Container isSafeArea backgroundColor="background" padding={0}>
      <ScrollView style={{ flex: 1, backgroundColor: colors?.lightBackground }}>
        <Header profile={profileData} />
        <HMADivider />
        <TouchableOpacity
          onPress={() => navigation?.navigate('Profile Edit')}
          hitSlop={10}
          style={{ alignSelf: 'flex-end', marginRight: spacing.md }}
        >
          <HMAText
            style={{ textDecorationLine: 'underline' }}
            variant="title"
            color="textSecondary"
          >
            Edit Profile
          </HMAText>
        </TouchableOpacity>
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

        <CardWithFields
          title="Contract"
          data={[
            {
              label: 'Name',
              value: profileData?.profile?.contract?.data?.company_phone,
            },
            {
              label: 'Date',
              value: `${
                profileData?.profile?.contract?.data?.date_start || '_'
              } to ${profileData?.profile?.contract?.data?.date_end || '_'}`,
            },
            {
              label: 'Job Position',
              value: profileData?.profile?.contract?.data?.job_position,
            },
            {
              label: 'Working Schedule',
              value: profileData?.profile?.contract?.data?.working_schedule,
            },
          ]}
        />
        <HMADivider />
        <CardWithFields
          title="Job"
          data={[
            {
              label: 'Department',
              value: profileData?.profile?.job?.fields?.department,
            },
            {
              label: 'Coach',
              value: profileData?.profile?.job?.fields?.coach,
            },
            {
              label: 'Manager',
              value: profileData?.profile?.job?.fields?.manager,
            },
          ]}
        />
        <HMADivider />
        <Bank bank={profileData?.profile?.bank} />
        {/* <Personal /> */}
        <HMADivider />
        <Login />
      </ScrollView>
      <HMAModalLoader isVisible={isLoading} />
    </Container>
  );
}
