import { useQuery } from '@tanstack/react-query';
import { FlatList } from 'react-native';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import axiosInstance from 'src/services/axiosInstance';

const getResignationList = async () => {
  return axiosInstance.post('/api/employee/resignations/list', {});
};

export default function ResignationListScreen() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ['resignationList'],
    queryFn: getResignationList,
  });

  return (
    <Container>
      <FlatList data={[]} renderItem={() => <SepResignation />} />
    </Container>
  );
}

const SepResignation = () => {
  return <HMACard></HMACard>;
};
