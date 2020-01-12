import {
  processingUsers,
  processUsersError,
  loadedUsers
} from "../actions/users";
import Logger from "../logger";

export default function loadUsersService() {
  return async function(dispatch, getStore, api) {
    try {
      dispatch(processingUsers());
      const users = await api.users.getUsers();
      dispatch(loadedUsers(users));
    } catch (error) {
      Logger.info(error);
      dispatch(processUsersError(error));
    }
  };
}
