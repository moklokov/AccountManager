import { loadingUsers, loadedUsers, loadUsersError } from '../actions/users'
import Logger from '../logger'

export default function loadUsersService() {
  return function (dispatch, getStore, api) {
    try {
      dispatch(loadingUsers());
      const users = api.users.getUsers();
      dispatch(loadedUsers(users));
    } catch (error) {
      Logger.info(error);
      dispatch(loadUsersError());
    }
  }
}
