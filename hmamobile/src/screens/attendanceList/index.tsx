import Container from 'src/components/styled/atoms/container';
import useAttendanceList from './useAttendanceList';
import { FlatList, View } from 'react-native';
import HMAText from 'src/components/styled/atoms/text';
import HMADivider from 'src/components/styled/atoms/divider';
import HMALoader from 'src/components/styled/atoms/loader';
import HMACard from 'src/components/styled/atoms/card';
import { useTheme } from 'src/hooks/useTheme';
import HMABadge from 'src/components/styled/atoms/badge';
import { cStyle } from 'src/utils/style';
import FooterLoader from './footerLoader';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
} from 'react';
import { convertUserTimeZone, formateDate } from 'src/function/dateConversion';
import NoData from 'src/components/layout/noData';
import { useUserInfo } from 'src/redux/hooks';
import Filter from './filter';
import SeparateItem from './seperateItem';

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
