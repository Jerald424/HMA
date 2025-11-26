import { useAppDispatch, useAuth } from 'src/redux/hooks';
import HMAAlert from '../styled/template/modal/alert';
import HMAModalTemplate from '../styled/template/modal';
import { updateAuthSlice } from 'src/redux/slices/auth/slice';

export default function SessionExpires() {
  const { isSessionExpire } = useAuth();
  const dispatch = useAppDispatch();

  if (isSessionExpire)
    return (
      <HMAModalTemplate
        isVisible
        variant="error"
        descriptionProps={{ children: 'Session expires, Please login' }}
        cancelTextProps={{
          children: undefined,
        }}
        okTextProps={{
          onPress: () =>
            dispatch(updateAuthSlice({ key: 'isSessionExpire', value: false })),
        }}
      />
    );
}
