import { removingUser, removedUser, removeUserError } from '../actions/users'
import Logger from '../logger'

export default function removeUserService(id) {
  return async function (dispatch, getStore, api) {
    try {
      dispatch(removingUser());
      await api.users.removeUser(id);
      dispatch(removedUser(id));
    } catch (error) {
      Logger.info(error);
      dispatch(removeUserError());
    }
  }
}
