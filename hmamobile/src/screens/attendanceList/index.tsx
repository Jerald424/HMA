import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { FlatList } from 'react-native';
import NoData from 'src/components/layout/noData';
import Container from 'src/components/styled/atoms/container';
import Filter from './filter';
import FooterLoader from './footerLoader';
import SeparateItem from './seperateItem';
import useAttendanceList from './useAttendanceList';

export const initialAttendanceFilter = {
  project_id: null,
  date: '',
};
const AttendanceListContext = createContext({
  filters: initialAttendanceFilter,
  setFilters: (() => {}) as Dispatch<
    SetStateAction<typeof initialAttendanceFilter>
  >,
});
export const useAttendanceListContext = () => useContext(AttendanceListContext);

export default function AttendanceList() {
  const { onEndReach, list, isLoading, filters, setFilters } =
    useAttendanceList();
  return (
    <AttendanceListContext value={{ filters, setFilters }}>
      <Container padding={0} safeAreaViewProps={{ edges: ['left', 'right'] }}>
        <FlatList
          ListFooterComponent={isLoading ? <FooterLoader /> : <></>}
          data={list}
          ListEmptyComponent={isLoading ? <></> : <NoData />}
          renderItem={({ item }) => <SeparateItem item={item} />}
          onEndReached={() => onEndReach()}
          onEndReachedThreshold={0.5}
        />
        <Filter />
      </Container>
    </AttendanceListContext>
  );
}
