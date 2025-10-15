import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAForm, { formDataProps } from 'src/components/styled/organism/form';
import { useAppDispatch } from 'src/redux/hooks';
import { updateAuthSlice, updateOffice } from 'src/redux/slices/auth/slice';

export default function AddGeofence() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      lat: String(13.055663), // 🔹 your geofence center
      long: String(80.253559),
      radius: String(200.0), // in meters
      id: 'VICTORIA MENS PG',
      name: 'VICTORIA MENS PG',
    },
  });
  const dispatch = useAppDispatch();
  const formData: formDataProps = [
    {
      inputType: 'input-box',
      name: 'id',
      textInputProps: { placeholder: 'Enter id' },
    },
    {
      inputType: 'input-box',
      name: 'lat',
      textInputProps: {
        placeholder: 'Enter lat',
      },
    },
    {
      inputType: 'input-box',
      name: 'long',
      textInputProps: {
        placeholder: 'Enter long',
      },
    },
    {
      inputType: 'input-box',
      name: 'name',
      textInputProps: {
        placeholder: 'Enter name',
      },
    },
    {
      inputType: 'input-box',
      name: 'radius',
      textInputProps: {
        placeholder: 'Enter radius',
      },
    },
  ];
  return (
    <Container backgroundColor="background">
      <ScrollView>
        <HMAForm data={formData} control={control} />
        <HMADivider />
        <HMAButton
          onPress={handleSubmit(data => dispatch(updateOffice(data)))}
          title="SUBMIT"
        ></HMAButton>
      </ScrollView>
    </Container>
  );
}
