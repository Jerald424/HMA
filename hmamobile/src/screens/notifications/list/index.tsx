import { useMutation } from '@tanstack/react-query';
import { FlatList, RefreshControl } from 'react-native';
import NoData from 'src/components/layout/noData';
import HMABadge from 'src/components/styled/atoms/badge';
import HMACard from 'src/components/styled/atoms/card';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { useTheme } from 'src/hooks/useTheme';
import useUserId from 'src/hooks/useUserId';
import { useAppDispatch, useNotifications } from 'src/redux/hooks';
import { fetchNotificationThunk } from 'src/redux/slices/notications/thunk';
import axiosInstance from 'src/services/axiosInstance';

const readNotificationApi = async ({
  notification_id,
}: {
  notification_id: number;
}) => {
  return await axiosInstance.put(`/api/notifications/${notification_id}/read`);
};

export default function Notifications({ navigation }) {
  const { colors, spacing } = useTheme();
  const { data: notifications, isLoading } = useNotifications();
  console.log('notifications:', notifications);
  const dispatch = useAppDispatch();
  const employee_id = useUserId();

  const {
    mutate: readNotificationMutate,
    isPending: isLoadingReadNotification,
  } = useMutation({
    mutationKey: ['read/notification'],
    mutationFn: readNotificationApi,
  });

  const refetch = () => dispatch(fetchNotificationThunk({ employee_id }));

  const handleRead = item => {
    readNotificationMutate(
      { notification_id: item?.id },
      {
        onSuccess(data) {
          console.log('data: ', data);
        },
        onError(error) {
          console.log('ERROR: ', error);
        },
        onSettled() {
          refetch();
        },
      },
    );
  };

  return (
    <Container padding={0}>
      <FlatList
        contentContainerStyle={{ padding: spacing.md }}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isLoading || isLoadingReadNotification}
          />
        }
        data={notifications?.notifications}
        renderItem={({ item }) => (
          <SepRequestCard item={item} handleRead={handleRead} />
        )}
        ListEmptyComponent={() => (isLoading ? <></> : <NoData />)}
      />
    </Container>
  );
}

const SepRequestCard = ({
  item,
  handleRead,
}: {
  item: any;
  handleRead: any;
}) => {
  const { colors, spacing } = useTheme();

  return (
    <>
      <HMACard cmpType="View" style={{ padding: spacing?.md }}>
        <HMAText>{item?.title}</HMAText>
        <HMADivider thickness={1} />
        <HMAText size="small" color="textSecondary">
          {item?.body}
        </HMAText>
        {!item?.read && (
          <>
            <HMADivider />
            <HMAText
              onPress={() => handleRead(item)}
              color="info"
              align="right"
              size="small"
              variant="title"
            >
              Mark as read
            </HMAText>
          </>
        )}
      </HMACard>
      <HMADivider />
    </>
  );
};
