import { useDispatch } from 'react-redux';
import { UserType } from '../../../shared/types/userType';
import { useAppSelector } from '../../hooks';
import { setUserAction, clearUserAction } from '.';

export const useUserReducer = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.userReducer);

  const setUser = (currentUser: UserType) => {
    dispatch(setUserAction(currentUser));
  };

  const clearUser = () => {
    dispatch(clearUserAction());
  };

  return {
    user,
    setUser,
    clearUser,
  };
};
