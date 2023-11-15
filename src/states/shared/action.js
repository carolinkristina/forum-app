import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveCategoriesActionCreator } from '../categories/actiom';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUser();
      const threads = await api.getAllThreads();

      const categories = await threads.reduce((acc, { category }) => {
        if (!acc.includes(category)) {
          acc.push(category);
        }
        return acc;
      }, []);
      dispatch(receiveCategoriesActionCreator(categories));
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export default asyncPopulateUsersAndThreads;
