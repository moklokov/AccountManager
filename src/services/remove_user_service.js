import { processingUsers, removedUser, processUsersError } from '../actions/users'
import Logger from '../logger'

export default function removeUserService(id) {
  return async function (dispatch, getStore, api) {
    try {
      dispatch(processingUsers());
      await api.users.removeUser(id);
      dispatch(removedUser(id));
    } catch (error) {
      Logger.info(error);
      dispatch(processUsersError(error));
    }
  }
}
